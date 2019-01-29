import { api } from "./proto";
import { IdentityPublicKey, IdentityPublicKeyID, IdentityAccessKind } from "./IdentityAPI";
import { Request } from "./HTTP";
import { TrustPolicy, PublicKeysCache } from "./SessionUtils";
/**
 * Specify how the sdk request should be authenticated by the DataPeps service.
 * - "RAND" means that the service generates a fresh salt for each request `n` which is used to sign request `n+1`. It is the most secure kind of salt, but implies that all requests MUST be done sequentially.
 * - "TIME" means that the service generates a salt based on a timestamp, so a signed request can be authenticated within a time window.
 */
export declare type SessionSaltKind = api.SessionSaltKind;
/**
 * A object that can be used to make authenticated request by a {@link_Session}.
 */
export interface SessionRequest<T> extends Request<T> {
    assume?: {
        login: string;
        kind: IdentityAccessKind;
    };
}
export declare namespace Session {
    /**
     * Create a new session.
     * @param login The login of the identity to login with.
     * @param secret The secret of the identity.
     * @param options A collection of initialization options that control the sessions:
     *  - saltKind: The kind of salt used to sign authenticated requests to the DataPeps service. The default value is `TIME`. For more details see {@link SessionSaltKind}
     * @return(p) On success the promise will be resolved with a new session.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the `login` does not exists or if the identity has no secret.
     */
    function login(login: string, secret: string | Uint8Array, options?: {
        saltKind?: SessionSaltKind;
    }): Promise<Session>;
}
/**
 * A Session is used to perform authenticated requests to the DataPeps service and allows access to the authenticated API of the DataPeps service.
 */
export interface Session {
    /** The login of the {@link Identity} logged into the session */
    login: string;
    /**
     * Close the session.
     * @return(p) On success the promise will be resolved with void.
     */
    close(): Promise<void>;
    /**
     * Renew keys for the identity logged along with this session.
     * @param secret An optional secret to renew keys, if not retain the old secret as still valid.
     * @return(p) On success the promise will be resolved with void.
     */
    renewKeys(secret?: string | Uint8Array): Promise<void>;
    /**
     * Get the public key of the current session.
     * @return The public key of the current session.
     */
    getSessionPublicKey(): IdentityPublicKey;
    /**
     * Get the latest public key of the given identity login.
     * @param login The login of identity to get the key.
     * @return(p) On success the promise will be resolved with the public key of `login`.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity is not found.
     */
    getLatestPublicKey(login: string): Promise<IdentityPublicKey>;
    /**
     * Get the latest public key of a list of identities.
     * @param logins The login of identities to get the key.
     * @return(p) On success the promise will be resolved with list of the public key in the same order of the `logins` list.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if an identity is not found.
     */
    getLatestPublicKeys(logins: string[]): Promise<IdentityPublicKey[]>;
    /**
     * Get a specific version of the public key of an identity.
     * @param id The id of the key to get.
     * @return(p) On success the promise will be resolved with the public key.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity is not found.
     */
    getPublicKey(id: IdentityPublicKeyID): Promise<IdentityPublicKey>;
    /**
     * Get specific versions of the public keys.
     * @param ids The ids of the keys to get.
     * @return(p) On success the promise will be resolved with a list of the public keys in the same order as the `ids` list.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if an identity is not found.
     */
    getPublicKeys(ids: IdentityPublicKeyID[]): Promise<IdentityPublicKey[]>;
    /**
     * Create a new session for an identity that the current session identity can access.
     * @param login The login of the identity to login with.
     */
    createSession(login: string): Promise<Session>;
    /**
     * Set the trust policy for the session, see {@link TrustPolicy} for more details.
     * @param policy The trust policy to set.
     */
    setTrustPolicy(policy: TrustPolicy): any;
    /**
     * Set the public keys cache for the session, see {@link PublicKeyCache} for more details.
     * @param cache The public key cache to set.
     */
    setPublicKeyCache(cache: PublicKeysCache): any;
    /**
     * Sign a message.
     */
    sign(message: Uint8Array): any;
    /**
     * Get the secret token of an identity.
     */
    getSecretToken(login: string): Promise<string>;
    /**
     * Do an authenticated request.
     * @param request
     */
    doRequest<T>(request: SessionRequest<T>): Promise<T>;
    /**
     * Do an authenticated proto request.
     * @param request
     */
    doProtoRequest<T>(request: SessionRequest<T>): Promise<T>;
}
export declare function loginWithKeys(client: any, keys: any): Promise<Session>;
export interface SessionParameters {
    token: Uint8Array;
    login: string;
    salt: Uint8Array;
    saltKind: api.SessionSaltKind;
}
