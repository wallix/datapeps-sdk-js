import {
  initCtx,
  devCtx,
  init,
  dev,
  aliceBobCtx,
  aliceBob
} from "../../Context";
import {
  ApplicationAPI,
  ApplicationJWT,
  ServerError,
  Session,
  DelegatedAccess,
  DelegatedAccessAPI,
  Identity
} from "../../../src/DataPeps";
import { expect } from "chai";
import { itError } from "../../Utils";
import * as JWT from "jsonwebtoken";
import { createUser } from "../../../src/Application";
import * as nacl from "tweetnacl";
import { Uint8Tool } from "../../../src/Tools";

describe("applicationAPI.usage", () => {
  let ctx: initCtx & devCtx & aliceBobCtx;
  let midnight: number;
  let startOfMonth: number;
  let startOfYear: number;

  before(async () => {
    let initCtx = await init();
    ctx = { ...initCtx, ...(await dev(initCtx)), ...(await aliceBob(initCtx)) };

    let d = new Date();
    d.setUTCHours(0, 0, 0, 0);
    midnight = d.getTime() / 1000;
    d.setUTCDate(1);
    startOfMonth = d.getTime() / 1000;
    d.setUTCMonth(0);
    startOfYear = d.getTime() / 1000;
  });

  itError(
    `A new user cannot access usage of non existant app`,
    async () => {
      let api = new ApplicationAPI(ctx.dev.session);
      await api.getUsageOverview(ctx.app.identity.login + ".non.exist");
    },
    ServerError.IdentityNotFound
  );
  itError(
    `Random Alice cannot access usage of dev app`,
    async () => {
      let api = new ApplicationAPI(ctx.alice.session);
      await api.getUsageOverview(ctx.app.identity.login);
    },
    ServerError.IdentityCannotAssumeOwnership
  );

  it("Get usage of this brand new app and get 0 hits", async () => {
    let api = new ApplicationAPI(ctx.dev.session);
    const usage = await api.getUsageOverview(ctx.app.identity.login);
    expect(usage.length).equals(0);
  });

  /**
   * request N delegatedAccess
   * resolve N-M delegatedAccess
   */
  it("Get delegates usage of an active dev", async () => {
    // Use app session to sign request
    const appSession = await Session.login(
      ctx.app.identity.login,
      ctx.app.secret
    );
    const mediator = new DelegatedAccessRequestsHandler(appSession);
    // Request 2 delegated accesses to alice identity for app
    await mediator.addRequest(ctx.alice.identity, ctx.alice.session, 2);
    // Make resolve that request
    await mediator.resolveAll();

    // Request 2 delegated access to alice identity for app
    await mediator.addRequest(ctx.alice.identity, ctx.alice.session, 2);
    // Request 1 delegated access to bob identity for app
    await mediator.addRequest(ctx.bob.identity, ctx.bob.session, 1);
    // Resolve one access for bob

    let api = new ApplicationAPI(ctx.dev.session);
    // Let's request usage since 10 seconds ago
    let usage = await api.getUsageOverview(ctx.app.identity.login, {
      from: new Date().getTime() / 1000 - 10
    });

    let expected = {
      start: midnight,
      delegates: {
        requested: 5,
        resolved: 2,
        distinctRequested: 2,
        distinctResolved: 1
      },
      jwt: { identities: 0, sessions: 0 }
    };

    expect(usage.length).equal(1);
    expect(usage[0]).to.deep.equal(expected);

    usage = await api.getUsageOverview(ctx.app.identity.login, {
      from: new Date().getTime() / 1000 - 60,
      by: 1
    });
    expect(usage.length).equal(1);
    expect(usage[0]).to.deep.equal({ ...expected, start: startOfMonth });

    usage = await api.getUsageOverview(ctx.app.identity.login, {
      from: new Date().getTime() / 1000 - 60,
      by: 2
    });
    expect(usage.length).equal(1);
    expect(usage[0]).to.deep.equal({ ...expected, start: startOfYear });

    // resolve request to cleanup promises
    mediator.resolveAll();

    usage = await api.getUsageOverview(ctx.app.identity.login, {
      from: new Date().getTime() / 1000 + 1
    });

    // Usage in the future should be empty
    expect(usage.length).equals(0);
  });

  /**
   * create J identity thanks jwt
   * use some jwt identities to create some session
   */
  it("Get jwt usage of an active dev", async () => {
    const key = "supersecurekey";

    let api = new ApplicationAPI(ctx.dev.session);
    await api.putConfig(
      ctx.app.identity.login,
      {
        jwt: {
          key: Uint8Tool.encode(key),
          signAlgorithm: ApplicationJWT.Algorithm.HS256
        }
      },
      ctx.customers[0].id
    );

    // Let's enroll David, David don't really use the app
    await createUser(
      ctx.app.identity.login,
      { jwt: { token: JWT.sign({ sub: "david" }, key) } },
      nacl.randomBytes(8)
    );

    let usage = await api.getUsageOverview(ctx.app.identity.login);

    expect(usage.length).equal(1);
    expect(usage[0].start).equal(midnight);
    expect(usage[0].jwt.identities).to.equals(1);
    expect(usage[0].jwt.sessions).to.equals(0);

    // Let's see if Charlie will be more motivated. Made up charlie's secret for datapeps
    let charlieDataPepsSecret = "angelsTest=1234";

    // Make Charlie open a JWT session
    let { isNew } = await ApplicationJWT.createSession(
      ctx.app.identity.login,
      "charlie",
      charlieDataPepsSecret,
      {
        createSession: async () => {},
        getToken: async () => {
          return JWT.sign({ sub: "charlie" }, key);
        }
      }
    );
    expect(isNew).to.be.true;

    // Let's open another
    let { isNew: isNewAgain } = await ApplicationJWT.createSession(
      ctx.app.identity.login,
      "charlie",
      charlieDataPepsSecret,
      {
        createSession: async () => {},
        getToken: async () => {
          return JWT.sign({ sub: "charlie" }, key);
        }
      }
    );
    expect(isNewAgain).to.be.false;

    usage = await api.getUsageOverview(ctx.app.identity.login);
    expect(usage.length).equal(1);
    expect(usage[0].start).equal(midnight);
    expect(usage[0].jwt.identities).to.equals(2);
    expect(usage[0].jwt.sessions).to.equals(2);
  });
});

