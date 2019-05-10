import { api } from "./proto";
import {
  ResourceBox,
  makeResourcesFromResponses,
  makeResourceFromResponse,
  encryptForSharingGroup,
  createBodyRequest
} from "./ResourceInternal";
import { IdentityPublicKey, IdentityPublicKeyID } from "./IdentityAPI";
import { Session } from "./Session";
import { ID } from "./ID";
import { CipherType } from "./Cryptor";
import { SessionState } from "./SessionInternal";

export enum ResourceType {
  ANONYMOUS = 0
}

/**
 * A DataPeps Resource is a sharable object that handles the basic function encrypt/decrypt.
 */
export interface Resource<T> {
  // The identitifer of the resource.
  id: ID;

  // A hint of the kind of the resource.
  kind: string;

  // The type of cryptographic scheme used by the resource.
  type: ResourceType;

  // A custom payload to describes the resource.
  payload: T;

  // The IdentityPublicKey of the creator of the resource.
  creator: IdentityPublicKey;

  // Returns the public key of the resource.
  publicKey(): Uint8Array;

  // Encrypts a clear text to a cipher text that could be decrypted by the decrypt function of the resource.
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

export class ResourceAPI {
  private api: SessionState;
  constructor(session: Session) {
    this.api = SessionState.create(session);
  }

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
  async create<T>(
    kind: string,
    payload: T,
    sharingGroup: string[],
    options?: { serialize?: ((payload: T) => Uint8Array) }
  ): Promise<Resource<T>> {
    options = options == null ? {} : options;
    // keys and payload are always encrypted with SES
    // TODO(K1): safe
    let encryptFunc = this.api.keySet.root.encryptor(CipherType.NACL_SES);
    // resource only support ANONYMOUS for now (i.e. the data encrypted by the resource)
    let type = api.ResourceType.ANONYMOUS;
    let creator = this.api.keySet.getCurrentPublicKey();
    let { body, keypair } = await createBodyRequest(
      payload,
      sharingGroup,
      encryptFunc,
      this.api.publicKeys,
      options
    );
    let { id } = await this.api.client.doProtoRequest({
      method: "POST",
      expectedCode: 201,
      path: "/api/v1/resources",
      body: api.ResourcePostRequest.encode({
        ...body,
        type,
        kind
      }).finish(),
      response: api.ResourcePostResponse.decode
    });
    return new ResourceBox(id, kind, payload, keypair, creator);
  }

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
  async list<T>(options?: {
    parse?: ((u: Uint8Array) => T);
    offset?: number;
    limit?: number;
    assume?: string;
    reason?: string;
  }): Promise<Resource<T>[]> {
    options = options != null ? options : {};
    let assume = options.assume != null ? options.assume : this.api.login;
    let parse = options.parse;
    let params =
      options.reason != null
        ? { ...options, access_reason: options.reason }
        : options;
    delete params.parse;
    return await this.api.client
      .doProtoRequest({
        method: "GET",
        expectedCode: 200,
        path: "/api/v1/resources",
        assume: { login: assume, kind: api.IdentityAccessKeyKind.READ },
        params,
        response: r => api.ResourceListResponse.decode(r).resources
      })
      .then(resources =>
        makeResourcesFromResponses<T>(
          resources,
          this.api.keySet,
          this.api.publicKeys,
          parse
        )
      );
  }

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
  async get<T>(
    id: ID,
    options?: {
      assume?: string;
      parse?: ((u: Uint8Array) => T);
      reason?: string;
    }
  ): Promise<Resource<T>> {
    options = options != null ? options : {};
    let assume = options.assume != null ? options.assume : this.api.login;
    let params =
      options.reason != null ? { access_reason: options.reason } : undefined;
    let response = await this.api.client.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: "/api/v1/resource/" + id,
      assume: { login: assume, kind: api.IdentityAccessKeyKind.READ },
      params,
      response: r => api.ResourceGetResponse.decode(r)
    });
    return makeResourceFromResponse<T>(
      response,
      CipherType.NACL_SES,
      this.api.publicKeys,
      this.api.keySet,
      options.parse
    );
  }

  /**
   * Get the resource associated with the tuple <identityLogin, resourceName>.
   * @param login The login of the identity involved in the association
   * @param resourceName The resource name involved in the association
   * @return(p) On success the promise will be resolved with resource associated with the tuple <identityLogin, resourceName>. On error the promise will be rejected with an {@link Error} with kind:
   * - `DataPeps.ServerError.IdentityNotFound` if the identity cannot be assumed or if the identity does not exist.
   * - `DataPeps.ServerError.NamedResourceNotFound` if the NamedResource does not exist.
   */
  async getNamed<T>(
    login: string,
    resourceName: string,
    options?: {
      parse?: ((u: Uint8Array) => T);
    }
  ): Promise<Resource<T>> {
    options = options != null ? options : {};
    let assume = { login, kind: api.IdentityAccessKeyKind.READ };
    let resp = await this.api.client.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path:
        "/api/v1/identity/" +
        encodeURIComponent(login) +
        "/resource/" +
        encodeURIComponent(resourceName),
      assume,
      response: r => api.IdentityGetNamedResourceResponse.decode(r)
    });
    return makeResourceFromResponse<T>(
      resp.resource,
      CipherType.NACL_SES,
      this.api.publicKeys,
      this.api.keySet,
      options.parse
    );
  }

  /**
   * Save a one-to-one association between the key <login, resourceName> and a resourceID.
   * @param login The login of the identity involved in the association
   * @param resourceName The desired resource name involved in the association
   * @param resourceID The ID of the resource involved in the association
   * @return(p) On success the promise will be resolved with void. On error the promise will be rejected with an {@link Error} with kind:
   * - `DataPeps.ServerError.IdentityNotFound` if the identity cannot be assumed or if the identity does not exist.
   * - `DataPeps.ServerError.ResourceNotFound` if the resource does not exist.
   */
  async setNamed(
    login: string,
    resourceName: string,
    resourceID: ID
  ): Promise<void> {
    let assume = { login, kind: api.IdentityAccessKeyKind.WRITE };
    let res = await this.api.client.doProtoRequest<void>({
      method: "PUT",
      expectedCode: 200,
      assume,
      path: `/api/v1/identity/${encodeURI(login)}/resource/${encodeURIComponent(
        resourceName
      )}`,
      body: api.IdentitySetNamedResourceRequest.encode({
        resourceID
      }).finish()
    });
    return res;
  }

  /**
   * Soft-delete a resource thanks its identifier. It deletes only the copy.
   * @param id The identifier of the resource to delete.
   * @param options A collection of options:
   * @return(p) On success the promise will be resolved with void.
   * On error the promise will be rejected with an {@link Error} with kind:
   * - `ResourceNotFound` if the resource does not exists.
   */
  async unlink(id: ID, options?: { assume?: string }): Promise<void> {
    options = options != null ? options : {};
    let assume = options.assume != null ? options.assume : this.api.login;
    return await this.api.client.doProtoRequest<void>({
      method: "DELETE",
      expectedCode: 200,
      path: "/api/v1/resource/" + id,
      assume: { login: assume, kind: api.IdentityAccessKeyKind.WRITE },
      params: { soft: true }
    });
  }

  /**
   * Hard-delete a resource thanks its identifier. It deletes the resource for all identities in its sharingGroup.
   * @param id The identifier of the resource to delete.
   * @param options A collection of options:
   * @return(p) On success the promise will be resolved with void.
   * On error the promise will be rejected with an {@link Error} with kind:
   * - `ResourceNotFound` if the resource does not exists.
   */
  async delete(id: ID, options?: { assume?: string }): Promise<void> {
    options = options != null ? options : {};
    let assume = options.assume != null ? options.assume : this.api.login;
    return await this.api.client.doProtoRequest<void>({
      method: "DELETE",
      expectedCode: 200,
      path: "/api/v1/resource/" + id,
      assume: { login: assume, kind: api.IdentityAccessKeyKind.WRITE },
      params: { soft: false }
    });
  }

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
  async extendSharingGroup(
    id: ID,
    sharingGroup: string[],
    options: { assume?: string } = { assume: this.api.login }
  ): Promise<void> {
    options = options != null ? options : {};
    let { encryptedKey, owner } = await this.api.client.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: "/api/v1/resource/" + id + "/key",
      response: api.ResourceGetKeyResponse.decode
    });
    let keySet = await this.api.keySet.get(owner.login, owner.version);
    let secretKey = keySet
      .decryptor(CipherType.NACL_SES)
      .decryptList(await this.api.publicKeys.resolveCipherList([encryptedKey]));
    let encryptFunc = this.api.keySet.root.encryptor(CipherType.NACL_SES);
    let encryptedSharingGroup = await encryptForSharingGroup(
      secretKey,
      sharingGroup,
      encryptFunc,
      this.api.publicKeys
    );
    return await this.api.client.doProtoRequest<void>({
      method: "PATCH",
      expectedCode: 201,
      path: "/api/v1/resource/" + id + "/sharingGroup",
      assume: { login: options.assume, kind: api.IdentityAccessKeyKind.WRITE },
      body: api.ResourceExtendSharingGroupRequest.encode({
        sharingGroup: encryptedSharingGroup
      }).finish()
    });
  }

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
  async getAccessLogs(options?: {
    resourceIDs?: ID[];
    offset?: number;
    limit?: number;
    assume?: string;
  }): Promise<ResourceAccessLog[]> {
    options = options != null ? options : {};
    let assume = options.assume != null ? options.assume : this.api.login;
    let { logs } = await this.api.client.doProtoRequest({
      method: "POST",
      expectedCode: 200,
      path: "/api/v1/resources/accessLogs",
      body: api.ResourceGetAccessLogsRequest.encode(options).finish(),
      response: api.ResourceGetAccessLogsResponse.decode,
      assume: {
        login: assume,
        kind: api.IdentityAccessKeyKind.READ
      }
    });
    return logs.map(
      log =>
        ({
          ...log,
          timestamp: new Date((log.timestamp as number) / 1000000)
        } as ResourceAccessLog)
    );
  }

  /**
   * Get the sharing group of a resource. The sharing group of a resource is the set of identities that can
   * access to this resource.
   * @param id The identifier of the identity to get the sharing group.
   * @return(p) On success the promise will be resolved with a list of links that describe accesses to the resource.
   * On error the promise will be rejected with an {@link Error} with kind
   * - `ResourceNotFound` if the resource does not exists.
   */
  async getSharingGroup(
    id: ID,
    options?: { assume?: string }
  ): Promise<ResourceShareLink[]> {
    options = options != null ? options : {};
    let assume = options.assume != null ? options.assume : this.api.login;
    return await this.api.client.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: "/api/v1/resource/" + id + "/sharingGroup",
      assume: { login: assume, kind: api.IdentityAccessKeyKind.READ },
      response: r =>
        api.ResourceGetSharingGroupResponse.decode(r)
          .sharingGroup as ResourceShareLink[]
    });
  }
}
