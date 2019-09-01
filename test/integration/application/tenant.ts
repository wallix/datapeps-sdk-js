import { dev, init } from "../../Context";
import {
  ApplicationAPI,
  ApplicationJWT,
  ServerError
} from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { itError } from "../../Utils";

describe("applicationAPI.config.Tenant", () => {
  const PACK_NB_MAX_APPS = 10;

  describe("Nb max app check", () => {
    it(`Should create sequentialy nb app authorized by default pack`, async () => {
      let greedyDev = await dev(init(), PACK_NB_MAX_APPS);
      for (let app of greedyDev.apps) {
        await new ApplicationAPI(greedyDev.dev.session).putConfig(
          app.identity.login,
          {
            jwt: {
              key: nacl.randomBytes(128),
              signAlgorithm: ApplicationJWT.Algorithm.HS256,
              claimForLogin: "login"
            }
          },
          greedyDev.customers[0].id
        );
      }

      // Reconfigure this apps
      for (let app of greedyDev.apps) {
        await new ApplicationAPI(greedyDev.dev.session).putConfig(
          app.identity.login,
          {
            jwt: {
              key: nacl.randomBytes(128),
              signAlgorithm: ApplicationJWT.Algorithm.HS256,
              claimForLogin: "login"
            }
          },
          greedyDev.customers[0].id
        );
      }
    });
    it(`Should create concurently nb app authorized by default pack`, async () => {
      let greedyDev = await dev(init(), PACK_NB_MAX_APPS);
      await Promise.all(
        greedyDev.apps.map(app =>
          new ApplicationAPI(greedyDev.dev.session).putConfig(
            app.identity.login,
            {
              jwt: {
                key: nacl.randomBytes(128),
                signAlgorithm: ApplicationJWT.Algorithm.HS256,
                claimForLogin: "login"
              }
            },
            greedyDev.customers[0].id
          )
        )
      );
    });

    itError(
      `Should not create sequentially more app than authorized by default pack`,
      async () => {
        let greedyDev = await dev(init(), PACK_NB_MAX_APPS + 1);
        for (let app of greedyDev.apps) {
          await new ApplicationAPI(greedyDev.dev.session).putConfig(
            app.identity.login,
            {
              jwt: {
                key: nacl.randomBytes(128),
                signAlgorithm: ApplicationJWT.Algorithm.HS256,
                claimForLogin: "login"
              }
            },
            greedyDev.customers[0].id
          );
        }
      },
      ServerError.TenantQuotasReached
    );

    itError(
      `Should not create concurently more app than authorized by default pack`,
      async () => {
        let greedyDev = await dev(init(), PACK_NB_MAX_APPS + 1);
        await Promise.all(
          greedyDev.apps.map(app =>
            new ApplicationAPI(greedyDev.dev.session).putConfig(
              app.identity.login,
              {
                jwt: {
                  key: nacl.randomBytes(128),
                  signAlgorithm: ApplicationJWT.Algorithm.HS256,
                  claimForLogin: "login"
                }
              },
              greedyDev.customers[0].id
            )
          )
        );
      },
      ServerError.TenantQuotasReached
    );
  });
});
