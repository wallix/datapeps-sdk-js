import { api } from "./proto";
import { Uint8Tool } from "./Tools";
import * as HTTP from "./HTTP";
import { createWithEncryption } from "./ResourceInternal";
import { IdentityFields } from "./IdentityAPI";
import { Session } from "./Session";
import { ResourceAPI } from "./ResourceAPI";
import { IdentityKeySetAPI } from "./IdentityKeySetAPI";

export type ApplicationIdentityAuth = {
  jwt: {
    token: string;
  };
};

/**
 * Create a user thanks an external referential of identities
 * @param appID The identifier of a configured application
 * @param auth The parameter that allows DataPeps to authenticate the user
 * @param secret The identity secret
 * On error the promise will be rejected with an {@link Error} with kind:
 * - `ApplicationInvalidToken` if the JWT token returned by the connector is invalid.
 * - `ApplicationConfigNotFound` if the `appID` is not configured or if the identity `appID` doesn't exists.
 */
export async function createUser(
  appID: string,
  auth: ApplicationIdentityAuth,
  secret: string | Uint8Array
): Promise<api.RegisterApplicationIdentityResponse> {
  let secretBytes = Uint8Tool.convert(secret);

  let { keySet, encryptedKeySet } = IdentityKeySetAPI.initWithSecret(
    { version: 1, login: null },
    secretBytes
  );

  let payload = Uint8Tool.convert(
    JSON.stringify({
      appID
    })
  );

  let identity: IdentityFields = {
    login: null, // ignored by backend
    name: null, // ignored by backend
    kind: `pepsswarm/4`,
    payload
  };

  const appIdentityResourceKind = "internal/application/secret";
  let resource = createWithEncryption<Uint8Array>(
    secretBytes,
    keySet,
    appIdentityResourceKind,
    { serialize: u => u }
  );
  let { body } = await HTTP.client.doRequest<
    api.RegisterApplicationIdentityResponse
  >({
    method: "POST",
    expectedCode: 201,
    path: `/api/v1/application/${appID}/identity`,
    body: api.RegisterApplicationIdentityRequest.encode({
      appID,
      auth,
      encryption: encryptedKeySet,
      identity,
      resources: { appSecret: resource.resourceRequestBody }
    }).finish(),
    response: api.RegisterApplicationIdentityResponse.decode,
    headers: new Headers({ "content-type": "application/x-protobuf" })
  });
  return body;
}

export async function secure(
  appID: string,
  login: string,
  secret: string | Uint8Array
): Promise<{ session: Session; secret: Uint8Array }> {
  let datapepsLogin = getLogin(login, appID);
  let session = await Session.login(datapepsLogin, secret);

  let appSecretResource = await new ResourceAPI(session).getNamed<Uint8Array>(
    datapepsLogin,
    "appSecret",
    { parse: u => u }
  );
  return { session, secret: appSecretResource.payload };
}

export function getLogin(login: string, appID: string): string {
  let appLogin = login.concat("@", appID);
  return appLogin;
}
