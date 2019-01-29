import * as Config from "../../Config";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import { itError } from "../../Utils";
import { AdminAPI, ResourceAPI, IdentityAPI } from "../../../src/DataPeps";
import { Uint8Tool } from "../../../src/Tools";

describe("admin.overwriteKeys", () => {
  let seed = Math.floor(Math.random() * 99999);

  let aliceSecret = nacl.randomBytes(128);
  let alice: DataPeps.IdentityFields = {
    login: "alice." + seed,
    name: "alice 1",
    kind: "user",
    payload: null
  };
  let aliceDelegate: DataPeps.IdentityFields = {
    login: alice.login + "_delegate",
    name: alice.name + "_delegate",
    kind: "delegate",
    payload: null
  };

  let bobSecret = nacl.randomBytes(128);
  let bob: DataPeps.IdentityFields = {
    login: "bob." + seed,
    name: "bob 1",
    kind: "user",
    payload: Uint8Tool.encode(
      JSON.stringify({
        test: 1
      })
    )
  };
  let group: DataPeps.IdentityFields = {
    login: alice.login + "_" + bob.login + "_group",
    name: alice.name + "_" + bob.name + "_group",
    kind: "group",
    payload: null
  };

  let aliceSession: DataPeps.Session;
  let aliceDelegateSession: DataPeps.Session;
  let bobSession: DataPeps.Session;
  let groupSession: DataPeps.Session;
  let adminSession: DataPeps.Session;

  let aliceDelegateRes: DataPeps.Resource<null>;
  let groupRes: DataPeps.Resource<null>;

  before(async () => {
    await Config.init();
    await DataPeps.register(alice, aliceSecret);
    await DataPeps.register(bob, bobSecret);
    aliceSession = await DataPeps.Session.login(alice.login, aliceSecret);
    bobSession = await DataPeps.Session.login(bob.login, bobSecret);
    adminSession = await Config.adminLogin();

    await new IdentityAPI(aliceSession).create(aliceDelegate, {
      sharingGroup: [alice.login]
    });
    aliceDelegateSession = await aliceSession.createSession(
      aliceDelegate.login
    );

    await new IdentityAPI(aliceSession).create(group, {
      sharingGroup: [alice.login, bob.login]
    });
    groupSession = await aliceSession.createSession(group.login);

    aliceDelegateRes = await new ResourceAPI(aliceDelegateSession).create(
      "test/A",
      null,
      [aliceDelegate.login]
    );
    groupRes = await new ResourceAPI(groupSession).create("test/A", null, [
      group.login
    ]);
  });

  it("Before overwriteKeys Alice can access the resource of delegate, directly and with assume", async () => {
    let res = await new ResourceAPI(aliceDelegateSession).get(
      aliceDelegateRes.id
    );
    expect(res).to.be.deep.equal(aliceDelegateRes);

    res = await new ResourceAPI(aliceSession).get(aliceDelegateRes.id, {
      assume: aliceDelegate.login
    });
    expect(res).to.be.deep.equal(aliceDelegateRes);
  });

  it("Before overwriteKeys Alice and Bob can access the resource of group", async () => {
    let res = await new ResourceAPI(aliceSession).get(groupRes.id, {
      assume: group.login
    });
    expect(res).to.be.deep.equal(groupRes);

    res = await new ResourceAPI(bobSession).get(groupRes.id, {
      assume: group.login
    });
    expect(res).to.be.deep.equal(groupRes);
  });

  it("Before overwriteKeys delegate and group identities are in access group of alice in v1", async () => {
    let accessGroup = await new IdentityAPI(aliceSession).getAccessGroup(
      alice.login
    );
    expect(accessGroup.length).to.be.equal(2);

    let delegateEl = accessGroup.filter(
      el => el.id.login == aliceDelegate.login
    )[0];
    expect(delegateEl).to.exist;
    expect(delegateEl.id.login).to.be.equal(aliceDelegate.login);
    expect(delegateEl.id.version).to.be.equal(1);

    let groupEl = accessGroup.filter(el => el.id.login == group.login)[0];
    expect(groupEl).to.exist;
    expect(groupEl.id.login).to.be.equal(group.login);
    expect(groupEl.id.version).to.be.equal(1);
  });

  it("After overwriteKeys Alice can still access to the delegate identity", async () => {
    let newPassword = "a new password";
    await new AdminAPI(adminSession).overwriteKeys(alice.login, newPassword);
    aliceSession = await DataPeps.Session.login(alice.login, newPassword);
    aliceDelegateSession = await aliceSession.createSession(
      aliceDelegate.login
    );
    expect(aliceDelegateSession).to.be.not.null;
    expect(aliceDelegateSession.login).to.be.equal(aliceDelegate.login);
  });

  itError(
    "After overwriteKeys Alice can no longer access the resources of the delegate",
    async () =>
      await new ResourceAPI(aliceSession).get(aliceDelegateRes.id, {
        assume: aliceDelegate.login
      }),
    DataPeps.ServerError.IdentityCannotAssumeOwnership
  );
  itError(
    "After overwriteKeys Alice can no longer access the resources of the group",
    async () =>
      await new ResourceAPI(aliceSession).get(groupRes.id, {
        assume: group.login
      }),
    DataPeps.ServerError.IdentityCannotAssumeOwnership
  );

  it("After overwriteKeys Bob can still access the resource of group", async () => {
    let res = await new ResourceAPI(bobSession).get(groupRes.id, {
      assume: group.login
    });
    expect(res).to.be.deep.equal(groupRes);
  });

  it("After overwriteKeys delegate identity is in access group of alice in v2 (without access to v1) but group identity stays in v1 (locked)", async () => {
    let accessGroup = await new IdentityAPI(aliceSession).getAccessGroup(
      alice.login
    );
    expect(accessGroup.length).to.be.equal(2);

    let delegateEl = accessGroup.filter(
      el => el.id.login == aliceDelegate.login
    )[0];
    expect(delegateEl).to.exist;
    expect(delegateEl.id.version).to.be.equal(2);
    expect(delegateEl.locked).to.be.equal(false);

    let groupEl = accessGroup.filter(el => el.id.login == group.login)[0];
    expect(groupEl).to.exist;
    expect(groupEl.id.version).to.be.equal(1);
    expect(groupEl.locked).to.be.equal(true);
  });

  it("After overwriteKeys Alice delegate can access to newly created resources", async () => {
    let newCreatedRes = await new ResourceAPI(aliceDelegateSession).create(
      "test/A",
      null,
      [aliceDelegate.login]
    );

    let res = await new ResourceAPI(aliceDelegateSession).get(newCreatedRes.id);
    expect(res).to.be.deep.equal(newCreatedRes);

    res = await new ResourceAPI(aliceSession).get(newCreatedRes.id, {
      assume: aliceDelegate.login
    });
    expect(res).to.be.deep.equal(newCreatedRes);
  });
});
