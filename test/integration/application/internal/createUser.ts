import * as Application from "../../../../src/Application";
import { ApplicationJWT, ServerError } from "../../../../src/DataPeps";
import * as DataPeps from "../../../../src/DataPeps";
import { expect } from "chai";
import * as JWT from "jsonwebtoken";
import { configs, getBadAlgoKey } from "../Utils";
import { init, initCtx, devCtx } from "../../../Context";
import { itError } from "../../../Utils";
import { devWithAllConfigs } from "../Context";
import { Uint8Tool } from "../../../../src/Tools";

describe("application.createUser", () => {
  let ctx: initCtx & devCtx;

  before(async () => {
    let initCtx = await init();
    let devCtx = await devWithAllConfigs(initCtx);
    ctx = { ...initCtx, ...devCtx };
  });

  configs.forEach(({ config, secretKey }, i) => {
    let signAlgorithm = config.signAlgorithm;

    ///////////////////////////////////////////////
    // Test nominal cases - forEach config
    ///////////////////////////////////////////////

    it(`Create user using with signAlgorith(${
      ApplicationJWT.Algorithm[signAlgorithm]
    })`, async () => {
      const login = `alice${Math.random()}`;
      let userSecret = "aSoStrongSecret";
      let token = JWT.sign({ login }, Uint8Tool.decode(secretKey), {
        algorithm: ApplicationJWT.Algorithm[signAlgorithm]
      });
      let createAliceResp = await Application.createUser(
        ctx.apps[i].identity.login,
        { jwt: { token } },
        userSecret
      );
      expect(createAliceResp.login).to.equal(
        `${login}@${ctx.apps[i].identity.login}`
      );
      await DataPeps.Session.login(createAliceResp.login, userSecret);
    });

    ///////////////////////////////////////////////
    // Test error cases - forEach config
    ///////////////////////////////////////////////

    let invalidAuths = [
      null,
      undefined,
      { jwt: null },
      { jwt: { token: null } },
      { jwt: { token: undefined } },
      { jwt: { token: "" } },
      { jwt: { token: "abracadabra" } },
      {
        jwt: {
          token: JWT.sign(
            { login: `alice${Math.random()}` },
            getBadAlgoKey(signAlgorithm),
            {
              algorithm: ApplicationJWT.Algorithm[signAlgorithm]
            }
          )
        }
      }
    ];
    invalidAuths.map(auth => {
      itError(
        `Try to create a user with an invalid auth (${
          ApplicationJWT.Algorithm[signAlgorithm]
        })`,
        async () => {
          let userSecret = "aSoStrongSecret";
          return Application.createUser(
            ctx.apps[i].identity.login,
            auth,
            userSecret
          );
        },
        ServerError.ApplicationInvalidToken
      );
    });
  });

  ///////////////////////////////////////////////
  // Test error cases
  ///////////////////////////////////////////////

  itError(
    `Try to create a user with an application that doesn't exists`,
    async () => {
      let userSecret = "aSoStrongSecret";
      let token = "BimBam";
      await Application.createUser(
        "non.existent.app",
        { jwt: { token } },
        userSecret
      );
    },
    ServerError.IdentityNotFound,
    () => ({ login: "non.existent.app" })
  );

  itError(
    `Try to create a user with an application that is not configured`,
    async () => {
      let userSecret = "aSoStrongSecret";
      let token = "BimBam";
      await Application.createUser(
        ctx.apps[configs.length].identity.login,
        { jwt: { token } },
        userSecret
      );
    },
    ServerError.ApplicationConfigNotFound,
    () => ({ login: ctx.apps[configs.length].identity.login })
  );
});
