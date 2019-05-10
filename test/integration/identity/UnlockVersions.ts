import * as Config from "../../Config";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import * as Utils from "../../Utils";
import { AdminAPI, ResourceAPI, IdentityAPI } from "../../../src/DataPeps";

async function expectCannotAssumeOwnershipToGetAResource(
  session: DataPeps.Session,
  id: DataPeps.ID
) {
  return await Utils.expectError(
    new ResourceAPI(session).get<Utils.TestResource>(id),
    DataPeps.ServerError.IdentityCannotAssumeOwnership
  );
}

describe("identity.UnlockVersions", () => {
  let seed = Math.floor(Math.random() * 99999);

  let aliceSecret = nacl.randomBytes(128);
  let deviceSecret = nacl.randomBytes(128);
  let otherPassword = "other password";
  let adminSecret1 = "an admin secret";
  let adminSecret2 = "a second admin secret";
  let adminSecret3 = "a third admin secret";
  let alice: DataPeps.IdentityFields = {
    login: "alice." + seed,
    name: "alice 1",
    kind: "user",
    payload: null
  };
  let device: DataPeps.IdentityFields = {
    login: "device." + seed,
    name: "device 1",
    kind: "device",
    payload: null
  };

  let aliceSession: DataPeps.Session;
  let deviceSession: DataPeps.Session;
  let adminSession: DataPeps.Session;

  let resv1, resv2, resv3, resv4, resv5, resv6, resv7: Utils.TestResource;

  before(async () => {
    await Config.init();
    await DataPeps.register(alice, aliceSecret); // v1
    aliceSession = await DataPeps.Session.login(alice.login, aliceSecret);

    await new IdentityAPI(aliceSession).create(device, {
      secret: deviceSecret
    });
    await new IdentityAPI(aliceSession).extendSharingGroup(alice.login, [
      device.login
    ]);
    deviceSession = await DataPeps.Session.login(device.login, deviceSecret);
  });
  it("Create identity and resource v1", async () => {
    resv1 = await new ResourceAPI(aliceSession).create(
      "test",
      { description: "This is a test resource for Alice v1" },
      [alice.login]
    );
  });
  it("Create identity and resource v2", async () => {
    adminSession = await Config.adminLogin();
    await new IdentityAPI(aliceSession).renewKeys(aliceSession.login); // v2
    aliceSession = await DataPeps.Session.login(alice.login, aliceSecret);
    resv2 = await new ResourceAPI(aliceSession).create(
      "test",
      { description: "This is a test resource for Alice v2" },
      [alice.login]
    );
  });
  it("Create identity and resource v3", async () => {
    await new IdentityAPI(aliceSession).renewKeys(
      aliceSession.login,
      otherPassword
    ); // v3
    aliceSession = await DataPeps.Session.login(alice.login, otherPassword);
    resv3 = await new ResourceAPI(aliceSession).create(
      "test",
      { description: "This is a test resource for Alice v3" },
      [alice.login]
    );
  });
  it("Create identity and resource v4", async () => {
    await new IdentityAPI(adminSession).overwriteKeys(
      alice.login,
      adminSecret1
    ); // key reset: v4
    aliceSession = await DataPeps.Session.login(alice.login, adminSecret1);
    resv4 = await new ResourceAPI(aliceSession).create(
      "test",
      { description: "This is a test resource for Alice v4" },
      [alice.login]
    );
  });
  it("Create identity and resource v5", async () => {
    await new IdentityAPI(aliceSession).renewKeys(aliceSession.login); // v5
    aliceSession = await DataPeps.Session.login(alice.login, adminSecret1);
    resv5 = await new ResourceAPI(aliceSession).create(
      "test",
      { description: "This is a test resource for Alice v5" },
      [alice.login]
    );
  });
  it("Create identity and resource v6", async () => {
    await new IdentityAPI(adminSession).overwriteKeys(
      alice.login,
      adminSecret2
    ); // key reset: v6
    aliceSession = await DataPeps.Session.login(alice.login, adminSecret2);
    resv6 = await new ResourceAPI(aliceSession).create(
      "test",
      { description: "This is a test resource for Alice v6" },
      [alice.login]
    );
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv6.id)
    ).to.be.deep.equal(resv6);
  });

  it("Create identity and resource v7", async () => {
    await new IdentityAPI(aliceSession).renewKeys(aliceSession.login); // v7
    aliceSession = await DataPeps.Session.login(alice.login, adminSecret2);
    resv7 = await new ResourceAPI(aliceSession).create(
      "test",
      { description: "This is a test resource for Alice v7" },
      [alice.login]
    );
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv6.id)
    ).to.be.deep.equal(resv6);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv7.id)
    ).to.be.deep.equal(resv7);

    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv1.id);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv2.id);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv3.id);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv4.id);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv5.id);
  });

  it("Unlock no version when providing a bad secret", async () => {
    let unlockedSessions = await new IdentityAPI(aliceSession).unlockVersions(
      alice.login,
      "a bad secret"
    );
    expect(unlockedSessions.length).to.be.equal(0);
  });

  it("Unlock several versions which shares the same secret", async () => {
    let unlockedSessions = await new IdentityAPI(aliceSession).unlockVersions(
      alice.login,
      adminSecret1
    );
    expect(unlockedSessions.length).to.be.equal(2);
    expect(
      unlockedSessions.map(unlocked => unlocked.version).sort((a, b) => a - b)
    ).to.be.deep.equal([4, 5]);
  });

  it("After unlock of v4 and v5, the related resources become accessible", async () => {
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv4.id)
    ).to.be.deep.equal(resv4);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv5.id)
    ).to.be.deep.equal(resv5);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv1.id);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv2.id);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv3.id);
  });

  it("Unlock v1 and v2", async () => {
    let unlockedSessions = await new IdentityAPI(aliceSession).unlockVersions(
      alice.login,
      aliceSecret
    );
    expect(unlockedSessions.length).to.be.equal(2);
    expect(
      unlockedSessions.map(unlocked => unlocked.version).sort((a, b) => a - b)
    ).to.be.deep.equal([1, 2]);
  });

  it("Unlock v3", async () => {
    let unlockedSessions = await new IdentityAPI(aliceSession).unlockVersions(
      alice.login,
      otherPassword
    );
    expect(unlockedSessions.length).to.be.equal(1);
    expect(unlockedSessions.map(unlocked => unlocked.version)).to.be.deep.equal(
      [3]
    );
  });

  it("After unlock all versions are accessible", async () => {
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv1.id)
    ).to.be.deep.equal(resv1);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv2.id)
    ).to.be.deep.equal(resv2);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv3.id)
    ).to.be.deep.equal(resv3);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv4.id)
    ).to.be.deep.equal(resv4);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv5.id)
    ).to.be.deep.equal(resv5);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv6.id)
    ).to.be.deep.equal(resv6);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv7.id)
    ).to.be.deep.equal(resv7);
  });

  it("Create new locked versions for tests from a device (with assume)", async () => {
    await new IdentityAPI(adminSession).overwriteKeys(
      alice.login,
      adminSecret3
    ); // key reset: v8
    aliceSession = await DataPeps.Session.login(alice.login, adminSecret3);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv1.id);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv2.id);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv3.id);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv4.id);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv5.id);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv6.id);
    await expectCannotAssumeOwnershipToGetAResource(aliceSession, resv7.id);
  });

  it("Unlock alice versions with its device", async () => {
    let unlockedSessions = await new IdentityAPI(deviceSession).unlockVersions(
      alice.login,
      adminSecret2
    );
    expect(unlockedSessions.length).to.be.equal(2);
    expect(
      unlockedSessions.map(unlocked => unlocked.version).sort((a, b) => a - b)
    ).to.be.deep.equal([6, 7]);
    expect(unlockedSessions.map(unlocked => unlocked.login)).to.be.deep.equal([
      alice.login,
      alice.login
    ]);

    aliceSession = await DataPeps.Session.login(alice.login, adminSecret3);
    // all resources are now accessible
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv1.id)
    ).to.be.deep.equal(resv1);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv2.id)
    ).to.be.deep.equal(resv2);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv3.id)
    ).to.be.deep.equal(resv3);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv4.id)
    ).to.be.deep.equal(resv4);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv5.id)
    ).to.be.deep.equal(resv5);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv6.id)
    ).to.be.deep.equal(resv6);
    expect(
      await new ResourceAPI(aliceSession).get<Utils.TestResource>(resv7.id)
    ).to.be.deep.equal(resv7);
  });
});
