import * as nacl from "tweetnacl";
import { api } from "./proto";
import {
  ID,
  IdentityPublicKey,
  ResourceAPI,
  IdentityAccessKind,
  IdentityPublicKeyID,
  Error,
  SDKError,
  ResourceShareLink,
  ResourceAccessLog
} from "./DataPeps";
import { EncryptFuncs } from "./CryptoFuncs";
import { SessionImpl } from "./Session";
import { Uint8Tool } from "./Tools";

export enum ResourceType {
  ANONYMOUS = 0
}

export class Resource<T> {
  id: ID;
  kind: string;
  type: ResourceType;
  payload: T;
  creator: IdentityPublicKey;
  private keypair: nacl.BoxKeyPair;
  constructor(
    id: ID,
    kind: string,
    payload: T,
    keypair: nacl.BoxKeyPair,
    creator: IdentityPublicKey,
    type = ResourceType.ANONYMOUS
  ) {
    this.id = id;
    this.kind = kind;
    this.payload = payload;
    this.keypair = keypair;
    this.creator = creator;
    this.type = type;
  }

  publicKey(): Uint8Array {
    return this.keypair.publicKey;
  }

  encrypt(content: Uint8Array): Uint8Array {
    let nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    let cipher = nacl.secretbox(content, nonce, this.keypair.secretKey);
    return Uint8Tool.concat(nonce, cipher);
  }

  decrypt(message: Uint8Array) {
    let nonce = message.slice(0, nacl.secretbox.nonceLength);
    let cipher = message.slice(nacl.secretbox.nonceLength);
    let text = nacl.secretbox.open(cipher, nonce, this.keypair.secretKey);
    if (text == null) {
      throw new Error({
        kind: SDKError.DecryptFail,
        payload: { resource: this.id }
      });
    }
    return text;
  }
}

export class ResourceImpl implements ResourceAPI {
  private session: SessionImpl;

  constructor(session: SessionImpl) {
    this.session = session;
  }

  async _createBodyRequest<T>(
    payload: T,
    sharingGroup: string[],
    crypto: EncryptFuncs,
    options?: {
      serialize?: ((payload: T) => Uint8Array);
    }
  ) {
    options = options != null ? options : {};
    let serialize =
      options.serialize != null
        ? options.serialize
        : p => new TextEncoder().encode(JSON.stringify(p));
    let keypair = nacl.box.keyPair();
    let encryptedSharingGroup = await this.encryptForSharingGroup(
      keypair.secretKey,
      sharingGroup,
      crypto
    );
    let { message, nonce } = crypto.encrypt(
      keypair.publicKey,
      serialize(payload)
    );
    return {
      keypair,
      body: {
        payload: message,
        nonce,
        publicKey: keypair.publicKey,
        sharingGroup: encryptedSharingGroup
      }
    };
  }

  async create<T>(
    kind: string,
    payload: T,
    sharingGroup: string[],
    options?: {
      serialize?: ((payload: T) => Uint8Array);
    }
  ): Promise<Resource<T>> {
    options = options == null ? {} : options;
    // keys and payload are always encrypted with SES
    let encryptFunc = this.session.encryption.encrypt(api.ResourceType.SES);
    // resource only support ANONYMOUS for now (i.e. the data encrypted by the resource)
    let type = api.ResourceType.ANONYMOUS;
    let creator = this.session.getSessionPublicKey();
    let { body, keypair } = await this._createBodyRequest(
      payload,
      sharingGroup,
      encryptFunc,
      options
    );
    let { id } = await this.session.doProtoRequest({
      method: "POST",
      code: 201,
      path: "/api/v4/resources",
      request: () =>
        api.ResourcePostRequest.encode({
          ...body,
          type,
          kind
        }).finish(),
      response: api.ResourcePostResponse.decode
    });
    return new Resource(id, kind, payload, keypair, creator);
  }

