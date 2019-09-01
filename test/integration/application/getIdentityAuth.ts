import {
  ApplicationAPI,
  ApplicationJWT,
  Identity,
  Session,
  ServerError
} from "../../../src/DataPeps";
import { createUser, ApplicationIdentityAuth } from "../../../src/Application";
import { DevWithAllConfigsAndAPI, devWithAllConfigsAndAPI } from "./Context";
import { init, devCtx, registerIdentities, initCtx } from "../../Context";
import { configs } from "./Utils";
import { itError } from "../../Utils";
import * as JWT from "jsonwebtoken";
import { expect } from "chai";
import { api } from "../../../src/proto";

const identitySecret = "P@ssw0rd";
const firstIdentityLogin = "charlie.first";
const secondIdentityLogin = "charlie.second";

type AppIdentityWithAuthUsedForCreation = {
  identity: api.RegisterApplicationIdentityResponse;
  auth: ApplicationIdentityAuth;
};

describe("ApplicationAPI.getIdentityAuth", () => {
  let ctx: {
    init: initCtx;
    firstDev: DevWithAllConfigsAndAPI;
    secondDev: DevWithAllConfigsAndAPI;
    randomDataPepsIdentity: Identity<Uint8Array>;
    firstAppIdentities: AppIdentityWithAuthUsedForCreation[];
    secondAppIdentities: AppIdentityWithAuthUsedForCreation[];
  };

  before(async () => {
    let initCtx = init();
    ctx = {
      init: initCtx,
      firstDev: await devWithAllConfigsAndAPI(initCtx),
      secondDev: await devWithAllConfigsAndAPI(initCtx),
      randomDataPepsIdentity: (await registerIdentities(initCtx, 1))
        .identities[0],
      firstAppIdentities: Array(configs.length),
      secondAppIdentities: []
    };
    await Promise.all(
      configs.map(async (c, i) => {
        let algorithm = ApplicationJWT.Algorithm[c.config.signAlgorithm];
        let auth = composeIdentityAuth(
          firstIdentityLogin,
          c.keys.sk,
          algorithm
        );
        let appID = ctx.firstDev.ctx.apps[i].identity.login;
        ctx.firstAppIdentities[i] = {
          identity: await createUser(appID, auth, identitySecret),
          auth
        };
      })
    );
  });

  configs.forEach((c, i) => {
    let algorithm = ApplicationJWT.Algorithm[c.config.signAlgorithm];
    let firstIdentityAuth: ApplicationAPI.IdentityAuthWithContext;

    it(`getIdentityAuth returns a correct auth object (${algorithm})`, async () => {
      let appID = ctx.firstDev.ctx.apps[i].identity.login;
      firstIdentityAuth = await ctx.firstDev.api.getIdentityAuth(
        appID,
        ctx.firstAppIdentities[i].identity.login
      );
      expectAuth(firstIdentityAuth, {
        auth: ctx.firstAppIdentities[i].auth,
        appID,
        identityLogin: ctx.firstAppIdentities[i].identity.login
      });
    });

    it(`getIdentityAuth returns a correct auth object after application's configuration renewal (${algorithm})`, async () => {
      let appID = ctx.firstDev.ctx.apps[i].identity.login;
      let newAppConfigID = await ctx.firstDev.api.putConfig(
        appID,
        {
          jwt: {
            ...c.config,
            key: c.keys.secondPk
          }
        },
        ctx.firstDev.ctx.customers[0].id
      );
      let auth = composeIdentityAuth(
        secondIdentityLogin,
        c.keys.secondSk,
        algorithm
      );
      ctx.secondAppIdentities.push({
        identity: await createUser(appID, auth, identitySecret),
        auth
      });
      let secondIdentityAuthReceived = await ctx.firstDev.api.getIdentityAuth(
        appID,
        ctx.secondAppIdentities[i].identity.login
      );
      // The new application configuration is associated with the newly created user
      expectAuthWithVersion(secondIdentityAuthReceived, {
        auth,
        appConfig: {
          appID,
          version: newAppConfigID.version
        },
        identityLogin: ctx.secondAppIdentities[i].identity.login
      });

      let firstIdentityAuthReceived = await ctx.firstDev.api.getIdentityAuth(
        appID,
        ctx.firstAppIdentities[i].identity.login
      );
      // The previous application configuration is still associated with the user created before
      expectAuthWithVersion(firstIdentityAuthReceived, {
        auth: firstIdentityAuth.auth,
        appConfig: firstIdentityAuth.applicationConfigID,
        identityLogin: firstIdentityAuth.identityLogin
      });
    });

    let invalidLogins = [null, "", `some.non.existant.entity`];
    invalidLogins.map(appId => {
      invalidLogins.map(identityLogin => {
        itError(
          `getIdentityAuth fails, with AppID: ${appId} and identityLogin: ${identityLogin}, (${algorithm})`,
          () => ctx.firstDev.api.getIdentityAuth(appId, identityLogin),
          ServerError.IdentityNotFound
        );
      });
    });

    invalidLogins.map(identityLogin => {
      itError(
        `getIdentityAuth fails, with an existing AppID and identityLogin: ${identityLogin}, (${algorithm})`,
        () =>
          ctx.firstDev.api.getIdentityAuth(
            ctx.firstDev.ctx.apps[i].identity.login,
            identityLogin
          ),
        ServerError.IdentityNotFound
      );
    });

    invalidLogins.map(appId => {
      itError(
        `getIdentityAuth fails, with AppID: ${appId} and an existing identityLogin, (${algorithm})`,
        () =>
          ctx.firstDev.api.getIdentityAuth(
            appId,
            ctx.firstAppIdentities[i].identity.login
          ),
        ServerError.IdentityNotFound
      );
    });

    itError(
      `getIdentityAuth fails when a login of an identtiy that exists in DataPeps, but was not registered by the app, is passed (${algorithm})`,
      () =>
        ctx.firstDev.api.getIdentityAuth(
          ctx.firstDev.ctx.apps[i].identity.login,
          ctx.randomDataPepsIdentity.login
        ),
      ServerError.IdentityNotFound
    );

    itError(
      `an Identity cannot get its own auth object (${algorithm})`,
      async () => {
        let session = await Session.login(
          ctx.firstAppIdentities[i].identity.login,
          identitySecret
        );
        let api = new ApplicationAPI(session);
        return api.getIdentityAuth(
          ctx.firstDev.ctx.apps[i].identity.login,
          ctx.firstAppIdentities[i].identity.login
        );
      },
      ServerError.IdentityCannotAssumeOwnership
    );

    itError(
      `a DataPeps identity that cannot assume an application cannot get an auth object of ApplicationIdentity of the application (${algorithm})`,
      async () => {
        let session = await Session.login(
          ctx.secondAppIdentities[i].identity.login,
          identitySecret
        );
        let api = new ApplicationAPI(session);
        return api.getIdentityAuth(
          ctx.firstDev.ctx.apps[i].identity.login,
          ctx.firstAppIdentities[i].identity.login
        );
      },
      ServerError.IdentityCannotAssumeOwnership
    );

    itError(
      `an application developper that cannot asssume another application cannot get an auth object of an ApplicationIdentity of the applicaton (${algorithm})`,
      async () =>
        ctx.secondDev.api.getIdentityAuth(
          ctx.firstDev.ctx.apps[i].identity.login,
          ctx.firstAppIdentities[i].identity.login
        ),
      ServerError.IdentityCannotAssumeOwnership
    );
  });
});

let composeIdentityAuth = (
  login: string,
  sk: Uint8Array,
  algorithm: string
): ApplicationIdentityAuth => {
  return {
    jwt: {
      token: JWT.sign({ login }, Buffer.from(sk.buffer), { algorithm })
    }
  };
};

let expectAuth = (
  actual: ApplicationAPI.IdentityAuthWithContext,
  expected: {
    auth: ApplicationIdentityAuth;
    identityLogin: string;
    appID: string;
  }
) => {
  expect(actual.auth).deep.equal(expected.auth);
  expect(actual.applicationConfigID.appID).equal(expected.appID);

  expect(actual.identityLogin).equal(expected.identityLogin);
};

let expectAuthWithVersion = (
  actual: ApplicationAPI.IdentityAuthWithContext,
  expected: {
    auth: ApplicationIdentityAuth;
    identityLogin: string;
    appConfig: ApplicationAPI.ApplicationConfigID;
  }
) => {
  expectAuth(actual, {
    auth: expected.auth,
    identityLogin: expected.identityLogin,
    appID: expected.appConfig.appID
  });
  expect(actual.applicationConfigID.version).equal(expected.appConfig.version);
};
