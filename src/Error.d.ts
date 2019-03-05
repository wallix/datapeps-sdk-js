import { api } from "./proto";
export declare type ErrorKind = ServerKind | SDKKind;
export declare const ServerKind: typeof api.PepsErrorKind;
export declare type ServerKind = api.PepsErrorKind;
export declare enum SDKKind {
    BadStatusCode = -1,
    BadResponse = -2,
    NetworkException = -3,
    SDKInternalError = -4,
    IdentitySignChainInvalid = -6,
    IdentityInvalidKeySet = -9,
    ProtocolError = -7,
    DecryptFail = -8,
    InvalidServerChain = -10,
}
/**
 * The Error class for the DataPeps SDK.
 * Most of methods of the sdk return a {@link Promise<A>} that on success `resolve(A)` or, if rejected, a structured Error.
 */
export declare class Error {
    kind: ErrorKind;
    name: string;
    message: string;
    payload: any;
    code: number;
    constructor(properties: {
        kind: ErrorKind;
        payload?: any;
        code?: number;
    });
}
export declare function kindName(kind: ErrorKind): string;
