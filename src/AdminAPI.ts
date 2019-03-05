import { api } from "./proto";
import { Session } from "./Session";
import { IdentityAPI } from "./IdentityAPI";

export const RegisterTokenStatus = api.RegisterTokenStatus;

export type RegisterEmailValidationToken = api.IRegisterEmailValidationToken;

export class AdminAPI {
  private session: Session;

  constructor(session: Session) {
    this.session = session;
  }

  /**
   * Set the admin status of an identity.
   * @param login The login of the identity for which to set the admin status.
   * @return(p) On success the promise will be resolved with void.
   * On error the promise will be rejected with an {@link Error} with kind:
   * - `IdentityNotFound` if `login` does not exists.
   * - `IdentityNotAdmin` if the identity logged along with the current session is not an admin.
   * - `IdentityNotAdminDomain` if the identity logged along with the current session cannot administer the domain of `login`.
   */
  async setAdmin(login: string, admin: boolean): Promise<void> {
    return await this.session.doProtoRequest<void>({
      method: "POST",
      expectedCode: 200,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/promote",
      body: api.IdentityPromoteRequest.encode({
        admin
      }).finish()
    });
  }

  /**
   * Set the active status of an identity. A deactivated identity cannot login anymore.
   * @param login The login of the identity to set the active status.
   * @return(p) On success the promise will be resolved with void.
   * On error the promise will be rejected with an {@link Error} with kind:
   * - `IdentityNotFound` if `login` does not exists.
   * - `IdentityNotAdmin` if the identity logged along with the current session is not an admin.
   * - `IdentityNotAdminDomain` if the identity logged along with the current session cannot administer the domain of `login`.
   */
  async setActive(login: string, active: boolean): Promise<void> {
    return await this.session.doProtoRequest<void>({
      method: "POST",
      expectedCode: 200,
      path: "/api/v4/identity/" + encodeURI(login) + "/active",
      body: api.IdentityToggleActiveStatusRequest.encode({
        login,
        active
      }).finish()
    });
  }

  /**
   * List registered token on DataPeps.
   * @param options A collection of options:
   *  - offset: Skip this number of results.
   *  - limit: Limit the length of the result (default: 10).
   * @return(p) On success the promise will be resolved with a list.
   */
  async listRegisterTokens(options?: {
    offset?: number;
    limit?: number;
  }): Promise<RegisterEmailValidationToken[]> {
    let { links } = await this.session.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: "/api/v4/register/links",
      params: options,
      response: api.LinksGetResponse.decode
    });
    return links;
  }
}
