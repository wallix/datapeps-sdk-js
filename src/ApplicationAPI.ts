import { ApplicationJWT } from "./ApplicationJWT";
import { api } from "./proto";
import { Session } from "./Session";
import { IdentityAccessKind } from "./IdentityAPI";

export namespace ApplicationAPI {
  export type Config = {
    jwt?: ApplicationJWT.Config;
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
      code: 201,
      path: `/api/v4/identity/${encodeURI(appID)}/configure-as-application`,
      request: () =>
        api.IdentityConfigurationAsApplicationRequest.encode({
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
      code: 200,
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
}
