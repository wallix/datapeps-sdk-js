import * as Config from "../../Config";
import * as Utils from "../../Utils";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import {
  IdentityAPI,
  DelegatedAccess,
  DelegatedAccessAPI
} from "../../../src/DataPeps";
import { Uint8Tool } from "../../../src/Tools";

describe("session.listDelegatedAccess", () => {
  let seed = Math.floor(Math.random() * 99999);
  let aliceSecret = nacl.randomBytes(128);
  let alice: DataPeps.IdentityFields = {
    login: "alice." + seed,
    name: "alice test identity, TS",
    kind: "user",
    payload: null
  };
  let aliceApp: DataPeps.IdentityFields = {
    login: "aliceApp." + seed,
    name: "Awesome E2EE application",
    kind: "app",
    payload: null
  };
  let bobSecret = nacl.randomBytes(128);
  let bob: DataPeps.IdentityFields = {
    login: "bob." + seed,
    name: "bob test identity, TS",
    kind: "user",
    payload: null
  };

  let sdk = Config.sdk;
  let aliceSession: DataPeps.Session;
  let bobSession: DataPeps.Session;

  let accessRequests: DelegatedAccess.Request[];
  // Create identities, open sessions and request delegated accesses
  before(async () => {
    await Config.init();
    await sdk.register(alice, aliceSecret);
    await sdk.register(bob, bobSecret);
    aliceSession = await DataPeps.Session.login(alice.login, aliceSecret);
    bobSession = await DataPeps.Session.login(bob.login, bobSecret);
    await new IdentityAPI(aliceSession).create(aliceApp, {
      sharingGroup: [alice.login]
    });
    let appSession = await aliceSession.createSession(aliceApp.login);
    let sign = ({ login, publicKey }) => {
      let ulogin = Uint8Tool.encode(login);
      let toSign = new Uint8Array(ulogin.byteLength + publicKey.byteLength);
      toSign.set(ulogin, 0);
      toSign.set(publicKey, ulogin.byteLength);
      let sign = appSession.sign(toSign);
      return Promise.resolve({ requester: aliceApp.login, sign });
    };
    accessRequests = await Promise.all(
      new Array(10)
        .fill(null)
        .map(() => DelegatedAccess.request(bob.login, sign))
    );
    accessRequests.sort((a, b) => DataPeps.ID.compare(b.id, a.id));
  });

  it("alice checks the list of requests of delegated access, using limit", async () => {
    let limit = accessRequests.length / 2;
    let accesses = await new DelegatedAccessAPI(aliceSession).list(
      aliceApp.login,
      {
        limit
      }
    );
    expect(accesses.length).to.be.equals(limit);
    for (let i = 0; i < limit; i++) {
      expect(accesses[i].id).to.be.deep.equals(accessRequests[i].id);
      expect(accesses[i].resolved).to.be.false;
      expect(accesses[i].requester.login).to.be.equals(aliceApp.login);
      expect(accesses[i].target.login).to.be.equals(bob.login);
    }
  });

  it("alice checks the list of requests of delegated access, using maxID", async () => {
    let limit = accessRequests.length / 2;
    let offset = accessRequests.length / 2;
    let accesses = await new DelegatedAccessAPI(aliceSession).list(
      aliceApp.login,
      {
        limit,
        maxID: accessRequests[offset - 1].id
      }
    );
    expect(accesses.length).to.be.equals(limit);
    for (let i = 0; i < limit; i++) {
      expect(accesses[i].id).to.be.deep.equals(accessRequests[offset + i].id);
      expect(accesses[i].resolved).to.be.false;
      expect(accesses[i].requester.login).to.be.equals(aliceApp.login);
      expect(accesses[i].target.login).to.be.equals(bob.login);
    }
  });

  it("alice checks the list of requests of delegated access, using sinceID", async () => {
    let limit = accessRequests.length / 2;
    let offset = accessRequests.length / 2;
    let accesses = await new DelegatedAccessAPI(aliceSession).list(
      aliceApp.login,
      {
        limit,
        sinceID: accessRequests[offset].id
      }
    );
    expect(accesses.length).to.be.equals(limit);
    for (let i = 0; i < limit; i++) {
      expect(accesses[i].id).to.be.deep.equals(accessRequests[i].id);
      expect(accesses[i].resolved).to.be.false;
      expect(accesses[i].requester.login).to.be.equals(aliceApp.login);
      expect(accesses[i].target.login).to.be.equals(bob.login);
    }
  });

  it("bob resolve some requests", async () => {
    let promises: Promise<DelegatedAccess.RequestResolver>[] = [];
    let resolvers = await Promise.all(
      accessRequests
        .filter((_, i) => i % 2 == 0)
        .map(r => new DelegatedAccessAPI(bobSession).resolveAccessRequest(r.id))
    );
    await Promise.all(resolvers.map(resolver => resolver.resolve(bob.login)));
  });

  it("alice checks that the request has flagged as resolved", async () => {
    let limit = accessRequests.length;
    let accesses = await new DelegatedAccessAPI(aliceSession).list(
      aliceApp.login,
      {
        limit
      }
    );
    expect(accesses.length).to.be.equals(limit);
    for (let i = 0; i < limit; i++) {
      expect(accesses[i].id).to.be.deep.equals(accessRequests[i].id);
      expect(accesses[i].resolved).to.be.equals(i % 2 == 0);
      expect(accesses[i].requester.login).to.be.equals(aliceApp.login);
      expect(accesses[i].target.login).to.be.equals(bob.login);
    }
  });

  after(async () => {
    for (let r of accessRequests) {
      try {
        let resolver = await new DelegatedAccessAPI(
          bobSession
        ).resolveAccessRequest(r.id);
        await resolver.resolve(bob.login);
      } catch (e) {}
    }
  });
});
