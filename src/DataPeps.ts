import * as Long from "long";
import * as protobufjs from "protobufjs";
import * as HTTP from "./HTTP";
import { getLogin as appGetLogin } from "./Application";

export {
  Error,
  ErrorKind,
  ServerKind as ServerError,
  SDKKind as SDKError
} from "./Error";

protobufjs.util.Long = Long;
protobufjs.configure();

/**
 * Configure the endpoint of the SDK.
 * @param APIUrl The url of the DataPeps service.
 */
export function configure(APIUrl: string, WSUrl?: string) {
  HTTP.configure(APIUrl);
}

/**
 * Gets the DataPeps login from the application identity login.
 * @param appLogin The application identity login (must not be null)
 * @param appID The application ID (must not be null)
 * @returns The DataPeps login of the application identity.
 */
export function getLogin(appLogin: string, appID: string) {
  return appGetLogin(appLogin, appID);
}

export * from "./Register";
export * from "./ID";
export * from "./Session";
export * from "./DelegatedAccess";
export * from "./IdentityAPI";
export * from "./ResourceAPI";
export * from "./AdminAPI";
export * from "./ApplicationAPI";
export * from "./ApplicationJWT";
export * from "./Tenant";
export { Uint8Converter } from "./Tools";
