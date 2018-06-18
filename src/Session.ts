import * as nacl from 'tweetnacl';
import * as Long from 'long';
import { types, events } from './proto';
import { ID, Session, SessionRequest, PublicKeysCache, TrustPolicy, AccessRequestResolver, DelegatedAccess } from './DataPeps';
import { IdentityPublicKey, IdentityPublicKeyID, IdentityAccessKind } from './DataPeps';
import { AccessRequest } from './DataPeps';
import { Resource } from './DataPeps';
import { Error, SDKKind, ServerKind } from './Error';
import { Uint8Tool, Base64 } from './Tools';
import { Client } from './HTTP';
import { ResolvedCipher, Encryption } from './CryptoFuncs';

import { IdentityImpl } from './Identity';
import { ResourceImpl, makeResourceFromResponse } from './Resource';
import { AdminImpl } from './Admin';

export interface AssumeParams {
    key: types.IDelegatedKeys
    kind: IdentityAccessKind
}

class MemoryPublicKeyCache implements PublicKeysCache {
    private cache: { [login: string]: IdentityPublicKey[] }
    constructor() {
        this.cache = {}
    }
    latest(login: string): IdentityPublicKey {
        let keys = this.cache[login]
        return (keys == null || keys.length == 0) ? null : keys[keys.length - 1]
    }
    get({ login, version }) {
        let keys = this.cache[login]
        return (keys == null || keys.length == 0) ? null : keys[version]
    }
    set({ login, version }, pk) {
        let keys = this.cache[login]
        if (keys == null) {
            this.cache[login] = []
        }
        this.cache[login][version] = pk
    }
}

class TrustOnFirstUse implements TrustPolicy {

    private session: Session

    constructor(session: Session) {
        this.session = session
    }

    async trust(pk: IdentityPublicKey, mandate?: IdentityPublicKeyID): Promise<void> {
        if (pk.version == 1) {
            console.log("TrustFirstUse", pk.login, Base64.encode(pk.sign), Base64.encode(pk.box), " mandate by ", mandate)
            return Promise.resolve()
        }
        await this.session.getPublicKey(mandate)
        console.log("TrustByMandate", pk.login, pk.version, Base64.encode(pk.sign), Base64.encode(pk.box), " mandate by ", mandate)
        return Promise.resolve()
    }
}

async function loginWithKeys(client, keys: types.IDelegatedKeys) {
    return await _login(client, keys.login, (e, c) => {
        let encryption = new Encryption(e)
        encryption.recoverWithKeys(keys, c)
        return encryption
    })
}

export async function _login(
    client: Client,
    login: string,
    recover: (e: types.IdentityEncryption, c: types.IdentityPublicKey) => Encryption,
    options?: { saltKind?: types.SessionSaltKind }
): Promise<Session> {
    let saltKind = options != null && options.saltKind != null ? options.saltKind : types.SessionSaltKind.TIME
    let challengeRequest = types.SessionCreateChallengeRequest.create({
        login: login,
        saltKind: saltKind
    })
    let createResponse = await client.doRequest({
        method: "POST", code: 201,
        path: "/api/v4/session/challenge/create",
        request: () => types.SessionCreateChallengeRequest.encode({
            login: login,
            saltKind: saltKind,
        }).finish(),
        response: types.SessionCreateChallengeResponse.decode,
        before: (x, b) => x.setRequestHeader("content-type", "application/x-protobuf")
    })
    let creator = types.IdentityPublicKey.create(createResponse.creator)
    let encryption = recover(
        types.IdentityEncryption.create(createResponse.encryption),
        types.IdentityPublicKey.create(createResponse.creator),
    )
    let token = createResponse.token
    let salt = createResponse.salt
    let resolveResponse = await client.doRequest({
        method: "POST", code: 200,
        path: "/api/v4/session/challenge/resolve",
        request: () => types.SessionResolveChallengeRequest.encode({
            token, salt,
            signature: encryption.sign(salt),
        }).finish(),
        response: types.SessionResolveChallengeResponse.decode,
        before: (x, b) => x.setRequestHeader("content-type", "application/x-protobuf")
    })
    saltKind = createResponse.saltKind
    salt = createResponse.salt
    return new SessionImpl(resolveResponse.login, token, salt, saltKind, encryption, client)
}

export class SessionImpl implements Session {

    APIHost: string
    WSHost: string

    login: string
    encryption: Encryption