  async list<T>(options?: {
    parse?: ((u: Uint8Array) => T);
    offset?: number;
    limit?: number;
    assume?: string;
    reason?: string;
  }) {
    options = options != null ? options : {};
    let assume = options.assume != null ? options.assume : this.session.login;
    let params =
      options.reason != null
        ? { ...options, access_reason: options.reason }
        : options;
    return await this.session
      .doProtoRequest({
        method: "GET",
        code: 200,
        path: "/api/v4/resources",
        assume: { login: assume, kind: IdentityAccessKind.READ },
        params,
        response: r =>
          api.ResourceListResponse.decode(r).resources as api.IResourceWithKey[]
      })
      .then(resources =>
        makeResourcesFromResponses<T>(resources, this.session, options.parse)
      );
  }

  async get<T>(
    id: ID,
    options?: {
      assume?: string;
      parse?: ((u: Uint8Array) => T);
      reason?: string;
    }
  ): Promise<Resource<T>> {
    options = options != null ? options : {};
    let assume = options.assume != null ? options.assume : this.session.login;
    let params =
      options.reason != null ? { access_reason: options.reason } : undefined;
    let response = await this.session.doProtoRequest({
      method: "GET",
      code: 200,
      path: "/api/v4/resource/" + id,
      assume: { login: assume, kind: IdentityAccessKind.READ },
      params,
      response: r => api.ResourceGetResponse.decode(r)
    });
    return makeResourceFromResponse<T>(
      response,
      api.ResourceType.SES,
      this.session,
      options.parse,
      assume
    );
  }

  async delete(
    id: ID,
    options?: {
      soft?: boolean;
      assume?: string;
    }
  ): Promise<void> {
    options = options != null ? options : {};
    let soft = options.soft != null ? options.soft : false;
    let assume = options.assume != null ? options.assume : this.session.login;
    return await this.session.doProtoRequest<void>({
      method: "DELETE",
      code: 200,
      path: "/api/v4/resource/" + id,
      assume: { login: assume, kind: IdentityAccessKind.WRITE },
      params: { soft }
    });
  }

  async extendSharingGroup(
    id: ID,
    sharingGroup: string[],
    options?: {
      assume?: string;
    }
  ): Promise<void> {
    options = options != null ? options : {};
    let assume = options.assume != null ? options.assume : this.session.login;
    let { encryptedKey, type } = await this.session.doProtoRequest({
      method: "GET",
      code: 200,
      path: "/api/v4/resource/" + id + "/key",
      response: api.ResourceGetKeyResponse.decode
    });
    let { key } = await this.session.getAssumeParams({
      login: assume,
      kind: IdentityAccessKind.READ
    });
    let secretKey = await this.session.decryptCipherList(
      api.ResourceType.SES,
      encryptedKey,
      key.boxKey
    );
    let encryptFunc = this.session.encryption.encrypt(api.ResourceType.SES);
    let encryptedSharingGroup = await this.encryptForSharingGroup(
      secretKey,
      sharingGroup,
      encryptFunc
    );
    return await this.session.doProtoRequest<void>({
      method: "PATCH",
      code: 201,
      path: "/api/v4/resource/" + id + "/sharingGroup",
      assume: { login: assume, kind: IdentityAccessKind.WRITE },
      request: () =>
        api.ResourceExtendSharingGroupRequest.encode({
          sharingGroup: encryptedSharingGroup
        }).finish()
    });
  }

  async getSharingGroup(
    id: ID,
    options?: {
      assume?: string;
    }
  ): Promise<ResourceShareLink[]> {
    options = options != null ? options : {};
    let assume = options.assume != null ? options.assume : this.session.login;
    return await this.session.doProtoRequest({
      method: "GET",
      code: 200,
      path: "/api/v4/resource/" + id + "/sharingGroup",
      assume: { login: assume, kind: IdentityAccessKind.READ },
      response: r =>
        api.ResourceGetSharingGroupResponse.decode(r)
          .sharingGroup as ResourceShareLink[]
    });
  }

  private async encryptForSharingGroup(
    text: Uint8Array,
    sharingGroup: string[],
    crypto: EncryptFuncs
  ) {
    let publicKeys = await this.session.getLatestPublicKeys(sharingGroup);
    return publicKeys.map(({ login, version, box, sign }) => {
      let { message, nonce } = crypto.encrypt(box, text);
      return {
        login,
        version,
        nonce,
        encryptedKey: message
      };
    });
  }

