import * as nacl from 'tweetnacl';
import { types } from './proto';
import { AdminAPI } from './DataPeps';
import { SessionImpl } from './Session';
import { Encryption } from './CryptoFuncs';
import { Uint8Tool } from './Tools';

export class AdminImpl implements AdminAPI {

    private session: SessionImpl

    constructor(session: SessionImpl) {
        this.session = session
    }

    async setAdmin(login: string, admin: boolean): Promise<void> {
        return await this.session.doProtoRequest<void>({
            method: "POST", code: 200,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/promote",
            request: () => types.IdentityPromoteRequest.encode({
                admin
            }).finish()
        })
    }

    async setActive(login: string, active: boolean): Promise<void> {
        return await this.session.doProtoRequest<void>({
            method: "POST", code: 200,
            path: "/api/v4/identity/" + encodeURI(login) + "/active",
            request: () => types.IdentityToggleActiveStatusRequest.encode({
                login, active,
            }).finish()
        })
    }

    async overwriteKeys(login: string, secret: string | Uint8Array): Promise<void> {
        let encryption = new Encryption()
        encryption.generate(Uint8Tool.convert(secret), this.session.encryption)
        let ids = await this.session.Identity.getSharingGroup(login)
        let publicKeys = await this.session.getPublicKeys(ids.map(({ id }) => id))
        let publicKeysWithKind = ids.map(({ kind }, i) => ({ kind, key: publicKeys[i] }))
        let sharingGroup = publicKeysWithKind.map(({ kind, key: { login, version, sign, box } }) => {
            let { message, nonce } = encryption.encryptKey(kind, this.session.encryption, box)
            return {
                login, version, nonce, kind,
                encryptedKey: message
            }
        })
        let epub = encryption.getPublic()
        let signChain = this.session.encryption.sign(Uint8Tool.concat(epub.boxEncrypted.publicKey, epub.signEncrypted.publicKey))
        return await this.session.doProtoRequest<void>({
            method: "POST", code: 200,
            path: "/api/v4/identity/" + encodeURIComponent(login) + "/keysToReplace",
            request: () => types.IdentityPostKeysToRenewRequest.encode({
                login, encryption: epub,
                sharingGroup, signChain
            }).finish()
        })
    }

    async listRegisterTokens(options?: { offset?: number, limit?: number, domain?: string }): Promise<types.IRegisterEmailValidationToken[]> {
        let { links } = await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/register/links",
            params: options,
            response: types.LinksGetResponse.decode
        })
        return links
    }
}