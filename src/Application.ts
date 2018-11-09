import {
  ApplicationAPI,
  ApplicationJwtConfig,
  Session,
  ApplicationJwtAlgorithm
} from "./DataPeps";
import { api } from "./proto";
import { IdentityAccessKind } from "./Interface";
export class ApplicationImpl implements ApplicationAPI {
  private session: Session;

  constructor(session: Session) {
    this.session = session;
  }

  async putConfig(appID: string, config: ApplicationJwtConfig): Promise<void> {
    let c = { jwt: { key: config.key, claimForLogin: config.claimForLogin } };
    if ("signAlgorithm" in config) {
      c.jwt["signAlgorithm"] = config.signAlgorithm.valueOf();
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

  async getConfig(appID: string): Promise<ApplicationJwtConfig> {
    return await this.session.doProtoRequest<ApplicationJwtConfig>({
      method: "GET",
      assume: { login: appID, kind: IdentityAccessKind.READ },
      code: 200,
      path: `/api/v4/identity/${encodeURI(appID)}/configure-as-application`,
      response: r => {
        let config = api.IdentityConfigurationAsApplicationResponse.decode(r)
          .config;
        return <ApplicationJwtConfig>{
          key: config.jwt.key,
          signAlgorithm: config.jwt.signAlgorithm.valueOf(),
          claimForLogin: config.jwt.claimForLogin
        };
      }
    });
  }
}
