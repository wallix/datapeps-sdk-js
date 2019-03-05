import * as Config from "../../Config";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect, assert } from "chai";
import { AdminAPI, IdentityAPI } from "../../../src/DataPeps";

/**
 * This test is about testing of the funtion DataPeps.Session.login
 */
describe("session.Login", () => {
  let seed = Math.floor(Math.random() * 99999);

  let aliceSecret = nacl.randomBytes(128);
  let alice: DataPeps.IdentityFields = {
    login: "alice." + seed,
    name: "alice test identity, TS",
    kind: "user",
    payload: null
  };

  let anotherSecret = nacl.randomBytes(128);
  let another: DataPeps.IdentityFields = {
    login: "another." + seed,
    name: "another test identity, TS",
    kind: "user",
    payload: null
  };

  // Register and login alice
  let aliceSession: DataPeps.Session;
  before(async () => {
    await Config.init();
    await DataPeps.register(alice, aliceSecret);
    await DataPeps.register(another, anotherSecret);
  });

  function checkAliceSession(session: DataPeps.Session) {
    expect(aliceSession).to.be.not.null;
    expect(aliceSession.login).to.be.equals(alice.login);
  }

  it("check alice can login after register", async () => {
    aliceSession = await DataPeps.Session.login(alice.login, aliceSecret);
    checkAliceSession(aliceSession);
  });

  it("check alice can login after renew its keys", async () => {
    await aliceSession.renewKeys();
    aliceSession = await DataPeps.Session.login(alice.login, aliceSecret);
    checkAliceSession(aliceSession);
  });

  it("check alice can login after she has changed her password", async () => {
    aliceSecret = nacl.randomBytes(128);
    await aliceSession.renewKeys(aliceSecret);
    aliceSession = await DataPeps.Session.login(alice.login, aliceSecret);
    checkAliceSession(aliceSession);
  });

  it("check alice can login after an administrator has overwrite her keys", async () => {
    aliceSecret = nacl.randomBytes(128);
    let adminSession = await Config.adminLogin();
    await new IdentityAPI(adminSession).overwriteKeys(alice.login, aliceSecret);
    aliceSession = await DataPeps.Session.login(alice.login, aliceSecret);
    checkAliceSession(aliceSession);
  });

  it("check alice can login after an identity of its sharing group has changed her password", async () => {
    await new IdentityAPI(aliceSession).extendSharingGroup(aliceSession.login, [
      another.login
    ]);
    let anotherSession = await DataPeps.Session.login(
      another.login,
      anotherSecret
    );
    aliceSecret = nacl.randomBytes(128);
    await new IdentityAPI(anotherSession).renewKeys(
      aliceSession.login,
      aliceSecret
    );
    aliceSession = await DataPeps.Session.login(alice.login, aliceSecret);
    checkAliceSession(aliceSession);
  });

  it("check error when we try to login with a unexisting login", async () => {
    let login = "unknown@unknown.xxx";
    try {
      await DataPeps.Session.login(login, new Uint8Array(1));
    } catch (err) {
      expect(err).instanceof(DataPeps.Error);
      expect(err.kind).to.be.equals(DataPeps.ServerError.IdentityNotFound);
      expect(err.payload.login).to.be.deep.equals(login);
      return;
    }
    throw new Error("login with a unknow identity");
  });

  it("check error when we try to login with a wrong password", async () => {
    try {
      await DataPeps.Session.login(alice.login, new Uint8Array(1));
    } catch (err) {
      expect(err).instanceof(DataPeps.Error);
      expect(err.kind).to.be.equals(DataPeps.SDKError.IdentityInvalidKeySet);
      return;
    }
    throw new Error("login with a wrong password");
  });
});
