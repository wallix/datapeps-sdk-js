import * as nacl from 'tweetnacl';
import { types } from './proto';
import { ID, IdentityPublicKey, ResourceAPI, IdentityAccessKind, IdentityPublicKeyID } from './DataPeps';
import { EncryptFuncs } from './CryptoFuncs';
import { SessionImpl } from './Session';
import { Uint8Tool } from './Tools';

export enum ResourceType {
    ANONYMOUS = 0,
}

export class Resource<T> {
    id: ID
    kind: string
    type: ResourceType
    payload: T
    creator: IdentityPublicKey
    private keypair: nacl.BoxKeyPair
    constructor(
        id: ID,
        kind: string,
        payload: T,
        keypair: nacl.BoxKeyPair,
        creator: IdentityPublicKey,
        type = ResourceType.ANONYMOUS
    ) {
        this.id = id
        this.kind = kind
        this.payload = payload
        this.keypair = keypair
        this.creator = creator
        this.type = type
    }

    publicKey(): Uint8Array {
        return this.keypair.publicKey
    }

    encrypt(content: Uint8Array): Uint8Array {
        let nonce = nacl.randomBytes(nacl.secretbox.nonceLength)
        let cipher = nacl.secretbox(content, nonce, this.keypair.secretKey)
        return Uint8Tool.concat(nonce, cipher)
    }

    decrypt(message: Uint8Array) {
        let nonce = message.slice(0, nacl.secretbox.nonceLength)
        let cipher = message.slice(nacl.secretbox.nonceLength)
        return nacl.secretbox.open(cipher, nonce, this.keypair.secretKey)
    }
}

export class ResourceImpl implements ResourceAPI {
    private session: SessionImpl

    constructor(session: SessionImpl) {
        this.session = session
    }

    async _createBodyRequest<T>(payload: T, sharingGroup: string[], crypto: EncryptFuncs, options?: {
        serialize?: ((payload: T) => Uint8Array)
    }) {
        options = options != null ? options : {}
        let serialize = options.serialize != null ? options.serialize :
            p => new TextEncoder().encode(JSON.stringify(p))
        let keypair = nacl.box.keyPair()
        let encryptedSharingGroup = await this.encryptForSharingGroup(keypair.secretKey, sharingGroup, crypto)
        let { message, nonce } = crypto.encrypt(keypair.publicKey, serialize(payload))
        return {
            keypair,
            body: {
                payload: message, nonce,
                publicKey: keypair.publicKey,
                sharingGroup: encryptedSharingGroup,
            }
        }
    }

    async create<T>(kind: string, payload: T, sharingGroup: string[], options?: {
        serialize?: ((payload: T) => Uint8Array),
        type?: types.ResourceType
    }): Promise<Resource<T>> {
        options = options == null ? {} : options
        let type = options.type == null ? types.ResourceType.SES : options.type
        let encryptFunc = this.session.encryption.encrypt(type)
        let creator = this.session.getSessionPublicKey()
        let { body, keypair } = await this._createBodyRequest(payload, sharingGroup, encryptFunc, options)
        let { id } = await this.session.doProtoRequest({
            method: "POST", code: 201,
            path: "/api/v4/resources",
            request: () => types.ResourcePostRequest.encode({
                ...body, type, kind,
            }).finish(),
            response: types.ResourcePostResponse.decode
        })
        return new Resource(id, kind, payload, keypair, creator)
    }

    async get<T>(id: ID, options?: {
        assume?: string,
        parse?: ((u: Uint8Array) => T)
    }): Promise<Resource<T>> {
        options = options != null ? options : {}
        let assume = options.assume != null ? options.assume : this.session.login
        let response = await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/resource/" + id,
            assume: { login: assume, kind: IdentityAccessKind.READ },
            response: r => types.ResourceGetResponse.decode(r),
        })
        return this._makeResourceFromResponse(response, options.parse, assume)
    }

    async _makeResourceFromResponse({ resource, encryptedKey, creator }: types.IResourceGetResponse, parse?, assume?) {
        parse = parse != null ? parse : u => JSON.parse(new TextDecoder().decode(u))
        assume = assume != null ? assume : this.session.login
        let { key } = await this.session.getAssumeParams({ login: assume, kind: IdentityAccessKind.READ })
        let resourceCipher = encryptedKey.pop()
        let accessKey = await this.session.decryptCipherList(types.ResourceType.SES, encryptedKey, key.boxKey)
        let secretKey = await this.session.decryptCipherList(resource.type, [resourceCipher], accessKey)
        let keypair = nacl.box.keyPair.fromSecretKey(secretKey)
        let payload = resource.payload.length == 0 ? null : parse(await this.session.decryptCipherList(resource.type, [{
            message: resource.payload,
            nonce: resource.nonce,
            sign: creator
        }], keypair.secretKey))
        let rcreator = await this.session.getPublicKey(creator as IdentityPublicKeyID)
        return new Resource(resource.id, resource.kind, payload, keypair, rcreator)
    }

    async delete(id: ID, options?: {
        soft?: boolean,
        assume?: string
    }): Promise<void> {
        options = options != null ? options : {}
        let soft = options.soft != null ? options.soft : false
        let assume = options.assume != null ? options.assume : this.session.login
        return await this.session.doProtoRequest<void>({
            method: "DELETE", code: 200,
            path: "/api/v4/resource/" + id,
            assume: { login: assume, kind: IdentityAccessKind.WRITE },
            params: { soft },
        })
    }

    async extendSharingGroup(id: ID, sharingGroup: string[], options?: {
        assume?: string
    }): Promise<void> {
        options = options != null ? options : {}
        let assume = options.assume != null ? options.assume : this.session.login
        let { encryptedKey, type } = await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/resource/" + id + "/key",
            response: types.ResourceGetKeyResponse.decode,
        })
        let secretKey = await this.session.decryptCipherList(type, encryptedKey)
        let encryptFunc = this.session.encryption.encrypt(type)
        let encryptedSharingGroup = await this.encryptForSharingGroup(secretKey, sharingGroup, encryptFunc)
        return await this.session.doProtoRequest<void>({
            method: "PATCH", code: 201,
            path: "/api/v4/resource/" + id + "/sharingGroup",
            request: () => types.ResourceExtendSharingGroupRequest.encode({
                sharingGroup: encryptedSharingGroup
            }).finish()
        })
    }

    private async encryptForSharingGroup(text: Uint8Array, sharingGroup: string[], crypto: EncryptFuncs) {
        let publicKeys = await this.session.getLatestPublicKeys(sharingGroup)
        return publicKeys.map(({ login, version, box, sign }) => {
            let { message, nonce } = crypto.encrypt(box, text)
            return {
                login, version, nonce,
                encryptedKey: message
            }
        })
    }

}