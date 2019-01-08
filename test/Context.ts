import * as DataPeps from "../src/DataPeps";
import * as Config from "./Config";
import * as nacl from "tweetnacl";
import { IdentityAPI } from "../src/DataPeps";

export interface initCtx {
  seed: number;
}

export function init(): initCtx {
  let seed = Math.floor(Math.random() * (Math.pow(10, 6) - 1));
  return { seed };
}

export interface adminCtx {
  admin: DataPeps.Identity<void>;
  adminSecret: Uint8Array;
  adminSession: DataPeps.Session;
}

export async function admin(): Promise<adminCtx> {
  let admin = Config.admin;
  let adminSecret = new TextEncoder().encode(Config.adminSecret);
  try {
    await DataPeps.register(admin, adminSecret);
  } catch (e) {
    if (
      !(
        e instanceof DataPeps.Error &&
        e.kind == DataPeps.ServerError.IdentityAlreadyExists
      )
    ) {
      throw e;
    }
  }
  let adminSession = await DataPeps.Session.login(admin.login, adminSecret);
  return { admin, adminSecret, adminSession };
}

export interface identityCtx {
  identity: DataPeps.Identity<any>;
  secret: Uint8Array;
}

export interface identityOptions {
  name?: string;
  kind?: string;
  payload?: Uint8Array;
}

export async function identity(
  init: initCtx,
  options: identityOptions
): Promise<identityCtx> {
  let secret = nacl.randomBytes(128);
  let identity = generateIdentityFields(init, options);
  await DataPeps.register(identity, secret);
  return {
    identity: { ...identity, created: new Date(), admin: false, active: true },
    secret
  };
}

export interface identityAndSessionCtx extends identityCtx {
  session: DataPeps.Session;
}

export async function identityAndSession(
  init: initCtx,
  name: string,
  options?: identityOptions
): Promise<identityAndSessionCtx> {
  let ctx = await identity(init, options);
  let session = await DataPeps.Session.login(ctx.identity.login, ctx.secret);
  return { ...ctx, session };
}

export interface childIdentityCtx extends identityCtx {
  parent: identityCtx;
}

export interface childIdentityOptions {
  kind?: string;
  payload?: Uint8Array;

  hasSecret?: boolean;
  sharingGroup?: string[];
  domain?: string;
}

export async function childIdentity(
  parent: identityAndSessionCtx,
  init: initCtx,
  options?: childIdentityOptions
): Promise<childIdentityCtx> {
  let parentIdentityAPI = await new IdentityAPI(parent.session);
  options = options ? options : {};
  let identityFields = generateIdentityFields(init, options);
  let secret: Uint8Array;
  if (options.hasSecret) {
    secret = nacl.randomBytes(128);
  }
  let email = `${identityFields.login}@${options.domain}`;
  await parentIdentityAPI.create(identityFields, {
    secret,
    sharingGroup: options.sharingGroup,
    email
  });
  let childCtx = {
    identity: {
      ...identityFields,
      created: new Date(),
      admin: false,
      active: true
    },
    secret,
    parent: parent
  };
  return childCtx;
}

export interface userPayload {
  description: string;
  firstname: string;
  lastname: string;
}

export interface userCtx extends identityCtx {}

export async function user(
  init: initCtx,
  name: string,
  domain?: string
): Promise<userCtx> {
  let payload = new TextEncoder().encode(
    JSON.stringify({
      firstname: name,
      lastname: "typescript",
      description: `${name} is a test identity from typescript integration test`
    } as userPayload)
  );
  let userCtx = await identity(init, { kind: "pepsswarm/0", payload, name });
  return userCtx;
}

export interface userAndSessionCtx extends identityAndSessionCtx {}

export async function userAndSession(
  init: initCtx,
  name: string,
  domain?: string
): Promise<userAndSessionCtx> {
  let ctx = await user(init, name, domain);
  let session = await DataPeps.Session.login(ctx.identity.login, ctx.secret);
  return { ...ctx, session };
}

export interface aliceBobCtx {
  alice: userAndSessionCtx;
  bob: userAndSessionCtx;
}

export async function aliceBob(init: initCtx): Promise<aliceBobCtx> {
  let alice = await userAndSession(init, "alice");
  let bob = await userAndSession(init, "bob");
  return { alice, bob };
}

