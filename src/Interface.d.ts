/// <reference types="long" />
import * as Long from 'long';
import { types } from './proto';
import { Request } from './HTTP';
/**
 * Type of identitfier of DataPeps objects.
 */
export declare type ID = Long | number;
/** Allows to indicate which kind of access shoudl be used in a {@link SessionRequest}*/
export declare enum IdentityAccessKind {
    READ = 0,
    WRITE = 1,
}
/**
 * A object that can be used to make authenticated request by a {@link_Session}.
 */
export interface SessionRequest<T> extends Request<T> {
    assume?: {
        login: string;
        kind: IdentityAccessKind;
    };
}
/**
 * An access request is a request used for the delegation of the access of an identity.
 * @see {@link requestDelegatedAccess}
 */
export interface AccessRequest {
    /** The id of the AccessRequest. */
    id: ID;
    /** Wait for the resolve of the AccessRequest. */
    wait(): Promise<void>;
    /** Same as wait but returns an authenticated session of the identity that resolved the AccessRequest. */
    waitSession(): Promise<Session>;
}
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
/**
 * An object that allows to checks and resolve an AccessRequest.
 */
export interface AccessRequestResolver {
    /** The IdentityPublicKey of the identity who signed the access request. */
    requesterKey: IdentityPublicKey;
    /** Resolve the access request with the given login.
     * i.e. the corresponding AccessRequest could use a session authenticated with the identity of the given login.
     */
    resolve(login: string): Promise<void>;
}
/**
 * A Session is used to perform authenticated requests to the DataPeps service and allows access to the authenticated API of the DataPeps service.
 */
export interface Session {
    /** The login of the {@link Identity} logged into the session */
    login: string;
    /** Access to the identity service API. */
    Identity: IdentityAPI;
    /** Access to the resource service API. */
    Resource: ResourceAPI;
    /** Access to the channel service API. */
    Channel: ChannelAPI;
    /** Access to the admin API.*/
    Admin: AdminAPI;
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
     * Resolve an access request.
     * @param requestID The id to the access request to resolve.
     */
    resolveAccessRequest(requestId: ID): Promise<AccessRequestResolver>;
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
     * Do an authenticated request.
     * @param request
     */
    doRequest<T>(request: SessionRequest<T>): Promise<T>;
}
/**
 * An {@Identity} owns several keys, this is a reference to the unique version of an identity public key.
 */
export interface IdentityPublicKeyID {
    login: string;
    version: number;
}
/**
 * An {@Identity} owns several keys, this refers to the unique version of an identity public key.
 */
export interface IdentityPublicKey extends IdentityPublicKeyID {
    sign: Uint8Array;
    box: Uint8Array;
}
/**
 * A description of an identity.
 */
export interface Identity<T> {
    /** The login of the identity. */
    login: string;
    /** A descriptive name for the identity. */
    name: string;
    /** The kind of the identity. */
    kind: string;
    /** The creation date of the identity. */
    created: Date;
    /** Indicates if the identity is an admin. */
    admin?: boolean;
    /** Indicates if the identity is active. */
    active: boolean;
    /** A payload to have a more structured description of the identity. */
    payload: T;
}
/**
 * IdentityKeyKind indicates which kind of keys is shared has between two identities.
 */
export declare type IdentityKeyKind = types.IdentityShareKind;
/**
 * IdentityShareLink describes a share link between two identities.
 */
