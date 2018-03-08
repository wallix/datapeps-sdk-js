import { errors } from './proto';
export declare type ErrorKind = ServerKind | SDKKind;
export declare const ServerKind: typeof errors.PepsErrorKind;
export declare type ServerKind = errors.PepsErrorKind;
export declare enum SDKKind {
    BadStatusCode = -1,
    BadResponse = -2,
    NetworkException = -3,
    SDKInternalError = -4,
    SDKEncryptionDecryptFail = -5,
    IdentitySignChainInvalid = -6,
    ProtocolError = -7,
    SDKDecryptFail = -8,
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