    client: Client
    token: string // base64 encoded
    private salt: Uint8Array
    private saltKind: types.SessionSaltKind
    private deltaSaltTime: number

    private pkCache: PublicKeysCache
    private trustPolicy: TrustPolicy
    private assumeKeyCache: { [login: string]: types.IDelegatedKeys }

    constructor(
        login: string, token: Uint8Array, salt: Uint8Array, saltKind: types.SessionSaltKind,
        encryption: Encryption, client: Client
    ) {
        this.encryption = encryption
        this.token = Base64.encode(token)
        this.salt = salt
        this.saltKind = saltKind

        this.login = login
        this.client = client
        this.pkCache = new MemoryPublicKeyCache()
        this.trustPolicy = new TrustOnFirstUse(this)
        this.assumeKeyCache = {}
        this.afterRequestHandleSalt()
    }

    Identity = new IdentityImpl(this)

    Resource = new ResourceImpl(this)

    Admin = new AdminImpl(this)

    async close(): Promise<void> {
        return await this.doProtoRequest<void>({
            method: "PUT", code: 200,
            path: "/api/v4/session/close",
        })
    }

    async renewKeys(secret?: string | Uint8Array): Promise<void> {
        await this.Identity.renewKeys(this.login, secret)
        if (secret != null) {
            (this.encryption as any).secret = Uint8Tool.convert(secret)
        }
    }

    getSessionPublicKey(): IdentityPublicKey {
        let p = this.encryption.getPublic()
        return {
            login: this.login,
            version: this.encryption.version,
            sign: p.signEncrypted.publicKey,
            box: p.boxEncrypted.publicKey,
        }
    }

    async getLatestPublicKey(login: string): Promise<IdentityPublicKey> {
        let [key] = await this.getLatestPublicKeys([login])
        return key
    }

    async getLatestPublicKeys(logins: string[]): Promise<IdentityPublicKey[]> {
        let { chains } = await this.doProtoRequest({
            method: "POST", code: 200,
            path: "/api/v4/identities/latestPublicChains",
            request: () => types.IdentityGetLatestPublicChainsRequest.encode({
                ids: logins.map(login => {
                    let pk = this.pkCache.latest(login)
                    return { login, since: pk == null ? 0 : pk.version }
                })
            }).finish(),
            response: types.IdentityGetLatestPublicChainsResponse.decode,
        })
        await this.validateChains(chains)
        return logins.map(login => this.pkCache.latest(login))
    }

    async getPublicKey(id: IdentityPublicKeyID): Promise<IdentityPublicKey> {
        let [key] = await this.getPublicKeys([id])
        return key
    }

    async getPublicKeys(ids: IdentityPublicKeyID[]): Promise<IdentityPublicKey[]> {
        let requestIds: { [login: string]: number } = {}
        ids.forEach((id) => {
            if (this.pkCache.get(id) != null) {
                return
            }
            let version = requestIds[id.login]
            if (version == null || version < id.version) {
                requestIds[id.login] = id.version
            }
        })
        let logins = Object.keys(requestIds)
        if (logins.length == 0) {
            return ids.map(id => this.pkCache.get(id))
        }
        let { chains } = await this.doProtoRequest({
            method: "POST", code: 200,
            path: "/api/v4/identities/publicChains",
            request: () => types.IdentityGetPublicChainsRequest.encode({
                ids: Object.keys(requestIds).map(login => {
                    let pk = this.pkCache.latest(login)
                    let since = pk == null ? 0 : pk.version
                    let version = requestIds[login]
                    return { id: { login, version }, since }
                })
            }).finish(),
            response: types.IdentityGetPublicChainsResponse.decode
        })
        await this.validateChains(chains)
        return ids.map(id => this.pkCache.get(id))
    }

