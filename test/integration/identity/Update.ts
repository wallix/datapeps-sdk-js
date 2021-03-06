import * as Config from "../../Config";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import { AdminAPI, IdentityAPI } from "../../../src/DataPeps";
import { Uint8Tool } from "../../../src/Tools";

describe("identity.Update", () => {
  let seed = Math.floor(Math.random() * 99999);

  let aliceSecret = nacl.randomBytes(128);
  let alice: DataPeps.IdentityFields = {
    login: "alice." + seed,
    name: "alice 1",
    kind: "user",
    payload: Uint8Tool.encode(
      JSON.stringify({
        test: 1
      })
    )
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

  let totoAdminSecret = nacl.randomBytes(128);
  let totoAdminEmail = "admin." + seed + "@toto.com";
  let totoAdmin: DataPeps.IdentityFields = {
    login: "adminToto." + seed,
    name: "Toto Admin",
    kind: "user",
    payload: null
  };

  let totoUserSecret = nacl.randomBytes(128);
  let totoUserEmail = "user." + seed + "@toto.com";
  let totoUser: DataPeps.IdentityFields = {
    login: "userToto." + seed,
    name: "Toto User",
    kind: "user",
    payload: null
  };

  let aliceSession: DataPeps.Session;
  let bobSession: DataPeps.Session;
  let adminSession: DataPeps.Session;
  let totoAdminSession: DataPeps.Session;
  before(async () => {
    await Config.init();
    await DataPeps.register(alice, aliceSecret);
    aliceSession = await DataPeps.Session.login(alice.login, aliceSecret);
    adminSession = await Config.adminLogin();
    await new IdentityAPI(aliceSession).create(bob, {
      sharingGroup: [alice.login],
      secret: bobSecret
    });
    bobSession = await DataPeps.Session.login(bob.login, bobSecret);
    await new IdentityAPI(adminSession).create(totoAdmin, {
      secret: totoAdminSecret,
      email: totoAdminEmail
    });
    await new AdminAPI(adminSession).setAdmin(totoAdmin.login, true);
    totoAdminSession = await DataPeps.Session.login(
      totoAdmin.login,
      totoAdminSecret
    );
    await new IdentityAPI(adminSession).create(totoUser, {
      secret: totoAdminSecret,
      email: totoUserEmail
    });
  });

  function checkFields(
    identity: DataPeps.Identity<Uint8Array>,
    fields: DataPeps.IdentityFields
  ) {
    expect(identity.kind).to.be.equal(fields.kind);
    expect(identity.login).to.be.equal(fields.login);
    expect(identity.name).to.be.equal(fields.name);
    expect(identity.payload).to.be.deep.equal(fields.payload);
  }

  it("Check alice fields", async () => {
    checkFields(await new IdentityAPI(aliceSession).get(alice.login), alice);
  });

  it("Alice should update its fields", async () => {
    alice.name = "alice 2";
    alice.payload = Uint8Tool.encode(
      JSON.stringify({
        toto: 2
      })
    );
    alice.kind = "another";
    await new IdentityAPI(aliceSession).update(alice);
    checkFields(await new IdentityAPI(aliceSession).get(alice.login), alice);
  });

  it("Bob should not update alice fields", async () => {
    let up = { ...alice, name: "alice bob" };
    try {
      await new IdentityAPI(bobSession).update(up);
    } catch (e) {
      expect(e).is.instanceOf(DataPeps.Error);
      let d = e as DataPeps.Error;
      expect(d.kind).to.be.equal(DataPeps.ServerError.IdentityNotAdmin);
      return;
    }
    throw new Error("bob should not update alice fields");
  });

  it("Peps admin should update alice fields", async () => {
    alice.name = "alice 3";
    alice.payload = Uint8Tool.encode(
      JSON.stringify({
        titi: 3
      })
    );
    alice.kind = "user";
    await new IdentityAPI(adminSession).update(alice);
    checkFields(await new IdentityAPI(adminSession).get(alice.login), alice);
  });
});
