import * as Application from "../../../src/Application";
import { ApplicationJWT, ServerError, SDKError } from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import * as JWT from "jsonwebtoken";
import { devWithAllConfigs, configs, getBadAlgoKey } from "./Utils";
import { initCtx, devCtx, init } from "../../Context";
import { itError } from "../../Utils";

describe("applicationJWT.createSession", () => {
  let ctx: initCtx & devCtx;

  before(async () => {
    let initCtx = await init();
    let devCtx = await devWithAllConfigs(initCtx);
    ctx = { ...devCtx, ...initCtx };
  });

  function itWithSecret(secret: string | Uint8Array) {
    let secretType = secret instanceof Uint8Array ? "Uint8Array" : "string";
    configs.forEach(({ config, secretKey }, i) => {
      let algorithm = ApplicationJWT.Algorithm[config.signAlgorithm];
      let login = `user.ok.${secretType}`;

      ///////////////////////////////////////////////
      // Test nominal cases - forEach configs & secrets
      ///////////////////////////////////////////////

      it(`A new user creates a session, algo(${algorithm}), secret(${secretType})`, async () => {
        let { session, app, new: isNew } = await ApplicationJWT.createSession(
          ctx.apps[i].login,
          login,
          secret,
          createConnector(secretKey, config.signAlgorithm, secret)
        );
        expect(session).to.be.not.null;
        expect(app).to.be.not.null;
        expect(app.login).to.equal(login);
        expect(isNew).to.be.true;
      });

      it(`An already registered user creates a session, algo(${algorithm}), secret(${secretType})`, async () => {
        let { session, app, new: isNew } = await ApplicationJWT.createSession(
          ctx.apps[i].login,
          login,
          secret,
          createConnector(secretKey, config.signAlgorithm, secret)
        );
        expect(session).to.be.not.null;
        expect(app).to.be.not.null;
        expect(app.login).to.equal(login);
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
            ctx.apps[i].login,
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
            ctx.apps[i].login,
            login,
            badSecret,
            createConnector(secretKey, config.signAlgorithm, badSecret)
          );
        },
        SDKError.BadSecret
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
          configs[0].secretKey,
          configs[0].config.signAlgorithm,
          "secret"
        )
      );
    },
    ServerError.IdentityNotFound,
    () => ({ login: "non.existent.app" })
  );

  itError(
    `Try to create a JWT session with an application that is not configured`,
    async () => {
      await ApplicationJWT.createSession(
        ctx.apps[ctx.apps.length - 1].login,
        "appLogin",
        "secret",
        createConnector(
          configs[0].secretKey,
          configs[0].config.signAlgorithm,
          "secret"
        )
      );
    },
    ServerError.ApplicationConfigNotFound,
    () => ({ login: ctx.apps[ctx.apps.length - 1].login })
  );
});

class MockApplicationSession {
  login: string;
}

function createConnector<Secret>(
  appSecretKey: string | Uint8Array,
  appSignAlgorithm: ApplicationJWT.Algorithm,
  userSecret: Secret
): ApplicationJWT.Connector<MockApplicationSession, Secret> {
  let _appSecretKey: string | Buffer;
  if (appSecretKey instanceof Uint8Array) {
    _appSecretKey = Buffer.from(appSecretKey.buffer);
  } else {
    _appSecretKey = appSecretKey;
  }
  return {
    createSession: async (login: string, secret: Secret) => {
      if (secret instanceof Uint8Array) {
        if (!(userSecret instanceof Uint8Array)) {
          throw new Error("bad type of secret");
        }
        if (
          secret.length != userSecret.length ||
          !secret.every((b, i) => b == userSecret[i])
        ) {
          throw new Error("Uint8Array secrets doesn't match");
        }
      } else if (secret !== userSecret) {
        throw new Error("secrets doesn't match");
      }
      return { login };
    },
    getToken: async (session: MockApplicationSession) => {
      return JWT.sign({ login: session.login }, _appSecretKey, {
        algorithm: ApplicationJWT.Algorithm[appSignAlgorithm]
      });
    }
  };
}
