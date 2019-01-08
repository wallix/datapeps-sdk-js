import { api } from "./proto";
import { Session } from "./Session";
import { IdentityAPI } from "./IdentityAPI";

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
      code: 200,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/promote",
      request: () =>
        api.IdentityPromoteRequest.encode({
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
      code: 200,
      path: "/api/v4/identity/" + encodeURI(login) + "/active",
      request: () =>
        api.IdentityToggleActiveStatusRequest.encode({
          login,
          active
        }).finish()
    });
  }

  /**
   * Generate new keys for an identity.
   * The identity will no longer be able access any things (resources, shared identities, ...) that have previously been shared with it.
   * @param login The login of the identity to set the active status.
   * @return(p) On success the promise will be resolved with void.
   * On error the promise will be rejected with an {@link Error} with kind:
   * - `IdentityNotFound` if `login` does not exists.
   * - `IdentityNotAdmin` if the identity logged along the current session is not an admin.
   * - `IdentityNotAdminDomain` if the identity logged along with the current session cannot adinistrate the domain of `login`.
   */
  async overwriteKeys(
    login: string,
    secret: string | Uint8Array
  ): Promise<void> {
    await new IdentityAPI(this.session).editSharingGraph(login, {
      overwriteKeys: { secret }
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
  }): Promise<api.IRegisterEmailValidationToken[]> {
    let { links } = await this.session.doProtoRequest({
      method: "GET",
      code: 200,
      path: "/api/v4/register/links",
      params: options,
      response: api.LinksGetResponse.decode
    });
    return links;
  }
}
