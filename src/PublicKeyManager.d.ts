import { IdentityPublicKey, IdentityPublicKeyID } from "./IdentityAPI";
import { Client } from "./HTTP";
import { api } from "./proto";
import { SignedCipher } from "./Cryptor";
import { TrustPolicy } from "./Session";
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
export declare class MemoryPublicKeysCache implements PublicKeysCache {
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
export declare class PublicKeysManager {
    private cache;
    private trustPolicy;
    private client;
    constructor(client: Client, cache: PublicKeysCache, trustPolicy: TrustPolicy);
    getLatestPublicKey(login: string): Promise<IdentityPublicKey>;
    getLatestPublicKeys(logins: string[]): Promise<IdentityPublicKey[]>;
    getPublicKeys(ids: IdentityPublicKeyID[]): Promise<IdentityPublicKey[]>;
    getPublicKey(id: IdentityPublicKeyID): Promise<IdentityPublicKey>;
    resolveCipherList(ciphers: api.ICipher[]): Promise<SignedCipher[]>;
    setTrustPolicy(policy: TrustPolicy): void;
    private validateChains(chains);
    private validateChain({login, version, chains});
}
