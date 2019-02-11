import { ApplicationJWT } from "./ApplicationJWT";
import { api } from "./proto";
import { Session } from "./Session";
import { Identity } from "./IdentityAPI";
import { IdentitySortingOrder as ApplicationIdentitySortingOrder } from "./IdentityInternal";
export { ApplicationIdentitySortingOrder };
/** Allows to indicate which kind of field should be sorted. */
export declare enum ApplicationIdentitySortingField {
    LOGIN = 0,
    CREATED = 1,
}
export import UsageBy = api.Period;
export declare namespace ApplicationAPI {
    type Config = {
        jwt?: ApplicationJWT.Config;
    };
    type UsageOverviewItem = {
        jwt: {
            identities: number;
            sessions: number;
        };
        delegates: {
            requested: number;
            resolved: number;
            distinctRequested: number;
            distinctResolved: number;
        };
        start: number;
    };
    type UsageOverview = UsageOverviewItem[];
    type IdentitySession = {
        owner: string;
        token: Uint8Array;
        created: number;
        expires: number;
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
     *  - from : unix timestamp from which requests data
     *  - to : unix timestamp to which requests data
     *  - by : number 0 : day , 1 : month , 2 : year
     * @return(p) On success the promise will be resolved with an ApplicationAPI.UsageOverview.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityCannotAssumeOwnership` if cannot have right to the application.
     * - `IdentityNotFound` if the identity `appID` doesn't exists.
     */
    getUsageOverview(appID: string, options?: {
        from?: number;
        to?: number;
        by?: UsageBy;
    }): Promise<ApplicationAPI.UsageOverview>;
    /**
     * List identities that has been created on behalf of an application
     * @param appID the app ID
     * @param options A collection of options:
     *  - offset: Skip this number of results.
     *  - limit: Limit the length of the result (default: 10).
     *  - loginPrefix: Filter only logins that containing this string
     * @return(p) On success the promise will be resolved with the list of identities
     * and the total of identities that should match the query.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityCannotAssumeOwnership` if cannot have right to the application.
     * - `IdentityNotFound` if the identity `appID` doesn't exists.
     */
    listIdentities(appID: string, options?: {
        offset?: number;
        limit?: number;
        loginPrefix?: string;
        sortingField?: ApplicationIdentitySortingField;
        sortingOrder?: ApplicationIdentitySortingOrder;
    }): Promise<{
        identities: {
            identity: Identity<Uint8Array>;
            auth: any;
        }[];
        totalIdentitiesCount: number;
    }>;
    /**
     * Get user's application login from the user's DataPeps login
     * @param dataPepsLogin the user's login in DataPeps
     * @return Returns the user's application login used to generate the given DataPeps login.
     * If the dataPepsLogin is null, undefined, empty or malformatted returns an empty string.
     */
    static extractLoginFromDataPepsLogin(dataPepsLogin: any): any;
    /** Returns all sessions that been created on behalf of the application.
     * @param appID the app ID
     * @param offset the offset
     * @param limit the limit
     * @return(p) On success the promise will be resolved with an ApplicationAPI.IdentitySession[].
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityCannotAssumeOwnership` if cannot have right to the application.
     * - `IdentityNotFound` if the identity `appID` doesn't exists.
     */
    listSessions(appID: string, offset: number, limit: number): Promise<ApplicationAPI.IdentitySession[]>;
}
