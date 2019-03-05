import * as Config from "../../Config";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import { AdminAPI, IdentityAPI } from "../../../src/DataPeps";

describe("session.getPublicKeyHistory", () => {
  let seed = Math.floor(Math.random() * 99999);

  let aliceSecret = nacl.randomBytes(128);
  let alice: DataPeps.IdentityFields = {
    login: "alice." + seed,
    name: "alice 1",
    kind: "user",
    payload: null
  };

  let aliceSession: DataPeps.Session;
  let adminSession: DataPeps.Session;

  before(async () => {
    await Config.init();
    await DataPeps.register(alice, aliceSecret);
    aliceSession = await DataPeps.Session.login(alice.login, aliceSecret);
    adminSession = await Config.adminLogin();
  });

  let publicKeys: DataPeps.IdentityPublicKey[] = [];

  it("Alice can get her public key", async () => {
    let aliceKey = await aliceSession.getLatestPublicKey(alice.login);
    expect(aliceKey).is.not.null;
    publicKeys.push(aliceKey);

    let aliceKeys = await new IdentityAPI(aliceSession).getPublicKeyHistory(
      alice.login
    );
    expect(aliceKeys).is.not.null;
    expect(aliceKeys).to.be.deep.equal(publicKeys);
  });

  it("Public key history contains old and new versions after renewing key", async () => {
    await aliceSession.renewKeys();
    let aliceKey = await aliceSession.getLatestPublicKey(alice.login);
    expect(aliceKey).is.not.null;
    publicKeys.push(aliceKey);

    await aliceSession.renewKeys("other password");
    aliceKey = await aliceSession.getLatestPublicKey(alice.login);
    expect(aliceKey).is.not.null;
    publicKeys.push(aliceKey);

    let aliceKeys = await new IdentityAPI(aliceSession).getPublicKeyHistory(
      alice.login
    );
    expect(aliceKeys).is.not.null;
    for (let index = 1; index < aliceKeys.length; index++) {
      expect(aliceKeys[index]).not.to.be.deep.equal(aliceKeys[index - 1]);
    }
    expect(aliceKeys).to.be.deep.equal(publicKeys);
  });

  it("Public key history contains old and new versions after admin overwrite key", async () => {
    let secret = "an admin secret";
    await new IdentityAPI(adminSession).overwriteKeys(alice.login, secret);
    aliceSession = await DataPeps.Session.login(alice.login, secret);

    let aliceKey = await aliceSession.getLatestPublicKey(alice.login);
    expect(aliceKey).is.not.null;
    publicKeys.push(aliceKey);

    let aliceKeys = await new IdentityAPI(aliceSession).getPublicKeyHistory(
      alice.login
    );
    expect(aliceKeys).is.not.null;
    for (let index = 1; index < aliceKeys.length; index++) {
      expect(aliceKeys[index]).not.to.be.deep.equal(aliceKeys[index - 1]);
    }
    expect(aliceKeys).to.be.deep.equal(publicKeys);
  });
});