export declare type IdentityShareLink = {
    id: IdentityPublicKeyID;
    kind: IdentityKeyKind;
};
export interface IdentityAPI {
    /**
     * Get an identity from the login.
     * @param login The login of the identity to get.
     * @return(p) On success the promise will be resolved with the identity.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityNotFound` if the `login` does not exists.
     */
    get(login: string): Promise<Identity<Uint8Array>>;
    /**
     * List identities registered on DataPeps.
     * @param options A collection of options:
     *  - offset: Skip this number of results.
     *  - limit: Limit the length of the result (default: 1000).
     *  - domain: Filter on a specific domain.
     * @return(p) On success the promise will be resolved with a list.
     */
    list(options?: {
        offset?: number;
        limit?: number;
        domain?: string;
        search?: string;
        kind?: string;
    }): Promise<Identity<Uint8Array>[]>;
    /**
     * Create a new identity.
     * @param identity The description of the identity.
     * @param options A collection of options:
     *  - secret: An optional secret associated with the created identity that could be used to login.
     *  - sharingGroup: An optional list of identity logins that are shared with the created identity.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityInvalidLogin` if identity.login is not a valid login.
     * - `IdentityAlreadyExists` if identity.login already exists.
     */
    create(identity: Identity<Uint8Array>, options: {
        secret?: Uint8Array | string;
        sharingGroup?: string[];
    }): Promise<void>;
    /**
     * Renew the keys of an identity.
     * @param login The login of the identity to renew the keys.
     * @param secret An optional secret to renew keys, if not retain the old secret as still valid.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    renewKeys(login: string, secret?: string | Uint8Array): Promise<void>;
    /**
     * Extend the sharing group of an identity.
     * @param login The login of the identity to extend.
     * @param sharingGroup The list of identity logins to add to the sharing group of the identity.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    extendSharingGroup(login: string, sharingGroup: string[]): Promise<void>;
    /**
     * Replace the sharing group of an identity.
     * @param login The login of the identity to replace the keys.
     * @param sharingGroup The list of identity logins that will comprise the new sharing group of the identity.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityInvalidLogin` if the identity.login is not a valid login.
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    replaceSharingGroup(login: string, sharingGroup: string[]): Promise<void>;
    /**
     * Get the sharing group of an identity. The sharing group of an identity is the set of identities that can
     * access to this identity.
     * @param login The login of the identity to get the sharing group.
     * @return(p) On success the promise will be resolved with a list of links that describe accesses to the identity.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    getSharingGroup(login: string): Promise<IdentityShareLink[]>;
    /**
     * Get the access group of an identity. The access group of an identity is the set of identities that can
     * accessed by this identity.
     * @param login The login of the identity to get the sharing group.
     * @return(p) On success the promise will be resolved with a list of links that describe accesses by the identity.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    getAccessGroup(login: string): Promise<IdentityShareLink[]>;
}
/**
 * The list the cryptographic schemes of a {@link Resource}
 */
export declare enum ResourceType {
    ANONYMOUS = 0,
}
/**
 * A DataPeps Resource is a sharable object that handles the basic function encrypt/decrypt.
 */
export interface Resource<T> {
    id: ID;
    kind: string;
    type: ResourceType;
    payload: T;
    creator: IdentityPublicKey;
    publicKey(): Uint8Array;
    encrypt(clear: Uint8Array): Uint8Array;
    decrypt(cipher: Uint8Array): Uint8Array;
}
export interface ResourceAPI {
    /**
     * Create and share a resource between a set of identities.
     * @param kind A hint of the kind of the resource.
     * @param payload A custom payload to describes the resource.
     * @param sharingGroup The set of identities to share the resource to create.
     * @param options A collection of options:
     *  - serialize: A function that be used to serialize the payload. By default JSON.stringify.
     * @return(p) On success the promise will be resolved with the created resource.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityNotFound` if one of identities doesn't exists.
     */
    create<T>(kind: string, payload: T, sharingGroup: string[], options?: {
        serialize?: ((payload: T) => Uint8Array);
    }): Promise<Resource<T>>;
    /**
     * Get a resource thanks its identifier.
     * @param id The identifier of the resource to get.
     * @param options A collection of options:
     *  - parse: A functon that be used to parse the resorce payload. By default JSON.parse.
     * @return(p) On success the promise will be resolved with the resource.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `ResourceNotFound` if the resource does not exists.
     */
    get<T>(id: ID, options?: {
        assume?: string;
        parse?: ((u: Uint8Array) => T);
    }): Promise<Resource<T>>;
    /**
     * Delete a resource thanks its identifier.
     * @param id The identifier of the resource to delete.
     * @param options A collection of options:
     *  - soft: If true delete only the copy, if false delete the resource for all identities in its sharingGroup.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `ResourceNotFound` if the resource does not exists.
     */
    delete(id: ID, options?: {
        soft?: boolean;
        assume?: string;
    }): Promise<void>;
    /**
     * Extends the sharing group of a resource.
     * @param id The identifier of the resource to extend the sharing group.
     * @param sharingGroup The set of identities to add on the sharing of the resource.
     * @param options
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `ResourceNotFound` if the resource does not exists.
     */
    extendSharingGroup(id: ID, sharingGroup: string[], options?: {
        assume?: string;
    }): Promise<void>;
}
export interface ChannelMessage {
    content: Uint8Array;
    from?: IdentityPublicKeyID;
}
export interface Channel {
    id: ID;
    creator: IdentityPublicKey;
    send(content: Uint8Array): Promise<void>;
    listen(onMessage: (message: ChannelMessage) => any): Promise<void>;
}
export interface ChannelAPI {
    create(sharingGroup: string[]): Promise<Channel>;
    get(id: ID): Promise<Channel>;
}
export interface AdminAPI {
    /**
     * Set the admin status of an identity.
     * @param login The login of the identity for which to set the admin status.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityNotFound` if `login` does not exists.
     * - `IdentityNotAdmin` if the identity logged along with the current session is not an admin.
     * - `IdentityNotAdminDomain` if the identity logged along with the current session cannot administer the domain of `login`.
     */
    setAdmin(login: string, admin: boolean): Promise<void>;
    /**
     * Set the active status of an identity. A deactivated identity cannot login anymore.
     * @param login The login of the identity to set the active status.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityNotFound` if `login` does not exists.
     * - `IdentityNotAdmin` if the identity logged along with the current session is not an admin.
     * - `IdentityNotAdminDomain` if the identity logged along with the current session cannot administer the domain of `login`.
     */
    setActive(login: string, active: boolean): Promise<void>;
    /**
     * Generate new keys for an identity.
     * The identity will no longer be able access any things (resources, shared identities, ...) that have previously been shared with it.
     * @param login The login of the identity to set the active status.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityNotFound` if `login` does not exists.
     * - `IdentityNotAdmin` if the identity logged along the current session is not an admin.
     * - `IdentityNotAdminDomain` if the identity logged along with the current session cannot adinistrate the domain of `login`.
     */
    overwriteKeys(login: string, secret: string | Uint8Array): Promise<void>;
    /**
     * List registered token on DataPeps.
     * @param options A collection of options:
     *  - offset: Skip this number of results.
     *  - limit: Limit the length of the result (default: 1000).
     *  - domain: Filter on a specific domain.
     * @return(p) On success the promise will be resolved with a list.
     */
    listRegisterTokens(options?: {
        offset?: number;
        limit?: number;
        domain?: string;
    }): Promise<types.IRegisterEmailValidationToken[]>;
}
