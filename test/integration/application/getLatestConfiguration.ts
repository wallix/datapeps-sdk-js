import * as JWT from "jsonwebtoken";
import * as Application from "../../../src/Application";
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
import { Uint8Tool } from "../../../src/Tools";
import { configs } from "./Utils";
import { itError } from "../../Utils";
import { expect } from "chai";

describe("applicationAPI.getLatestConfig.JWT", () => {
  let ctx: {
    dev: devCtx;
    nonConfiguredDev: devCtx;
    otherDev: userAndSessionCtx;
  };

  let devApi: ApplicationAPI;
  let otherDevApi: ApplicationAPI;

  before(async () => {
    let initCtx = init();
    let devCtx = await dev(initCtx, configs.length);
    let nonConfiguredDev = await dev(initCtx, 1);
    let otherDev = await userAndSession(initCtx, "otherDev");
    ctx = { dev: devCtx, nonConfiguredDev, otherDev };
    devApi = new ApplicationAPI(ctx.dev.dev.session);
    otherDevApi = new ApplicationAPI(ctx.otherDev.session);
  });

  configs.forEach(({ keys, config }, i) => {
    const algorithm = ApplicationJWT.Algorithm[config.signAlgorithm];
    it(`application.getLatestConfig returns a latest config (${algorithm})`, async () => {
      const appID = ctx.dev.apps[i].identity.login;
      await devApi.putConfig(appID, { jwt: config });
      let userLogin = `alice.getLatestConfig.${Math.random()}`;
      let aliceDataPepsLogin = await createUser(
        userLogin,
        appID,
        keys.sk,
        config.signAlgorithm
      );
      let identityAuth = await devApi.getIdentityAuth(
        appID,
        aliceDataPepsLogin
      );
      let appLatestConfig = await devApi.getLatestConfig(appID);
      expect(appLatestConfig.meta.applicationConfigID).to.deep.equals(
        identityAuth.applicationConfigID
      );
    });

    it(`application.getLatestConfig returns a latest config after reconfiguring the application (${algorithm})`, async () => {
      const appID = ctx.dev.apps[i].identity.login;

      await devApi.putConfig(appID, { jwt: config });

      let userLogin = `bob.getLatestConfig.${Math.random()}`;
      let bobDataPepsLogin = await createUser(
        userLogin,
        appID,
        keys.sk,
        config.signAlgorithm
      );
      let identityAuth = await devApi.getIdentityAuth(appID, bobDataPepsLogin);
      let appLatestConfig = await devApi.getLatestConfig(appID);
      expect(appLatestConfig.meta.applicationConfigID).to.deep.equals(
        identityAuth.applicationConfigID
      );

      await devApi.putConfig(appID, { jwt: config });
      userLogin = `charlie.getLatestConfig.${Math.random()}`;
      let charlieDataPepsLogin = await createUser(
        userLogin,
        appID,
        keys.sk,
        config.signAlgorithm
      );
      identityAuth = await devApi.getIdentityAuth(appID, charlieDataPepsLogin);
      let newAppLatestConfig = await devApi.getLatestConfig(appID);
      expect(newAppLatestConfig.meta.applicationConfigID).to.deep.equals(
        identityAuth.applicationConfigID
      );
      expect(newAppLatestConfig.meta.applicationConfigID.version).to.not.equal(
        appLatestConfig.meta.applicationConfigID.version
      );
      expect(newAppLatestConfig.meta.applicationConfigID.appID).to.equal(
        appLatestConfig.meta.applicationConfigID.appID
      );
    });
  });

  let inexistantAppIDs = [null, undefined, "", "non.existant.app"];
  inexistantAppIDs.map(appID =>
    itError(
      `fails when a dev tries to get the latest configuration using an appID that does not exist`,
      () => devApi.getLatestConfig(appID),
      ServerError.IdentityNotFound
    )
  );

  itError(
    `fails when a developer tries to get the latest configuration of a non-configured identity`,
    () => devApi.getLatestConfig(ctx.nonConfiguredDev.app.identity.login),
    ServerError.IdentityCannotAssumeOwnership
  );

  itError(
    `a developer cannot get the latest configuration of another's developers app`,
    () => otherDevApi.getLatestConfig(ctx.dev.app.identity.login),
    ServerError.IdentityCannotAssumeOwnership
  );

  async function createUser(
    login: string,
    appID: string,
    jwtSK: Uint8Array,
    signAlgo: ApplicationJWT.Algorithm
  ): Promise<string> {
    const userSecret = "aVeryStrongSecret";
    let token = JWT.sign({ login }, Uint8Tool.decode(jwtSK), {
      algorithm: ApplicationJWT.Algorithm[signAlgo]
    });
    let createAliceResp = await Application.createUser(
      appID,
      { jwt: { token } },
      userSecret
    );
    return createAliceResp.login;
  }
});
