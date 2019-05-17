import { SessionClient } from "./SessionInternal";
import { IdentityKeySet } from "./IdentityKeySet";
import { IdentityPublicKey } from "./IdentityAPI";
export declare class IdentityKeySetManager {
    private _root;
    private sessionClient;
    private cache;
    constructor(root: IdentityKeySet, sessionClient: SessionClient);
    root: IdentityKeySet;
    getCurrentPublicKey(): IdentityPublicKey;
    get(login: string, version?: number): Promise<IdentityKeySet>;
    sign(msg: Uint8Array): Uint8Array;
    private fetch(sessionClient, login, version?);
    private put(keySet);
    private getFromCache(login, version);
    private static composeCacheKey(login, version);
}
