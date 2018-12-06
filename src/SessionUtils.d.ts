import { IdentityPublicKey, IdentityPublicKeyID } from "./IdentityAPI";
import { Session } from "./Session";
/**
 * The public keys of identities are fetched from DataPeps and then validated thanks to a {@TrustPolicy}.
 * Once the keys are fetched and trusted, they are locally saved to a cache.
 * Keys saved in the cache will not need to be revalidated and retrusted when next used.
 */
export interface PublicKeysCache {
    latest(login: string): IdentityPublicKey;
    get(id: IdentityPublicKeyID): IdentityPublicKey;
    set(id: IdentityPublicKeyID, pk: IdentityPublicKey): any;
}
/**
 * Unknown keys are fetched from the DataPeps service.
 * To mitigate MitM or Operator attacks the client must validate the keys by a side-channel, that could be a hand-check, a tier-service check or whatever...
 */
export interface TrustPolicy {
    trust(pk: IdentityPublicKey, mandate?: IdentityPublicKeyID): Promise<void>;
}
export declare class MemoryPublicKeyCache implements PublicKeysCache {
    private cache;
    constructor();
    latest(login: string): IdentityPublicKey;
    get({login, version}: {
        login: any;
        version: any;
    }): IdentityPublicKey;
    set({login, version}: {
        login: any;
        version: any;
    }, pk: any): void;
}
export declare class TrustOnFirstUse implements TrustPolicy {
    private session;
    constructor(session: Session);
    trust(pk: IdentityPublicKey, mandate?: IdentityPublicKeyID): Promise<void>;
}
