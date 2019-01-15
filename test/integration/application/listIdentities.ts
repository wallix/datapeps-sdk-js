import { expect } from "chai";

import {
  ApplicationAPI,
  ApplicationJWT,
  Identity,
  ServerError
} from "../../../src/DataPeps";
import { configs } from "./Utils";
import {
  initCtx,
  devCtx,
  init,
  identitiesCtx,
  userAndSessionCtx,
  userAndSession
} from "../../Context";
import { expectContainsAllIdentities } from "../identity/utils";
import { registerIdentitiesForEachApps, devWithAllConfigs } from "./Context";
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
  const loginPrefixA = "alice"

  before(async () => {
    let initCtx = await init();
    let devCtx = await devWithAllConfigs(initCtx);
    let [A, B] = await Promise.all([
      await registerIdentitiesForEachApps(
        initCtx,
        devCtx,
        configs,
        numberOfIdentities,
        {
          name: loginPrefixA
        }
      ),
      await registerIdentitiesForEachApps(
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

    function itWithPage(expectedFn: () => Identity<Uint8Array>[], options?: { offset?: number; limit?: number, loginPrefix?: string }) {
      options = options == null ? {} : options;

      it(`list application users, for app(${
        ApplicationJWT.Algorithm[config.signAlgorithm]
      }), page(limit=${options.limit}, offset=${options.offset}, loginPrefix=${options.loginPrefix})`, async () => {
        let {
          identities,
          totalIdentitiesCount
        } = await devAppAPI.listIdentities(
          ctx.apps[i].identity.login,
          options
        );
        let expected = expectedFn()
        expectContainsAllIdentities(
          expected,
          identities.map(({ identity }) => identity),
          false
        );
        expect(identities.length).to.equal(
          expectedResultSize(expected, options.offset, options.limit)
        );
        expect(totalIdentitiesCount).to.equal(expected.length);
      });

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

    function itWithPageTogglePrefix(options?: { offset?: number; limit?: number }) {
      itWithPage(() => {
        let aUnionB: Identity<Uint8Array>[] = []
        aUnionB.push(...ctx.A[i].identities, ...ctx.B[i].identities) 
        return aUnionB
      }, options)
      itWithPage(() => ctx.A[i].identities, {
        ...options,
        loginPrefix: loginPrefixA,
      })
    }

    // List identities without page parameters
    itWithPageTogglePrefix()

    // List identities with an offset
    itWithPageTogglePrefix({ offset: Math.floor(numberOfIdentities / 2) });

    // List identities with a limit
    itWithPageTogglePrefix({ limit: Math.floor(numberOfIdentities / 2) });

    // List identities with offset and limit
    itWithPageTogglePrefix(
      {
        offset: Math.floor(numberOfIdentities / 4),
        limit: Math.floor(numberOfIdentities / 4)
      }
    );

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
    itWithPageTogglePrefix({ limit: numberOfIdentities * 2, offset: numberOfIdentities * 2 });
  });

  ///////////////////////////////////////////////
  // Error cases
  ///////////////////////////////////////////////

  itError(
    `cannot list an application that doesn't exists`,
    async () =>
      await devAppAPI.listIdentities("my.app.does.not.exists"),
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
