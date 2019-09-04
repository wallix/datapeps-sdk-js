import { wallix } from "./proto";
import { Identity } from "./IdentityAPI";
import { timestampToDate } from "./Tools";

import api = wallix.gopeps.protobuf.datapeps;

export class IdentitySerializer {
  static deserialize(t: api.IIdentity): Identity<Uint8Array> {
    let x = api.Identity.create(t);
    return {
      ...x,
      created: timestampToDate(t.created)
    };
  }
}

/** Allows to specify whether the results should be sorted in ascending or descending order. */
export enum IdentitySortingOrder {
  DESC = 0,
  ASC = 1
}

export class IdentityRequestsUtils {
  static resolveSortingOrder(order: IdentitySortingOrder): api.SortingOrder {
    let resolvedSortingOrder: api.SortingOrder = api.SortingOrder.ASC;
    if (order == null) {
      return resolvedSortingOrder;
    }
    if (order === IdentitySortingOrder.DESC) {
      resolvedSortingOrder = api.SortingOrder.DESC;
    } else if (order != IdentitySortingOrder.ASC) {
      resolvedSortingOrder = order as api.SortingOrder;
    }
    return resolvedSortingOrder;
  }
}