    async resolveAccessRequest(requestId: ID): Promise<AccessRequestResolver> {
        let { sign, resource } = await this.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/delegatedAccess/" + requestId.toString(),
            response: types.DelegatedGetResponse.decode,
        })
        let r = await makeResourceFromResponse<null>(resource, types.ResourceType.ANONYMOUS, this, null, null)
        // Verify requester's signature
        let msg = Uint8Tool.concat(
            new TextEncoder().encode(this.login),
            r.publicKey()
        )
        if (!nacl.sign.detached.verify(msg, sign, r.creator.sign)) {
            throw new Error({
                kind: SDKKind.IdentitySignChainInvalid, payload: {
                    requestId, requester: r.creator,
                }
            })
        }
        return new AccessRequestResolverImpl(requestId, r, this)
    }

    async createSession(login: string): Promise<Session> {
        let keys = await this.getKeys(login)
        return loginWithKeys(this.client, keys)
    }

    setTrustPolicy(policy: TrustPolicy) {
        this.trustPolicy = policy
    }

    setPublicKeyCache(cache: PublicKeysCache) {
        this.pkCache = cache
    }

    async getSecretToken(login: string): Promise<string> {
        let keys = await this.getKeys(login)
        return Base64.encode(keys.signKey)
    }

    async listDelegatedAccess(login: string, options?: {
        limit?: number,
        sinceID?: ID,
        maxID?: ID,
    }): Promise<DelegatedAccess[]> {
        let { accesses } = await this.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/delegatedAccesses",
            response: types.DelegatedAccessListResponse.decode,
            assume: { login, kind: IdentityAccessKind.READ },
            params: options,
        })
        return accesses.map(access => ({
            ...access,
            resolved: access.resolved,
            created: new Date(access.created as number * 1000)
        } as DelegatedAccess))
    }

    sign(message: Uint8Array): Uint8Array {
        return this.encryption.sign(message)
    }

    async doRequest<T>(r: SessionRequest<T>): Promise<T> {
        let assumeParams = await this.getAssumeParams(r.assume)
        let xhr: XMLHttpRequest
        let r2 = {
            ...r,
            before: (x: XMLHttpRequest, body: Uint8Array) => {
                xhr = x
                if (r.before != null) {
                    r.before(x, body)
                }
                this.beforeRequest(x, body, assumeParams)
            }
        }
        try {
            let resp = await this.client.doRequest(r2)
            this.afterRequest(xhr)
            return resp
        } catch (err) {
            switch (err.kind) {
                case ServerKind.SessionStale:
                    try {
                        await this.unStale()
                    } catch (e) {
                        if (e instanceof Error && e.kind == SDKKind.BadSecret) {
                            throw err
                        }
                        throw e
                    }
                    return this.doRequest(r)
                case ServerKind.AssumeStale:
                    this.clearAssumeParams(r.assume.login)
                    return this.doRequest(r)
            }
            this.afterRequest(xhr)
            throw err
        }
    }

    async doProtoRequest<T>(r: SessionRequest<T>): Promise<T> {
        return this.doRequest({
            ...r, before(x, b) {
                x.setRequestHeader("content-type", "application/x-protobuf")
                if (r.before != null) {
                    r.before(x, b)
                }
            }
        })
    }

    private async validateChains(chains: types.IIdentityPublicChain[]) {
        await Promise.all(chains.map(chain => this.validateChain(chain)))
    }

    private async validateChain({ login, version, chains }: types.IIdentityPublicChain) {
        let firstVersion = version - chains.length
        if (firstVersion < 0) {
            throw new Error({
                kind: SDKKind.InvalidServerChain,
                payload: { login, version, chains }
            })
        }
        let pk = this.pkCache.get({ login, version: firstVersion })

        if (firstVersion == 0) {
            if (pk == null) {
                let { box, sign, mandate } = chains.shift()
                pk = { login, version: 1, box, sign }
                await this.trustPolicy.trust(pk, mandate as IdentityPublicKeyID)
                this.pkCache.set({ login, version: 1 }, pk)
            }
            // Check if the server tries to erase the root key
            else if ((!Uint8Tool.equals(pk.box, chains[0].box) || !Uint8Tool.equals(pk.sign, chains[0].sign))) {
                throw new Error({
                    kind: SDKKind.IdentitySignChainInvalid,
                    payload: { login, version: 1 }
                })
            }
        }
        // Check the sign chains and update the cache
        await chains.reduce(async (ppk, { box, sign, chain, mandate }) => {
            let pk = await ppk
            let id = { login, version: pk.version + 1 }
            let pksign = pk.sign
            if (mandate != null) {
                await this.trustPolicy.trust(pk, mandate as IdentityPublicKeyID)
                let mpk = await this.getPublicKey(mandate as IdentityPublicKeyID)
                pksign = mpk.sign
            }
            if (!nacl.sign.detached.verify(Uint8Tool.concat(box, sign), chain, pksign)) {
                throw new Error({
                    kind: SDKKind.IdentitySignChainInvalid,
                    payload: { login, version }
                })
            }
            pk = { login, version: id.version, box, sign }
            this.pkCache.set(id, pk)
            return pk
        }, Promise.resolve(pk))

    }

    private afterRequest(request: XMLHttpRequest) {
        let salt = request.getResponseHeader("x-peps-salt")
        if (salt == null) {
            throw new Error({
                kind: SDKKind.ProtocolError,
                payload: { missing: "x-peps-salt", headers: request.getAllResponseHeaders() }
            })
        }
        this.salt = Base64.decode(salt)
        this.afterRequestHandleSalt()
    }

    private afterRequestHandleSalt() {
        let secondsServer = (this.salt[0] << 24) + (this.salt[1] << 16) + (this.salt[2] << 8) + this.salt[3]
        let secondsLocal = Math.floor(Date.now() / 1000)
        this.deltaSaltTime = secondsServer - secondsLocal
    }

    private beforeRequest(request: XMLHttpRequest, body: Uint8Array, assume?: AssumeParams) {
        let salt = this.getSalt()
        let tosign = body == null ? salt : Uint8Tool.concat(body, salt)
        request.setRequestHeader("x-peps-token", this.token)
        request.setRequestHeader("x-peps-signature", Base64.encode(this.encryption.sign(tosign)))
        request.setRequestHeader("x-peps-salt", Base64.encode(salt))
        if (assume == null) {
            return
        }
        request.setRequestHeader("x-peps-assume-access", assume.kind.toString())
        request.setRequestHeader("x-peps-assume-identity", assume.key.login + "/" + assume.key.version)
        let key = assume.kind == IdentityAccessKind.READ ? assume.key.readKey : assume.key.signKey
        request.setRequestHeader("x-peps-assume-signature", Base64.encode(nacl.sign.detached(tosign, key)))
    }

    getSalt(): Uint8Array {
        switch (this.saltKind) {
            case types.SessionSaltKind.RAND: return this.salt
            case types.SessionSaltKind.TIME:
                let seconds = Math.floor(Date.now() / 1000) + this.deltaSaltTime
                let salt = new Uint8Array(4)
                salt[0] = (seconds >>> 24) & 0xFF
                salt[1] = (seconds >>> 16) & 0xFF
                salt[2] = (seconds >>> 8) & 0xFF
                salt[3] = seconds & 0xFF
                return salt
        }
    }

    private unStale(): Promise<void> {
        return this.doProtoRequest({
            method: "PUT", code: 200,
            path: "/api/v4/session/unStale",
            response: types.SessionUnStaleResponse.decode,
        }).then(({ encryption, creator }) => {
            this.clearAssumeParams(this.login)
            let e = new Encryption(encryption)
            e.recover(this.encryption.secret, creator as IdentityPublicKey)
            this.encryption = e
        })
    }

    async resolveCipherList(ciphers: types.ICipher[]): Promise<ResolvedCipher[]> {
        let signs = ciphers.map((cipher) => cipher.sign)
        let publicKeys = await this.getPublicKeys(signs as IdentityPublicKeyID[])
        return ciphers.map(({ message, nonce, sign }) => {
            let pk = publicKeys.find((pk) => sign.login == pk.login && sign.version == pk.version)
            if (pk == null) {
                throw new Error({
                    kind: SDKKind.SDKInternalError,
                    payload: { reason: "cannot find pk", sign }
                })
            }
            return { message, nonce, sign: pk }
        })
    }

    async decryptCipherList(type: types.ResourceType, ciphers: types.ICipher[], secretKey?: Uint8Array): Promise<Uint8Array> {
        let resolvedCiphers = await this.resolveCipherList(ciphers)
        return this.encryption.decrypt(type, secretKey).decryptList(resolvedCiphers)
    }

    async getAssumeParams(assume?: { login: string, kind: IdentityAccessKind }): Promise<AssumeParams> {
        if (assume == null) {
            return null
        }
        let key = await this.getKeys(assume.login)
        return { key, kind: assume.kind }
    }

    private async getKeys(login: string): Promise<types.IDelegatedKeys> {
        let key = this.assumeKeyCache[login]
        if (key != null) {
            return key
        }
        let keys = await this.fetchKeys(login)
        this.assumeKeyCache[login] = keys
        return keys
    }

    async fetchKeys(login: string, version?: number): Promise<types.IDelegatedKeys> {
        if (this.login == login && (version == undefined || this.encryption.version == version)) {
            let sharingKey = (this.encryption as any).sharingKeyPair.secretKey
            let signKey = (this.encryption as any).signKeyPair.secretKey
            let boxKey = (this.encryption as any).boxKeyPair.secretKey
            let readKey = (this.encryption as any).readKeyPair.secretKey
            return ({ sharingKey, signKey, boxKey, readKey, version: this.encryption.version, login })
        }
        let params: undefined | { version: string }
        if (version != undefined) {
            params = { version: version.toString() }
        }

        let { sharingKey, signKey, boxKey, readKey, version: identityVersion } = await this.doProtoRequest({
            method: "GET",
            path: "/api/v4/identity/" + encodeURI(login) + "/keys",
            code: 200,
            response: types.IdentityGetKeysResponse.decode,
            params,
        })
        let decryptedSharingKey = await this.decryptCipherList(types.ResourceType.SES, sharingKey)
        let [cipherSignkey, cipherBoxKey, cipherReadKey] =
            await this.resolveCipherList([signKey, boxKey, readKey])
        let decryptedSignKey = this.encryption.decrypt(types.ResourceType.SES, decryptedSharingKey).decrypt(cipherSignkey)
        let decryptedBoxKey = this.encryption.decrypt(types.ResourceType.SES, decryptedSharingKey).decrypt(cipherBoxKey)
        let decryptedReadKey = this.encryption.decrypt(types.ResourceType.SES, decryptedBoxKey).decrypt(cipherReadKey)
        return {
            sharingKey: decryptedSharingKey,
            signKey: decryptedSignKey,
            boxKey: decryptedBoxKey,
            readKey: decryptedReadKey,
            version: identityVersion, login
        }
    }

    clearAssumeParams(login: string) {
        delete this.assumeKeyCache[login]
    }

}

