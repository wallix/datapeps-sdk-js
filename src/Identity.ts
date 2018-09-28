import * as nacl from 'tweetnacl';
import { api } from './proto';
import { IdentityAPI, Identity, IdentityPublicKey, IdentityPublicKeyWithMetadata, IdentityShareLink, IdentityAccessKind, IdentityFields, SessionSaltKind, LockedVersion } from './DataPeps';
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
            response: r => IdentityX.fromapi(api.Identity.decode(r)),
        })
    }

    async create(
        identity: IdentityFields,
        options: {
            secret?: Uint8Array | string,
            sharingGroup?: string[],
            email?: string
        }): Promise<void> {
        options = options == null ? {} : options
        let osharingGroup = options.sharingGroup == null ? [] : options.sharingGroup
        let encryption = new Encryption()
        encryption.generate(Uint8Tool.convert(options.secret), this.session.encryption)
        let publicKeys = await this.session.getLatestPublicKeys(osharingGroup)
        let sharingGroup = publicKeys.map(({ login, version, box, sign }) => {
            let kind = api.IdentityShareKind.SHARING
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
            request: () => api.IdentityCreateRequest.encode({
                identity, sharingGroup, encryption, email: options.email,
                signChain: this.session.encryption.sign(Uint8Tool.concat(epub.boxEncrypted.publicKey, epub.signEncrypted.publicKey)),
            }).finish(),
        })
    }

    async update(identity: IdentityFields): Promise<void> {
        return await this.session.doProtoRequest<void>({
            method: "PUT", code: 200,
            path: "/api/v4/identity/" + encodeURI(identity.login),
            request: () => api.IdentityFields.encode(identity).finish(),
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
                let { identities } = api.IdentityListResponse.decode(r)
                return identities.map(IdentityX.fromapi)
            }
        })
    }

    async getSharingGroup(login: string): Promise<IdentityShareLink[]> {
        return await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGroup",
            response: r => api.IdentityGetSharingGroupResponse.decode(r).sharingGroup as IdentityShareLink[]
        })
    }

    async getAccessGroup(login: string): Promise<IdentityShareLink[]> {
        return await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/accessGroup",
            response: r => api.IdentityGetAccessGroupResponse.decode(r).accessGroup as IdentityShareLink[]
        })
    }

    async renewKeys(login: string, secret?: string | Uint8Array): Promise<void> {
        let kind = api.IdentityShareKind.SHARING
        let assume = { login, kind: IdentityAccessKind.WRITE }
        let { encryption, creator, sharingGroup } = await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/keysToRenew",
            response: api.IdentityGetKeysToRenewResponse.decode,
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
        let { message, nonce } = this.session.encryption.encrypt(api.ResourceType.SES).encrypt(epub.boxEncrypted.publicKey, key.sharingKey)
        let backward = { nonce, encryptedKey: message }
        await this.session.doProtoRequest({
            method: "POST", code: 201,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/keysToRenew",
            request: () => api.IdentityPostKeysToRenewRequest.encode({
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

    async getPublicKeyHistory(login: string): Promise<IdentityPublicKey[]> {
        let { chains } = await this.session.doProtoRequest({
            method: "POST", code: 200,
            path: "/api/v4/identities/latestPublicChains",
            request: () => api.IdentityGetLatestPublicChainsRequest.encode({
                ids: [{ login, since: 0 }],
            }).finish(),
            response: api.IdentityGetLatestPublicChainsResponse.decode,
        })
        if (chains.length != 1 || chains[0].login !== login) {
            throw new Error({
                kind: SDKKind.SDKInternalError,
                payload: { login, hint: "unexpected chain in public key history" }
            })
        }
        let chain = chains[0]

        return chain.chains.map(chainElt => {
            return { login: chain.login, version: chainElt.version, sign: chainElt.sign, box: chainElt.box }
        })
    }


    async getLockedVersions(login: string,
        options?: {
            withChallenge?: boolean,
        }
    ) {
        options = options != null ? options : {};
        return await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/identity/" + encodeURI(login) + "/lockedVersions",
            params: options,
            assume: login == this.session.login ? null : { login, kind: IdentityAccessKind.READ },
            response: r => {
                return api.IdentityGetLockedVersionsResponse.decode(r).lockedVersions.map(lockedVersion => {
                    return ({
                        ...lockedVersion,
                        publicKey: {
                            ...lockedVersion.publicKey.publicKey,
                            created: new Date(lockedVersion.publicKey.created as number * 1000),
                        } as IdentityPublicKeyWithMetadata
                    })
                })
            }
        })
    }

    async unlockVersions(login: string, secret: string | Uint8Array): Promise<IdentityPublicKeyWithMetadata[]> {
        let lockedVersions = await this.getLockedVersions(login, { withChallenge: true })
        let unlockedVersions: IdentityPublicKeyWithMetadata[] = [];
        let resolvedChallengesWithEncryptedKeys: api.UnlockVersionsRequest.UnlockedVersion[] = [];
        let publicKey: Uint8Array
        if (login == this.session.login) {
            publicKey = this.session.encryption.getPublic().boxEncrypted.publicKey
        } else {
            // TODO: possible race condition between the assumed version here and when sending the request
            publicKey = (await this.session.getLatestPublicKey(login)).box
        }
        lockedVersions.forEach(locked => {
            if (locked.challenge == null) {
                throw new Error({
                    kind: SDKKind.SDKInternalError,
                    payload: { version: locked.publicKey.version, hint: "missing challenge to resolve in locked version" }
                });
            }
            let encryption = new Encryption(api.IdentityEncryption.create(locked.challenge.encryption));
            try {
                encryption.recover(Uint8Tool.convert(secret), api.IdentityPublicKey.create(locked.challenge.creator));
                unlockedVersions.push(locked.publicKey);

                // the current version of session identity is signed by the unlocked one (as keys are accessible by current session)
                let { message, nonce } = encryption.encryptKey(
                    api.IdentityShareKind.SHARING,
                    encryption,
                    publicKey,
                )
                let backward = { nonce, encryptedKey: message }

                resolvedChallengesWithEncryptedKeys.push(new api.UnlockVersionsRequest.UnlockedVersion({
                    resolvedChallenge: {
                        token: locked.challenge.token,
                        salt: locked.challenge.salt,
                        signature: encryption.sign(locked.challenge.salt),
                    },
                    backward,
                }));
            }
            catch (e) {
                return
            }
        })
        if (unlockedVersions.length > 0) {
            await this.session.doProtoRequest({
                method: "POST", code: 200,
                assume: login == this.session.login ? null : { login, kind: IdentityAccessKind.WRITE },
                path: "/api/v4/identity/" + encodeURI(login) + "/unlockVersions",
                request: () => api.UnlockVersionsRequest.encode({ unlockedVersions: resolvedChallengesWithEncryptedKeys }).finish(),
                response: api.SessionResolveChallengeResponse.decode,
            })
        }
        return unlockedVersions;
    }


    async extendSharingGroup(login: string, sharingGroup: string[]): Promise<void> {
        this.session.clearAssumeParams(login)
        let { key } = await this.session.getAssumeParams({ login, kind: IdentityAccessKind.WRITE })
        let publicKeys = await this.session.getLatestPublicKeys(sharingGroup)
        return await this.session.doProtoRequest<void>({
            method: "PATCH", code: 201,
            path: "/api/v4/identity/" + encodeURI(login) + "/sharingGroup",
            assume: { login, kind: IdentityAccessKind.WRITE },
            request: () => api.IdentityShareRequest.encode({
                version: key.version,
                sharingGroup: publicKeys.map(({ login, version, box, sign }) => {
                    let kind = api.IdentityShareKind.SHARING
                    let { message, nonce } = this.session.encryption.encrypt(api.ResourceType.SES).encrypt(box, key.sharingKey)
                    return {
                        login, version, nonce, kind,
                        encryptedKey: message
                    }
                }),
            }).finish(),
        })
    }

    async replaceSharingGroup(login: string, sharingGroup: string[]): Promise<void> {
        return this.editSharingGraph(login, { sharingGroup });
    }

    async editSharingGraph(login: string,
        options?: {
            sharingGroup?: string[],
            overwriteKeys?: { secret: string | Uint8Array }
        }
    ) {
        options = options != null ? options : {};
        let graph = await this.getSharingGraph(login, { withKeys: options.overwriteKeys == null })
        if (graph[0].login != login) {
            throw new Error({
                kind: SDKKind.SDKInternalError,
                payload: { login, graph, hint: "unexpected graph" }
            })
        }
        if (options.sharingGroup != null) {
            // Replace the sharing group of login
            graph[0].sharingGroup = await this.session.getLatestPublicKeys(options.sharingGroup)
        }
        // Filter only latest identites
        graph = graph.filter(elt => elt.latest)
        if (options.overwriteKeys != null) {
            // If keys are overwritten, we only update:
            // - the main identity
            // - the graph elements in which the only element in sharing group is the main identity (for example a delegate, but not a group)
            graph = graph.filter(
                elt =>
                    elt.login == login ||
                    (elt.sharingGroup.length == 1 && elt.sharingGroup[0].login == login)
            )
        }
        let newBoxPublicKeys = new Map<string, IdentityPublicKey>()
        let encryptedGraph = graph.map(
            elt => {
                let encryption = new Encryption()
                if (options.overwriteKeys != null && elt.login === login) {
                    // Overwrite the key of main identity with secret
                    encryption.generate(Uint8Tool.convert(options.overwriteKeys.secret), this.session.encryption)
                } else {
                    encryption.generateWithMasterPublicKey(elt.masterPublicKey, null, this.session.encryption)
                }
                encryption.version = elt.version + 1
                newBoxPublicKeys.set(elt.login, {
                    login, sign: null,
                    box: encryption.getPublicKey(api.IdentityShareKind.BOX),
                    version: encryption.version,
                })
                return { elt, encryption }
            }
        ).map(({ elt, encryption }) => {
            let epub = encryption.getPublic()
            let backward: { nonce: Uint8Array, encryptedKey: Uint8Array } | undefined;
            let signChain: Uint8Array;
            if (options.overwriteKeys != null) {
                // administrator signs the 'overwrited' new version of identity
                signChain = this.session.encryption.sign(Uint8Tool.concat(epub.boxEncrypted.publicKey, epub.signEncrypted.publicKey))
            } else {
                // the new version of identity is signed by the previous one (as keys are accessible by current session)
                let { message, nonce } = this.session.encryption.encrypt(api.ResourceType.SES).encrypt(epub.boxEncrypted.publicKey, elt.sharingKey)
                backward = { nonce, encryptedKey: message }
                signChain = nacl.sign.detached(Uint8Tool.concat(epub.boxEncrypted.publicKey, epub.signEncrypted.publicKey), elt.signKey)
            }
            return {
                login: elt.login,
                version: elt.version + 1,
                encryption: epub,
                signChain,
                sharingGroup: elt.sharingGroup.map(
                    pk => {
                        let kind = api.IdentityShareKind.SHARING
                        let newPk = newBoxPublicKeys.get(pk.login)
                        pk = newPk != null ? newPk : pk
                        let { message, nonce } = encryption.encryptKey(kind, this.session.encryption, pk.box)
                        return {
                            login: pk.login,
                            version: pk.version,
                            encryptedKey: message, nonce,
                            kind
                        }
                    }
                ),
                backward
            }
        })
        return await this.session.doProtoRequest<void>({
            method: "POST", code: 201,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGraph",
            assume: options.overwriteKeys != null ? undefined : { login, kind: IdentityAccessKind.WRITE },
            request: () => api.IdentityPostSharingGraphRequest.encode({
                graph: encryptedGraph,
            }).finish()
        })
    }

    private async getSharingGraph(login: string, options?: { withKeys?: boolean }): Promise<IdentitySharingElt[]> {
        options = options != null ? options : {};
        let withKeys = options.withKeys == null ? true : options.withKeys;
        let { graph } = await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGraph",
            assume: withKeys ? { login, kind: IdentityAccessKind.WRITE } : null,
            response: api.IdentityGetSharingGraphResponse.decode,
        })
        if (!withKeys) {
            return graph as IdentitySharingElt[];
        }
        // Resolve ciphers in graph
        let ciphers: api.ICipher[] = []
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
                sharingKey = this.session.encryption.decrypt(api.ResourceType.SES, boxkey).decrypt(elt.sharingKey)
            }
            let boxKey = this.session.encryption.decrypt(api.ResourceType.SES, sharingKey).decrypt(elt.boxKey)
            let signKey = this.session.encryption.decrypt(api.ResourceType.SES, sharingKey).decrypt(elt.signKey)
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
    static fromapi(t: api.IIdentity): Identity<Uint8Array> {
        let x = api.Identity.create(t)
        return {
            ...x,
            created: new Date(t.created as number * 1000),
        }
    }

    static toapi(i: Identity<Uint8Array>): api.IIdentity {
        return {
            ...i,
            created: null,
        }
    }
}
