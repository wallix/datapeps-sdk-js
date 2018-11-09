import * as Config from "../../Config";
import * as DataPeps from "../../../src/DataPeps";
import { init, dev } from "../../Context";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import { ApplicationImpl } from "../../../src/Application";

describe("identity.ApplicationJwt", () => {
  let initCtx, devCtx;

  beforeEach(async () => {
    initCtx = await init();
    devCtx = await dev(initCtx);
  });

  it(`should configure an application with HS256 algo`, async () => {
    let config: DataPeps.ApplicationJwtConfig = {
      key: nacl.randomBytes(128),
      signAlgorithm: DataPeps.ApplicationJwtAlgorithm.ES256,
      claimForLogin: "login"
    };

    // Open a session with dev identity
    let appConfigurator = devCtx.dev.session.Application;

    try {
      await appConfigurator.putConfig(devCtx.app.login, config);
    } catch (err) {
      console.log(err);
      expect(err).to.be.null;
    }
    try {
      let storedConfig = await appConfigurator.getConfig(devCtx.app.login);
      Object.keys(config).forEach(k =>
        expect(config[k]).deep.equals(storedConfig[k])
      );
      Object.keys(storedConfig).forEach(k =>
        expect(storedConfig[k]).deep.equals(config[k])
      );
    } catch (err) {
      console.log(err);
      expect(err).to.be.null;
    }
  });

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
});
