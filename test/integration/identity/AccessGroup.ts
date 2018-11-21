import * as Config from "../../Config";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";

/**
 * This test is about testing of the funtion DataPeps.IdentityAPI.getAccessGroup
 */
describe("identity.AccessGroup", () => {
  let seed = Math.floor(Math.random() * 99999);

  let aliceSecret = nacl.randomBytes(128);
  let alice: DataPeps.IdentityFields = {
    login: "alice." + seed,
    name: "alice test identity, TS",
    kind: "user",
    payload: null
  };

  function getOtherLogin(i: number) {
    return "other." + i + "." + seed;
  }

  let nothers = 10;
  let others = new Array(nothers).fill(0).map((x, i) => {
    return {
      login: getOtherLogin(i),
      name: "Other " + i,
      kind: "other",
      payload: null
    };
  });

  // Register and login alice
  let aliceSession: DataPeps.Session;
  let adminSession: DataPeps.Session;
  before(async () => {
    await Config.init();
    await DataPeps.register(alice, aliceSecret);
    aliceSession = await DataPeps.login(alice.login, aliceSecret);
    adminSession = await Config.adminLogin();
  });

  it("create others identities with alice in their sharingGroup", async () => {
    await Promise.all(
      others.map(other => {
        return aliceSession.Identity.create(other, {
          sharingGroup: [alice.login]
        });
      })
    );
  });

  async function checkAliceAccessGroup() {
    let accessGroup = await aliceSession.Identity.getAccessGroup(alice.login);
    expect(accessGroup.length).to.be.equals(nothers);
    others.forEach(other => {
      let link = accessGroup.find(link => link.id.login == other.login);
      expect(link).to.not.be.null;
      expect(link.id.login).to.be.equal(other.login);
      expect(link.locked).to.be.equal(false);
    });
  }

  it("checks alice accessGroup", async () => {
    await checkAliceAccessGroup();
  });

  it("checks alice accessGroup after renew alice keys", async () => {
    await aliceSession.renewKeys();
    await checkAliceAccessGroup();
  });

  it("checks alice accessGroup after renew others keys", async () => {
    await Promise.all(
      others.map(other => {
        return aliceSession.Identity.renewKeys(other.login);
      })
    );
    await checkAliceAccessGroup();
  });

  it("checks accessgroup are unlocked after delegate key renewal", async () => {
    await aliceSession.Identity.renewKeys(getOtherLogin(0));
  });

  it("checks alice accessGroup after admin reset keys", async () => {
    let newPassword = "a new password";
    await adminSession.Admin.overwriteKeys(alice.login, newPassword);
    aliceSession = await DataPeps.login(alice.login, newPassword);

    // Add new element to accessGroup and check it is unlocked
    nothers = nothers + 1;
    let afterKeyRenewalLogin = getOtherLogin(nothers);
    await aliceSession.Identity.create(
      {
        login: afterKeyRenewalLogin,
        name: "Other " + nothers,
        kind: "other",
        payload: null
      },
      { sharingGroup: [alice.login] }
    );
  });
});
