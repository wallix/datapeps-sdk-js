import * as Long from "long";
import * as protobufjs from "protobufjs";
import * as HTTP from "./HTTP";

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

export * from "./Register";
export * from "./ID";
export * from "./Session";
export * from "./DelegatedAccess";
export * from "./IdentityAPI";
export * from "./ResourceAPI";
export * from "./AdminAPI";
export * from "./ApplicationAPI";
export * from "./ApplicationJWT";
