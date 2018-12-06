import * as Config from "../Config";
import * as DataPeps from "../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import { AdminAPI } from "../../src/DataPeps";
import { api } from "../../src/proto";

describe("register", () => {
  let sdk = Config.sdk;
  let adminSession: DataPeps.Session;
  before(done => {
    Config.init()
      .then(() => {
        return Config.adminLogin();
      })
      .then(session => {
        adminSession = session;
        done();
      })
      .catch(done);
  });
  let seed = Math.floor(Math.random() * 99999);
  let domain = "gmail.com";
  let normanSecret = nacl.randomBytes(128);
  let normanEmail = "normanscaife" + seed + "@" + domain;
  let norman: DataPeps.Identity<Uint8Array> = {
    login: "normanscaife" + seed,
    name: "norman test identity, TS",
    admin: false,
    active: true,
    kind: "user",
    created: new Date(),
    payload: new TextEncoder().encode(
      JSON.stringify({
        firstname: "Norman",
        lastname: "TypeScript",
        tel: "+44712345678"
      })
    )
  };

  it("request a register link", async () => {
    await sdk.sendRegisterLink(normanEmail);
  });

  var token: Uint8Array;
  it("admin get registered links", async () => {
    let links = await new AdminAPI(adminSession).listRegisterTokens({
      domain,
      limit: 100
    });
    expect(links).to.not.be.null;
    let link = links.find(({ email }) => {
      return email == normanEmail;
    });
    expect(link).to.not.be.null;
    expect(link.status).equal(api.RegisterTokenStatus.SENT);
    token = link.token;
  });

  it("call registration endpoint", async () => {
    await sdk.registerWithToken(token, norman, normanSecret);
  });

  it("login with login", async () => {
    let session = await sdk.Session.login(norman.login, normanSecret);
    expect(session).to.not.be.null;
    expect(session.login).to.be.equals(norman.login);
  });

  it("login with email", async () => {
    let session = await sdk.Session.login(normanEmail, normanSecret);
    expect(session).to.not.be.null;
    expect(session.login).to.be.equals(norman.login);
  });
});
