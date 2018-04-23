import { types } from './proto';
import { ID, Session, SessionRequest, PublicKeysCache, TrustPolicy, AccessRequestResolver } from './DataPeps';
import { IdentityPublicKey, IdentityPublicKeyID, IdentityAccessKind } from './DataPeps';
import { AccessRequest } from './DataPeps';
import { Resource } from './DataPeps';
import { Client } from './HTTP';
import { ResolvedCipher, Encryption } from './CryptoFuncs';
import { IdentityImpl } from './Identity';
import { ResourceImpl } from './Resource';
import { AdminImpl } from './Admin';
export interface AssumeParams {
    key: types.IDelegatedKeys;
    kind: IdentityAccessKind;
}
export declare function _login(client: Client, login: string, recover: (e: types.IdentityEncryption, c: types.IdentityPublicKey) => Encryption, options?: {
    saltKind?: types.SessionSaltKind;
}): Promise<Session>;
export declare class SessionImpl implements Session {
    APIHost: string;
    WSHost: string;
    login: string;
    encryption: Encryption;
    client: Client;
    token: string;
    private salt;
    private saltKind;
    private deltaSaltTime;
    private pkCache;
    private trustPolicy;
    private assumeKeyCache;
    constructor(login: string, token: Uint8Array, salt: Uint8Array, saltKind: types.SessionSaltKind, encryption: Encryption, client: Client);
    Identity: IdentityImpl;
    Resource: ResourceImpl;
    Admin: AdminImpl;
    close(): Promise<void>;
    renewKeys(secret?: string | Uint8Array): Promise<void>;
    getSessionPublicKey(): IdentityPublicKey;
    getLatestPublicKey(login: string): Promise<IdentityPublicKey>;
    getLatestPublicKeys(logins: string[]): Promise<IdentityPublicKey[]>;
    getPublicKey(id: IdentityPublicKeyID): Promise<IdentityPublicKey>;
    getPublicKeys(ids: IdentityPublicKeyID[]): Promise<IdentityPublicKey[]>;
    resolveAccessRequest(requestId: ID): Promise<AccessRequestResolver>;
    createSession(login: string): Promise<Session>;
    setTrustPolicy(policy: TrustPolicy): void;
    setPublicKeyCache(cache: PublicKeysCache): void;
    getSecretToken(login: string): Promise<string>;
    sign(message: Uint8Array): Uint8Array;
    doRequest<T>(r: SessionRequest<T>): Promise<T>;
    doProtoRequest<T>(r: SessionRequest<T>): Promise<T>;
    private validateChains(chains);
    private validateChain({login, version, chains});
    private afterRequest(request);
    private afterRequestHandleSalt();
    private beforeRequest(request, body, assume?);
    getSalt(): Uint8Array;
    private unStale();
    resolveCipherList(ciphers: types.ICipher[]): Promise<ResolvedCipher[]>;
    decryptCipherList(type: types.ResourceType, ciphers: types.ICipher[], secretKey?: Uint8Array): Promise<Uint8Array>;
    getAssumeParams(assume?: {
        login: string;
        kind: IdentityAccessKind;
    }): Promise<AssumeParams>;
    private getKeys(login);
    fetchKeys(login: string, version?: number): Promise<types.IDelegatedKeys>;
    clearAssumeParams(login: string): void;
}
export declare class AccessRequestImpl implements AccessRequest {
    id: ID;
    login: string;
    private keys;
    private reason;
    private client;
    private resource;
    private resolve;
    private reject;
    constructor(id: ID, login: string, client: Client, resource: Resource<null>);
    private init();
    wait(): Promise<void>;
    waitSession(): Promise<Session>;
    openResolver(): void;
    _openConfigured(id: ID, login: string): void;
}
export interface Event<T> {
    type: string;
    payload: T;
}
