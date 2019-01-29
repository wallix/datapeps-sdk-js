import { api } from "./proto";
import { Identity } from './IdentityAPI';
export declare class IdentityX {
    static fromapi(t: api.IIdentity): Identity<Uint8Array>;
    static toapi(i: Identity<Uint8Array>): api.IIdentity;
}
