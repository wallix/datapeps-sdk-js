import { JWTConfig, configs } from "./Utils";
import * as JWT from "jsonwebtoken";
import {
  initCtx,
  devCtx,
  identityOptions,
  identitiesCtx,
  generateIdentities,
  dev
} from "../../Context";
import * as Application from "../../../src/Application";
import {
  Identity,
  ApplicationJWT,
  ApplicationAPI
} from "../../../src/DataPeps";
import { Uint8Tool } from "../../../src/Tools";

/**
 * Create a devCtx with n applications that are configured with all different
 * JWT configs + 1 application that is not configured.
 */
export async function devWithAllConfigs(init: initCtx): Promise<devCtx> {
  let devCtx = await dev(init, configs.length + 1);
  let api = new ApplicationAPI(devCtx.dev.session);
  await Promise.all(
    devCtx.apps.slice(0, configs.length).map(
      async (app, i) =>
        await api.putConfig(app.identity.login, {
          jwt: configs[i].config
        })
    )
  );
  return devCtx;
}

export async function registerIdentitiesForEachApp(
  init: initCtx,
  dev: devCtx,
  configs: JWTConfig[],
  n: number,
  options?: identityOptions
): Promise<identitiesCtx[]> {
  let promises = configs.map((config, i) =>
    registerIdentitiesWithApp(init, dev.apps[i].identity, config, n, options)
  );
  return await Promise.all(promises);
}

async function registerIdentitiesWithApp(
  init: initCtx,
  app: Identity<Uint8Array>,
  config: JWTConfig,
  n: number,
  options?: identityOptions
): Promise<identitiesCtx> {
  return await generateIdentities(
    init,
    n,
    async (field, secret) => {
      let token = JWT.sign(
        { [config.config.claimForLogin]: field.login },
        Uint8Tool.decode(config.secretKey),
        { algorithm: ApplicationJWT.Algorithm[config.config.signAlgorithm] }
      );
      return await Application.createUser(
        app.login,
        { jwt: { token } },
        secret
      );
    },
    options
  );
}
