import { api } from "./proto";
import { Session } from "./Session";
export declare type ApplicationIdentityAuth = {
    jwt: {
        token: string;
    };
};
/**
 * Create a user thanks an external referential of identities
 * @param appID The identifier of a configured application
 * @param auth The parameter that allows DataPeps to authenticate the user
 * @param secret The identity secret
 * On error the promise will be rejected with an {@link Error} with kind:
 * - `ApplicationInvalidToken` if the JWT token returned by the connector is invalid.
 * - `ApplicationConfigNotFound` if the `appID` is not configured or if the identity `appID` doesn't exists.
 */
export declare function createUser(appID: string, auth: ApplicationIdentityAuth, secret: string | Uint8Array): Promise<api.RegisterApplicationIdentityResponse>;
export declare function secure(appID: string, login: string, secret: string | Uint8Array): Promise<{
    session: Session;
    secret: Uint8Array;
}>;
