import { IdentityPublicKey, IdentityPublicKeyID } from "./IdentityAPI";
import { Base64 } from "./Tools";
import { Session } from "./Session";
import { debug } from "./HTTP";

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

/**
 * Unknown keys are fetched from the DataPeps service.
 * To mitigate MitM or Operator attacks the client must validate the keys by a side-channel, that could be a hand-check, a tier-service check or whatever...
 */
export interface TrustPolicy {
  trust(pk: IdentityPublicKey, mandate?: IdentityPublicKeyID): Promise<void>;
}

export class MemoryPublicKeyCache implements PublicKeysCache {
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

export class TrustOnFirstUse implements TrustPolicy {
  private session: Session;

  constructor(session: Session) {
    this.session = session;
  }

  async trust(
    pk: IdentityPublicKey,
    mandate?: IdentityPublicKeyID
  ): Promise<void> {
    if (pk.version == 1) {
      if (debug) {
        console.log(
          "TrustFirstUse",
          pk.login,
          Base64.encode(pk.sign),
          Base64.encode(pk.box),
          " mandate by ",
          mandate
        );
      }
      return Promise.resolve();
    }
    await this.session.getPublicKey(mandate);
    if (debug) {
      console.log(
        "TrustByMandate",
        pk.login,
        pk.version,
        Base64.encode(pk.sign),
        Base64.encode(pk.box),
        " mandate by ",
        mandate
      );
    }
    return Promise.resolve();
  }
}