export class AccessRequestImpl implements AccessRequest {

    id: ID
    login: string

    private keys: types.IDelegatedKeys
    private reason: any
    private client: Client
    private resource: Resource<null>
    private resolve: () => void
    private reject: (reason?: any) => void

    constructor(id: ID, login: string, client: Client, resource: Resource<null>) {
        this.id = id
        this.login = login
        this.resolve = () => { }
        this.reject = () => { }
        this.client = client
        this.resource = resource
        this.init()
    }

    private async init() {
        try {
            let { keys } = await this.client.doRequest({
                method: "GET", code: 200,
                path: "/api/v4/delegatedAccess/" + this.id.toString() + "/keys",
                response: types.DelegatedGetKeysResponse.decode,
                before: (x, b) => x.setRequestHeader("content-type", "application/x-protobuf")
            })
            this.keys = types.DelegatedKeys.decode(this.resource.decrypt(keys))
            this.resolve()
        } catch (e) {
            this.reason = e
            this.reject(e)
        }
    }

    wait(): Promise<void> {
        if (this.keys != null) {
            return Promise.resolve()
        }
        if (this.reason != null) {
            return Promise.reject(this.reason)
        }
        return new Promise((resolve, reject) => {
            let presolve = this.resolve
            this.resolve = () => {
                resolve()
                presolve()
            }
            let preject = this.reject
            this.reject = (reason?) => {
                reject(reason)
                preject(reason)
            }
        })
    }

