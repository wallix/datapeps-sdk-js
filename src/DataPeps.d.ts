export { Error, ErrorKind, ServerKind as ServerError, SDKKind as SDKError } from "./Error";
/**
 * Configure the endpoint of the SDK.
 * @param APIUrl The url of the DataPeps service.
 */
export declare function configure(APIUrl: string, WSUrl?: string): void;
export * from "./Register";
export * from "./ID";
export * from "./Session";
export * from "./DelegatedAccess";
export * from "./IdentityAPI";
export * from "./ResourceAPI";
export * from "./AdminAPI";
export * from "./ApplicationAPI";
export * from "./ApplicationJWT";
export { Uint8Converter } from "./Tools";
