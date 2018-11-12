import * as Config from "../../Config";
import * as Context from "../../Context";
import * as Application from "../../../src/Application";
import * as DataPeps from "../../../src/DataPeps";
import { Uint8Tool } from "../../../src/Tools";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import * as mocha from "mocha";
import * as Long from "long";
import * as JWT from "jsonwebtoken";

describe("application.createUser", () => {
  let appADevCtx: Context.devCtx;
  let appASecretKey = "appASecretKey";
  let appAConfig: DataPeps.ApplicationJwtConfig = {
    key: Uint8Tool.convert(appASecretKey),
    signAlgorithm: DataPeps.ApplicationJwtAlgorithm.HS256,
    claimForLogin: "login"
  };
  let appAUserSecret = nacl.randomBytes(8);
  let appAAliceLoginToken = JWT.sign({ login: "appA.Alice" }, appASecretKey);

  beforeEach(async () => {
    let initCtx = await Context.init();
    appADevCtx = await Context.dev(initCtx);
    await appADevCtx.dev.session.Application.putConfig(
      appADevCtx.app.login,
      appAConfig
    );
  });

  it("An application can create a user", async () => {
    let createAliceResp = await Application.createUser(
      appADevCtx.app.login,
      { jwt: { token: appAAliceLoginToken.toString() } },
      appAUserSecret
    );
    await DataPeps.login(createAliceResp.login, appAUserSecret);
  });
});
