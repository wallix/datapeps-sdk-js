import { errors } from './proto'

export type ErrorKind = ServerKind | SDKKind
export const ServerKind = errors.PepsErrorKind
export type ServerKind = errors.PepsErrorKind
export enum SDKKind {
    BadStatusCode = -1,
    BadResponse = -2,
    NetworkException = -3,
    SDKInternalError = -4,
    BadSecret = -5,
    IdentitySignChainInvalid = -6,
    ProtocolError = -7,
    DecryptFail = -8,
    InvalidServerChain = -10,
}

/**
 * The Error class for the DataPeps SDK.
 * Most of methods of the sdk return a {@link Promise<A>} that on success `resolve(A)` or, if rejected, a structured Error.
 */
export class Error {

    kind: ErrorKind
    name: string
    message: string
    payload: any
    code: number


    constructor(properties: { kind: ErrorKind, payload?: any, code?: number }) {
        // console.log("error", properties)
        // var err = new global.Error();
        // console.log("stack", err.stack)
        this.name = "DataPepsError"
        let kname = errors.PepsErrorKind[properties.kind]
        if (kname == null) {
            kname = SDKKind[properties.kind]
        }
        this.message = "DataPepsError(" + kname + ")"
        this.kind = properties.kind
        this.payload = properties.payload
        this.code = properties.code
    }
}