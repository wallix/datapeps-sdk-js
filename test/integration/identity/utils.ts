import { expect } from "chai";

import {
  Identity,
  IdentitySortingField,
  IdentitySortingOrder
} from "../../../src/DataPeps";

export function expectContainsAllIdentities(
  expected: Identity<Uint8Array>[],
  result: Identity<Uint8Array>[],
  both = true
) {
  if (both) {
    expect(
      result.length,
      "identities list hasn't the same length"
    ).to.be.equals(expected.length);
  }
  expected.forEach(e => {
    expect(
      result.find(r => r.login === e.login),
      `cannot find '${e.login}' in result`
    ).to.be.not.null;
  });
}

export function expectIdentitiesListAreEquals(
  expected: Identity<Uint8Array>[],
  result: Identity<Uint8Array>[]
) {
  expect(result.length, "identities list hasn't the same length").to.be.equals(
    expected.length
  );
  expected.forEach((e, i) => {
    let r = result[i];
    expect(
      e.login,
      `expected[${i}](${e.login}) != result[${i}](${r.login}`
    ).to.be.deep.equal(r.login);
  });
}

export function sortIdentities(
  sortingField: IdentitySortingField,
  sortingOrder: IdentitySortingOrder,
  identities: Identity<any>[]
) {
  return identities.sort(compareIdentity(sortingField, sortingOrder));
}

function compareIdentity(
  sortingField: IdentitySortingField,
  sortingOrder: IdentitySortingOrder
) {
  return function(a: Identity<any>, b: Identity<any>) {
    let afield, bfield;
    switch (sortingField) {
      case IdentitySortingField.CREATED:
        afield = a.created;
        bfield = b.created;
        break;
      case IdentitySortingField.KIND:
        afield = a.created;
        bfield = b.created;
        break;
      case IdentitySortingField.LOGIN:
        afield = a.created;
        bfield = b.created;
        break;
      default:
        throw new Error("sortingField not found");
    }
    switch (sortingOrder) {
      case IdentitySortingOrder.ASC:
        return afield < bfield ? -1 : afield > bfield ? 1 : 0;
      case IdentitySortingOrder.DESC:
        return afield < bfield ? 1 : afield > bfield ? -1 : 0;
    }
  };
}
