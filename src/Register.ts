import * as Long from "long";
import * as protobufjs from "protobufjs";
import { api } from "./proto";
import { Base64, Uint8Tool } from "./Tools";
import { Encryption } from "./CryptoFuncs";
import * as HTTP from "./HTTP";

import { IdentityFields } from "./IdentityAPI";
export {
  Error,
  ErrorKind,
  ServerKind as ServerError,
  SDKKind as SDKError
} from "./Error";

protobufjs.util.Long = Long;
protobufjs.configure();

/**
 * Register a new DataPeps identity.
 * @param identity The description of the identity to register.
 *  The login MUST be a peps email address, i.e. <login>@<pepsdomain>
 * @param secret The secret of the identity.
 * @return(p) a promise that rejects with an {@link Error} with kind
 * - `IdentityInvalidLogin` if identity.login is not a valid login.
 * - `IdentityAlreadyExists` if identity.login already exists.
 */
export async function register(
  identity: IdentityFields,
  secret: string | Uint8Array
): Promise<void> {
  return await _register("/api/v4/register", identity, secret, r =>
    api.IdentityRegisterRequest.encode(r).finish()
  );
}

/**
 * Register a new external identity, using a preallocated token from {@link sendRegisterLink}.
 * @param identity The description of the identity to register.
 *  The login MUST be the email address associated with the token, i.e. <login>@<domain>
 * @param secret The secret of the identity.
 * @return(p) a promise that rejects with an {@link Error} with kind
 * - `IdentityInvalidLogin` if identity.login is not the one associated with the token.
 * - `IdentityAlreadyExists` if identity.login already exists.
 * - `RegisterTokenNotFound` if `token` is not found.
 */
export async function registerWithToken(
  token: string | Uint8Array,
  identity: IdentityFields,
  secret: string | Uint8Array
): Promise<void> {
  let btoken = token instanceof Uint8Array ? Base64.encode(token) : token;
  return await _register(
    "/api/v4/register/link/" + encodeURIComponent(btoken),
    identity,
    secret,
    r => api.RegisterPostLinkTokenRequest.encode(r).finish()
  );
}

async function _register(
  path: string,
  identity: IdentityFields,
  secret: string | Uint8Array,
  request: (
    r: { identity: api.IIdentityFields; encryption: api.IIdentityEncryption }
  ) => Uint8Array
): Promise<void> {
  let encryption = new Encryption();
  encryption.generate(Uint8Tool.convert(secret), null);
  await HTTP.client.doRequest<void>({
    method: "POST",
    expectedCode: 201,
    path,
    body: request({ identity, encryption }),
    headers: new Headers({
      "content-type": "application/x-protobuf"
    })
  });
  return;
}

/**
 * Send an email to register a new identity.
 * The email sent will contain a registration link and a registration
 * token which can be used by {@link registerWithToken}
 * @param email The email address recipient for the registration email.
 * @return(p) On success the promise will be resolved with void.
 * On error the promise will be rejected with an {@link Error} with kind
 * - `RegisterInvalidEmail` if the `email` is badly formatted.
 */
export async function sendRegisterLink(email: string): Promise<void> {
  await HTTP.client.doRequest<void>({
    method: "POST",
    expectedCode: 201,
    path: "/api/v4/register/link",
    body: api.RegisterLinkRequest.encode({
      email
    }).finish(),
    headers: new Headers({
      "content-type": "application/x-protobuf"
    })
  });
  return;
}
