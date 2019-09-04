import { wallix } from "./proto";

import api = wallix.gopeps.protobuf.datapeps;

export type ErrorKind = ServerKind | SDKKind;
export const ServerKind = api.PepsErrorKind;
export type ServerKind = api.PepsErrorKind;
export enum SDKKind {
  BadStatusCode = -1,
  BadResponse = -2,
  NetworkException = -3,
  SDKInternalError = -4,
  IdentitySignChainInvalid = -6,
  IdentityInvalidKeySet = -9,
  ProtocolError = -7,
  DecryptFail = -8,
  InvalidServerChain = -10
}

/**
 * The Error class for the DataPeps SDK.
 * Most of methods of the sdk return a {@link Promise<A>} that on success `resolve(A)` or, if rejected, a structured Error.
 */
export class Error {
  kind: ErrorKind;
  name: string;
  message: string;
  payload: any;
  code: number;

  constructor(properties: {
    kind: ErrorKind;
    payload?: any;
    code?: number;
    message?: string;
  }) {
    this.name = kindName(properties.kind);
    this.kind = properties.kind;
    this.payload = properties.payload;
    this.code = properties.code;
    this.message =
      properties.message == null
        ? `DataPeps(${this.name})`
        : properties.message;
  }
}

export function kindName(kind: ErrorKind): string {
  let kname = api.PepsErrorKind[kind];
  if (kname == null) {
    kname = SDKKind[kind];
  }
  return kname;
}
