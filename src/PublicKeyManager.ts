import * as nacl from "tweetnacl";

import { IdentityPublicKey, IdentityPublicKeyID } from "./IdentityAPI";
import { TrustOnFirstUse } from "./SessionInternal";
import { Client } from "./HTTP";
import { wallix } from "./proto";
import { SignedCipher } from "./Cryptor";
import { Error, SDKKind } from "./Error";
import { Uint8Tool } from "./Tools";
import { TrustPolicy } from "./Session";

import api = wallix.gopeps.protobuf.datapeps;

/**
 * The public keys of identities are fetched from DataPeps and then validated thanks to a {@TrustPolicy}.
 * Once the keys are fetched and trusted, they are locally saved to a cache.
 * Keys saved in the cache will not need to be revalidated and retrusted when next used.
 */
export interface PublicKeysCache {
  latest(login: string): IdentityPublicKey;
  get(id: IdentityPublicKeyID): IdentityPublicKey;
  set(id: IdentityPublicKeyID, pk: IdentityPublicKey);
}

export class MemoryPublicKeysCache implements PublicKeysCache {
  private cache: { [login: string]: IdentityPublicKey[] };

  constructor() {
    this.cache = {};
  }
  latest(login: string): IdentityPublicKey {
    let keys = this.cache[login];
    return keys == null || keys.length == 0 ? null : keys[keys.length - 1];
  }

  get({ login, version }) {
    let keys = this.cache[login];
    return keys == null || keys.length == 0 ? null : keys[version];
  }

  set({ login, version }, pk) {
    let keys = this.cache[login];
    if (keys == null) {
      this.cache[login] = [];
    }
    this.cache[login][version] = pk;
  }
}

export class PublicKeysManager {
  private cache: PublicKeysCache;
  private trustPolicy: TrustPolicy;
  private client: Client;

  constructor(
    client: Client,
    cache: PublicKeysCache,
    trustPolicy: TrustPolicy
  ) {
    this.cache = cache;
    this.client = client;
    this.trustPolicy = trustPolicy;
  }

  async getLatestPublicKey(login: string): Promise<IdentityPublicKey> {
    return (await this.getLatestPublicKeys([login]))[0];
  }

  async getLatestPublicKeys(logins: string[]): Promise<IdentityPublicKey[]> {
    let {
      body: { chains }
    } = await this.client.doRequest({
      method: "POST",
      expectedCode: 200,
      path: "/api/v1/identities/latestPublicChains",
      headers: new Headers({ "content-type": "application/x-protobuf" }),
      body: api.IdentityGetLatestPublicChainsRequest.encode({
        ids: logins.map(login => {
          let pk = this.cache.latest(login);
          return { login, since: pk == null ? 0 : pk.version };
        })
      }).finish(),
      response: api.IdentityGetLatestPublicChainsResponse.decode
    });
    await this.validateChains(chains);
    return logins.map(login => this.cache.latest(login));
  }

  async getPublicKeys(
    ids: IdentityPublicKeyID[]
  ): Promise<IdentityPublicKey[]> {
    let requestIds: { [login: string]: number } = {};
    ids.forEach(id => {
      if (this.cache.get(id) != null) {
        return;
      }
      let version = requestIds[id.login];
      if (version == null || version < id.version) {
        requestIds[id.login] = id.version;
      }
    });
    let logins = Object.keys(requestIds);
    if (logins.length == 0) {
      return ids.map(id => this.cache.get(id));
    }
    let {
      body: { chains }
    } = await this.client.doRequest({
      method: "POST",
      expectedCode: 200,
      path: "/api/v1/identities/publicChains",
      headers: new Headers({ "content-type": "application/x-protobuf" }),
      body: api.IdentityGetPublicChainsRequest.encode({
        ids: Object.keys(requestIds).map(login => {
          let pk = this.cache.latest(login);
          let since = pk == null ? 0 : pk.version;
          let version = requestIds[login];
          return { id: { login, version }, since };
        })
      }).finish(),
      response: api.IdentityGetPublicChainsResponse.decode
    });
    await this.validateChains(chains);
    return ids.map(id => this.cache.get(id));
  }

  async getPublicKey(id: IdentityPublicKeyID): Promise<IdentityPublicKey> {
    let publicKeys = await this.getPublicKeys([id]);
    return publicKeys[0];
  }

  async resolveCipherList(ciphers: api.ICipher[]): Promise<SignedCipher[]> {
    let signs = ciphers.map(cipher => cipher.sign);
    let publicKeys = await this.getPublicKeys(signs as IdentityPublicKeyID[]);
    return ciphers.map(({ message, nonce, sign }) => {
      let pk = publicKeys.find(
        pk => sign.login == pk.login && sign.version == pk.version
      );
      if (pk == null) {
        throw new Error({
          kind: SDKKind.SDKInternalError,
          payload: { reason: "cannot find pk", sign }
        });
      }
      return { message, nonce, sign: pk };
    });
  }

  setTrustPolicy(policy: TrustPolicy) {
    this.trustPolicy = policy;
  }

  private async validateChains(chains: api.IIdentityPublicChain[]) {
    await Promise.all(chains.map(chain => this.validateChain(chain)));
  }

  // TODO(SSH): chains -> chain or links (the former is better)
  private async validateChain({
    login,
    version,
    chains
  }: api.IIdentityPublicChain) {
    // work on a duplicate of the chains parameter as shift() change the object
    chains = chains.slice();
    let firstVersion = version - chains.length;
    if (firstVersion < 0) {
      throw new Error({
        kind: SDKKind.InvalidServerChain,
        payload: { login, version, chains }
      });
    }
    let pk = this.cache.get({ login, version: firstVersion });

    if (firstVersion == 0) {
      if (pk == null) {
        let { box, sign, mandate } = chains.shift();
        pk = { login, version: 1, box, sign };
        await this.trustPolicy.trust(pk, mandate as IdentityPublicKeyID);
        this.cache.set({ login, version: 1 }, pk);
      }
      // Check if the server tries to erase the root key
      else if (
        !Uint8Tool.equals(pk.box, chains[0].box) ||
        !Uint8Tool.equals(pk.sign, chains[0].sign)
      ) {
        throw new Error({
          kind: SDKKind.IdentitySignChainInvalid,
          payload: { login, version: 1 }
        });
      }
    }
    // Check the sign chains and update the cache
    await chains.reduce(async (ppk, { box, sign, chain, mandate }) => {
      let pk = await ppk;
      let id = { login, version: pk.version + 1 };
      let pksign = pk.sign;
      if (mandate != null) {
        await this.trustPolicy.trust(pk, mandate as IdentityPublicKeyID);
        let mpk = await this.getPublicKey(mandate as IdentityPublicKeyID);
        pksign = mpk.sign;
      }
      if (
        !nacl.sign.detached.verify(Uint8Tool.concat(box, sign), chain, pksign)
      ) {
        throw new Error({
          kind: SDKKind.IdentitySignChainInvalid,
          payload: { login, version }
        });
      }
      pk = { login, version: id.version, box, sign };
      this.cache.set(id, pk);
      return pk;
    }, Promise.resolve(pk));
  }
}
