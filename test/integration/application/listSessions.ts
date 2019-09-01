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
  ServerError
} from "../../../src/DataPeps";
import { expect } from "chai";
import { itError, sleep } from "../../Utils";
import * as JWT from "jsonwebtoken";
import { Uint8Tool, timestampToDate } from "../../../src/Tools";

describe("applicationAPI.listSession", () => {
  let ctx: {
    init: initCtx;
    firstDev: devCtx;
    secondDev: devCtx;
    aliceBob: aliceBobCtx;
  };

  before(async () => {
    let initCtx = await init();
    ctx = {
      init: initCtx,
      firstDev: await dev(initCtx),
      secondDev: await dev(initCtx),
      aliceBob: await aliceBob(initCtx)
    };
  });

  it("List sessions of a jwt app", async () => {
    const key = "supersecurekey";

    let api = new ApplicationAPI(ctx.firstDev.dev.session);
    await api.putConfig(
      ctx.firstDev.app.identity.login,
      {
        jwt: {
          key: Uint8Tool.encode(key),
          signAlgorithm: ApplicationJWT.Algorithm.HS256
        }
      },
      ctx.firstDev.customers[0].id
    );

    // Let's see if Charlie will be more motivated. Made up charlie's secret for datapeps
    let secret = "angelsTest=1234";

    // Make Charlie open 2 JWT session
    await ApplicationJWT.createSession(
      ctx.firstDev.app.identity.login,
      "charlie",
      secret,
      {
        createSession: async () => {},
        getToken: async () => {
          return JWT.sign({ sub: "charlie" }, key);
        }
      }
    );
    await sleep(2000);
    await ApplicationJWT.createSession(
      ctx.firstDev.app.identity.login,
      "dave",
      secret,
      {
        createSession: async () => {},
        getToken: async () => {
          return JWT.sign({ sub: "dave" }, key);
        }
      }
    );
    let dave = `dave@${ctx.firstDev.app.identity.login}`;
    let charlie = `charlie@${ctx.firstDev.app.identity.login}`;
    let sessionList = await api.listSessions(
      ctx.firstDev.app.identity.login,
      0,
      1
    );
    expect(sessionList.length).to.equals(1);
    expect(sessionList[0].owner).equal(dave);
    sessionList = await api.listSessions(ctx.firstDev.app.identity.login, 1, 1);
    expect(sessionList.length).to.equals(1);
    expect(sessionList[0].owner).equal(charlie);
    sessionList = await api.listSessions(ctx.firstDev.app.identity.login, 2, 1);
    expect(sessionList.length).to.equals(0);

    sessionList = await api.listSessions(
      ctx.firstDev.app.identity.login,
      0,
      10
    );
    expect(sessionList.length).to.equals(2);
    expect(sessionList[0].owner).equal(dave);
    expect(sessionList[1].owner).equal(charlie);
  });

  it("List sessions of a JWT app created since a given time", async () => {
    const key = "mySuperSecretKey";
    const identitySecret = "mySuperSecretPassword";

    // If the test fails on your machine it might be because of the
    // lack of synchronization between your host and your k8s cluster.
    // In this case you can try to increase this constant.
    const sessionCreationTimeout = 2000;

    let api = new ApplicationAPI(ctx.secondDev.dev.session);
    await api.putConfig(
      ctx.secondDev.app.identity.login,
      {
        jwt: {
          key: Uint8Tool.encode(key),
          signAlgorithm: ApplicationJWT.Algorithm.HS256
        }
      },
      ctx.secondDev.customers[0].id
    );
    await ApplicationJWT.createSession(
      ctx.secondDev.app.identity.login,
      "charlie",
      identitySecret,
      {
        createSession: async () => {},
        getToken: async () => {
          return JWT.sign({ sub: "charlie" }, key);
        }
      }
    );

    await sleep(sessionCreationTimeout);
    let since = Math.floor(new Date().getTime() / 1000);
    await ApplicationJWT.createSession(
      ctx.secondDev.app.identity.login,
      "charlie",
      identitySecret,
      {
        createSession: async () => {},
        getToken: async () => {
          return JWT.sign({ sub: "charlie" }, key);
        }
      }
    );
    let sessionListSince = await api.listSessions(
      ctx.secondDev.app.identity.login,
      0,
      10,
      since
    );
    expect(sessionListSince.length).equal(1);
    let sessionList = await api.listSessions(
      ctx.secondDev.app.identity.login,
      0,
      10
    );
    expect(sessionList.length).equal(2);
  });

  itError(
    `Alice cannot list sessions of dev app`,
    async () => {
      let api = new ApplicationAPI(ctx.aliceBob.alice.session);
      await api.listSessions(ctx.firstDev.app.identity.login, 0, 42);
    },
    ServerError.IdentityCannotAssumeOwnership
  );
  itError(
    `A new user cannot access usage of non existant app`,
    async () => {
      let api = new ApplicationAPI(ctx.firstDev.dev.session);
      await api.listSessions(
        ctx.firstDev.app.identity.login + ".non.exist",
        0,
        10
      );
    },
    ServerError.IdentityNotFound
  );
});
