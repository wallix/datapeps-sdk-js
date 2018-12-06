import * as Application from "../../../../src/Application";
import { ApplicationJWT, ServerError } from "../../../../src/DataPeps";
import * as DataPeps from "../../../../src/DataPeps";
import { Uint8Tool } from "../../../../src/Tools";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import * as JWT from "jsonwebtoken";
import { configs, devWithAllConfigs, getBadAlgoKey } from "../Utils";
import { init, initCtx, devCtx } from "../../../Context";
import { itError } from "../../../Utils";

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
      let token = JWT.sign({ login }, new TextDecoder().decode(secretKey), {
        algorithm: ApplicationJWT.Algorithm[signAlgorithm]
      });
      let createAliceResp = await Application.createUser(
        ctx.apps[i].login,
        { jwt: { token } },
        userSecret
      );
      expect(createAliceResp.login).to.equal(`${login}@${ctx.apps[i].login}`);
      await DataPeps.Session.login(createAliceResp.login, userSecret);
    });

    ///////////////////////////////////////////////
    // Test error cases - forEach config
    ///////////////////////////////////////////////

    itError(
      `Try to create a user with a bad token with signAlgorith(${
        ApplicationJWT.Algorithm[signAlgorithm]
      })`,
      async () => {
        const login = `alice${Math.random()}`;
        let userSecret = "aSoStrongSecret";
        let token = JWT.sign({ login }, getBadAlgoKey(signAlgorithm), {
          algorithm: ApplicationJWT.Algorithm[signAlgorithm]
        });
        await Application.createUser(
          ctx.apps[i].login,
          { jwt: { token } },
          userSecret
        );
      },
      ServerError.ApplicationInvalidToken
    );
  });

  ///////////////////////////////////////////////
  // Test error cases
  ///////////////////////////////////////////////

  itError(
    `Try to create a user with an application that doesn't exists`,
    async () => {
      const login = `alice${Math.random()}`;
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
      const login = `alice${Math.random()}`;
      let userSecret = "aSoStrongSecret";
      let token = "BimBam";
      await Application.createUser(
        ctx.apps[configs.length].login,
        { jwt: { token } },
        userSecret
      );
    },
    ServerError.ApplicationConfigNotFound,
    () => ({ login: ctx.apps[configs.length].login })
  );
});
