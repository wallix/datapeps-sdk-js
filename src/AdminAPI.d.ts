import { api } from "./proto";
import { Session } from "./Session";
export declare const RegisterTokenStatus: typeof api.RegisterTokenStatus;
export declare type RegisterEmailValidationToken = api.IRegisterEmailValidationToken;
export declare class AdminAPI {
    private session;
    constructor(session: Session);
    /**
     * Set the admin status of an identity.
     * @param login The login of the identity for which to set the admin status.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityNotFound` if `login` does not exists.
     * - `IdentityNotAdmin` if the identity logged along with the current session is not an admin.
     * - `IdentityNotAdminDomain` if the identity logged along with the current session cannot administer the domain of `login`.
     */
    setAdmin(login: string, admin: boolean): Promise<void>;
    /**
     * Set the active status of an identity. A deactivated identity cannot login anymore.
     * @param login The login of the identity to set the active status.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityNotFound` if `login` does not exists.
     * - `IdentityNotAdmin` if the identity logged along with the current session is not an admin.
     * - `IdentityNotAdminDomain` if the identity logged along with the current session cannot administer the domain of `login`.
     */
    setActive(login: string, active: boolean): Promise<void>;
    /**
     * List registered token on DataPeps.
     * @param options A collection of options:
     *  - offset: Skip this number of results.
     *  - limit: Limit the length of the result (default: 10).
     * @return(p) On success the promise will be resolved with a list.
     */
    listRegisterTokens(options?: {
        offset?: number;
        limit?: number;
    }): Promise<RegisterEmailValidationToken[]>;
}
