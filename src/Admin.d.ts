import { api } from './proto';
import { AdminAPI } from './DataPeps';
import { SessionImpl } from './Session';
export declare class AdminImpl implements AdminAPI {
    private session;
    constructor(session: SessionImpl);
    setAdmin(login: string, admin: boolean): Promise<void>;
    setActive(login: string, active: boolean): Promise<void>;
    overwriteKeys(login: string, secret: string | Uint8Array): Promise<void>;
    listRegisterTokens(options?: {
        offset?: number;
        limit?: number;
        domain?: string;
    }): Promise<api.IRegisterEmailValidationToken[]>;
}
