import { ApplicationJWT } from "./ApplicationJWT";
import { Session } from "./Session";
export declare namespace ApplicationAPI {
    type Config = {
        jwt?: ApplicationJWT.Config;
    };
    type UsageOverview = {
        jwt: {
            totalIdentities: number;
            newIdentities: number;
            newSessions: number;
        };
        delegatedAccess: {
            newRequested: number;
            newResolved: number;
            newDistinctRequested: number;
            newDistinctResolved: number;
        };
    };
}
export declare class ApplicationAPI {
    private session;
    constructor(session: Session);
    /**
     * Put configuration of an application
     * @param appID the app ID
     * @param config The config of the application.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityCannotAssumeAccess` if cannot have right to write the configuration.
     * - `ApplicationConfigInvalid` if configuration object is invalid.
     * - `IdentityNotFound` if the identity `appID` doesn't exists.
     */
    putConfig(appID: string, config: ApplicationAPI.Config): Promise<void>;
    /**
     * Get configuration of an application
     * @param appID the app ID
     * @return(p) On success the promise will be resolved with an ApplicationConfig.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityCannotAssumeAccess` if cannot have right to read the configuration.
     * - `IdentityNotFound` if the identity `appID` doesn't exists.
     * - `ApplicationConfigNotFound` if configuration doesn't exists.
     */
    getConfig(appID: string): Promise<ApplicationAPI.Config>;
    /**
     * Get usage overview of an application
     * @param appID the app ID
     * @param options A collection of options:
     *  - since; unix timestamp from which requests data
     * @return(p) On success the promise will be resolved with an ApplicationAPI.UsageOverview.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityCannotAssumeOwnership` if cannot have right to the application.
     * - `IdentityNotFound` if the identity `appID` doesn't exists.
     */
    getUsageOverview(appID: string, options?: {
        since?: number;
    }): Promise<ApplicationAPI.UsageOverview>;
}
