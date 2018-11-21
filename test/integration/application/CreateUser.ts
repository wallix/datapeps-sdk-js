import * as Config from "../../Config";
import * as Context from "../../Context";
import * as Application from "../../../src/Application";
import * as DataPeps from "../../../src/DataPeps";
import { Uint8Tool } from "../../../src/Tools";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import * as mocha from "mocha";
import * as Long from "long";
import * as JWT from "jsonwebtoken";
import { HSKey, RSKey, ESKey, ESSecretKey, RSSecretKey } from "./Utils";
import { config } from "shelljs";

describe("application.createUser", () => {
  let ctx: Context.initCtx & Context.devCtx;

  before(async () => {
    let initCtx = await Context.init();
    let devCtx = await Context.dev(initCtx);
    ctx = { ...initCtx, ...devCtx };
  });

  ///////////////////////////////////////////////
  // Test nominal cases of user creation
  ///////////////////////////////////////////////

  function itCreateUserOKWithAlgo(
    key: Uint8Array,
    signAlgorithm: DataPeps.ApplicationJwtAlgorithm,
    secretKey?: Uint8Array
  ) {
    it(`configure the application with signAlgorith(${
      DataPeps.ApplicationJwtAlgorithm[signAlgorithm]
    })`, async () => {
      await ctx.dev.session.Application.putConfig(ctx.app.login, {
        jwt: {
          key,
          signAlgorithm,
          claimForLogin: "login"
        }
      });
    });

    it(`create user using with signAlgorith(${
      DataPeps.ApplicationJwtAlgorithm[signAlgorithm]
    })`, async () => {
      const login = `alice${Math.random()}`;
      let userSecret = "aSoStrongSecret";
      let token = JWT.sign(
        { login },
        new TextDecoder().decode(secretKey === undefined ? key : secretKey),
        { algorithm: DataPeps.ApplicationJwtAlgorithm[signAlgorithm] }
      );
      let createAliceResp = await Application.createUser(
        ctx.app.login,
        { jwt: { token: token.toString() } },
        userSecret
      );
      expect(createAliceResp.login).to.equal(`${login}@${ctx.app.login}`);
      await DataPeps.login(createAliceResp.login, userSecret);
    });
  }

  itCreateUserOKWithAlgo(HSKey, DataPeps.ApplicationJwtAlgorithm.HS256);
  itCreateUserOKWithAlgo(HSKey, DataPeps.ApplicationJwtAlgorithm.HS384);
  itCreateUserOKWithAlgo(HSKey, DataPeps.ApplicationJwtAlgorithm.HS512);

  itCreateUserOKWithAlgo(
    RSKey,
    DataPeps.ApplicationJwtAlgorithm.RS256,
    RSSecretKey
  );
  itCreateUserOKWithAlgo(
    RSKey,
    DataPeps.ApplicationJwtAlgorithm.RS384,
    RSSecretKey
  );
  itCreateUserOKWithAlgo(
    RSKey,
    DataPeps.ApplicationJwtAlgorithm.RS512,
    RSSecretKey
  );

  itCreateUserOKWithAlgo(
    ESKey,
    DataPeps.ApplicationJwtAlgorithm.ES256,
    ESSecretKey
  );
  itCreateUserOKWithAlgo(
    ESKey,
    DataPeps.ApplicationJwtAlgorithm.ES384,
    ESSecretKey
  );
  itCreateUserOKWithAlgo(
    ESKey,
    DataPeps.ApplicationJwtAlgorithm.ES512,
    ESSecretKey
  );

  ///////////////////////////////////////////////
  // TODO: Test error cases of user creation
  ///////////////////////////////////////////////
});
