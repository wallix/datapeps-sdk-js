import { api } from "./proto";
import { Identity } from './IdentityAPI';

export class IdentityX {
  static fromapi(t: api.IIdentity): Identity<Uint8Array> {
    let x = api.Identity.create(t);
    return {
      ...x,
      created: new Date((t.created as number) * 1000)
    };
  }

  static toapi(i: Identity<Uint8Array>): api.IIdentity {
    return {
      ...i,
      created: null
    };
  }
}