import * as nacl from "tweetnacl";
import { Resource, ResourceType } from "./ResourceAPI";
import { Uint8Tool, Base64 } from "./Tools";
import { SDKKind, Error } from "./Error";
import { api } from "./proto";
import { Encryption, EncryptFuncs } from "./CryptoFuncs";
import {
  IdentityPublicKey,
  IdentityAccessKind,
  IdentityPublicKeyID
} from "./IdentityAPI";
import { Session } from "./Session";
import { ID } from "./ID";

export class ResourceBox<T> implements Resource<T> {
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

  encrypt<T extends Uint8Array | string>(content: T): T {
    if (content instanceof Uint8Array) {
      return this.encryptUint8Array(content) as T;
    }
    return this.encryptString(content as string) as T;
  }

  private encryptUint8Array(content: Uint8Array): Uint8Array {
    let nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    let cipher = nacl.secretbox(content, nonce, this.keypair.secretKey);
    return Uint8Tool.concat(nonce, cipher);
  }

  private encryptString(clear: string): string {
    let uClear = Uint8Tool.encode(clear);
    let uEncrypted = this.encryptUint8Array(uClear);
    return Base64.encode(uEncrypted);
  }

  decrypt<T extends Uint8Array | string>(message: T): T {
    if (message instanceof Uint8Array) {
      return this.decryptUint8Array(message) as T;
    }
    return this.decryptString(message as string) as T;
  }

  private decryptUint8Array(message: Uint8Array): Uint8Array {
    let nonce = message.slice(0, nacl.secretbox.nonceLength);
    let cipher = message.slice(nacl.secretbox.nonceLength);
    let text = nacl.secretbox.open(cipher, nonce, this.keypair.secretKey);
    if (text == null) {
      throw new Error({
        kind: SDKKind.DecryptFail,
        payload: { resource: this.id }
      });
    }
    return text;
  }

  private decryptString(cipher: string): string {
    let uEncrypted = Base64.decode(cipher);
    let clear = this.decryptUint8Array(uEncrypted);
    return Uint8Tool.decode(clear);
  }
}

export function createWithEncryption<T>(
  kind: string,
  payload: T,
  encryption: Encryption,
  options?: { serialize?: ((payload: T) => Uint8Array) }
): {
  resourceRequestBody: api.IResourcePostRequest;
  resource: ResourceBox<T>;
} {
  options = options == null ? {} : options;
  let serialize =
    options.serialize != null
      ? options.serialize
      : p => Uint8Tool.encode(JSON.stringify(p));
  let encryptionPK: IdentityPublicKey = {
    login: null,
    version: null,
    sign: encryption.signEncrypted.publicKey,
    box: encryption.boxEncrypted.publicKey
  };
  let keyPair = nacl.box.keyPair();
  let cryptoSES = encryption.encrypt(api.ResourceType.SES);
  let sharer: api.IResourceShareEntry = {};
  let sharerSKEncrypted = cryptoSES.encrypt(
    encryptionPK.box,
    keyPair.secretKey
  );
  sharer.nonce = sharerSKEncrypted.nonce;
  sharer.encryptedKey = sharerSKEncrypted.message;
  let payloadEncrypted = cryptoSES.encrypt(
    keyPair.publicKey,
    serialize(payload)
  );
  let body: api.IResourcePostRequest = {
    kind,
    type: api.ResourceType.ANONYMOUS,
    payload: payloadEncrypted.message,
    nonce: payloadEncrypted.nonce,
    publicKey: keyPair.publicKey,
    sharingGroup: [sharer]
  };
  let resource = new ResourceBox(
    null,
    body.kind,
    payload,
    keyPair,
    encryptionPK
  );
  return { resourceRequestBody: body, resource };
}

export async function makeResourceFromResponse<T>(
  { resource, encryptedKey, creator }: api.IResourceGetResponse,
  typeOfKey: api.ResourceType,
  session: Session,
  parse?,
  assume?: string
) {
  assume = assume != null ? assume : session.login;
  // TODO(K1): as any
  let { key } = await (session as any).getAssumeParams({
    login: assume,
    kind: IdentityAccessKind.READ
  });
  let secretKeyCipher = encryptedKey.pop();
  // TODO(K1): as any
  let accessKey = await (session as any).decryptCipherList(
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

export async function makeResource<T>(
  { resource, encryptedKey, creator }: api.IResourceWithKey,
  typeOfKey: api.ResourceType,
  session: Session,
  boxKey?: Uint8Array,
  parse?
) {
  // TODO(K1): as any
  let secretKey = await (session as any).decryptCipherList(
    typeOfKey,
    [encryptedKey],
    boxKey
  );
  let keypair = nacl.box.keyPair.fromSecretKey(secretKey);

  parse = parse != null ? parse : u => JSON.parse(Uint8Tool.decode(u));
  let payload =
    resource.payload.length == 0
      ? null
      : parse(
          await (session as any).decryptCipherList(
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
  return new ResourceBox<T>(
    resource.id,
    resource.kind,
    payload,
    keypair,
    rcreator
  );
}

export async function makeResourcesFromResponses<T>(
  resources: api.IResourceWithKey[],
  session: Session,
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
        kind: SDKKind.SDKInternalError,
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
      let keys = await (session as any).fetchKeys(owner.login, owner.version);
      ownersKeys.push(keys);
    }
  }
  let resolvedResources: ResourceBox<T>[] = [];
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

export async function createBodyRequest<T>(
  payload: T,
  sharingGroup: string[],
  crypto: EncryptFuncs,
  session: Session,
  options?: { serialize?: ((payload: T) => Uint8Array) }
) {
  options = options != null ? options : {};
  let serialize =
    options.serialize != null
      ? options.serialize
      : p => Uint8Tool.encode(JSON.stringify(p));
  let keypair = nacl.box.keyPair();
  let encryptedSharingGroup = await encryptForSharingGroup(
    keypair.secretKey,
    sharingGroup,
    crypto,
    session
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

export async function encryptForSharingGroup(
  text: Uint8Array,
  sharingGroup: string[],
  crypto: EncryptFuncs,
  session: Session
) {
  let publicKeys = await session.getLatestPublicKeys(sharingGroup);
  return publicKeys.map(({ login, version, box, sign }) => {
    let { message, nonce } = crypto.encrypt(box, text);
    return { login, version, nonce, encryptedKey: message };
  });
}
