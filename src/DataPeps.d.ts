export { Error, ErrorKind, ServerKind as ServerError, SDKKind as SDKError } from "./Error";
/**
 * Configure the endpoint of the SDK.
 * @param APIUrl The url of the DataPeps service.
 */
export declare function configure(APIUrl: string, WSUrl?: string): void;
/**
 * Gets the DataPeps login from the application identity login.
 * @param appLogin The application identity login (must not be null)
 * @param appID The application ID (must not be null)
 * @returns The DataPeps login of the application identity.
 */
export declare function getLogin(appLogin: string, appID: string): string;
export * from "./Register";
export * from "./ID";
export * from "./Session";
export * from "./DelegatedAccess";
export * from "./IdentityAPI";
export * from "./ResourceAPI";
export * from "./AdminAPI";
export * from "./ApplicationAPI";
export * from "./ApplicationJWT";
export * from "./GraphQL";
export { Uint8Converter } from "./Tools";
