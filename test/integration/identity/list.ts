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
    let B = await Context.registerIdentities(init, n, { kind, name: "bob" });
    let A = await Context.registerIdentities(init, n, { kind, name: "alice" });
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
      let expected: Identity<Uint8Array>[] = [];
      expected.push(...ctx.A.identities);
      expected.push(...ctx.B.identities);
      let result = await new IdentityAPI(ctx.adminSession).list({
        offset: 0,
        limit: n * 2,
        kind: kind,
        sortingField: field,
        sortingOrder: order
      });
      let resultsLogins = result.identities.map(i => i.login);
      let expectedLogins = expected.map(i => i.login);
      expect(resultsLogins).to.have.members(expectedLogins);
      expectInOrder(result.identities, field, order);
      expect(expected.length).to.be.equal(result.totalIdentitiesCount);
    });
  }

  function expectInOrder(
    identities: Identity<Uint8Array>[],
    sortingField: IdentitySortingField,
    order: IdentitySortingOrder,
    msg?: string
  ) {
    sortingField =
      sortingField == null ? IdentitySortingField.CREATED : sortingField;
    order = order == null ? IdentitySortingOrder.ASC : order;
    let identitiesFields: Date[] | string[];
    switch (sortingField) {
      case IdentitySortingField.LOGIN:
        identitiesFields = identities.map(i => i.login);
        break;
      case IdentitySortingField.CREATED:
        identitiesFields = identities.map(i => i.created);
        break;
      case IdentitySortingField.KIND:
        identitiesFields = identities.map(i => i.kind);
        break;
      default:
        throw Error(
          "unknown application identity sorting field type: " + sortingField
        );
    }
    let secondaryFields = identities.map(i => i.login);
    if (order === IdentitySortingOrder.DESC) {
      identitiesFields = identitiesFields.reverse();
      secondaryFields = secondaryFields.reverse();
    }
    let errorMessageGenerator = (
      first: Date | string,
      second: Date | string,
      index: number,
      isSecondary: boolean
    ) => {
      let secondaryMsg = isSecondary ? " (secondary field)" : "";
      msg =
        msg == null ? "identities returned are not ordered as expected" : msg;
      return `${msg}: ${first} (${index}) < ${second} (${index -
        1}) ${secondaryMsg}`;
    };
    for (let i = 1; i < identitiesFields.length; i++) {
      expect(
        identitiesFields[i] >= identitiesFields[i - 1],
        errorMessageGenerator(
          identitiesFields[i],
          identitiesFields[i - 1],
          i,
          false
        )
      ).to.be.true;
      if (identitiesFields[i] == identitiesFields[i - 1]) {
        expect(
          secondaryFields[i] >= secondaryFields[i],
          errorMessageGenerator(
            secondaryFields[i],
            secondaryFields[i - 1],
            i,
            false
          )
        ).to.be.true;
      }
    }
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
      expect(expected.map(i => i.login)).to.include.members(
        result.identities.map(i => i.login)
      );
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
      expect(result.identities.map(i => i.login)).to.have.members(
        expected.map(i => i.login)
      );
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
