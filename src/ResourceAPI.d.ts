import { IdentityPublicKey, IdentityPublicKeyID } from "./IdentityAPI";
import { Session } from "./Session";
import { ID } from "./ID";
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
    encrypt<T extends Uint8Array | string>(clear: T): T;
    /**
     * Decrypts a cipher text, that should be encrypted by the encrypt function of the resource, to the original clear text.
     * @throws DataPeps.Error with kind `DataPeps.SDKError.DecryptFail`
     */
    decrypt<T extends Uint8Array | string>(cipher: T): T;
}
export interface ResourceAccessLog {
    /**
     * The ID of the resource that has been accessed.
     */
    resourceID: ID;
    /**
     * The identity that has acessed to the resource.
     */
    owner: IdentityPublicKeyID;
    /**
     * The identity assumed to access to the resource.
     */
    assume: IdentityPublicKeyID;
    /**
     * The date of the access.
     */
    timestamp: Date;
    /**
     * The reason of the access.
     */
    reason: string;
}
export interface ResourceShareLink {
    identityID: IdentityPublicKeyID;
}
export declare class ResourceAPI {
    private session;
    constructor(session: Session);
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
     * Get the resources accessible to the identity.
     * @param options A collection of options:
     *  - parse: A function used to parse the resource payload. By default JSON.parse.
     *  - offset: Skip this number of results.
     *  - limit: Limit the length of the result (default: 10).
     *  - assume: Return resources of the assume identity instead.
     *  - reason: Gives an annotative reason to list these resources
     * @return(p) On success the promise will be resolved with a list of all resources accessible to the identity.
     * On error the promise will be rejected with an {@link Error}
     */
    list<T>(options?: {
        parse?: ((u: Uint8Array) => T);
        offset?: number;
        limit?: number;
        assume?: string;
        reason?: string;
    }): Promise<Resource<T>[]>;
    /**
     * Get a resource thanks its identifier.
     * @param id The identifier of the resource to get.
     * @param options A collection of options:
     *  - assume: Assume this identity to access the resource.
     *  - parse: A function used to parse the resource payload. By default JSON.parse.
     *  - reason: Gives an annotative reason to get this resources
     * @return(p) On success the promise will be resolved with the resource.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `ResourceNotFound` if the resource does not exists.
     */
    get<T>(id: ID, options?: {
        assume?: string;
        parse?: ((u: Uint8Array) => T);
        reason?: string;
    }): Promise<Resource<T>>;
    /**
     * Get the resource associated with the tuple <identityLogin, resourceName>.
     * @param login The login of the identity involved in the association
     * @param resourceName The resource name involved in the association
     * @return(p) On success the promise will be resolved with resource associated with the tuple <identityLogin, resourceName>. On error the promise will be rejected with an {@link Error} with kind:
     * - `DataPeps.ServerError.IdentityNotFound` if the identity cannot be assumed or if the identity does not exist.
     * - `DataPeps.ServerError.NamedResourceNotFound` if the NamedResource does not exist.
     */
    getNamed<T>(login: string, resourceName: string, options?: {
        parse?: ((u: Uint8Array) => T);
    }): Promise<Resource<T>>;
    /**
     * Save a one-to-one association between the key <login, resourceName> and a resourceID.
     * @param login The login of the identity involved in the association
     * @param resourceName The desired resource name involved in the association
     * @param resourceID The ID of the resource involved in the association
     * @return(p) On success the promise will be resolved with void. On error the promise will be rejected with an {@link Error} with kind:
     * - `DataPeps.ServerError.IdentityNotFound` if the identity cannot be assumed or if the identity does not exist.
     * - `DataPeps.ServerError.ResourceNotFound` if the resource does not exist.
     */
    setNamed(login: string, resourceName: string, resourceID: ID): Promise<void>;
    /**
     * Soft-delete a resource thanks its identifier. It deletes only the copy.
     * @param id The identifier of the resource to delete.
     * @param options A collection of options:
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `ResourceNotFound` if the resource does not exists.
     */
    unlink(id: ID, options?: {
        assume?: string;
    }): Promise<void>;
    /**
     * Hard-delete a resource thanks its identifier. It deletes the resource for all identities in its sharingGroup.
     * @param id The identifier of the resource to delete.
     * @param options A collection of options:
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `ResourceNotFound` if the resource does not exists.
     */
    delete(id: ID, options?: {
        assume?: string;
    }): Promise<void>;
    /**
     * Extends the sharing group of a resource.
     * @param id The identifier of the resource to extend the sharing group.
     * @param sharingGroup The set of identities to add on the sharing of the resource.
     * @param options
     *  - assume: Assume this identity to extend the sharing group.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `ResourceNotFound` if the resource does not exists.
     */
    extendSharingGroup(id: ID, sharingGroup: string[], options?: {
        assume?: string;
    }): Promise<void>;
    /**
     * Get the latests access logs of resources.
     * @param options A collection of options:
     *  - resourceIds: Filter logs for only resource ids set.
     *  - offset: Skip this number of results.
     *  - limit: Limit the length of the result (default: 10).
     *  - assume: Return logs of the assume identity instead.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error}.
     */
    getAccessLogs(options?: {
        resourceIDs?: ID[];
        offset?: number;
        limit?: number;
        assume?: string;
    }): Promise<ResourceAccessLog[]>;
    /**
     * Get the sharing group of a resource. The sharing group of a resource is the set of identities that can
     * access to this resource.
     * @param id The identifier of the identity to get the sharing group.
     * @return(p) On success the promise will be resolved with a list of links that describe accesses to the resource.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `ResourceNotFound` if the resource does not exists.
     */
    getSharingGroup(id: ID, options?: {
        assume?: string;
    }): Promise<ResourceShareLink[]>;
}
