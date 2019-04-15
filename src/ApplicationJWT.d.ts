import { Session } from "./Session";
/**
 * Expose all specific types and functions for JWT application.
 */
export declare namespace ApplicationJWT {
    /**
     * An enumeration that define all algorithm supported by DataPeps
     */
    enum Algorithm {
        HS256 = 0,
        HS384 = 1,
        HS512 = 2,
        RS256 = 3,
        RS384 = 4,
        RS512 = 5,
        ES256 = 6,
        ES384 = 7,
        ES512 = 8,
    }
    /**
     * The parameters needed to configure a DataPeps identity as an application.
     */
    type Config = {
        /** The key that be used by DataPeps to verify JWT tokens. */
        key: Uint8Array;
        /**
         * The signAlgorithm that should be used by DataPeps to verify JWT tokens.
         * By default use ApplicationJwtAlgorithm.HS256
         */
        signAlgorithm: Algorithm;
        /**
         * The claim used by DataPeps to generates the login of an identity created
         * thanks a JWT Token. By default use the "sub" claim.
         */
        claimForLogin?: string;
    };
    /**
     *  Define a connector between a JWT application and DataPeps.
     */
    interface Connector<AppSession, Secret> {
        /**
         * This function should take an application login and an application secret,
         * performs the authentication and returns an object that handle the
         * application session.
         */
        createSession: (login: string, secret: Secret) => Promise<AppSession>;
        /**
         * Returns from an application session the jwt token.
         */
        getToken: (session: AppSession) => Promise<string>;
    }
    /**
     * Create a DataPeps session and an application session.
     * @param appID The identifier of your DataPeps application.
     * @param appLogin The login of the identity in the referential of the application.
     * @param secret The secret of the DataPeps identity.
     * @param connector The JWT connector of your application
     * @return(p) On success the promise will be resolved with the DataPeps session,
     * the application session and a boolean that indicates if its the first connection
     * of the user to the DataPeps service.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `ApplicationInvalidToken` if the JWT token returned by the connector is invalid.
     * - `BadSecret` if the secret of the user is wrong.
     * - `ApplicationConfigNotFound` if the `appID` is not configured.
     */
    function createSession<AppSession, Secret extends string | Uint8Array>(appID: string, appLogin: string, secret: Secret, connector: Connector<AppSession, Secret>): Promise<{
        session: Session;
        appSession: AppSession;
        isNew: boolean;
    }>;
}
