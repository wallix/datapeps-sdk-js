import { api } from "./proto";
import { Session } from "./Session";
/**
 * An {@Identity} owns several keys, this is a reference to the unique version of an identity public key.
 */
export interface IdentityPublicKeyID {
    login: string;
    version: number;
}
/**
 * An object containing a locked key
 */
export interface LockedVersion {
    /** The publicKey of the locked key */
    publicKey: IdentityPublicKeyWithMetadata;
}
/**
 * An {@Identity} owns several keys, this refers to the unique version of an identity public key.
 */
export interface IdentityPublicKey extends IdentityPublicKeyID {
    sign: Uint8Array;
    box: Uint8Array;
}
export declare namespace IdentityPublicKey {
    /**
     * Returns the hash of an IdentityPublicKey.
     * The hash is computed thanks a sha2156 of the concat of box and sign key.
     * @param key The key to hash.
     * @return(h) The hash of the key.
     */
    const hash: (key: IdentityPublicKey) => Uint8Array;
    /**
     * Returns a human redeable representation of the an IdentityPublicKey.
     * The representation is the hash of the IdentityPublicKey encoded in base58.
     * @param key The key to print.
     * @return(s) The string representation of the key.
     */
    const print: (key: IdentityPublicKey) => string;
}
/**
 * an identity public key with its creation date
 */
export interface IdentityPublicKeyWithMetadata extends IdentityPublicKey {
    created: Date;
}
/**
 * The description of the fields of an identity.
 */
export interface IdentityFields {
    /** The login of the identity. */
    login: string;
    /** A descriptive name for the identity. */
    name: string;
    /** The kind of the identity. */
    kind: string;
    /** A payload to have a more structured description of the identity. */
    payload: Uint8Array;
}
/**
 * The description of the state of an identity.
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
    admin: boolean;
    active: boolean;
    /** A payload to have a more structured description of the identity. */
    payload: T;
}
/**
 * IdentityKeyKind indicates which kind of keys is shared has between two identities.
 */
export declare type IdentityKeyKind = api.IdentityShareKind;
/**
 * IdentityShareLink describes a share link between two identities.
 */
export declare type IdentityShareLink = {
    id: IdentityPublicKeyID;
    kind: IdentityKeyKind;
    locked: boolean;
};
/** Allows to indicate which kind of access shoudl be used in a {@link SessionRequest}*/
export declare enum IdentityAccessKind {
    READ = 0,
    WRITE = 1,
}
/** Allows to indicate which kind of field should be sorted. */
export declare enum IdentitySortingField {
    LOGIN = 0,
    CREATED = 1,
    KIND = 2,
}
export declare enum IdentitySortingOrder {
    DESC = 0,
    ASC = 1,
}
export declare class IdentityAPI {
    private session;
    constructor(session: Session);
    /**
     * Get the latest public key of the given identity login.
     * @param login The login of identity to get the key.
     * @return(p) On success the promise will be resolved with the public key of `login`.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity is not found.
     */
    static getLatestPublicKeys(logins: string[]): Promise<IdentityPublicKey[]>;
    /**
     * Get the latest public key of a list of identities.
     * @param logins The login of identities to get the key.
     * @return(p) On success the promise will be resolved with list of the public key in the same order of the `logins` list.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if an identity is not found.
     */
    static getLatestPublicKey(login: string): Promise<IdentityPublicKey>;
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
     *  - limit: Limit the length of the result (default: 10).
     *  - search: select only logins containing this string
     *  - kind: Filter on a specific kind
     *  - sortingField: Sort the result according to this field, default is CREATED
     *  - sortingOrder: Specifies the sorting order "ASC" or "DESC", default is ASC
     * @return(p) On success the promise will be resolved with a list.
     */
    list(options?: {
        offset?: number;
        limit?: number;
        search?: string;
        kind?: string;
        sortingField?: IdentitySortingField;
        sortingOrder?: IdentitySortingOrder;
    }): Promise<{
        identities: Identity<Uint8Array>[];
        totalIdentitiesCount: number;
    }>;
    /**
     * Create a new identity.
     * @param identity The description of the identity.
     * @param options A collection of options:
     *  - secret: An optional secret associated with the created identity that could be used to login.
     *  - sharingGroup: An optional list of identity logins that are shared with the created identity.
     *  - email: An optional email associated with the identity to create.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityInvalidLogin` if identity.login is not a valid login.
     * - `IdentityAlreadyExists` if identity.login already exists.
     */
    create(identity: IdentityFields, options: {
        secret?: Uint8Array | string;
        sharingGroup?: string[];
        email?: string;
    }): Promise<void>;
    /**
     * Update an identity.
     * @param identity The fields to update
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if identity.login doesn't not exists.
     */
    update(identity: IdentityFields): Promise<void>;
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
     * Get the sharing group of an identity. The sharing group of an identity is the set of identities that can
     * access to this identity.
     * @param login The login of the identity to get the sharing group.
     * @return(p) On success the promise will be resolved with a list of links that describe accesses to the identity.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    getSharingGroup(login: string): Promise<IdentityShareLink[]>;
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
    editSharingGraph(login: string, options?: {
        sharingGroup?: string[];
        overwriteKeys?: {
            secret: string | Uint8Array;
        };
    }): Promise<void>;
    /**
     * Get the access group of an identity. The access group of an identity is the set of identities that can
     * accessed by this identity.
     * @param login The login of the identity to get the sharing group.
     * @return(p) On success the promise will be resolved with a list of links that describe accesses by the identity.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    getAccessGroup(login: string): Promise<IdentityShareLink[]>;
    /**
     * Get all history of public keys of the given identity login.
     * WARNING: These keys are not trusted, i.e. the chain of trust is not validated
     * @param login The login of identity to get the key history.
     * @return(p) On success the promise will be resolved with the history of public keys of `login`.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity is not found.
     */
    getPublicKeyHistory(login: string): Promise<IdentityPublicKey[]>;
    /**
     * Get the keys of the versions of an identity that are locked. A version of an identity is locked if it is not accessible
     * by the current version of the identity
     * @param login The login of the identity to get the sharing group.
     * @param options A collection of initialization options that control the sessions:
     * @return(p) On success the promise will be resolved with a list of the public keys identity that are locked.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    getLockedVersions(login: string, options?: {
        withChallenge?: boolean;
    }): Promise<{
        publicKey: IdentityPublicKeyWithMetadata;
        challenge?: api.IdentityGetLockedVersionsResponse.IIdentityChallenge;
    }[]>;
    /**
     * Try to unlock the locked versions with the secret passed as parameter.
     * @param secret A secret used to unlock previous versions of the current identity
     * @return(p) On success the promise will be resolved with the list of unlocked identities.
     */
    unlockVersions(login: string, secret: string | Uint8Array): Promise<IdentityPublicKeyWithMetadata[]>;
    private getSharingGraph(login, options?);
}
