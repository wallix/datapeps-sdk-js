import * as Context from "../../Context";
import { expect } from "chai";
import { itError } from "../../Utils";
import { ServerError } from "../../../src/DataPeps";
import {
  Identity,
  IdentityAPI,
  IdentitySortingField,
  IdentitySortingOrder
} from "../../../src/IdentityAPI";

describe("identity.list", () => {
  let n = 10;
  let kind: string;
  let ctx: Context.adminCtx & {
    A: Context.identitiesCtx;
    B: Context.identitiesCtx;
  };

  before(async () => {
    let init = await Context.init();
    kind = `list/${init.seed}`;
    let admin = await Context.admin();
    let A = await Context.identities(init, n, { kind, name: "alice" });
    let B = await Context.identities(init, n, { kind, name: "bob" });
    ctx = { ...admin, A, B };
  });

  ///////////////////////////////////////////////
  // Test nominal cases
  ///////////////////////////////////////////////

  // Test forEach sortingField / sortingOrder

  function itWithSortingOptions(
    field: IdentitySortingField,
    order: IdentitySortingOrder
  ) {
    return it(`list users in an ordered way (${IdentitySortingField[field]}, ${
      IdentitySortingOrder[order]
    })`, async () => {
      let expected = [];
      expected.push(...ctx.A.identities);
      expected.push(...ctx.B.identities);
      let result = await new IdentityAPI(ctx.adminSession).list({
        offset: 0,
        limit: n * 2,
        kind: kind,
        sortingField: field,
        sortingOrder: order
      });
      expectIdentitiesListAreEquals(
        sortIdentities(field, order, expected),
        result.identities
      );
      expect(expected.length).to.be.equal(result.totalIdentitiesCount);
    });
  }

  // All sorting fields
  let sortingFields = Object.keys(IdentitySortingField)
    .map(key => Number(key) as IdentitySortingField)
    .filter(key => !isNaN(key));
  // All sorting orders
  let sortingOrders = Object.keys(IdentitySortingOrder)
    .map(key => Number(key) as IdentitySortingOrder)
    .filter(key => !isNaN(key));

  sortingFields.forEach(field =>
    sortingOrders.forEach(order => itWithSortingOptions(field, order))
  );

  // Test with prefix filtering

  function itWithPrefixSearch(name: string, expectedF: () => Identity<any>[]) {
    it(`list all users with prefix search '${name}'`, async () => {
      let expected = expectedF();
      let result = await new IdentityAPI(ctx.adminSession).list({
        offset: 0,
        limit: Math.ceil(n * 2),
        kind: kind,
        search: name
      });
      expectContainsAllIdentities(expected, result.identities);
      expect(expected.length).to.be.equal(result.totalIdentitiesCount);
    });
    function itWithPage(limit, offset) {
      it(`list page(${offset}, ${limit}) users with prefix search '${name}'`, async () => {
        let expected = expectedF();
        let result = await new IdentityAPI(ctx.adminSession).list({
          offset,
          limit,
          kind: kind,
          search: name
        });
        expectContainsAllIdentities(result.identities, expected, false);
        expect(expected.length).to.be.equal(result.totalIdentitiesCount);
      });
    }
    itWithPage(Math.ceil(n / 2), 0);
    itWithPage(0, Math.ceil(n / 2));
    itWithPage(Math.ceil(n / 4), Math.ceil(n / 2));
    itWithPage(n * 3, 0);
  }
  itWithPrefixSearch("alice", () => ctx.A.identities);
  itWithPrefixSearch("bob", () => ctx.B.identities);

  ///////////////////////////////////////////////
  // Error cases
  ///////////////////////////////////////////////

  itError(
    "list users in an ordered way according to a column that does not exist",
    () =>
      new IdentityAPI(ctx.adminSession).list({
        sortingField: -1,
        sortingOrder: IdentitySortingOrder.ASC
      }),
    ServerError.RequestBadRequest
  );

  itError(
    "list users in an ordered way according to an order that does not exist",
    () =>
      new IdentityAPI(ctx.adminSession).list({
        sortingField: IdentitySortingField.CREATED,
        sortingOrder: -1
      }),
    ServerError.RequestBadRequest
  );

  itError(
    "list users in an ordered way according to a column and an order that both do not exist",
    () =>
      new IdentityAPI(ctx.adminSession).list({
        sortingField: -1,
        sortingOrder: -1
      }),
    ServerError.RequestBadRequest
  );

  ///////////////////////////////////////////////
  // Tools
  ///////////////////////////////////////////////

  function expectContainsAllIdentities(
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

  function expectIdentitiesListAreEquals(
    expected: Identity<Uint8Array>[],
    result: Identity<Uint8Array>[]
  ) {
    expect(
      result.length,
      "identities list hasn't the same length"
    ).to.be.equals(expected.length);
    expected.forEach((e, i) => {
      let r = result[i];
      expect(
        e.login,
        `expected[${i}](${e.login}) != result[${i}](${r.login}`
      ).to.be.deep.equal(r.login);
    });
  }

  function sortIdentities(
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
});
