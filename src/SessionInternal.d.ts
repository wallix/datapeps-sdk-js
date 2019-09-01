import { api } from "./proto";
import { IdentityPublicKey, IdentityPublicKeyID } from "./IdentityAPI";
import { Session, SessionRequest, TrustPolicy } from "./Session";
import { Client } from "./HTTP";
import { IdentityKeySet } from "./IdentityKeySet";
import { IdentityKeySetManager } from "./IdentityKeySetManager";
import { PublicKeysManager, PublicKeysCache } from "./PublicKeyManager";
export declare type SessionParams = {
    token: string;
    login: string;
    salt: Uint8Array;
    saltKind: api.SessionSaltKind;
};
export interface SessionState {
    login: string;
    client: SessionClient;
    keySet: IdentityKeySetManager;
    publicKeys: PublicKeysManager;
}
export declare namespace SessionState {
    function create(session: Session): any;
    function createBase(login: string, client: SessionClient, pkCache: PublicKeysCache, trustPolicy: TrustPolicy): SessionState;
}
export declare class SessionClient {
    client: Client;
    keySet: IdentityKeySetManager;
    private params;
    private deltaSaltTime;
    private secret;
    constructor(params: SessionParams, keySet: IdentityKeySet, client: Client, secret: Uint8Array);
    doRequest<T>(request: SessionRequest<T>): Promise<T>;
    doProtoRequest<T>(request: SessionRequest<T>): Promise<T>;
    unStale(secret?: Uint8Array): Promise<void>;
    setSecret(secret: Uint8Array): void;
    getAuthHeaders(request: SessionRequest<any>): Promise<Map<string, string>>;
    private addAuthHeaders(request);
    private getSalt();
    private handleResponseHeaders(headers);
    private afterRequestHandleSalt();
}
export declare class TrustOnFirstUse implements TrustPolicy {
    trust(pk: IdentityPublicKey, mandate?: IdentityPublicKeyID): Promise<void>;
}
