import { SessionClient } from "./SessionInternal";
import { IdentityKeySet } from "./IdentityKeySet";
import { IdentityPublicKey } from "./IdentityAPI";
import { api } from "./proto";
import { Error, SDKKind } from "./Error";
import { IdentityKeySetAPI } from "./IdentityKeySetAPI";

export class IdentityKeySetManager {
  private _root: IdentityKeySet;
  private sessionClient: SessionClient;
  private cache: { [loginWithVersion: string]: IdentityKeySet };

  constructor(root: IdentityKeySet, sessionClient: SessionClient) {
    this.cache = {};
    this.root = root;
    this.sessionClient = sessionClient;
  }

  set root(root: IdentityKeySet) {
    this._root = root;
    this.put(this._root);
  }

  get root() {
    return this._root;
  }

  getCurrentPublicKey(): IdentityPublicKey {
    let publicKey = this.root.public();
    return {
      login: this.root.id.login,
      version: this.root.id.version,
      sign: publicKey.sign,
      box: publicKey.box
    };
  }

  async get(login: string, version?: number): Promise<IdentityKeySet> {
    if (login == this.root.id.login && version == null) {
      version = this.root.id.version;
    }
    if (version == null) {
      let keySet = await this.fetch(this.sessionClient, login, version);
      this.put(keySet);
      version = keySet.id.version;
    }
    let keySet = this.getFromCache(login, version);
    if (keySet != null) {
      return keySet;
    }
    this.put(await this.fetch(this.sessionClient, login, version));
    return this.getFromCache(login, version);
  }

  sign(msg: Uint8Array): Uint8Array {
    return this.root.sign(msg);
  }

  private async fetch(
    sessionClient: SessionClient,
    login: string,
    version?: number
  ): Promise<IdentityKeySet> {
    let { path } = await sessionClient.doProtoRequest({
      method: "POST",
      path: "/api/v1/identity/" + encodeURI(login) + "/keySet",
      expectedCode: 200,
      body: api.IdentityGetKeySetRequest.encode({ version }).finish(),
      response: api.IdentityGetKeySetResponse.decode
    });
    if (path.length == 0) {
      throw new Error({
        kind: SDKKind.ProtocolError,
        payload: { message: "unexpected keySet path" }
      });
    }
    return path.reduce(IdentityKeySetAPI.recoverWithPathElt, this.root);
  }

  private put(keySet: IdentityKeySet) {
    this.cache[
      IdentityKeySetManager.composeCacheKey(keySet.id.login, keySet.id.version)
    ] = keySet;
  }

  private getFromCache(login: string, version: number): IdentityKeySet {
    return this.cache[IdentityKeySetManager.composeCacheKey(login, version)];
  }

  private static composeCacheKey(login: string, version: number) {
    return `${login}/${version}`;
  }
}
