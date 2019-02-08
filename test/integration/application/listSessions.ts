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
import { Uint8Tool } from "../../../src/Tools";

describe("applicationAPI.listSession", () => {
  let ctx: initCtx & devCtx & aliceBobCtx;

  before(async () => {
    let initCtx = await init();
    ctx = { ...initCtx, ...(await dev(initCtx)), ...(await aliceBob(initCtx)) };
  });

  it("List sessions of a jwt app", async () => {
    const key = "supersecurekey";

    let api = new ApplicationAPI(ctx.dev.session);
    await api.putConfig(ctx.app.identity.login, {
      jwt: { key: Uint8Tool.encode(key) }
    });

    // Let's see if Charlie will be more motivated. Made up charlie's secret for datapeps
    let secret = "angelsTest=1234";

    // Make Charlie open 2 JWT session
    await ApplicationJWT.createSession(
      ctx.app.identity.login,
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
    await ApplicationJWT.createSession(ctx.app.identity.login, "dave", secret, {
      createSession: async () => {},
      getToken: async () => {
        return JWT.sign({ sub: "dave" }, key);
      }
    });
    let dave = `dave@${ctx.app.identity.login}`;
    let charlie = `charlie@${ctx.app.identity.login}`;
    let sessionList = await api.listSessions(ctx.app.identity.login, 0, 1);
    expect(sessionList.length).to.equals(1);
    expect(sessionList[0].owner).equal(dave);
    sessionList = await api.listSessions(ctx.app.identity.login, 1, 1);
    expect(sessionList.length).to.equals(1);
    expect(sessionList[0].owner).equal(charlie);
    sessionList = await api.listSessions(ctx.app.identity.login, 2, 1);
    expect(sessionList.length).to.equals(0);

    sessionList = await api.listSessions(ctx.app.identity.login, 0, 10);
    expect(sessionList.length).to.equals(2);
    expect(sessionList[0].owner).equal(dave);
    expect(sessionList[1].owner).equal(charlie);
  });

  itError(
    `Alice cannot list sessions of dev app`,
    async () => {
      let api = new ApplicationAPI(ctx.alice.session);
      await api.listSessions(ctx.app.identity.login, 0, 42);
    },
    ServerError.IdentityCannotAssumeOwnership
  );
  itError(
    `A new user cannot access usage of non existant app`,
    async () => {
      let api = new ApplicationAPI(ctx.dev.session);
      await api.listSessions(ctx.app.identity.login + ".non.exist", 0, 10);
    },
    ServerError.IdentityNotFound
  );
});
