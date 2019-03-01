import { ApplicationJWT } from "./ApplicationJWT";
import { ApplicationIdentityAuth } from "./Application";
import { Error, SDKKind } from "./Error";
import { api } from "./proto";
import { Session } from "./Session";
import {
  IdentityAccessKind,
  Identity,
  IdentitySortingField,
  IdentityPublicKeyID
} from "./IdentityAPI";
import {
  IdentitySerializer,
  IdentitySortingOrder as ApplicationIdentitySortingOrder,
  IdentityRequestsUtils
} from "./IdentityInternal";
import { timestampToDate } from "./Tools";

export { ApplicationIdentitySortingOrder };

/** Allows to indicate which kind of field should be sorted. */
export enum ApplicationIdentitySortingField {
  LOGIN = 0,
  CREATED = 1
}

export import UsageBy = api.Period;

export namespace ApplicationAPI {
  export type Config = {
    jwt?: ApplicationJWT.Config;
  };

  export type ApplicationConfigID = {
    appID: string;
    version: number;
  };

  export type ConfigWithMetadata = {
    meta: {
      applicationConfigID: ApplicationConfigID;
      creator: IdentityPublicKeyID;
      created: Date;
    };
    payload: Config;
  };

  export type UsageOverviewItem = {
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
  export type UsageOverview = UsageOverviewItem[];

  export type IdentitySession = {
    owner: string;
    token: Uint8Array;
    created: number;
    expires: number;
  };

  export type IdentityAuthWithContext = {
    auth: ApplicationIdentityAuth;
    identityLogin: string;
    applicationConfigID: ApplicationConfigID;
  };
}

export class ApplicationAPI {
  private session: Session;

  constructor(session: Session) {
    this.session = session;
  }

  /**
   * Put configuration of an application
   * @param appID the app ID
   * @param config The config of the application.
   * @return(p) On success the promise will be resolved with ApplicationAPI.ApplicationConfigID.
   * On error the promise will be rejected with an {@link Error} with kind:
   * - `IdentityCannotAssumeAccess` if cannot have right to write the configuration.
   * - `ApplicationConfigInvalid` if configuration object is invalid.
   * - `IdentityNotFound` if the identity `appID` doesn't exists.
   */
  async putConfig(
    appID: string,
    config: ApplicationAPI.Config
  ): Promise<ApplicationAPI.ApplicationConfigID> {
    if (!("jwt" in config)) {
      return;
    }
    const jwtConfig = config.jwt;
    if (jwtConfig.signAlgorithm == null) {
      throw new Error({
        kind: SDKKind.SDKInternalError,
        payload: {
          hint: "configuration sign algorithm cannot be null or undefined"
        }
      });
    }
    let c = {
      jwt: {
        key: jwtConfig.key,
        claimForLogin: jwtConfig.claimForLogin,
        signAlgorithm: jwtConfig.signAlgorithm.valueOf()
      }
    };
    return await this.session.doProtoRequest<
      ApplicationAPI.ApplicationConfigID
    >({
      method: "PUT",
      assume: { login: appID, kind: IdentityAccessKind.WRITE },
      expectedCode: 201,
      path: `/api/v4/identity/${encodeURI(appID)}/configure-as-application`,
      body: api.IdentityConfigurationAsApplicationRequest.encode({
        Login: appID,
        config: c
      }).finish(),
      response: r => {
        return api.ApplicationConfigID.decode(r);
      }
    });
  }

