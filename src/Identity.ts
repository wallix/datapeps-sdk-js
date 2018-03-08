import * as nacl from 'tweetnacl';
import { types } from './proto';
import { IdentityAPI, Identity, IdentityPublicKey, IdentityShareLink, IdentityAccessKind, IdentityFields } from './DataPeps';
import { Error, SDKKind } from './Error';
import { Encryption } from './CryptoFuncs';
import { SessionImpl } from './Session';
import { Uint8Tool } from './Tools';

export class IdentityImpl implements IdentityAPI {
    private session: SessionImpl

    constructor(session: SessionImpl) {
        this.session = session
    }

    async get(login: string): Promise<Identity<Uint8Array>> {
        return await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/identity/" + encodeURI(login),
            response: r => IdentityX.fromTypes(types.Identity.decode(r)),
        })
    }

    async create(identity: IdentityFields, options: { secret?: Uint8Array | string, sharingGroup?: string[] }): Promise<void> {
        options = options == null ? {} : options
        let osharingGroup = options.sharingGroup == null ? [] : options.sharingGroup
        let encryption = new Encryption()
        encryption.generate(Uint8Tool.convert(options.secret), this.session.encryption)
        let publicKeys = await this.session.getLatestPublicKeys(osharingGroup)
        let sharingGroup = publicKeys.map(({ login, version, box, sign }) => {
            let kind = types.IdentityShareKind.SHARING
            let { message, nonce } = encryption.encryptKey(kind, this.session.encryption, box)
            return {
                login, version, nonce, kind,
                encryptedKey: message
            }
        })
        let epub = encryption.getPublic()
        return await this.session.doProtoRequest<void>({
            method: "POST", code: 201,
            path: "/api/v4/identity",
            request: () => types.IdentityCreateRequest.encode({
                identity, sharingGroup, encryption,
                signChain: this.session.encryption.sign(Uint8Tool.concat(epub.boxEncrypted.publicKey, epub.signEncrypted.publicKey)),
            }).finish(),
        })
    }

    async update(identity: IdentityFields): Promise<void> {
        return await this.session.doProtoRequest<void>({
            method: "PUT", code: 200,
            path: "/api/v4/identity/" + encodeURI(identity.login),
            request: () => types.IdentityFields.encode(identity).finish(),
        })
    }

    async list(options?: {
        offset?: number,
        limit?: number,
        domain?: string,
        search?: string,
        kind?: string,
    }): Promise<Identity<Uint8Array>[]> {
        return await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/identities/list",
            params: options,
            response: r => {
                let { identities } = types.IdentityListResponse.decode(r)
                return identities.map(IdentityX.fromTypes)
            }
        })
    }

    async getSharingGroup(login: string): Promise<IdentityShareLink[]> {
        return await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGroup",
            response: r => types.IdentityGetSharingGroupResponse.decode(r).sharingGroup as IdentityShareLink[]
        })
    }

    async getAccessGroup(login: string): Promise<IdentityShareLink[]> {
        return await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/accessGroup",
            response: r => types.IdentityGetAccessGroupResponse.decode(r).accessGroup as IdentityShareLink[]
        })
    }

    async renewKeys(login: string, secret?: string | Uint8Array): Promise<void> {
        let kind = types.IdentityShareKind.SHARING
        let assume = { login, kind: IdentityAccessKind.WRITE }
        let { encryption, creator, sharingGroup } = await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/keysToRenew",
            response: types.IdentityGetKeysToRenewResponse.decode,
            assume,
        })
        let { key } = await this.session.getAssumeParams({
            login, kind: IdentityAccessKind.WRITE,
        })
        // Generate a fresh encryption
        let next = new Encryption()
        if (secret == null) {
            next.generateWithMasterPublicKey(encryption.masterPublicKey, encryption.masterSalt, this.session.encryption)
        } else {
            next.generate(Uint8Tool.convert(secret), this.session.encryption)
        }
        next.version = key.version + 1
        let epub = next.getPublic()
        let { message, nonce } = this.session.encryption.encrypt(types.ResourceType.SES).encrypt(epub.boxEncrypted.publicKey, key.sharingKey)
        let backward = { nonce, encryptedKey: message }
        await this.session.doProtoRequest({
            method: "POST", code: 201,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/keysToRenew",
            request: () => types.IdentityPostKeysToRenewRequest.encode({
                encryption: epub, backward,
                signChain: nacl.sign.detached(Uint8Tool.concat(epub.boxEncrypted.publicKey, epub.signEncrypted.publicKey), key.signKey),
                sharingGroup: sharingGroup.map(({ login, version, box, sign }) => {
                    let { message, nonce } = next.encryptKey(kind, this.session.encryption, box)
                    return {
                        login, version, encryptedKey: message, nonce, kind
                    }
                })
            }).finish(),
            assume,
        })
        this.session.clearAssumeParams(login)
    }

    async extendSharingGroup(login: string, sharingGroup: string[]): Promise<void> {
        this.session.clearAssumeParams(login)
        let { key } = await this.session.getAssumeParams({ login, kind: IdentityAccessKind.WRITE })
        let publicKeys = await this.session.getLatestPublicKeys(sharingGroup)
        return await this.session.doProtoRequest<void>({
            method: "PATCH", code: 201,
            path: "/api/v4/identity/" + encodeURI(login) + "/sharingGroup",
            assume: { login, kind: IdentityAccessKind.WRITE },
            request: () => types.IdentityShareRequest.encode({
                version: key.version,
                sharingGroup: publicKeys.map(({ login, version, box, sign }) => {
                    let kind = types.IdentityShareKind.SHARING
                    let { message, nonce } = this.session.encryption.encrypt(types.ResourceType.SES).encrypt(box, key.sharingKey)
                    return {
                        login, version, nonce, kind,
                        encryptedKey: message
                    }
                }),
            }).finish(),
        })
    }

    async replaceSharingGroup(login: string, sharingGroup: string[]): Promise<void> {
        let kind = types.IdentityShareKind.SHARING
        let graph = await this.getSharingGraph(login)
        if (graph[0].login != login) {
            throw new Error({
                kind: SDKKind.SDKInternalError,
                payload: { login, graph, hint: "unexpected graph" }
            })
        }
        // Replace the sharing group of login
        graph[0].sharingGroup = await this.session.getLatestPublicKeys(sharingGroup)
        // Filter only latest identites
        graph = graph.filter(elt => elt.latest)
        let newBoxPublicKeys = new Map<string, IdentityPublicKey>()
        let encryptedGraph = graph.map(elt => {
            let encryption = new Encryption()
            encryption.generateWithMasterPublicKey(elt.masterPublicKey, null, this.session.encryption)
            encryption.version = elt.version + 1
            newBoxPublicKeys.set(elt.login, {
                login, sign: null,
                box: encryption.getPublicKey(types.IdentityShareKind.BOX),
                version: encryption.version,
            })
            return { elt, encryption }
        }).map(({ elt, encryption }) => {
            let epub = encryption.getPublic()
            let { message, nonce } = this.session.encryption.encrypt(types.ResourceType.SES).encrypt(epub.boxEncrypted.publicKey, elt.sharingKey)
            let backward = { nonce, encryptedKey: message }
            return {
                login: elt.login,
                version: elt.version + 1,
                sharingEncrypted: epub.sharingEncrypted,
                boxEncrypted: epub.boxEncrypted,
                signEncrypted: epub.signEncrypted,
                readEncrypted: epub.readEncrypted,
                signChain: nacl.sign.detached(Uint8Tool.concat(epub.boxEncrypted.publicKey, epub.signEncrypted.publicKey), elt.signKey),
                sharingGroup: elt.sharingGroup.map(pk => {
                    let newPk = newBoxPublicKeys.get(pk.login)
                    pk = newPk != null ? newPk : pk
                    let { message, nonce } = encryption.encryptKey(kind, this.session.encryption, pk.box)
                    return {
                        login: pk.login,
                        version: pk.version,
                        encryptedKey: message, nonce,
                        kind
                    }
                }),
                backward
            }
        })
        return await this.session.doProtoRequest<void>({
            method: "POST", code: 201,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGraph",
            request: () => types.IdentityPostSharingGraphRequest.encode({
                graph: encryptedGraph,
            }).finish()
        })
    }

    private async getSharingGraph(login: string): Promise<IdentitySharingElt[]> {
        let { graph } = await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGraph",
            assume: { login, kind: IdentityAccessKind.WRITE },
            response: types.IdentityGetSharingGraphResponse.decode,
        })
        // Resolve ciphers in graph
        let ciphers: types.ICipher[] = []
        graph.forEach((elt, i) => {
            if (i != 0) {
                ciphers.push(graph[i].sharingKey)
            }
            ciphers.push(graph[i].signKey)
            ciphers.push(graph[i].boxKey)
        })
        let resolvedCiphers = await this.session.resolveCipherList(ciphers)
        let resolvedGraph = graph.map((elt, i) => {
            let sharingKey = i == 0 ? null : resolvedCiphers.shift()
            let signKey = resolvedCiphers.shift()
            let boxKey = resolvedCiphers.shift()
            return { ...elt, sharingKey, signKey, boxKey }
        })
        // Decrypt ciphers in graph
        let { key } = await this.session.getAssumeParams({ login, kind: IdentityAccessKind.WRITE })
        let boxKeys: { [login: string]: Uint8Array } = {}
        let firstSharingKey = (await this.session.getAssumeParams({ login, kind: IdentityAccessKind.WRITE })).key.sharingKey
        let x = resolvedGraph.map((elt, i) => {
            let sharingKey: Uint8Array
            if (i == 0) {
                sharingKey = firstSharingKey
            } else {
                let boxkey = boxKeys[elt.sharedFrom.login + elt.sharedFrom.version]
                sharingKey = this.session.encryption.decrypt(types.ResourceType.SES, boxkey).decrypt(elt.sharingKey)
            }
            let boxKey = this.session.encryption.decrypt(types.ResourceType.SES, sharingKey).decrypt(elt.boxKey)
            let signKey = this.session.encryption.decrypt(types.ResourceType.SES, sharingKey).decrypt(elt.signKey)
            boxKeys[elt.login + elt.version] = boxKey
            return { ...elt, sharingKey, boxKey, signKey }
        }) as IdentitySharingElt[]
        return x
    }
}

interface IdentitySharingElt {
    login: string
    version: number
    masterPublicKey: Uint8Array
    sharingKey: Uint8Array
    signKey: Uint8Array
    boxKey: Uint8Array
    sharingGroup: IdentityPublicKey[]
    latest: boolean
}

export class IdentityX {
    static fromTypes(t: types.IIdentity): Identity<Uint8Array> {
        let x = types.Identity.create(t)
        return {
            ...x,
            created: new Date(t.created as number * 1000),
        }
    }

    static toTypes(i: Identity<Uint8Array>): types.IIdentity {
        return {
            ...i,
            created: null,
        }
    }
}
