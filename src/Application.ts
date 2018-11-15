import {
  ApplicationAPI,
  ApplicationJwtConfig,
  Session,
  ApplicationJwtAlgorithm,
  IdentityFields
} from "./DataPeps";
import * as DataPeps from "./DataPeps";
import { Resource, ResourceImpl } from "./Resource";
import { api } from "./proto";
import { IdentityAccessKind } from "./Interface";
import { Uint8Tool, Base64 } from "./Tools";
import { Encryption } from "./CryptoFuncs";
import * as HTTP from "./HTTP";

export interface ApplicationJWTConnector<AppSession, Secret> {
  createSession: (login: string, secret: Secret) => Promise<AppSession>;
  getToken: (T) => Promise<string>;
}

export async function createUser(
  appID: string,
  auth: { jwt: { token: string } },
  secret: string | Uint8Array
): Promise<api.RegisterExternalIdentityResponse> {
  let encryption = new Encryption();
  let secretBytes = Uint8Tool.convert(secret);
  encryption.generate(secretBytes, null);

  let payload = Uint8Tool.convert(JSON.stringify({}));

  let identity: IdentityFields = {
    login: null, // ignored by backend
    name: null, // ignored by backend
    kind: `${appID}/application/user`,
    payload
  };

  let resource = ResourceImpl.createWithEncryption<Uint8Array>(
    "application/secret",
    secretBytes,
    encryption,
    { serialize: u => u }
  );
  let body = api.RegisterExternalIdentityRequest.encode({
    appID,
    auth,
    encryption,
    identity,
    resources: { appSecret: resource.resourceRequestBody }
  }).finish();
  return await HTTP.client.doRequest<api.RegisterExternalIdentityResponse>({
    method: "POST",
    code: 201,
    path: `/api/v4/register/external-identity`,
    request: () => body,
    response: api.RegisterExternalIdentityResponse.decode,
    before: (x, b) =>
      x.setRequestHeader("content-type", "application/x-protobuf")
  });
}

export async function secure(
  appID: string,
  login: string,
  secret: string | Uint8Array
): Promise<{ session: Session; secret: Uint8Array }> {
  let appLogin = ApplicationImpl.composeApplicationLogin(login, appID);
  let session = await DataPeps.login(appLogin, secret);
  let identityLogin = login.concat("@", appID);

  let appSecretResource = await session.Identity.getNamedResource<Uint8Array>(
    identityLogin,
    "appSecret",
    { parse: u => u }
  );
  return { session, secret: appSecretResource.payload };
}

export async function createJWTSession<
  AppSession,
  Secret extends string | Uint8Array
>(
  appID: string,
  appLogin: string,
  secret: Secret,
  connector: ApplicationJWTConnector<AppSession, Secret>
): Promise<{ session: Session; app: AppSession; new: boolean }> {
  // Try to connect to DataPeps
  try {
    let { session, secret: appSecret } = await secure(appID, appLogin, secret);
    // The DataPeps Identity exists, connect to the application
    if (secret instanceof Uint8Array) {
      secret = appSecret as Secret;
    } else {
      secret = new TextDecoder().decode(appSecret) as Secret;
    }
    let app = await connector.createSession(appLogin, secret);
    return { session, app, new: false };
  } catch (e) {
    // If the DataPeps Identity doesn't exists
    if (e.kind == api.PepsErrorKind.IdentityNotFound) {
      // Connect to the application
      let app = await connector.createSession(appLogin, secret);
      // Get the jwt token to create the DataPeps Identity for the Application End-User.
      let token = await connector.getToken(app);
      // Create the DataPeps Identity
      await createUser(appID, { jwt: { token } }, secret);
      // Login to DataPeps
      let { session } = await secure(appID, appLogin, secret);
      return { session, app, new: true };
    }
    throw e;
  }
}

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

  static composeApplicationLogin(login: string, appID: string): string {
    let appLogin = login.concat("@", appID);
    return appLogin;
  }
}
