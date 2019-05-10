import {
  ApplicationAPI,
  ApplicationJWT,
  ServerError,
  IdentityAPI,
  IdentityPublicKeyID
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
import { configs, invalidKey } from "./Utils";
import { Uint8Tool } from "../../../src/Tools";

const defaultLoginClaim = "sub";
const firstAppConfigVersion = 1;

describe("applicationAPI.config.JWT", () => {
  let ctx: devCtx & { nonConfiguredDev: devCtx; otherDev: userAndSessionCtx };

  before(async () => {
    let initCtx = init();
    let devCtx = await dev(initCtx, configs.length);
    let nonConfiguredDev = await dev(initCtx, 1);
    let otherDev = await userAndSession(initCtx, "otherDev");
    ctx = { ...devCtx, nonConfiguredDev, otherDev };
  });

  ///////////////////////////////////////////////
  // Test nominal cases of putConfig / getConfig
  ///////////////////////////////////////////////

  configs.forEach(({ keys, config }, i) => {
    if (i >= 2) {
      return;
    }
    let algorithm = ApplicationJWT.Algorithm[config.signAlgorithm];

    it(`should configure an application (${algorithm})`, async () => {
      let api = new ApplicationAPI(ctx.dev.session);
      let appLogin = ctx.apps[i].identity.login;
      let appConfigID = await api.putConfig(appLogin, { jwt: config });
      expect(appConfigID.version).equal(firstAppConfigVersion);
      let configReceived = await api.getConfig(appConfigID);
      expect(configReceived.payload.jwt).not.null;
      Object.keys(config).forEach(k => {
        expect(configReceived.payload.jwt[k], `config field ${k}`).deep.equals(
          config[k]
        );
      });
      expectMetadata(configReceived.meta, {
        appID: appLogin,
        creatorLogin: ctx.dev.identity.login,
        version: appConfigID.version
      });
    });

    it(`configure an application with default value (${algorithm})`, async () => {
      let defaultConfig: ApplicationAPI.Config = {
        jwt: {
          key: config.key,
          signAlgorithm: config.signAlgorithm
        }
      };
      let appLogin = ctx.apps[i].identity.login;
      let api = new ApplicationAPI(ctx.dev.session);
      let appConfigID = await api.putConfig(appLogin, defaultConfig);
      let configReceived = await api.getConfig(appConfigID);
      expect(configReceived.payload.jwt).to.exist;
      expect(configReceived.payload.jwt.key).to.deep.equal(
        defaultConfig.jwt.key
      );
      expect(configReceived.payload.jwt.claimForLogin).to.equal(
        defaultLoginClaim
      );
      expectMetadata(configReceived.meta, {
        appID: appLogin,
        creatorLogin: ctx.dev.identity.login,
        version: appConfigID.version
      });
    });

    it(`overwrite configuration (${algorithm})`, async () => {
      let newConfig = {
        jwt: {
          key: keys.pk,
          signAlgorithm: config.signAlgorithm,
          claimForLogin: "field_1"
        }
      };
      let appLogin = ctx.apps[i].identity.login;
      let api = new ApplicationAPI(ctx.dev.session);
      await api.putConfig(appLogin, newConfig);

      newConfig = {
        jwt: {
          key: keys.secondPk,
          signAlgorithm: config.signAlgorithm,
          claimForLogin: "field_2"
        }
      };
      let appConfigID = await api.putConfig(appLogin, newConfig);

      let configReceived = await api.getConfig(appConfigID);
      expect(configReceived.payload.jwt.claimForLogin).to.equal(
        newConfig.jwt.claimForLogin
      );
      expect(configReceived.payload.jwt.key).to.deep.equals(newConfig.jwt.key);
      expectMetadata(configReceived.meta, {
        appID: appLogin,
        creatorLogin: ctx.dev.identity.login,
        version: appConfigID.version
      });
    });

    it(`overwrite configuration with a new version of a creator (${algorithm})`, async () => {
      let appConfig = {
        jwt: {
          key: keys.pk,
          signAlgorithm: config.signAlgorithm,
          claimForLogin: "field_1"
        }
      };
      let appLogin = ctx.apps[i].identity.login;
      let api = new ApplicationAPI(ctx.dev.session);
      // Developer reconfigures its application
      let firstConfigID = await api.putConfig(appLogin, appConfig);
      let firstConfigReceived = await api.getConfig(firstConfigID);

      // Developer renews its keys
      await new IdentityAPI(ctx.dev.session).renewKeys(ctx.dev.session.login);
      // Developer gets the configuration of its application. It should not have changed
      let secondConfigReceived = await api.getConfig(firstConfigID);
      expect(secondConfigReceived).to.deep.equal(firstConfigReceived);

      // Developer reconfigures the application
      let secondConfigID = await api.putConfig(appLogin, appConfig);
      let thirdConfigReceived = await api.getConfig(secondConfigID);

      expect(thirdConfigReceived.payload).to.deep.equal(
        firstConfigReceived.payload
      );
      expect(thirdConfigReceived.meta.applicationConfigID).to.not.equal(
        firstConfigReceived.meta.applicationConfigID
      );
      expect(thirdConfigReceived.meta.creator.login).to.equal(
        firstConfigReceived.meta.creator.login
      );
      // The developer's encryption version should have changed
      expect(thirdConfigReceived.meta.creator.version).to.not.equal(
        firstConfigReceived.meta.creator.version
      );
    });
  });

  ///////////////////////////////////////////////
  // Error cases: putConfig
  ///////////////////////////////////////////////
  // `IdentityCannotAssumeAccess` if cannot have right to write the configuration.
  itError(
    `should not configure an application of someone else`,
    () =>
      new ApplicationAPI(ctx.otherDev.session).putConfig(
        ctx.app.identity.login,
        {
          jwt: {
            key: nacl.randomBytes(128),
            signAlgorithm: ApplicationJWT.Algorithm.HS256,
            claimForLogin: "login"
          }
        }
      ),
    ServerError.IdentityCannotAssumeOwnership
  );

  itError(
    `should not configure with a invalid key RS PEM`,
    () =>
      new ApplicationAPI(ctx.dev.session).putConfig(ctx.app.identity.login, {
        jwt: {
          key: Uint8Tool.encode(
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
      new ApplicationAPI(ctx.dev.session).putConfig(ctx.app.identity.login, {
        jwt: {
          key: Uint8Tool.encode(
            `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEQ4/x3bCZotGA3n+5CxFmuNZnzB7L\nZUd9C885FDhZN8+oRavvPrWSiGKv72hMKsfL9wVpEygSzZWXqZW+H/w7Jw==
            -----END PUBLIC KEY-----` // Invalid because spaces in front of last line
          ),
          signAlgorithm: ApplicationJWT.Algorithm.ES256
        }
      }),
    ServerError.ApplicationConfigInvalid
  );

  // ApplicationConfigInvalid` if configuration object is invalid.
  configs.forEach(({ keys, config }, i) => {
    let signAlgorithm = config.signAlgorithm;
    itError(
      `should not configure with a invalid type of key for the signAlgorithm(${
        ApplicationJWT.Algorithm[signAlgorithm]
      })`,
      () =>
        new ApplicationAPI(ctx.dev.session).putConfig(ctx.app.identity.login, {
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
        jwt: {
          key: nacl.randomBytes(128),
          signAlgorithm: ApplicationJWT.Algorithm.HS256,
          claimForLogin: "login"
        }
      }),
    ServerError.IdentityNotFound
  );

  ///////////////////////////////////////////////
  // Error cases: getConfig
  ///////////////////////////////////////////////

  itError(
    `should not get the configuration of an application of someone else`,
    () =>
      new ApplicationAPI(ctx.otherDev.session).getConfig({
        appID: ctx.app.identity.login,
        version: firstAppConfigVersion
      }),
    ServerError.IdentityCannotAssumeOwnership
  );

  const nonExistantAppID = "non.existant.identity";
  let invalidAppIDs = [null, undefined, nonExistantAppID, ""];
  invalidAppIDs.map(appID => {
    itError(
      `should not get the configuration of an application with an empty ID (${appID})`,
      () =>
        new ApplicationAPI(ctx.dev.session).getConfig({
          appID,
          version: 1
        }),
      ServerError.IdentityNotFound
    );
  });

  itError(
    `should receive correct error trying to get a config of a application not yet configured`,
    () =>
      new ApplicationAPI(ctx.nonConfiguredDev.dev.session).getConfig({
        appID: ctx.nonConfiguredDev.app.identity.login,
        version: firstAppConfigVersion
      }),
    ServerError.ApplicationConfigNotFound,
    () => ({
      login: ctx.nonConfiguredDev.app.identity.login,
      version: firstAppConfigVersion.toString()
    })
  );

  const maxInt32 = 2147483647;
  const nonExistantVersion = 42;
  let invalidConfigVersions = [
    { actual: null, expectedInErrPayload: "0" },
    { actual: undefined, expectedInErrPayload: "0" },
    { actual: -1, expectedInErrPayload: "4294967295" },
    { actual: 0, expectedInErrPayload: "0" },
    {
      actual: nonExistantVersion,
      expectedInErrPayload: nonExistantVersion.toString()
    },
    { actual: maxInt32 + 1, expectedInErrPayload: (maxInt32 + 1).toString() }
  ];
  invalidConfigVersions.map(version =>
    itError(
      `should fail when getting an application configuration with an invalid version (${
        version.actual
      })`,
      () =>
        new ApplicationAPI(ctx.dev.session).getConfig({
          appID: ctx.app.identity.login,
          version: version.actual
        }),
      ServerError.ApplicationConfigNotFound,
      () => ({
        login: ctx.app.identity.login,
        version: version.expectedInErrPayload
      })
    )
  );

  let nullAppConfigIDs = [null, undefined];
  nullAppConfigIDs.map(appConfigID =>
    itError(
      `should fail client side if the passed application configuration ID is null or undefined`,
      () => new ApplicationAPI(ctx.dev.session).getConfig(appConfigID),
      ServerError.IdentityNotFound
    )
  );
});

let expectMetadata = (
  meta: {
    applicationConfigID: ApplicationAPI.ApplicationConfigID;
    creator: IdentityPublicKeyID;
    created: Date;
  },
  expected: {
    appID: string;
    creatorLogin: string;
    version: number;
  }
) => {
  expect(meta.applicationConfigID.appID).equal(expected.appID);
  expect(meta.applicationConfigID.version).equal(expected.version);
  expect(meta.creator.login).equal(expected.creatorLogin);
};
