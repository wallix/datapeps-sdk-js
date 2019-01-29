import { expect } from "chai";

import {
  ApplicationAPI,
  ApplicationJWT,
  Identity,
  ServerError,
} from "../../../src/DataPeps";
import {
  ApplicationIdentitySortingField,
  ApplicationIdentitySortingOrder
} from "../../../src/ApplicationAPI";
import { configs } from "./Utils";
import {
  initCtx,
  devCtx,
  init,
  identitiesCtx,
  userAndSessionCtx,
  userAndSession
} from "../../Context";
import { registerIdentitiesForEachApp, devWithAllConfigs } from "./Context";
import { itError } from "../../Utils";

describe("application.listIdentities", () => {
  let ctx: initCtx &
    devCtx & {
      A: identitiesCtx[];
      B: identitiesCtx[];
      toto: userAndSessionCtx;
    };
  let devAppAPI: ApplicationAPI;

  const defaultExpectedLimit = 10;
  const numberOfIdentitiesByPrefix = 5;
  const numberOfIdentities = numberOfIdentitiesByPrefix * 2;
  const loginPrefixA = "alice";

  before(async () => {
    let initCtx = await init();
    let devCtx = await devWithAllConfigs(initCtx);
    let [A, B] = await Promise.all([
      await registerIdentitiesForEachApp(
        initCtx,
        devCtx,
        configs,
        numberOfIdentities,
        {
          name: loginPrefixA
        }
      ),
      await registerIdentitiesForEachApp(
        initCtx,
        devCtx,
        configs,
        numberOfIdentities,
        {
          name: "bob"
        }
      )
    ]);
    let toto = await userAndSession(initCtx, "toto");
    ctx = { ...initCtx, ...devCtx, A, B, toto };
    devAppAPI = new ApplicationAPI(devCtx.dev.session);
  });

  ///////////////////////////////////////////////
  // Test nominal cases - forEach config
  ///////////////////////////////////////////////

  configs.forEach(({ config, secretKey }, i) => {
    function itWithPage(
      expectedFn: () => Identity<Uint8Array>[],
      options?: {
        offset?: number;
        limit?: number;
        loginPrefix?: string;
        sortingField?: ApplicationIdentitySortingField;
        sortingOrder?: ApplicationIdentitySortingOrder;
      }
    ) {
      options = options == null ? {} : options;
      it(`list application users, for app(${
        ApplicationJWT.Algorithm[config.signAlgorithm]
      }), page(limit=${options.limit}, offset=${options.offset}, loginPrefix=${
        options.loginPrefix
      }, sortingField=${options.sortingField}, sortingOrder=${
        options.sortingOrder
      })`, async () => {
        let {
          identities,
          totalIdentitiesCount
        } = await devAppAPI.listIdentities(ctx.apps[i].identity.login, options);
        let expected = expectedFn();
        expect(expected.map(i => i.login)).to.include.members(
          identities.map(i =>
            ApplicationAPI.extractLoginFromDataPepsLogin(i.identity.login)
          )
        );
        expect(identities.length).to.equal(
          expectedResultSize(expected, options.offset, options.limit),
          `the actual size of identities list is different from the expected`
        );
        expect(totalIdentitiesCount).to.equal(
          expected.length,
          `actual identities: ${identities}`
        );
        if (options.sortingField != null || options.sortingOrder != null) {
          expectInOrder(
            identities.map(i => i.identity),
            options.sortingField,
            options.sortingOrder,
            `listed identities are sorted in an unexpected way`
          );
        }
      });

      function expectInOrder(
        identities: Identity<Uint8Array>[],
        sortingField: ApplicationIdentitySortingField,
        order: ApplicationIdentitySortingOrder,
        msg?: string
      ) {
        sortingField =
          sortingField == null
            ? ApplicationIdentitySortingField.CREATED
            : sortingField;
        order = order == null ? ApplicationIdentitySortingOrder.ASC : order;
        let identitiesFields: Date[] | string[];
        switch (sortingField) {
          case ApplicationIdentitySortingField.LOGIN:
            identitiesFields = identities.map(i => i.login);
            break;
          case ApplicationIdentitySortingField.CREATED:
            identitiesFields = identities.map(i => i.created);
            break;
          default:
            throw Error(
              "unknown application identity sorting field type: " + sortingField
            );
        }
        let secondaryFields = identities.map(i => i.login);
        if (order === ApplicationIdentitySortingOrder.DESC) {
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
            msg == null
              ? "identities returned are not ordered as expected"
              : msg;
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

      function expectedResultSize(
        expected: any[],
        offset?: number,
        limit?: number
      ) {
        offset = offset == null ? 0 : offset;
        limit = limit == null ? defaultExpectedLimit : limit;
        let size = expected.length - offset;
        return size > limit ? limit : size > 0 ? size : 0;
      }
    }

    function itWithPageTogglePrefix(options?: {
      offset?: number;
      limit?: number;
      sortingField?: ApplicationIdentitySortingField;
      sortingOrder?: ApplicationIdentitySortingOrder;
    }) {
      itWithPage(() => {
        let aUnionB: Identity<Uint8Array>[] = [];
        aUnionB.push(...ctx.A[i].identities, ...ctx.B[i].identities);
        return aUnionB;
      }, options);
      itWithPage(() => ctx.A[i].identities, {
        ...options,
        loginPrefix: loginPrefixA
      });
    }

    // All sorting fields
    let sortingFields = Object.keys(ApplicationIdentitySortingField)
      .map(key => Number(key) as ApplicationIdentitySortingField)
      .filter(key => !isNaN(key));
    sortingFields.push(null);
    // All sorting orders
    let sortingOrders = Object.keys(ApplicationIdentitySortingOrder)
      .map(key => Number(key) as ApplicationIdentitySortingOrder)
      .filter(key => !isNaN(key));
    sortingOrders.push(null);

    sortingFields.forEach(field => {
      sortingOrders.forEach(order => {
        // List identities without page parameters
        itWithPageTogglePrefix({ sortingField: field, sortingOrder: order });
      });
    });

    // List identities with an offset
    itWithPageTogglePrefix({ offset: Math.floor(numberOfIdentities / 2) });

    // List identities with a limit
    itWithPageTogglePrefix({ limit: Math.floor(numberOfIdentities / 2) });

    // List identities with offset and limit
    itWithPageTogglePrefix({
      offset: Math.floor(numberOfIdentities / 4),
      limit: Math.floor(numberOfIdentities / 4)
    });

    // List identities with an offset higher than number of identities
    itWithPageTogglePrefix({ offset: numberOfIdentities * 2 });
    itWithPageTogglePrefix({
      offset: numberOfIdentities * 2,
      limit: Math.floor(numberOfIdentities / 2)
    });

    // List identities with a limit higher than number of identities
    itWithPageTogglePrefix({ limit: numberOfIdentities * 2 });
    itWithPageTogglePrefix({
      offset: Math.floor(numberOfIdentities / 2),
      limit: Math.floor(numberOfIdentities * 2)
    });

    // List identities with a limit and an offset higher than number of identities
    itWithPageTogglePrefix({
      limit: numberOfIdentities * 2,
      offset: numberOfIdentities * 2
    });
  });

  ///////////////////////////////////////////////
  // Error cases
  ///////////////////////////////////////////////

  itError(
    `cannot list an application that doesn't exists`,
    async () => await devAppAPI.listIdentities("my.app.does.not.exists"),
    ServerError.IdentityNotFound
  );

  itError(
    `cannot list an application that is not owned`,
    async () => {
      let api = new ApplicationAPI(ctx.toto.session);
      await api.listIdentities(ctx.app.identity.login);
    },
    ServerError.IdentityCannotAssumeOwnership
  );
});
