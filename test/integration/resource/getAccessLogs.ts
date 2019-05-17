import * as Context from "../../Context";
import * as DataPeps from "../../../src/DataPeps";
import { expect } from "chai";
import "mocha";
import { IdentityAPI, ResourceAPI } from "../../../src/DataPeps";

describe("resource.getAccessLogs", () => {
  let [alice, bob, device]: DataPeps.Identity<Uint8Array>[] = [];

  let [aliceSession, bobSession, deviceSession]: DataPeps.Session[] = [];

  let aliceRes1: DataPeps.Resource<null>;
  let aliceRes2: DataPeps.Resource<null>;

  before(async () => {
    let init = await Context.init();
    let ctx = await Context.aliceBobWithDeviceAndGroup(init);
    alice = ctx.alice.identity;
    bob = ctx.bob.identity;
    aliceSession = ctx.alice.session;
    bobSession = ctx.bob.session;
    device = ctx.aliceDevice.identity;
    deviceSession = ctx.aliceDevice.session;

    aliceRes1 = await new ResourceAPI(aliceSession).create("test/A", null, [
      alice.login,
      bob.login
    ]);
    aliceRes2 = await new ResourceAPI(aliceSession).create("test/A", null, [
      alice.login
    ]);
  });

  it("Alice read the resource1, alice check access", async () => {
    await new ResourceAPI(aliceSession).get(aliceRes1.id);
    let logs = await new ResourceAPI(aliceSession).getAccessLogs({ limit: 1 });
    expect(logs.length).to.be.equals(1);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[0].owner.login).to.be.equals(alice.login);
    expect(logs[0].owner.version).to.be.equals(1);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(1);
    expect(logs[0].reason).to.be.equals("Read");
  });

  it("Bob read the resource1, alice check access", async () => {
    await new ResourceAPI(bobSession).get(aliceRes1.id);
    let logs = await new ResourceAPI(aliceSession).getAccessLogs({ limit: 1 });
    expect(logs.length).to.be.equals(1);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[0].owner.login).to.be.equals(bob.login);
    expect(logs[0].owner.version).to.be.equals(1);
    expect(logs[0].assume.login).to.be.equals(bob.login);
    expect(logs[0].assume.version).to.be.equals(1);
    expect(logs[0].reason).to.be.equals("Read");
  });

  it("Device read the resource1, alice check access", async () => {
    await new ResourceAPI(deviceSession).get(aliceRes1.id, {
      assume: alice.login
    });
    let logs = await new ResourceAPI(aliceSession).getAccessLogs({ limit: 1 });
    expect(logs.length).to.be.equals(1);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[0].owner.login).to.be.equals(device.login);
    expect(logs[0].owner.version).to.be.equals(1);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(1);
    expect(logs[0].reason).to.be.equals("Read");
  });

  it("Alice read the resource2, alice check access", async () => {
    await new ResourceAPI(aliceSession).get(aliceRes2.id);
    let logs = await new ResourceAPI(aliceSession).getAccessLogs({ limit: 1 });
    expect(logs.length).to.be.equals(1);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes2.id.toString());
    expect(logs[0].owner.login).to.be.equals(alice.login);
    expect(logs[0].owner.version).to.be.equals(1);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(1);
    expect(logs[0].reason).to.be.equals("Read");
  });

  it("Alice renew keys and access to the resource1, alice check access", async () => {
    await new IdentityAPI(aliceSession).renewKeys(aliceSession.login);
    await new ResourceAPI(aliceSession).get(aliceRes1.id);
    let logs = await new ResourceAPI(aliceSession).getAccessLogs({ limit: 1 });
    expect(logs.length).to.be.equals(1);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[0].owner.login).to.be.equals(alice.login);
    expect(logs[0].owner.version).to.be.equals(2);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(2);
    expect(logs[0].reason).to.be.equals("Read");
  });

  it("Alice check accesses of its resources", async () => {
    let logs = await new ResourceAPI(aliceSession).getAccessLogs({ limit: 5 });
    expect(logs.length).to.be.equals(5);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[0].owner.login).to.be.equals(alice.login);
    expect(logs[0].owner.version).to.be.equals(2);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(2);
    expect(logs[0].reason).to.be.equals("Read");
    expect(logs[1].resourceID.toString()).to.be.equals(aliceRes2.id.toString());
    expect(logs[1].owner.login).to.be.equals(alice.login);
    expect(logs[1].owner.version).to.be.equals(1);
    expect(logs[1].assume.login).to.be.equals(alice.login);
    expect(logs[1].assume.version).to.be.equals(1);
    expect(logs[1].reason).to.be.equals("Read");
    expect(logs[2].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[2].owner.login).to.be.equals(device.login);
    expect(logs[2].owner.version).to.be.equals(1);
    expect(logs[2].assume.login).to.be.equals(alice.login);
    expect(logs[2].assume.version).to.be.equals(1);
    expect(logs[2].reason).to.be.equals("Read");
    expect(logs[3].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[3].owner.login).to.be.equals(bob.login);
    expect(logs[3].owner.version).to.be.equals(1);
    expect(logs[3].assume.login).to.be.equals(bob.login);
    expect(logs[3].assume.version).to.be.equals(1);
    expect(logs[3].reason).to.be.equals("Read");
    expect(logs[4].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[4].owner.login).to.be.equals(alice.login);
    expect(logs[4].owner.version).to.be.equals(1);
    expect(logs[4].assume.login).to.be.equals(alice.login);
    expect(logs[4].assume.version).to.be.equals(1);
    expect(logs[4].reason).to.be.equals("Read");
  });

  it("Device check accesses of alice resources", async () => {
    let logs = await new ResourceAPI(deviceSession).getAccessLogs({
      limit: 5,
      assume: alice.login
    });
    expect(logs.length).to.be.equals(5);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[0].owner.login).to.be.equals(alice.login);
    expect(logs[0].owner.version).to.be.equals(2);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(2);
    expect(logs[0].reason).to.be.equals("Read");
    expect(logs[1].resourceID.toString()).to.be.equals(aliceRes2.id.toString());
    expect(logs[1].owner.login).to.be.equals(alice.login);
    expect(logs[1].owner.version).to.be.equals(1);
    expect(logs[1].assume.login).to.be.equals(alice.login);
    expect(logs[1].assume.version).to.be.equals(1);
    expect(logs[1].reason).to.be.equals("Read");
    expect(logs[2].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[2].owner.login).to.be.equals(device.login);
    expect(logs[2].owner.version).to.be.equals(1);
    expect(logs[2].assume.login).to.be.equals(alice.login);
    expect(logs[2].assume.version).to.be.equals(1);
    expect(logs[2].reason).to.be.equals("Read");
    expect(logs[3].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[3].owner.login).to.be.equals(bob.login);
    expect(logs[3].owner.version).to.be.equals(1);
    expect(logs[3].assume.login).to.be.equals(bob.login);
    expect(logs[3].assume.version).to.be.equals(1);
    expect(logs[3].reason).to.be.equals("Read");
    expect(logs[4].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[4].owner.login).to.be.equals(alice.login);
    expect(logs[4].owner.version).to.be.equals(1);
    expect(logs[4].assume.login).to.be.equals(alice.login);
    expect(logs[4].assume.version).to.be.equals(1);
    expect(logs[4].reason).to.be.equals("Read");
  });

  it("Bob check accesses of its resources", async () => {
    let logs = await new ResourceAPI(bobSession).getAccessLogs();
    expect(logs.length).to.be.equals(4);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[0].owner.login).to.be.equals(alice.login);
    expect(logs[0].owner.version).to.be.equals(2);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(2);
    expect(logs[0].reason).to.be.equals("Read");
    expect(logs[1].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[1].owner.login).to.be.equals(device.login);
    expect(logs[1].owner.version).to.be.equals(1);
    expect(logs[1].assume.login).to.be.equals(alice.login);
    expect(logs[1].assume.version).to.be.equals(1);
    expect(logs[1].reason).to.be.equals("Read");
    expect(logs[2].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[2].owner.login).to.be.equals(bob.login);
    expect(logs[2].owner.version).to.be.equals(1);
    expect(logs[2].assume.login).to.be.equals(bob.login);
    expect(logs[2].assume.version).to.be.equals(1);
    expect(logs[2].reason).to.be.equals("Read");
    expect(logs[3].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[3].owner.login).to.be.equals(alice.login);
    expect(logs[3].owner.version).to.be.equals(1);
    expect(logs[3].assume.login).to.be.equals(alice.login);
    expect(logs[3].assume.version).to.be.equals(1);
    expect(logs[3].reason).to.be.equals("Read");
  });

  it("Alice check accesses of its resources, with resource filters", async () => {
    let logs = await new ResourceAPI(aliceSession).getAccessLogs({
      resourceIDs: [aliceRes1.id]
    });
    expect(logs.length).to.be.equals(4);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[0].owner.login).to.be.equals(alice.login);
    expect(logs[0].owner.version).to.be.equals(2);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(2);
    expect(logs[0].reason).to.be.equals("Read");
    expect(logs[1].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[1].owner.login).to.be.equals(device.login);
    expect(logs[1].owner.version).to.be.equals(1);
    expect(logs[1].assume.login).to.be.equals(alice.login);
    expect(logs[1].assume.version).to.be.equals(1);
    expect(logs[1].reason).to.be.equals("Read");
    expect(logs[2].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[2].owner.login).to.be.equals(bob.login);
    expect(logs[2].owner.version).to.be.equals(1);
    expect(logs[2].assume.login).to.be.equals(bob.login);
    expect(logs[2].assume.version).to.be.equals(1);
    expect(logs[2].reason).to.be.equals("Read");
    expect(logs[3].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[3].owner.login).to.be.equals(alice.login);
    expect(logs[3].owner.version).to.be.equals(1);
    expect(logs[3].assume.login).to.be.equals(alice.login);
    expect(logs[3].assume.version).to.be.equals(1);
    expect(logs[3].reason).to.be.equals("Read");
    logs = await new ResourceAPI(aliceSession).getAccessLogs({
      limit: 2,
      resourceIDs: [aliceRes1.id]
    });
    expect(logs.length).to.be.equals(2);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[0].owner.login).to.be.equals(alice.login);
    expect(logs[0].owner.version).to.be.equals(2);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(2);
    expect(logs[0].reason).to.be.equals("Read");
    expect(logs[1].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[1].owner.login).to.be.equals(device.login);
    expect(logs[1].owner.version).to.be.equals(1);
    expect(logs[1].assume.login).to.be.equals(alice.login);
    expect(logs[1].assume.version).to.be.equals(1);
    expect(logs[1].reason).to.be.equals("Read");
    logs = await new ResourceAPI(aliceSession).getAccessLogs({
      offset: 2,
      resourceIDs: [aliceRes1.id]
    });
    expect(logs.length).to.be.equals(2);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[0].owner.login).to.be.equals(bob.login);
    expect(logs[0].owner.version).to.be.equals(1);
    expect(logs[0].assume.login).to.be.equals(bob.login);
    expect(logs[0].assume.version).to.be.equals(1);
    expect(logs[0].reason).to.be.equals("Read");
    expect(logs[1].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[1].owner.login).to.be.equals(alice.login);
    expect(logs[1].owner.version).to.be.equals(1);
    expect(logs[1].assume.login).to.be.equals(alice.login);
    expect(logs[1].assume.version).to.be.equals(1);
    expect(logs[1].reason).to.be.equals("Read");
    logs = await new ResourceAPI(aliceSession).getAccessLogs({
      resourceIDs: [aliceRes2.id]
    });
    expect(logs.length).to.be.equals(1);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes2.id.toString());
    expect(logs[0].owner.login).to.be.equals(alice.login);
    expect(logs[0].owner.version).to.be.equals(1);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(1);
    expect(logs[0].reason).to.be.equals("Read");
  });

  it("Alice share the resource2, alice check access", async () => {
    await new ResourceAPI(aliceSession).extendSharingGroup(aliceRes2.id, [
      bob.login
    ]);
    let logs = await new ResourceAPI(aliceSession).getAccessLogs({ limit: 1 });
    expect(logs.length).to.be.equals(1);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes2.id.toString());
    expect(logs[0].owner.login).to.be.equals(alice.login);
    expect(logs[0].owner.version).to.be.equals(2);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(2);
    expect(logs[0].reason).to.be.equals("Share");
  });

  it("Alice list its resources, alice check access", async () => {
    await new ResourceAPI(aliceSession).list();
    let logs = await new ResourceAPI(aliceSession).getAccessLogs({ limit: 2 });
    expect(logs.length).to.be.equals(2);
    expect(logs[0].owner.login).to.be.equals(alice.login);
    expect(logs[0].owner.version).to.be.equals(2);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(2);
    expect(logs[0].reason).to.be.equals("Read");
    expect(logs[1].owner.login).to.be.equals(alice.login);
    expect(logs[1].owner.version).to.be.equals(2);
    expect(logs[1].assume.login).to.be.equals(alice.login);
    expect(logs[1].assume.version).to.be.equals(2);
    expect(logs[1].reason).to.be.equals("Read");
  });

  it("Check custom reason for get access", async () => {
    await new ResourceAPI(aliceSession).get(aliceRes1.id, {
      reason: "specific access"
    });
    let logs = await new ResourceAPI(aliceSession).getAccessLogs({ limit: 1 });
    expect(logs.length).to.be.equals(1);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
    expect(logs[0].owner.login).to.be.equals(alice.login);
    expect(logs[0].owner.version).to.be.equals(2);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(2);
    expect(logs[0].reason).to.be.equals("specific access");
  });

  it("Check custom reason for list access", async () => {
    await new ResourceAPI(aliceSession).list({
      reason: "specific list access",
      limit: 1
    });
    let logs = await new ResourceAPI(aliceSession).getAccessLogs({ limit: 1 });
    expect(logs.length).to.be.equals(1);
    expect(logs[0].resourceID.toString()).to.be.equals(aliceRes2.id.toString());
    expect(logs[0].owner.login).to.be.equals(alice.login);
    expect(logs[0].owner.version).to.be.equals(2);
    expect(logs[0].assume.login).to.be.equals(alice.login);
    expect(logs[0].assume.version).to.be.equals(2);
    expect(logs[0].reason).to.be.equals("specific list access");
  });
});
