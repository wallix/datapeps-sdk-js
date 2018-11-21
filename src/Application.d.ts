import { ApplicationAPI, ApplicationConfig, Session } from "./DataPeps";
import { api } from "./proto";
export interface ApplicationJWTConnector<AppSession, Secret> {
    createSession: (login: string, secret: Secret) => Promise<AppSession>;
    getToken: (T) => Promise<string>;
}
export declare function createUser(appID: string, auth: {
    jwt: {
        token: string;
    };
}, secret: string | Uint8Array): Promise<api.RegisterExternalIdentityResponse>;
export declare function secure(appID: string, login: string, secret: string | Uint8Array): Promise<{
    session: Session;
    secret: Uint8Array;
}>;
export declare function createJWTSession<AppSession, Secret extends string | Uint8Array>(appID: string, appLogin: string, secret: Secret, connector: ApplicationJWTConnector<AppSession, Secret>): Promise<{
    session: Session;
    app: AppSession;
    new: boolean;
}>;
export declare class ApplicationImpl implements ApplicationAPI {
    private session;
    constructor(session: Session);
    putConfig(appID: string, fullConfig: ApplicationConfig): Promise<void>;
    getConfig(appID: string): Promise<ApplicationConfig>;
    static composeApplicationLogin(login: string, appID: string): string;
}
