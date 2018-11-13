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

const appASecretKey = "appASecretKey";
const badAppASecretKey = "badbadnotgood";

class MockApplicationSession {
  login: string;
}

class MockApplicationConnector
  implements Application.ApplicationJWTConnector<MockApplicationSession> {
  createSession = async (login: string, secret: Uint8Array) => {
    return { login: login };
  };

  getToken = async (session: MockApplicationSession) => {
    return JWT.sign({ login: session.login }, appASecretKey);
  };
}

class BadMockApplicationConnector
  implements Application.ApplicationJWTConnector<MockApplicationSession> {
  createSession = async (login: string, secret: Uint8Array) => {
    return { login: login };
  };

  getToken = async (session: MockApplicationSession) => {
    return JWT.sign({ login: session.login }, badAppASecretKey);
  };
}

describe("application.createJWTSession", () => {
  let appADevCtx: Context.devCtx;
  let appAConfig: DataPeps.ApplicationJwtConfig = {
    key: Uint8Tool.convert(appASecretKey),
    signAlgorithm: DataPeps.ApplicationJwtAlgorithm.HS256,
    claimForLogin: "login"
  };

  let appAUserSecret = nacl.randomBytes(8);

  let appAAliceLogin = "appA.Alice";
  let appAAliceLoginToken = JWT.sign({ login: appAAliceLogin }, appASecretKey);

  let appABobLogin = "appA.Bob";

  let appAAliceBadMockLogin = "appA.AliceBadMock";
  let appAAliceBadMockLoginToken = JWT.sign(
    { login: appAAliceLogin },
    appASecretKey
  );

  let appABobBadMockLogin = "appA.BobBadMock";

  beforeEach(async () => {
    let initCtx = await Context.init();
    appADevCtx = await Context.dev(initCtx);
    await appADevCtx.dev.session.Application.putConfig(
      appADevCtx.app.login,
      appAConfig
    );
  });

  it("User already registered in DataPeps can open DataPeps and Application sessions", async () => {
    await Application.createUser(
      appADevCtx.app.login,
      { jwt: { token: appAAliceLoginToken.toString() } },
      appAUserSecret
    );
    let mockConnector = new MockApplicationConnector();
    let {
      session: dataPepsSession,
      app: appSession,
      new: isNew
    } = await DataPeps.ApplicationAPI.createJWTSession(
      appADevCtx.app.login,
      appAAliceLogin,
      appAUserSecret,
      mockConnector
    );
    expect(dataPepsSession).to.be.not.null;
    expect(appSession).to.be.not.null;
    expect(isNew).to.be.false;
  });

  it("User not yet registered in DataPeps can open DataPeps and Application sessions", async () => {
    let mockConnector = new MockApplicationConnector();
    let {
      session: dataPepsSession,
      app: appSession,
      new: isNew
    } = await DataPeps.ApplicationAPI.createJWTSession(
      appADevCtx.app.login,
      appABobLogin,
      appAUserSecret,
      mockConnector
    );
    expect(dataPepsSession).to.be.not.null;
    expect(appSession).to.be.not.null;
    expect(isNew).to.be.true;
  });

  it("User already registered in DataPeps cannot open DataPeps and Application sessions with a bad connector", async () => {
    await Application.createUser(
      appADevCtx.app.login,
      { jwt: { token: appAAliceBadMockLoginToken.toString() } },
      appAUserSecret
    );
    let mockConnector = new BadMockApplicationConnector();
    let errorOccurred = false;
    try {
      await DataPeps.ApplicationAPI.createJWTSession(
        appADevCtx.app.login,
        appAAliceBadMockLogin,
        appAUserSecret,
        mockConnector
      );
    } catch (err) {
      errorOccurred = true;
    }
    expect(errorOccurred).to.be.true;
  });

  it("User not yet registered in DataPeps can open DataPeps and Application sessions", async () => {
    let mockConnector = new BadMockApplicationConnector();
    let errorOccurred = false;
    try {
      await DataPeps.ApplicationAPI.createJWTSession(
        appADevCtx.app.login,
        appABobBadMockLogin,
        appAUserSecret,
        mockConnector
      );
    } catch (err) {
      errorOccurred = true;
    }
    expect(errorOccurred).to.be.true;
  });
});
