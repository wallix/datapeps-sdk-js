import { wallix } from "./proto";
import { IdentityPublicKey, IdentityPublicKeyID } from "./IdentityAPI";
import { Client, Request } from "./HTTP";
import { IdentityKeySet } from "./IdentityKeySet";
import api = wallix.gopeps.protobuf.datapeps;
/**
 * Specify how the sdk request should be authenticated by the DataPeps service.
 * - "RAND" means that the service generates a fresh salt for each request `n` which is used to sign request `n+1`. It is the most secure kind of salt, but implies that all requests MUST be done sequentially.
 * - "TIME" means that the service generates a salt based on a timestamp, so a signed request can be authenticated within a time window.
 */
export declare type SessionSaltKind = api.SessionSaltKind;
export declare type AssumeOptions = {
    login: string;
    kind: api.IdentityAccessKeyKind;
    keySet?: IdentityKeySet;
};
/**
 * A object that can be used to make authenticated request by a {@link_Session}.
 */
export interface SessionRequest<T> extends Request<T> {
    /**
     * An optional assume parameters to assume the request as another identity.
     */
    assume?: AssumeOptions;
}
export declare type LoginOptions = {
    saltKind?: api.SessionSaltKind;
};
/**
 * Unknown keys are fetched from the DataPeps service.
 * To mitigate MitM or Operator attacks the client must validate the keys by a side-channel, that could be a hand-check, a tier-service check or whatever...
 */
export interface TrustPolicy {
    trust(pk: IdentityPublicKey, mandate?: IdentityPublicKeyID): Promise<void>;
}
export declare class Session {
    private api;
    private constructor();
    /** The login of the {@link Identity} logged into the session */
    readonly login: string;
    /**
     * Close the session.
     * @return(p) On success the promise will be resolved with void.
     */
    close(): Promise<void>;
    /**
     * Get the public key of the current session.
     * @return The public key of the current session.
     */
    getSessionPublicKey(): IdentityPublicKey;
    /**
     * Create a new session for an identity that the current session identity can access.
     * @param login The login of the identity to login with.
     */
    createSession(login: string): Promise<Session>;
    /**
     * Set the trust policy for the session, see {@link TrustPolicy} for more details.
     * @param policy The trust policy to set.
     */
    setTrustPolicy(policy: TrustPolicy): void;
    sign(message: Uint8Array): Uint8Array;
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
    static login(login: string, secret: string | Uint8Array, options?: LoginOptions): Promise<Session>;
    static create(client: Client, login: string, recover: (e: api.IdentityEncryptedKeySet) => IdentityKeySet, options?: LoginOptions): Promise<Session>;
    private static createWithSecret(client, login, recover, options, secret);
    private static createSessionMaterial(client, login, recover, options?);
}
