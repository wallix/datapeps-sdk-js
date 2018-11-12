import { ApplicationAPI, ApplicationJwtConfig, Session } from "./DataPeps";
import { api } from "./proto";
export declare function createUser(appID: string, auth: {
    jwt: {
        token: string;
    };
}, secret: string | Uint8Array): Promise<api.RegisterExternalIdentityResponse>;
export declare function secure(appID: string, login: string, secret: string | Uint8Array): Promise<{
    session: Session;
    secret: Uint8Array;
}>;
export declare class ApplicationImpl implements ApplicationAPI {
    private session;
    constructor(session: Session);
    putConfig(appID: string, config: ApplicationJwtConfig): Promise<void>;
    getConfig(appID: string): Promise<ApplicationJwtConfig>;
    static composeApplicationLogin(login: string, appID: string): string;
}
