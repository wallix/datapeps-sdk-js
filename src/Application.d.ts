import { ApplicationAPI, ApplicationJwtConfig, Session } from "./DataPeps";
export declare class ApplicationImpl implements ApplicationAPI {
    private session;
    constructor(session: Session);
    putConfig(appID: string, config: ApplicationJwtConfig): Promise<void>;
    getConfig(appID: string): Promise<ApplicationJwtConfig>;
}
