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
import {
  expectIdentitiesListAreEquals,
  sortIdentities,
  expectContainsAllIdentities
} from "./utils";

describe("identity.list", () => {
  const defaultLimit = 10;

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
    let A = await Context.registerIdentities(init, n, { kind, name: "alice" });
    let B = await Context.registerIdentities(init, n, { kind, name: "bob" });
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

  // Tests with sorting fields

  sortingFields.forEach(field =>
    sortingOrders.forEach(order => itWithSortingOptions(field, order))
  );

  // Test with prefix filtering

  function itWithPage(
    expectedF: () => Identity<any>[],
    options?: {
      limit?: number;
      offset?: number;
      search?: string;
      expectedIdentitiesLength?: number;
    }
  ) {
    options = options == null ? {} : options;
    it(`list page(limit=${options.limit}, offset=${options.offset}, expected=${
      options.expectedIdentitiesLength
    }) users with prefix search '${options.search}'`, async () => {
      let expected = expectedF();
      let result = await new IdentityAPI(ctx.adminSession).list({
        offset: options.offset,
        limit: options.limit,
        kind: kind,
        search: options.search
      });
      expectContainsAllIdentities(result.identities, expected, false);
      expect(expected.length).to.be.equal(result.totalIdentitiesCount);
      if (options.expectedIdentitiesLength != null) {
        expect(result.identities.length).to.equal(
          options.expectedIdentitiesLength
        );
      }
    });
  }

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

    function itWithPageInternal(options: {
      limit?: number;
      offset?: number;
      expectedIdentitiesLength: number;
    }) {
      itWithPage(expectedF, {
        ...options,
        search: name
      });
    }

    itWithPageInternal({
      limit: Math.ceil(n / 2),
      expectedIdentitiesLength: Math.ceil(n / 2)
    });
    // the default limit is assumed to be larger than Math.ceil(n/2); if it is not, the test fails
    itWithPageInternal({
      offset: Math.ceil(n / 2),
      expectedIdentitiesLength: defaultLimit - Math.ceil(n / 2)
    });
    itWithPageInternal({
      limit: Math.ceil(n / 4),
      offset: Math.ceil(n / 2),
      expectedIdentitiesLength: Math.ceil(n / 4)
    });
    itWithPageInternal({
      limit: n * 3,
      expectedIdentitiesLength: n
    });
    itWithPageInternal({
      limit: Math.ceil(n / 2),
      offset: n * 2,
      expectedIdentitiesLength: 0
    });
    itWithPageInternal({
      limit: Math.ceil(n * 2),
      expectedIdentitiesLength: n
    });
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
});
