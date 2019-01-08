import * as Config from "../../../Config";
import * as Context from "../../../Context";
import * as Application from "../../../../src/Application";
import * as DataPeps from "../../../../src/DataPeps";
import { Uint8Tool } from "../../../../src/Tools";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import * as mocha from "mocha";
import * as Long from "long";
import * as JWT from "jsonwebtoken";
import { AssertionError } from "assert";
import { ApplicationAPI } from "../../../../src/DataPeps";

describe("application.secure", () => {
  let appADevCtx: Context.devCtx;
  let appASecretKey = "appASecretKey";
  let appAConfig: ApplicationAPI.Config = {
    jwt: {
      key: Uint8Tool.convert(appASecretKey),
      signAlgorithm: DataPeps.ApplicationJWT.Algorithm.HS256,
      claimForLogin: "login"
    }
  };
  let appAUserSecret = nacl.randomBytes(8);
  let appAAliceLogin = "appA.Alice";
  let appAAliceLoginToken = JWT.sign({ login: appAAliceLogin }, appASecretKey);

  beforeEach(async () => {
    let initCtx = await Context.init();
    appADevCtx = await Context.dev(initCtx);
    let api = new ApplicationAPI(appADevCtx.dev.session);
    await api.putConfig(appADevCtx.app.identity.login, appAConfig);
  });

  it("An application can create a user", async () => {
    let createAliceResp = await Application.createUser(
      appADevCtx.app.identity.login,
      { jwt: { token: appAAliceLoginToken.toString() } },
      appAUserSecret
    );
    let {
      session: appAUserSession,
      secret: appAUserApplicationSecret
    } = await Application.secure(
      appADevCtx.app.identity.login,
      appAAliceLogin,
      appAUserSecret
    );
    expect(appAUserApplicationSecret).to.be.deep.equals(appAUserSecret);
    expect(appAUserSession).to.be.not.null;
  });
});
