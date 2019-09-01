import { expect } from "chai";

import {
  ApplicationAPI,
  ApplicationJWT,
  Session,
  ServerError,
  IdentityAPI,
  getLogin
} from "../../../src/DataPeps";
import { configs, createConnector } from "../application/Utils";
import { initCtx, devCtx, init, dev } from "../../Context";
import { itError } from "../../Utils";

describe("identity.create", () => {
  describe("application", () => {
    // One dev with one app with one user
    let ctx: initCtx & devCtx & { userSession: Session };
    let devAppAPI: ApplicationAPI;

    before(async () => {
      let initCtx = await init();
      let devCtx = await dev(initCtx, 2);
      devAppAPI = new ApplicationAPI(devCtx.dev.session);
      let { keys, config } = configs[0];
      await devAppAPI.putConfig(
        devCtx.app.identity.login,
        {
          jwt: config
        },
        devCtx.customers[0].id
      );
      let secret = "password";
      let { session } = await ApplicationJWT.createSession(
        devCtx.app.identity.login,
        "toto",
        secret,
        createConnector(keys.sk, config.signAlgorithm, secret)
      );
      ctx = { ...initCtx, ...devCtx, userSession: session };
    });

    it(`An application identity creates another identity with right login`, async () => {
      await new IdentityAPI(ctx.userSession).create(
        {
          kind: "something",
          login: getLogin("alice", ctx.app.identity.login),
          name: "Bid Ule",
          payload: null
        },
        { sharingGroup: [ctx.userSession.login] }
      );
    });

    itError(
      `An application identity cannot creates another identity twice`,
      async () => {
        const createBob = async () =>
          await new IdentityAPI(ctx.userSession).create(
            {
              kind: "something",
              login: getLogin("bob", ctx.app.identity.login),
              name: "Bob",
              payload: null
            },
            { sharingGroup: [ctx.userSession.login] }
          );
        await createBob();
        await createBob();
      },
      ServerError.IdentityAlreadyExists,
      () => ({ login: getLogin("bob", ctx.app.identity.login) })
    );

    itError(
      `An application identity cannot creates another identity with a mal-formated login`,
      async () => {
        await new IdentityAPI(ctx.userSession).create(
          {
            kind: "something",
            login: "bidule",
            name: "Bid Ule",
            payload: null
          },
          { sharingGroup: [ctx.userSession.login] }
        );
      },
      ServerError.IdentityInvalidLogin,
      () => ({ login: "bidule" })
    );

    itError(
      `An application identity cannot creates another identity with a login formatted for another app`,
      async () => {
        await new IdentityAPI(ctx.userSession).create(
          {
            kind: "something",
            login: getLogin("alice", ctx.apps[1].identity.login),
            name: "Bid Ule",
            payload: null
          },
          { sharingGroup: [ctx.userSession.login] }
        );
      },
      ServerError.IdentityInvalidLogin,
      () => ({ login: getLogin("alice", ctx.apps[1].identity.login) })
    );
  });
});
