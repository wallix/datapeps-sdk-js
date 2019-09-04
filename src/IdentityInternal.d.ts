import { wallix } from "./proto";
import { Identity } from "./IdentityAPI";
import api = wallix.gopeps.protobuf.datapeps;
export declare class IdentitySerializer {
    static deserialize(t: api.IIdentity): Identity<Uint8Array>;
}
/** Allows to specify whether the results should be sorted in ascending or descending order. */
export declare enum IdentitySortingOrder {
    DESC = 0,
    ASC = 1,
}
export declare class IdentityRequestsUtils {
    static resolveSortingOrder(order: IdentitySortingOrder): api.SortingOrder;
}
