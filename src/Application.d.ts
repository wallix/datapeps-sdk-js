import { Session } from "./DataPeps";
import { api } from "./proto";
/**
 * Create a user thanks an external referential of identities
 * @param appID The identifier of a configured application
 * @param auth The parameter that allows DataPeps to authenticate the user
 * @param secret The identity secret
 * On error the promise will be rejected with an {@link Error} with kind:
 * - `ApplicationInvalidToken` if the JWT token returned by the connector is invalid.
 * - `IdentityNotFound` if the identity `appID` doesn't exists.
 * - `ApplicationConfigNotFound` if the `appID` is not configured.
 */
export declare function createUser(appID: string, auth: {
    jwt: {
        token: string;
    };
}, secret: string | Uint8Array): Promise<api.RegisterExternalIdentityResponse>;
export declare function secure(appID: string, login: string, secret: string | Uint8Array): Promise<{
    session: Session;
    secret: Uint8Array;
}>;