export interface aliceBobWithDeviceAndGroupCtx extends aliceBobCtx {
  aliceDevice: userAndSessionCtx;
  bobDevice: userAndSessionCtx;
  group: DataPeps.Identity<Uint8Array>;
}

export interface groupPayload {
  description: string;
}

async function createDevice(
  user: userAndSessionCtx
): Promise<userAndSessionCtx> {
  let device = {
    login: `device.${user.identity.login}`,
    name: `Phone of ${user.identity.name}`,
    kind: "test/device",
    payload: null
  };
  let secret = nacl.randomBytes(1024);
  await new IdentityAPI(user.session).create(device, { secret });
  let session = await DataPeps.Session.login(device.login, secret);
  await new IdentityAPI(user.session).extendSharingGroup(user.identity.login, [
    device.login
  ]);
  return {
    secret,
    identity: { ...device, created: new Date(), admin: false, active: true },
    session
  };
}

export async function aliceBobWithDeviceAndGroup(
  init: initCtx
): Promise<aliceBobWithDeviceAndGroupCtx> {
  let abCtx = await aliceBob(init);
  let groupFields = {
    login: `aliceBob.${init.seed}`,
    name: `Alice&Bob's`,
    kind: "test/group",
    payload: new TextEncoder().encode(
      JSON.stringify({
        description: `A group shared by alice & bob`
      } as groupPayload)
    )
  };
  await new IdentityAPI(abCtx.alice.session).create(groupFields, {
    sharingGroup: [abCtx.alice.identity.login, abCtx.bob.identity.login]
  });
  let aliceDevice = await createDevice(abCtx.alice);
  let bobDevice = await createDevice(abCtx.bob);
  return {
    ...abCtx,
    aliceDevice,
    bobDevice,
    group: { ...groupFields, created: new Date(), admin: false, active: true }
  };
}

export interface devCtx {
  dev: userAndSessionCtx;
  app: { identity: DataPeps.Identity<Uint8Array>; secret: Uint8Array };
  apps: { identity: DataPeps.Identity<Uint8Array>; secret: Uint8Array }[];
}

/**
 * Create a context with a developer that owns n application
 * @param init
 * @param n
 */
export async function dev(init: initCtx, n = 1): Promise<devCtx> {
  let dev = await userAndSession(init, "dev");
  let apps = await Promise.all(
    new Array(n)
      .fill(null)
      .map(
        (_, i) =>
          <DataPeps.IdentityFields>{
            login: `app${i}.${init.seed}`,
            name: "A killer app",
            kind: "pepsswarm/3",
            payload: new TextEncoder().encode(
              JSON.stringify({
                description: `app allows you to do awesome stuff and respect your privacy`
              })
            )
          }
      )
      .map(async app => {
        let secret = nacl.randomBytes(128);
        await new IdentityAPI(dev.session).create(app, {
          sharingGroup: [dev.identity.login],
          secret
        });
        return {
          identity: {
            ...app,
            created: new Date(),
            admin: false,
            active: true
          },
          secret
        };
      })
  );
  return {
    dev,
    app: apps[0],
    apps
  };
}

export interface identitiesCtx {
  identities: DataPeps.Identity<Uint8Array>[];
}

export async function identities(
  init: initCtx,
  n: number,
  options?: identityOptions
): Promise<identitiesCtx> {
  let identities = [];
  let promises = [];
  options = options ? options : {};
  let name = options.name == null ? "id" : options.name;
  for (let i = 0; i < n; i++) {
    let secret = nacl.randomBytes(128);
    let identity: DataPeps.IdentityFields = generateIdentityFields(init, {
      ...options,
      name: `${name}${i}`
    });
    promises.push(DataPeps.register(identity, secret));
    identities.push({
      ...identity,
      created: new Date(),
      admin: false,
      active: true
    });
  }
  await Promise.all(promises);
  return { identities };
}

const identityDefaultKind = "kind/test-default";

function generateIdentityFields(
  init: initCtx,
  options: identityOptions
): DataPeps.IdentityFields {
  options = options ? options : {};
  let name = options.name == null ? "test" : options.name;
  let login = `${name}.${init.seed}`;
  let kind = options.kind;
  if (!kind || 0 === kind.length) {
    kind = identityDefaultKind;
  }
  let identityFields: DataPeps.IdentityFields = {
    login,
    name: `${name} martin`,
    kind,
    payload: options.payload
  };
  return identityFields;
}