/* DelegatedAccessHandler is used to store delegatedAccessRequest and resolve them */
class DelegatedAccessRequestsHandler {
  requests: accessRequest[] = [];
  requesterSession: Session;

  constructor(requesterSession: Session) {
    this.requesterSession = requesterSession;
  }

  delegatedAccessSignatureFunction = ({ login, publicKey }) => {
    let ulogin = Uint8Tool.encode(login);
    let toSign = new Uint8Array(ulogin.byteLength + publicKey.byteLength);
    toSign.set(ulogin, 0);
    toSign.set(publicKey, ulogin.byteLength);
    let sign = this.requesterSession.sign(toSign);
    return Promise.resolve({ requester: this.requesterSession.login, sign });
  };

  addRequest = async (
    targetIdentity: Identity<Uint8Array>,
    targetSession: Session,
    nbRepeat: number
  ) => {
    for (let i = 0; i < nbRepeat; i++) {
      this.requests.push({
        request: await DelegatedAccess.request(
          targetIdentity.login,
          this.delegatedAccessSignatureFunction
        ),
        targetIdentity,
        targetSession
      });
    }
  };

  async resolveAll() {
    for (let r of this.requests) {
      (await new DelegatedAccessAPI(r.targetSession).resolveAccessRequest(
        r.request.id
      )).resolve(r.targetIdentity.login);
    }
    this.requests = [];
  }
}

interface accessRequest {
  request: DelegatedAccess.Request;
  targetIdentity: Identity<Uint8Array>;
  targetSession: Session;
}
