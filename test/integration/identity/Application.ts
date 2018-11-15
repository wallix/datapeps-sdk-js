import * as Config from "../../Config";
import * as Application from "../../../src/Application";
import * as DataPeps from "../../../src/DataPeps";
import { init, dev, devCtx } from "../../Context";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import { ApplicationImpl } from "../../../src/Application";
import { Uint8Tool } from "../../../src/Tools";
import * as jwt from "jsonwebtoken";
import { ITest } from "mocha";
import { itError } from "../../Utils";
import { HSKey, RSKey, ESKey } from "../application/Utils";

describe("identity.ApplicationJwt", () => {
  let initCtx, devCtx: devCtx;

  beforeEach(async () => {
    initCtx = await init();
    devCtx = await dev(initCtx);
  });

  ///////////////////////////////////////////////
  // Test nominal cases of configuration
  ///////////////////////////////////////////////

  function itConfigureOKWithAlgo(
    key: Uint8Array,
    signAlgorithm: DataPeps.ApplicationJwtAlgorithm
  ): ITest {
    return it(`should configure an application with signAlgorithm(${
      DataPeps.ApplicationJwtAlgorithm[signAlgorithm]
    })`, async () => {
      let putConfig: DataPeps.ApplicationJwtConfig = {
        key,
        signAlgorithm,
        claimForLogin: "login"
      };
      await devCtx.dev.session.Application.putConfig(
        devCtx.app.login,
        putConfig
      );
      let getConfig = await devCtx.dev.session.Application.getConfig(
        devCtx.app.login
      );
      Object.keys(putConfig).forEach(k => {
        expect(getConfig[k], `config field ${k}`).deep.equals(putConfig[k]);
      });
    });
  }

  itConfigureOKWithAlgo(HSKey, DataPeps.ApplicationJwtAlgorithm.HS256);
  itConfigureOKWithAlgo(HSKey, DataPeps.ApplicationJwtAlgorithm.HS384);
  itConfigureOKWithAlgo(HSKey, DataPeps.ApplicationJwtAlgorithm.HS512);

  itConfigureOKWithAlgo(RSKey, DataPeps.ApplicationJwtAlgorithm.RS256);
  itConfigureOKWithAlgo(RSKey, DataPeps.ApplicationJwtAlgorithm.RS384);
  itConfigureOKWithAlgo(RSKey, DataPeps.ApplicationJwtAlgorithm.RS512);

  itConfigureOKWithAlgo(ESKey, DataPeps.ApplicationJwtAlgorithm.ES256);
  itConfigureOKWithAlgo(ESKey, DataPeps.ApplicationJwtAlgorithm.ES384);
  itConfigureOKWithAlgo(ESKey, DataPeps.ApplicationJwtAlgorithm.ES512);

  ///////////////////////////////////////////////
  // Test some invalid cases of configuration
  ///////////////////////////////////////////////

  function itConfigureKOWithAlgo(
    key: Uint8Array,
    signAlgorithm: DataPeps.ApplicationJwtAlgorithm
  ): ITest {
    return itError(
      `should not configure with a key that is not valid for the signAlgorithm(${
        DataPeps.ApplicationJwtAlgorithm[signAlgorithm]
      })`,
      () =>
        devCtx.dev.session.Application.putConfig(devCtx.app.login, {
          key,
          signAlgorithm,
          claimForLogin: "login"
        }),
      DataPeps.ServerError.ApplicationConfigInvalid
    );
  }

  itConfigureKOWithAlgo(
    new Uint8Array(0),
    DataPeps.ApplicationJwtAlgorithm.HS256
  );
  itConfigureKOWithAlgo(
    new Uint8Array(0),
    DataPeps.ApplicationJwtAlgorithm.HS384
  );
  itConfigureKOWithAlgo(
    new Uint8Array(0),
    DataPeps.ApplicationJwtAlgorithm.HS512
  );

  itConfigureKOWithAlgo(ESKey, DataPeps.ApplicationJwtAlgorithm.RS256);
  itConfigureKOWithAlgo(ESKey, DataPeps.ApplicationJwtAlgorithm.RS384);
  itConfigureKOWithAlgo(ESKey, DataPeps.ApplicationJwtAlgorithm.RS512);

  itConfigureKOWithAlgo(RSKey, DataPeps.ApplicationJwtAlgorithm.ES256);
  itConfigureKOWithAlgo(RSKey, DataPeps.ApplicationJwtAlgorithm.ES384);
  itConfigureKOWithAlgo(RSKey, DataPeps.ApplicationJwtAlgorithm.ES512);

  it(`should store an application with default value`, async () => {
    let config: DataPeps.ApplicationJwtConfig = {
      key: nacl.randomBytes(128)
    };

    // Open a session with dev identity
    let appConfigurator = devCtx.dev.session.Application;

    try {
      await appConfigurator.putConfig(devCtx.app.login, config);
    } catch (err) {
      console.log(err);
      expect(err).to.be.null;
    }
    let storedConfig;
    try {
      storedConfig = await appConfigurator.getConfig(devCtx.app.login);
    } catch (err) {
      console.log(err);
      expect(err).to.be.null;
    }
    expect(storedConfig.signAlgorithm).to.equal(
      DataPeps.ApplicationJwtAlgorithm.HS256
    );
    expect(storedConfig.claimForLogin).to.equal("sub");
  });

  it(`should not configure a non existent application`, async () => {
    let config = { key: nacl.randomBytes(128), claimForLogin: "login" };
    let appConfigurator = devCtx.dev.session.Application;
    try {
      await appConfigurator.putConfig("non.existent.app", config);
      expect("I should not").to.equal("be there");
    } catch (err) {
      expect(err.code).to.equal(404);
    }
  });
  it(`should not configure an application with empty key`, async () => {
    let config = { key: new Uint8Array(0), claimForLogin: "field" };

    let appConfigurator = devCtx.dev.session.Application;
    try {
      await appConfigurator.putConfig(devCtx.app.login, config);
      expect("I should not").to.equal("be there");
    } catch (err) {
      expect(err.code).to.not.equal(500);
    }
  });
  it(`should overwrite configuration`, async () => {
    let config = { key: nacl.randomBytes(128), claimForLogin: "field_1" };

    let appConfigurator = devCtx.dev.session.Application;
    await appConfigurator.putConfig(devCtx.app.login, config);

    config = { key: nacl.randomBytes(128), claimForLogin: "field_2" };
    await appConfigurator.putConfig(devCtx.app.login, config);

    let storedConfig = await appConfigurator.getConfig(devCtx.app.login);
    expect(storedConfig.claimForLogin).to.equal(config.claimForLogin);
    expect(storedConfig.key).to.deep.equals(config.key);
  });
  it(`should not configure an application of someone else`, async () => {
    let config = { key: nacl.randomBytes(128), claimForLogin: "login" };

    let appConfigurator = devCtx.dev.session.Application;
    await appConfigurator.putConfig(devCtx.app.login, config);

    let anotherDevCtx = await dev(await init());
    let appConfigurator2 = anotherDevCtx.dev.session.Application;

    try {
      await appConfigurator2.putConfig(devCtx.app.login, config);
      expect("I should not").to.equal("be there");
    } catch (err) {
      expect(err.message).to.equal("DataPepsError(IdentityNotFound)");
      expect(err.code).to.equal(404);
    }
  });
  it(`should not get configuration an application of someone else`, async () => {
    let config = { key: nacl.randomBytes(128), claimForLogin: "login" };

    let appConfigurator = devCtx.dev.session.Application;
    await appConfigurator.putConfig(devCtx.app.login, config);

    let anotherDevCtx = await dev(await init());
    let appConfigurator2 = anotherDevCtx.dev.session.Application;

    try {
      await appConfigurator2.getConfig(devCtx.app.login);
      expect("I should not").to.equal("be there");
    } catch (err) {
      expect(err.message).to.equal("DataPepsError(IdentityNotFound)");
      expect(err.code).to.equal(404);
    }
  });

  // Register external

  it(`should create a new application then register user`, async () => {
    const sub = "alice";
    const key = "supersecurekey";
    const config: DataPeps.ApplicationJwtConfig = {
      key: Uint8Tool.convert("supersecurekey")
    };
    const token = jwt.sign({ sub }, key);

    let appConfigurator = devCtx.dev.session.Application;
    await appConfigurator.putConfig(devCtx.app.login, config);

    let createUserResponse = await Application.createUser(
      devCtx.app.login,
      { jwt: { token } },
      "passw0rd"
    );

    expect(createUserResponse.login).to.equal(`${sub}@${devCtx.app.login}`);
  });
});