    async waitSession(): Promise<Session> {
        await this.wait()
        return await loginWithKeys(this.client, this.keys)
    }

    openResolver(): any {
        return this._openConfigured(this.id, this.login);
    }

    _openConfigured(id: ID, login: string): any {
        throw new Error(
            {
                kind: SDKKind.SDKInternalError,
                payload: { reason: "AccessRequest.openResolver() function has not been configured" }
            })
    }
}

class AccessRequestResolverImpl implements AccessRequestResolver {

    id: ID
    requesterKey: IdentityPublicKey
    private resource: Resource<null>
    private session: SessionImpl

    constructor(id: ID, resource: Resource<null>, session: SessionImpl) {
        this.id = id
        this.requesterKey = resource.creator
        this.resource = resource
        this.session = session
    }

    async resolve(login: string): Promise<void> {
        let keys = await this.session.fetchKeys(login)
        await this.session.doProtoRequest({
            method: "PUT", code: 200,
            path: "/api/v4/delegatedAccess/" + this.id.toString() + "/keys",
            request: () => types.DelegatedPostKeysRequest.encode({
                keys: this.resource.encrypt(
                    types.DelegatedKeys.encode(keys).finish()
                )
            }).finish()
        })
    }
}

export interface Event<T> {
    type: string
    payload: T
}
