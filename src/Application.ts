import {
  ApplicationAPI,
  Session,
  ApplicationJWT,
  IdentityFields
} from "./DataPeps";
import * as DataPeps from "./DataPeps";
import { Resource, ResourceImpl } from "./Resource";
import { api } from "./proto";
import { IdentityAccessKind } from "./Interface";
import { Uint8Tool, Base64 } from "./Tools";
import { Encryption } from "./CryptoFuncs";
import * as HTTP from "./HTTP";

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
  let appLogin = composeApplicationLogin(login, appID);
  let session = await DataPeps.login(appLogin, secret);
  let identityLogin = login.concat("@", appID);

  let appSecretResource = await session.Identity.getNamedResource<Uint8Array>(
    identityLogin,
    "appSecret",
    { parse: u => u }
  );
  return { session, secret: appSecretResource.payload };
}

function composeApplicationLogin(login: string, appID: string): string {
  let appLogin = login.concat("@", appID);
  return appLogin;
}
