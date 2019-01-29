import { ApplicationJWT } from "./ApplicationJWT";
import { api } from "./proto";
import { Session } from "./Session";
import {
  IdentityAccessKind,
  Identity,
  IdentitySortingField
} from "./IdentityAPI";
import {
  IdentitySerializer,
  IdentitySortingOrder as ApplicationIdentitySortingOrder,
  IdentityRequestsUtils
} from "./IdentityInternal";

export { ApplicationIdentitySortingOrder };

/** Allows to indicate which kind of field should be sorted. */
export enum ApplicationIdentitySortingField {
  LOGIN = 0,
  CREATED = 1
}

export namespace ApplicationAPI {
  export type Config = {
    jwt?: ApplicationJWT.Config;
  };

  export type UsageOverview = {
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

export class ApplicationAPI {
  private session: Session;

  constructor(session: Session) {
    this.session = session;
  }

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
  async putConfig(appID: string, config: ApplicationAPI.Config): Promise<void> {
    if (!("jwt" in config)) {
      return;
    }
    const jwtConfig = config.jwt;
    let c = {
      jwt: { key: jwtConfig.key, claimForLogin: jwtConfig.claimForLogin }
    };
    if ("signAlgorithm" in jwtConfig) {
      c.jwt["signAlgorithm"] = jwtConfig.signAlgorithm.valueOf();
    }
    return await this.session.doProtoRequest<void>({
      method: "PUT",
      assume: { login: appID, kind: IdentityAccessKind.WRITE },
      expectedCode: 201,
      path: `/api/v4/identity/${encodeURI(appID)}/configure-as-application`,
      body: api.IdentityConfigurationAsApplicationRequest.encode({
        Login: appID,
        config: c
      }).finish()
    });
  }

  /**
   * Get configuration of an application
   * @param appID the app ID
   * @return(p) On success the promise will be resolved with an ApplicationConfig.
   * On error the promise will be rejected with an {@link Error} with kind:
   * - `IdentityCannotAssumeAccess` if cannot have right to read the configuration.
   * - `IdentityNotFound` if the identity `appID` doesn't exists.
   * - `ApplicationConfigNotFound` if configuration doesn't exists.
   */
  async getConfig(appID: string): Promise<ApplicationAPI.Config> {
    return await this.session.doProtoRequest<ApplicationAPI.Config>({
      method: "GET",
      assume: { login: appID, kind: IdentityAccessKind.READ },
      expectedCode: 200,
      path: `/api/v4/identity/${encodeURI(appID)}/configure-as-application`,
      response: r => {
        let config = api.IdentityConfigurationAsApplicationResponse.decode(r)
          .config;
        return <ApplicationAPI.Config>{
          jwt: {
            key: config.jwt.key,
            signAlgorithm: config.jwt.signAlgorithm.valueOf(),
            claimForLogin: config.jwt.claimForLogin
          }
        };
      }
    });
  }

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
  async getUsageOverview(
    appID: string,
    options?: {
      since?: number;
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
        let overview = api.ApplicationUsageOverviewResponse.decode(r).overview;
        return <ApplicationAPI.UsageOverview>{
          jwt: {
            totalIdentities: 0,
            newIdentities: 0,
            newSessions: 0,
            ...overview.jwt
          },
          delegatedAccess: {
            newRequested: 0,
            newResolved: 0,
            newDistinctRequested: 0,
            newDistinctResolved: 0,
            ...overview.delegates
          }
        };
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
   * Get user's application login from the user's DataPeps login
   * @param dataPepsLogin the user's login in DataPeps
   * @return Returns the user's application login used to generate the given DataPeps login.
   * If the dataPepsLogin is null, undefined, empty or malformatted returns an empty string.
   */
  static extractLoginFromDataPepsLogin(dataPepsLogin) {
    dataPepsLogin = dataPepsLogin == null ? "" : dataPepsLogin;
    let i = dataPepsLogin.lastIndexOf("@");
    if (i == -1) {
      return "";
    }
    return dataPepsLogin.substr(0, i);
  }
}