  async getAccessLogs(options?: {
    resourceIDs?: ID[];
    offset?: number;
    limit?: number;
    assume?: string;
  }): Promise<ResourceAccessLog[]> {
    options = options != null ? options : {};
    let assume = options.assume != null ? options.assume : this.session.login;
    let { logs } = await this.session.doProtoRequest({
      method: "POST",
      code: 200,
      path: "/api/v4/resources/accessLogs",
      request: () => api.ResourceGetAccessLogsRequest.encode(options).finish(),
      response: api.ResourceGetAccessLogsResponse.decode,
      assume: {
        login: assume,
        kind: IdentityAccessKind.READ
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
}

export async function makeResourceFromResponse<T>(
  { resource, encryptedKey, creator }: api.IResourceGetResponse,
  typeOfKey: api.ResourceType,
  session: SessionImpl,
  parse?,
  assume?
) {
  assume = assume != null ? assume : session.login;
  let { key } = await session.getAssumeParams({
    login: assume,
    kind: IdentityAccessKind.READ
  });
  let secretKeyCipher = encryptedKey.pop();
  let accessKey = await session.decryptCipherList(
    api.ResourceType.SES,
    encryptedKey,
    key.boxKey
  );
  return await makeResource<T>(
    { resource, encryptedKey: secretKeyCipher, creator: creator },
    typeOfKey,
    session,
    accessKey,
    parse
  );
}

async function makeResource<T>(
  { resource, encryptedKey, creator }: api.IResourceWithKey,
  typeOfKey: api.ResourceType,
  session: SessionImpl,
  boxKey?: Uint8Array,
  parse?
) {
  let secretKey = await session.decryptCipherList(
    typeOfKey,
    [encryptedKey],
    boxKey
  );
  let keypair = nacl.box.keyPair.fromSecretKey(secretKey);

  parse = parse != null ? parse : u => JSON.parse(new TextDecoder().decode(u));
  let payload =
    resource.payload.length == 0
      ? null
      : parse(
          await session.decryptCipherList(
            api.ResourceType.SES,
            [
              {
                message: resource.payload,
                nonce: resource.nonce,
                sign: creator
              }
            ],
            keypair.secretKey
          )
        );
  let rcreator = await session.getPublicKey(creator as IdentityPublicKeyID);
  return new Resource<T>(
    resource.id,
    resource.kind,
    payload,
    keypair,
    rcreator
  );
}

async function makeResourcesFromResponses<T>(
  resources: api.IResourceWithKey[],
  session: SessionImpl,
  parse?
) {
  let owners: api.IIdentityKeyID[] = [];
  resources.forEach(resource => {
    if (resource.owner != undefined) {
      if (
        owners.find(
          id =>
            id.login == resource.owner.login &&
            id.version == resource.owner.version
        ) == undefined
      ) {
        owners.push(resource.owner);
      }
    } else {
      throw new Error({
        kind: SDKError.SDKInternalError,
        payload: {
          message: "Missing owner field",
          resource: resource.resource.id
        }
      });
    }
  });
  let ownersKeys: api.IDelegatedKeys[] = [];
  for (let i = 0; i < owners.length; i++) {
    let owner = owners[i];
    if (owner.login != undefined && owner.version != undefined) {
      let keys = await session.fetchKeys(owner.login, owner.version);
      ownersKeys.push(keys);
    }
  }
  let resolvedResources: Resource<T>[] = [];
  for (let i = 0; i < resources.length; i++) {
    let resource = resources[i];
    let keys: api.IDelegatedKeys;
    for (let j = 0; j < owners.length; j++) {
      if (
        resource.owner.login == owners[j].login &&
        resource.owner.version == owners[j].version
      ) {
        keys = ownersKeys[j];
      }
    }
    resolvedResources.push(
      await makeResource<T>(
        resource,
        api.ResourceType.SES,
        session,
        keys != undefined ? keys.boxKey : undefined,
        parse
      )
    );
  }
  return resolvedResources;
}