  /**
   * Get configuration of an application
   * @param appConfigID the application configuration ID, that specifies tha application ID and the application configuration version.
   * @return(p) On success the promise will be resolved with an ApplicationAPI.ConfigWithContext object.
   * On error the promise will be rejected with an {@link Error} with kind:
   * - `IdentityCannotAssumeOwnership` if the client does not have a right to read the configuration.
   * - `IdentityNotFound` if the identity `appID` doesn't exist.
   * - `AppliacationConfigNotFound` if the `appConfigID` does not correspond to any existing application configuration.
   * - `BadRequest` if the `appConfigID` is malformatted.
   */
  async getConfig(
    appConfigID: ApplicationAPI.ApplicationConfigID
  ): Promise<ApplicationAPI.ConfigWithMetadata> {
    // if appConfigID == null, the server returns IdenityNotFound as appID is empty
    appConfigID = appConfigID == null ? { appID: "", version: 1 } : appConfigID;
    return await this.session.doProtoRequest<ApplicationAPI.ConfigWithMetadata>(
      {
        method: "POST",
        assume: {
          login: appConfigID.appID,
          kind: IdentityAccessKind.READ
        },
        expectedCode: 200,
        path: `/api/v4/application/${encodeURI(
          appConfigID.appID
        )}/configuration`,
        body: api.ApplicationConfigID.encode({
          version: appConfigID.version
        }).finish(),
        response: r => {
          let resp = api.IdentityGetConfigurationResponse.decode(r);
          return {
            meta: {
              applicationConfigID: {
                appID: resp.metadata.configID.appID,
                version: resp.metadata.configID.version
              },
              creator: {
                login: resp.metadata.creator.login,
                version: resp.metadata.creator.version
              },
              created: timestampToDate(resp.metadata.created)
            },
            payload: {
              jwt: {
                key: resp.config.jwt.key,
                signAlgorithm: resp.config.jwt.signAlgorithm.valueOf(),
                claimForLogin: resp.config.jwt.claimForLogin
              }
            }
          };
        }
      }
    );
  }

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
  async getUsageOverview(
    appID: string,
    options?: {
      from?: number;
      to?: number;
      by?: UsageBy;
    }
  ): Promise<ApplicationAPI.UsageOverview> {
    options = options == null ? {} : options;
    return await this.session.doProtoRequest<ApplicationAPI.UsageOverview>({
      method: "POST",
      assume: { login: appID, kind: IdentityAccessKind.READ },
      expectedCode: 200,
      path: `/api/v4/application/${encodeURI(appID)}/usage-overview`,
      body: api.ApplicationUsageOverviewRequest.encode({
        Login: appID,
        ...options
      }).finish(),
      response: r => {
        return api.ApplicationUsageOverviewResponse.decode(r).overview.map(
          ({ start, jwt, delegates }) =>
            <ApplicationAPI.UsageOverviewItem>{
              start,
              jwt: { identities: 0, sessions: 0, ...jwt },
              delegates: {
                requested: 0,
                resolved: 0,
                distinctRequested: 0,
                distinctResolved: 0,
                ...delegates
              }
            }
        );
      }
    });
  }

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
  async listIdentities(
    appID: string,
    options?: {
      offset?: number;
      limit?: number;
      loginPrefix?: string;
      sortingField?: ApplicationIdentitySortingField;
      sortingOrder?: ApplicationIdentitySortingOrder;
    }
  ): Promise<{
    identities: { identity: Identity<Uint8Array>; auth: any }[];
    totalIdentitiesCount: number;
  }> {
    options = options == null ? {} : options;
    if (options.sortingField == null) {
      options.sortingField = ApplicationIdentitySortingField.CREATED;
    }
    let sortingField = (options.sortingField as {}) as IdentitySortingField;
    let sortingOrder = IdentityRequestsUtils.resolveSortingOrder(
      options.sortingOrder
    );
    return await this.session.doProtoRequest({
      method: "POST",
      expectedCode: 200,
      path: `/api/v4/application/${encodeURI(appID)}/identities/list`,
      assume: { login: appID, kind: IdentityAccessKind.READ },
      body: api.ApplicationListIdentitiesRequest.encode({
        options: {
          limit: options.limit,
          offset: options.offset,
          loginPrefix: options.loginPrefix,
          sortedBy: sortingField,
          order: sortingOrder
        }
      }).finish(),
      response: r => {
        let {
          identities: _identities,
          totalIdentitiesCount
        } = api.ApplicationListIdentitiesResponse.decode(r);
        return {
          identities: _identities.map(i => {
            let identity = IdentitySerializer.deserialize(i.identity);
            return {
              identity,
              auth: i.auth
            };
          }),
          totalIdentitiesCount
        };
      }
    });
  }

  /**
   * Get the an application identity auth object.
   * @param appID the app ID
   * @param dataPepsLogin identity's DataPeps login
   * @return(p) On success the promise will be resolved with the identity's auth object and its metadata that contains:
   * - identity's DataPeps login
   * - application configuration ID that corresponds to the auth object
   * On error the promise will be rejected with an {@link Error} with kind:
   * - `IdentityCannotAssumeOwnership` if the client cannot assume the application.
   * - `IdentityNotFound` if the identity with the dataPepsLogin does not exist or is not configured as an application identty.
   */
  async getIdentityAuth(
    appID: string,
    dataPepsLogin: string
  ): Promise<ApplicationAPI.IdentityAuthWithContext> {
    return await this.session.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: `/api/v4/application/identity/${encodeURI(dataPepsLogin)}/auth`,
      assume: {
        login: appID,
        kind: IdentityAccessKind.READ
      },
      response: r => {
        let response = api.ApplicationGetIdentityAuthResponse.decode(r);
        return {
          auth: {
            jwt: {
              token: response.auth.jwt.token
            }
          },
          identityLogin: response.login,
          applicationConfigID: {
            appID: response.configID.appID,
            version: response.configID.version
          }
        };
      }
    });
  }

  /**
   * Get user's application login from the user's DataPeps login
   * @param dataPepsLogin the user's login in DataPeps
   * @return Returns the user's application login used to generate the given DataPeps login.
   * If the dataPepsLogin is null, undefined, empty or malformatted returns an empty string.
   */
  static extractLoginFromDataPepsLogin(dataPepsLogin: string) {
    dataPepsLogin = dataPepsLogin == null ? "" : dataPepsLogin;
    let i = dataPepsLogin.lastIndexOf("@");
    if (i === -1) {
      return "";
    }
    return dataPepsLogin.substr(0, i);
  }

  /** Returns all sessions that been created on behalf of the application.
   * @param appID the app ID
   * @param offset the offset
   * @param limit the limit
   * @return(p) On success the promise will be resolved with an ApplicationAPI.IdentitySession[].
   * On error the promise will be rejected with an {@link Error} with kind:
   * - `IdentityCannotAssumeOwnership` if cannot have right to the application.
   * - `IdentityNotFound` if the identity `appID` doesn't exists.
   */

  async listSessions(
    appID: string,
    offset: number,
    limit: number,
    since?: number
  ): Promise<ApplicationAPI.IdentitySession[]> {
    since = since == null ? 0 : since;
    return await this.session.doProtoRequest<ApplicationAPI.IdentitySession[]>({
      path: `/api/v4/application/${encodeURI(appID)}/identities-session/list`,
      method: "POST",
      expectedCode: 200,
      assume: { login: appID, kind: IdentityAccessKind.READ },
      body: api.ApplicationIdentitySessionListRequest.encode({
        appID,
        since,
        offset,
        limit
      }).finish(),
      response: r => {
        let list = api.ApplicationIdentitySessionListResponse.decode(r);
        return <ApplicationAPI.IdentitySession[]>list.sessions;
      }
    });
  }
}
