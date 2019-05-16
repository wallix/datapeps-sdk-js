import * as Application from "../../../src/Application";
import { ApplicationJWT, ServerError, SDKError } from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import * as JWT from "jsonwebtoken";
import { configs, getBadAlgoKey, createConnector } from "./Utils";
import { initCtx, devCtx, init } from "../../Context";
import { itError } from "../../Utils";
import { devWithAllConfigs } from "./Context";

describe("applicationJWT.createSession", () => {
  let ctx: initCtx & devCtx;

  before(async () => {
    let initCtx = await init();
    let devCtx = await devWithAllConfigs(initCtx);
    ctx = { ...devCtx, ...initCtx };
  });

  function itWithSecret(secret: string | Uint8Array) {
    let secretType = secret instanceof Uint8Array ? "Uint8Array" : "string";
    configs.forEach(({ keys, config }, i) => {
      let algorithm = ApplicationJWT.Algorithm[config.signAlgorithm];
      let login = `user.ok.${secretType}`;

      ///////////////////////////////////////////////
      // Test nominal cases - forEach configs & secrets
      ///////////////////////////////////////////////

      it(`A new user creates a session, algo(${algorithm}), secret(${secretType})`, async () => {
        let { session, appSession, isNew } = await ApplicationJWT.createSession(
          ctx.apps[i].identity.login,
          login,
          secret,
          createConnector(keys.sk, config.signAlgorithm, secret)
        );
        expect(session).to.be.not.null;
        expect(appSession).to.be.not.null;
        expect(appSession.login).to.equal(login);
        expect(isNew).to.be.true;
      });

      it(`An already registered user creates a session, algo(${algorithm}), secret(${secretType})`, async () => {
        let { session, appSession, isNew } = await ApplicationJWT.createSession(
          ctx.apps[i].identity.login,
          login,
          secret,
          createConnector(keys.sk, config.signAlgorithm, secret)
        );
        expect(session).to.be.not.null;
        expect(appSession).to.be.not.null;
        expect(appSession.login).to.equal(login);
        expect(isNew).to.be.false;
      });

      ///////////////////////////////////////////////
      // Test error cases - forEach configs & secrets
      ///////////////////////////////////////////////

      let badLogin = "user.ko";

      itError(
        `A new user cannot create a session with a bad application secret key, algo(${algorithm}), secret(${secretType})`,
        async () => {
          await ApplicationJWT.createSession(
            ctx.apps[i].identity.login,
            badLogin,
            secret,
            createConnector(
              getBadAlgoKey(config.signAlgorithm),
              config.signAlgorithm,
              secret
            )
          );
        },
        ServerError.ApplicationInvalidToken
      );

      let badSecret = nacl.randomBytes(8);
      itError(
        `An already registered user cannot create a session with a bad secret, algo(${algorithm}), secret(${secretType})`,
        async () => {
          await ApplicationJWT.createSession(
            ctx.apps[i].identity.login,
            login,
            badSecret,
            createConnector(keys.sk, config.signAlgorithm, badSecret)
          );
        },
        SDKError.IdentityInvalidKeySet
      );
    });
  }

  itWithSecret("thisIsASuperSecret");
  itWithSecret(nacl.randomBytes(128));

  ///////////////////////////////////////////////
  // Test error cases
  ///////////////////////////////////////////////

  itError(
    `Try to create a JWT session with an application that doesn't exists`,
    async () => {
      await ApplicationJWT.createSession(
        "non.existent.app",
        "appLogin",
        "secret",
        createConnector(
          configs[0].keys.sk,
          configs[0].config.signAlgorithm,
          "secret"
        )
      );
    },
    ServerError.ApplicationConfigNotFound,
    () => ({ login: "non.existent.app", version: "latest" })
  );

  itError(
    `Try to create a JWT session with an application that is not configured`,
    async () => {
      await ApplicationJWT.createSession(
        ctx.apps[ctx.apps.length - 1].identity.login,
        "appLogin",
        "secret",
        createConnector(
          configs[0].keys.sk,
          configs[0].config.signAlgorithm,
          "secret"
        )
      );
    },
    ServerError.ApplicationConfigNotFound,
    () => ({
      login: ctx.apps[ctx.apps.length - 1].identity.login,
      version: "latest"
    })
  );
});
