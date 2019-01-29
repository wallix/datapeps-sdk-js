import * as Config from "../../Config";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import "mocha";
import { ResourceAPI, IdentityAPI } from "../../../src/DataPeps";
import { Uint8Tool } from "../../../src/Tools";

type TestResource = DataPeps.Resource<{ description: string }>;

describe("resource.list", () => {
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

  let charlieSecret = nacl.randomBytes(128);
  let charlie: DataPeps.IdentityFields = {
    login: "charlie." + seed,
    name: "charlie 1",
    kind: "user",
    payload: Uint8Tool.encode(
      JSON.stringify({
        test: 1
      })
    )
  };

  let deviceSecret = nacl.randomBytes(128);
  let device: DataPeps.IdentityFields = {
    login: "device." + seed,
    name: "device 1",
    kind: "device",
    payload: null
  };

  let aliceSession: DataPeps.Session;
  let bobSession: DataPeps.Session;
  let charlieSession: DataPeps.Session;
  let deviceSession: DataPeps.Session;

  let aliceRes1: TestResource;
  let aliceRes2: TestResource;
  let bobRes: TestResource;
  let sharedRes: TestResource;

  before(async () => {
    await Config.init();
    await DataPeps.register(alice, aliceSecret);
    await DataPeps.register(bob, bobSecret);
    await DataPeps.register(charlie, charlieSecret);
    aliceSession = await DataPeps.Session.login(alice.login, aliceSecret);
    bobSession = await DataPeps.Session.login(bob.login, bobSecret);
    charlieSession = await DataPeps.Session.login(charlie.login, charlieSecret);
    await new IdentityAPI(aliceSession).create(device, {
      secret: deviceSecret
    });
    await new IdentityAPI(aliceSession).extendSharingGroup(alice.login, [
      device.login
    ]);
    deviceSession = await DataPeps.Session.login(device.login, deviceSecret);
    aliceRes1 = await new ResourceAPI(aliceSession).create(
      "test/A",
      { description: "This is a test resource for Alice 1" },
      [alice.login]
    );
    aliceRes2 = await new ResourceAPI(aliceSession).create(
      "test/A",
      { description: "This is a test resource for Alice 2" },
      [alice.login]
    );
    bobRes = await new ResourceAPI(bobSession).create(
      "test/A",
      { description: "This is a test resource for Bob" },
      [bob.login]
    );
  });

  it("Check resources created by alice", async () => {
    let got = await new ResourceAPI(aliceSession).list<{
      description: string;
    }>();
    expect(got).to.be.deep.equal([aliceRes2, aliceRes1]);
  });

  it("Check resources created by bob", async () => {
    let got = await new ResourceAPI(bobSession).list<{ description: string }>();
    expect(got).to.be.deep.equal([bobRes]);
  });

  it("Check alice can access to its resources after key renewal", async () => {
    await new IdentityAPI(aliceSession).renewKeys(aliceSession.login);
    let got = await new ResourceAPI(aliceSession).list<{
      description: string;
    }>();
    expect(got).to.be.deep.equal([aliceRes2, aliceRes1]);
  });

  let aliceRes3: TestResource;
  it("Check alice can access to a new resource after key renewal", async () => {
    await aliceSession.renewKeys();
    expect(
      await new ResourceAPI(aliceSession).get(aliceRes1.id)
    ).to.be.deep.equal(aliceRes1); //TODO: remove when key staling has been fixed for resource creation
    aliceRes3 = await new ResourceAPI(aliceSession).create(
      "test/A",
      { description: "This is a test resource for Alice 3" },
      [alice.login]
    );

    let got = await new ResourceAPI(aliceSession).list<{
      description: string;
    }>();
    expect(got).to.be.deep.equal([aliceRes3, aliceRes2, aliceRes1]);
  });

  it("Check bob can access to a resource shared by alice", async () => {
    sharedRes = await new ResourceAPI(aliceSession).create(
      "test/A",
      { description: "resource created by alice shared with bob" },
      [alice.login, bob.login]
    );
    let got = await new ResourceAPI(bobSession).list<{ description: string }>();
    expect(got).to.be.deep.equal([sharedRes, bobRes]);
  });

  it("Check charlie can access to a resource created by alice shared by bob", async () => {
    await new ResourceAPI(bobSession).extendSharingGroup(sharedRes.id, [
      charlie.login
    ]);
    let got = await new ResourceAPI(charlieSession).list<{
      description: string;
    }>();
    expect(got).to.be.deep.equal([sharedRes]);
  });

  it("Successfully parse resources with custom function", async () => {
    let contentRes1 = "Hello World!";
    let contentRes2 = "Hello Charlie!";
    let options = {
      serialize: (payload: string) => Uint8Tool.encode(payload)
    };
    await new ResourceAPI(charlieSession).create<string>(
      "test/A",
      contentRes1,
      [charlie.login],
      options
    );
    await new ResourceAPI(charlieSession).create<string>(
      "test/A",
      contentRes2,
      [charlie.login],
      options
    );
    let got = await new ResourceAPI(charlieSession).list<string>({
      parse: (bytes: Uint8Array) => {
        try {
          return Uint8Tool.decode(bytes);
        } catch (e) {
          return "";
        }
      }
    });
    expect(got[1].payload).to.be.equal(contentRes1);
    expect(got[0].payload).to.be.equal(contentRes2);
  });

  it("Check device can list resources by assuming alice identity", async () => {
    let got = await new ResourceAPI(deviceSession).list<{
      description: string;
    }>({
      assume: alice.login
    });
    expect(got).to.be.deep.equal([sharedRes, aliceRes3, aliceRes2, aliceRes1]);
  });

  it("Check offset and limit", async () => {
    let got = await new ResourceAPI(aliceSession).list<{ description: string }>(
      { limit: 10 }
    );
    expect(got).to.be.deep.equal([sharedRes, aliceRes3, aliceRes2, aliceRes1]);

    got = await new ResourceAPI(aliceSession).list<{ description: string }>({
      limit: 2
    });
    expect(got).to.be.deep.equal([sharedRes, aliceRes3]);

    got = await new ResourceAPI(aliceSession).list<{ description: string }>({
      limit: 2,
      offset: 1
    });
    expect(got).to.be.deep.equal([aliceRes3, aliceRes2]);

    got = await new ResourceAPI(aliceSession).list<{ description: string }>({
      limit: 2,
      offset: 5
    });
    expect(got).to.be.deep.equal([]);
  });
});
