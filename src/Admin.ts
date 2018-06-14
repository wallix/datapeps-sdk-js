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
        await this.session.Identity.editSharingGraph(login, { overwriteKeys: { secret } });
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