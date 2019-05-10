import * as Config from "../../Config";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import { IdentityAPI } from "../../../src/DataPeps";

describe("identity.LockedVersions", () => {
  let seed = Math.floor(Math.random() * 99999);

  let aliceSecret = nacl.randomBytes(128);
  let otherPassword = "other password";
  let adminSecret1 = "an admin secret";
  let alice: DataPeps.IdentityFields = {
    login: "alice." + seed,
    name: "alice 1",
    kind: "user",
    payload: null
  };

  let aliceSession: DataPeps.Session;
  let adminSession: DataPeps.Session;

  let publicKeys: DataPeps.IdentityPublicKey[];

  before(async () => {
    await Config.init();
    await DataPeps.register(alice, aliceSecret); // v1
    aliceSession = await DataPeps.Session.login(alice.login, aliceSecret);
    adminSession = await Config.adminLogin();
    await new IdentityAPI(aliceSession).renewKeys(aliceSession.login); // v2
    await new IdentityAPI(aliceSession).renewKeys(
      aliceSession.login,
      otherPassword
    ); // v3
    await new IdentityAPI(adminSession).overwriteKeys(
      alice.login,
      adminSecret1
    ); // key reset: v4
    aliceSession = await DataPeps.Session.login(alice.login, adminSecret1);
    await new IdentityAPI(aliceSession).renewKeys(aliceSession.login); // v5
    let adminSecret2 = "a second admin secret";
    await new IdentityAPI(adminSession).overwriteKeys(
      alice.login,
      adminSecret2
    ); // key reset: v6
    aliceSession = await DataPeps.Session.login(alice.login, adminSecret2);
    await new IdentityAPI(aliceSession).renewKeys(aliceSession.login); // v7
    publicKeys = (await new IdentityAPI(aliceSession).getPublicKeyHistory(
      alice.login
    )).sort((a, b) => a.version - b.version);
  });

  it("Locked version returns only the versions that can not be accessed by the login", async () => {
    let lockedKeys = (await new IdentityAPI(aliceSession).getLockedVersions(
      alice.login
    )).sort((a, b) => a.publicKey.version - b.publicKey.version);
    expect(lockedKeys.length).to.be.deep.equal(5);
    publicKeys.slice(0, 5).forEach((publicKey, i) => {
      expect(lockedKeys[i].publicKey.login).to.be.deep.equal(publicKey.login);
      expect(lockedKeys[i].publicKey.version).to.be.deep.equal(
        publicKey.version
      );
      expect(lockedKeys[i].publicKey.box).to.be.deep.equal(publicKey.box);
      expect(lockedKeys[i].publicKey.sign).to.be.deep.equal(publicKey.sign);
    });
  });

  it("Unlock versions 1-3 and check 4-5 are still locked", async () => {
    await new IdentityAPI(aliceSession).unlockVersions(
      alice.login,
      otherPassword
    );
    let lockedKeys = (await new IdentityAPI(aliceSession).getLockedVersions(
      alice.login
    )).sort((a, b) => a.publicKey.version - b.publicKey.version);
    expect(lockedKeys.length).to.be.deep.equal(2);
    publicKeys.slice(3, 5).forEach((publicKey, i) => {
      expect(lockedKeys[i].publicKey.login).to.be.deep.equal(publicKey.login);
      expect(lockedKeys[i].publicKey.version).to.be.deep.equal(
        publicKey.version
      );
      expect(lockedKeys[i].publicKey.box).to.be.deep.equal(publicKey.box);
      expect(lockedKeys[i].publicKey.sign).to.be.deep.equal(publicKey.sign);
    });
  });
});
