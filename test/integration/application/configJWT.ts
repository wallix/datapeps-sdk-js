import {
  ApplicationAPI,
  ApplicationJWT,
  ServerError
} from "../../../src/DataPeps";
import {
  init,
  dev,
  devCtx,
  userAndSessionCtx,
  userAndSession
} from "../../Context";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import { itError } from "../../Utils";
import { configs, ESKey, RSKey } from "./Utils";

describe("applicationAPI.config.JWT", () => {
  let ctx: devCtx & { otherDev: userAndSessionCtx };

  before(async () => {
    let initCtx = init();
    let devCtx = await dev(initCtx, configs.length + 1);
    let otherDev = await userAndSession(initCtx, "otherDev");
    ctx = { ...devCtx, otherDev };
  });

  ///////////////////////////////////////////////
  // Test nominal cases of putConfig / getConfig
  ///////////////////////////////////////////////

  configs.forEach(({ secretKey, config }, i) => {
    let signAlgorithm = config.signAlgorithm;
    it(`should configure an application with signAlgorithm(${
      ApplicationJWT.Algorithm[signAlgorithm]
    })`, async () => {
      let api = new ApplicationAPI(ctx.dev.session);
      await api.putConfig(ctx.apps[i].login, { jwt: config });
      let getConfig = await api.getConfig(ctx.apps[i].login);
      expect(getConfig.jwt).not.null;
      Object.keys(config).forEach(k => {
        expect(getConfig.jwt[k], `config field ${k}`).deep.equals(config[k]);
      });
    });
  });

  it(`configure an application with default value`, async () => {
    let config: ApplicationAPI.Config = {
      jwt: {
        key: nacl.randomBytes(128)
      }
    };

    let api = new ApplicationAPI(ctx.dev.session);
    await api.putConfig(ctx.app.login, config);
    let storedConfig = await api.getConfig(ctx.app.login);
    expect(storedConfig.jwt).to.exist;
    expect(storedConfig.jwt.key).to.deep.equal(config.jwt.key);
    expect(storedConfig.jwt.signAlgorithm).to.equal(
      ApplicationJWT.Algorithm.HS256
    );
    expect(storedConfig.jwt.claimForLogin).to.equal("sub");
  });

  it(`overwrite configuration`, async () => {
    let config = {
      jwt: { key: nacl.randomBytes(128), claimForLogin: "field_1" }
    };
    let api = new ApplicationAPI(ctx.dev.session);
    await api.putConfig(ctx.app.login, config);

    config = { jwt: { key: nacl.randomBytes(128), claimForLogin: "field_2" } };
    await api.putConfig(ctx.app.login, config);

    let storedConfig = await api.getConfig(ctx.app.login);
    expect(storedConfig.jwt.claimForLogin).to.equal(config.jwt.claimForLogin);
    expect(storedConfig.jwt.key).to.deep.equals(config.jwt.key);
  });

  ///////////////////////////////////////////////
  // Error cases: putConfig
  ///////////////////////////////////////////////

  function invalidKey(signAlgorithm: ApplicationJWT.Algorithm): Uint8Array {
    switch (signAlgorithm) {
      case ApplicationJWT.Algorithm.HS256:
      case ApplicationJWT.Algorithm.HS384:
      case ApplicationJWT.Algorithm.HS512:
        return new Uint8Array(0);
      case ApplicationJWT.Algorithm.RS256:
      case ApplicationJWT.Algorithm.RS384:
      case ApplicationJWT.Algorithm.RS512:
        return ESKey;
      case ApplicationJWT.Algorithm.ES256:
      case ApplicationJWT.Algorithm.ES384:
      case ApplicationJWT.Algorithm.ES512:
        return RSKey;
      default:
        throw `Unknown JWTAlgorithm(${signAlgorithm})`;
    }
  }

  // `IdentityCannotAssumeAccess` if cannot have right to write the configuration.
  itError(
    `should not configure an application of someone else`,
    () =>
      new ApplicationAPI(ctx.otherDev.session).putConfig(ctx.app.login, {
        jwt: { key: nacl.randomBytes(128), claimForLogin: "login" }
      }),
    ServerError.IdentityCannotAssumeOwnership
  );

  itError(
    `should not configure with a invalid key RS PEM`,
    () =>
      new ApplicationAPI(ctx.dev.session).putConfig(ctx.app.login, {
        jwt: {
          key: new TextEncoder().encode(
            `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy2kQaxIDLw6vXEmSyDIU
W2+7zumTbO9KE2o5/afE55lUyTV8lY+kVZDoRToP6yfiUKYC9t3fFBui50rBdtXJ
d8TgD7ecw9tdoLiQ8usELOIV1Il+e0NUOocypPRYuI26RzOBQ98ULtqXWRPvW7G3
XhvwhB7FY31LXSRtbTA2ZOXhl64ZfWYBqWwsFMQ0wmWxnnF60J+NDESR1dWKHrzB
0gaJAk341Mm0Golftan/R3Bd4uJ3u48gDr2uOzpSZB3m9VbK3sn1/1a2V/1mL20y
/799hgxtB04Wz+cjm1O6gRuau7q7qxNRkvWL+hoXBXWUv2/WrBcglDr0f9tsvnh4
fwIDAQAB
  -----END PUBLIC KEY-----` // Invalid because spaces in front of last line
          ),
          signAlgorithm: ApplicationJWT.Algorithm.RS256
        }
      }),
    ServerError.ApplicationConfigInvalid
  );

  itError(
    `should not configure with a invalid key ES PEM`,
    () =>
      new ApplicationAPI(ctx.dev.session).putConfig(ctx.app.login, {
        jwt: {
          key: new TextEncoder().encode(
            `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEQ4/x3bCZotGA3n+5CxFmuNZnzB7L\nZUd9C885FDhZN8+oRavvPrWSiGKv72hMKsfL9wVpEygSzZWXqZW+H/w7Jw==
            -----END PUBLIC KEY-----` // Invalid because spaces in front of last line
          ),
          signAlgorithm: ApplicationJWT.Algorithm.ES256
        }
      }),
    ServerError.ApplicationConfigInvalid
  );

  // ApplicationConfigInvalid` if configuration object is invalid.
  configs.forEach(({ secretKey, config }, i) => {
    let signAlgorithm = config.signAlgorithm;
    itError(
      `should not configure with a invalid type of key for the signAlgorithm(${
        ApplicationJWT.Algorithm[signAlgorithm]
      })`,
      () =>
        new ApplicationAPI(ctx.dev.session).putConfig(ctx.app.login, {
          jwt: {
            key: invalidKey(signAlgorithm),
            signAlgorithm,
            claimForLogin: "login"
          }
        }),
      ServerError.ApplicationConfigInvalid
    );
  });

  // `IdentityNotFound` if the identity `appID` doesn't exists.
  itError(
    `should not configure a non existent application`,
    () =>
      new ApplicationAPI(ctx.dev.session).putConfig("non.existent.app", {
        jwt: { key: nacl.randomBytes(128), claimForLogin: "login" }
      }),
    ServerError.IdentityNotFound
  );

  ///////////////////////////////////////////////
  // Error cases: getConfig
  ///////////////////////////////////////////////

  // `IdentityCannotAssumeAccess` if cannot have right to read the configuration.
  itError(
    `should not get the configuration of an application of someone else`,
    () => new ApplicationAPI(ctx.otherDev.session).getConfig(ctx.app.login),
    ServerError.IdentityCannotAssumeOwnership
  );

  // `IdentityNotFound` if the identity `appID` doesn't exists.
  itError(
    `should not get the configuration rof a non existent identity`,
    () => new ApplicationAPI(ctx.dev.session).getConfig("non.existent.app"),
    ServerError.IdentityNotFound
  );

  // `ApplicationConfigNotFound` if configuration doesn't exists.
  itError(
    `should receive correct error trying to get non existent configuration as application`,
    () =>
      new ApplicationAPI(ctx.dev.session).getConfig(
        ctx.apps[configs.length].login
      ),
    ServerError.ApplicationConfigNotFound
  );
});
