import * as Context from "../../Context";
import { expect } from "chai";
import * as mocha from "mocha";
import * as Long from "long";
import * as Utils from "../../Utils";
import { itError } from "../../Utils";
import * as DataPeps from "../../../src/DataPeps";
import { ResourceAPI, IdentityAPI } from "../../../src/DataPeps";

let initCtx: Context.initCtx;

describe("identity.namedResource", () => {
  let resourceA: Utils.Resource,
    resourceB: Utils.Resource,
    resourceC: Utils.Resource;
  let deviceResource: Utils.Resource;
  let deviceAliceResource: Utils.Resource;
  let bobResource: Utils.Resource;
  let resourceName = "nameOfMyResource";
  let ctx: Context.aliceBobWithDeviceAndGroupCtx;
  let aliceBobChild: Context.identityCtx;
  let randomIdentity: string;
  let fakeId: Long;

  before(async () => {
    initCtx = await Context.init();
    ctx = await Context.aliceBobWithDeviceAndGroup(initCtx);

    let resourceADataPeps = await new ResourceAPI(ctx.alice.session).create(
      "test kind",
      { text: "payload A" },
      [ctx.alice.identity.login]
    );
    resourceA = new Utils.Resource(resourceADataPeps, "Content A");

    let resourceBDataPeps = await new ResourceAPI(ctx.alice.session).create(
      "test kind",
      { text: "payload B" },
      [ctx.alice.identity.login]
    );
    resourceB = new Utils.Resource(resourceBDataPeps, "Content B");

    let random = Math.floor(Math.random() * 0xffffffff);
    randomIdentity = String(random);

    fakeId = new Long(1, 0, true);

    let resourceCDataPeps = await new ResourceAPI(ctx.alice.session).create(
      "test kind",
      { text: "payload C" },
      [ctx.alice.identity.login]
    );
    resourceC = new Utils.Resource(resourceCDataPeps, "Content C");

    let deviceResourceDataPeps = await new ResourceAPI(
      ctx.aliceDevice.session
    ).create("test kind", null, [ctx.aliceDevice.identity.login]);
    deviceResource = new Utils.Resource(
      deviceResourceDataPeps,
      "Device resource content"
    );

    let deviceAliceResourceDataPeps = await new ResourceAPI(
      ctx.aliceDevice.session
    ).create("test kind", null, [
      ctx.alice.identity.login,
      ctx.aliceDevice.identity.login
    ]);
    deviceAliceResource = new Utils.Resource(
      deviceAliceResourceDataPeps,
      "Device resource content"
    );

    let bobResourceDataPeps = await new ResourceAPI(ctx.bob.session).create(
      "test kind",
      null,
      [ctx.bob.identity.login]
    );
    bobResource = new Utils.Resource(
      bobResourceDataPeps,
      "Bob resource content"
    );

    aliceBobChild = await Context.identity(initCtx, null);
    let aliceBobChildSession = await DataPeps.Session.login(
      aliceBobChild.identity.login,
      aliceBobChild.secret
    );
    await new DataPeps.IdentityAPI(aliceBobChildSession).extendSharingGroup(
      aliceBobChild.identity.login,
      [ctx.alice.identity.login, ctx.bob.identity.login]
    );
  });

  it("Creation and access to a named resource", async () => {
    // creation of the named resource (Alice, resourceName, resourceA)
    await new ResourceAPI(ctx.alice.session).setNamed(
      ctx.alice.identity.login,
      resourceName,
      resourceA.resource.id
    );

    // access to the created named resource
    let namedResourceA = await new ResourceAPI(ctx.alice.session).getNamed(
      ctx.alice.identity.login,
      resourceName
    );

    // verification that the obtained resource is the same as the original
    Utils.checkFetchedResource(namedResourceA, resourceA);
  });

  it("Get a named resource when created by an identity in the sharing graph", async () => {
    // AliceDevice creates a named resource  (Alice, resourceName, resourceA)
    await new ResourceAPI(ctx.aliceDevice.session).setNamed(
      ctx.alice.identity.login,
      resourceName,
      resourceA.resource.id
    );

    // AliceDevice access to the created named resource
    let namedResourceA1 = await new ResourceAPI(
      ctx.aliceDevice.session
    ).getNamed(ctx.alice.identity.login, resourceName);

    // Alice access to the created named resource
    let namedResourceA2 = await new ResourceAPI(ctx.alice.session).getNamed(
      ctx.alice.identity.login,
      resourceName
    );
  });

  it("An identity can create a resource, set it as a named resource for a shared identity and access it", async () => {
    let deviceResourceAPI = new ResourceAPI(ctx.aliceDevice.session);

    await deviceResourceAPI.setNamed(
      ctx.alice.identity.login,
      resourceName,
      deviceResource.resource.id
    );
    await deviceResourceAPI.getNamed(ctx.alice.identity.login, resourceName, {
      resourceOwner: ctx.aliceDevice.identity.login
    });
  });

  it("An identity can access to a resource associated with its descendent", async () => {
    await new ResourceAPI(ctx.alice.session).setNamed(
      aliceBobChild.identity.login,
      resourceName,
      deviceAliceResource.resource.id
    );

    await new ResourceAPI(ctx.aliceDevice.session).getNamed(
      aliceBobChild.identity.login,
      resourceName,
      { resourceOwner: ctx.aliceDevice.identity.login }
    );
  });

  it("An identity can access to a resource associated with its descendent", async () => {
    await new ResourceAPI(ctx.alice.session).setNamed(
      aliceBobChild.identity.login,
      resourceName,
      resourceA.resource.id
    );

    await new ResourceAPI(ctx.aliceDevice.session).getNamed(
      aliceBobChild.identity.login,
      resourceName,
      { resourceOwner: ctx.alice.identity.login }
    );
  });

  it("Overwrite a named resource", async () => {
    // Alice creates the named resource (Alice, resourceName, resourceB) she overwrites (Alice, resourceName, resourceA)
    await new ResourceAPI(ctx.alice.session).setNamed(
      ctx.alice.identity.login,
      resourceName,
      resourceB.resource.id
    );

    // Alice creates the named resource (Alice, resourceName, resourceA) she overwrites (Alice, resourceName, resourceB)
    await new ResourceAPI(ctx.alice.session).setNamed(
      ctx.alice.identity.login,
      resourceName,
      resourceA.resource.id
    );
  });

  itError(
    "Put a named resource with a login that cannot be assumed",
    () =>
      new ResourceAPI(ctx.alice.session).setNamed(
        ctx.bob.identity.login,
        resourceName,
        resourceA.resource.id
      ),
    DataPeps.ServerError.IdentityCannotAssumeOwnership
  );

  itError(
    "Put a named resource with a login that does not exist",
    () =>
      // Bob tries to creat the named resource (randomId, resourceName, resourceB) but he is not allowed to assume Alice identity
      new ResourceAPI(ctx.bob.session).setNamed(
        randomIdentity,
        resourceName,
        resourceB.resource.id
      ),
    DataPeps.ServerError.IdentityNotFound
  );

  it("Get a resource that has been removed", async () => {
    // saves resourceB.id before deleting it
    let resourceToDelete = await new ResourceAPI(ctx.alice.session).get(
      resourceB.resource.id
    );
    let idNotExisting = resourceToDelete.id;
    await new ResourceAPI(ctx.alice.session).delete(idNotExisting);

    // checking that resource B has really been deleted
    await Utils.expectError(
      new ResourceAPI(ctx.alice.session).get(idNotExisting),
      DataPeps.ServerError.ResourceNotFound
    );

    // Alice tries to create of the named resource (Alice, resourceName, idNotExisting) with a resource id that does not exist (from deleted resourceB)
    await Utils.expectError(
      new ResourceAPI(ctx.alice.session).setNamed(
        ctx.alice.identity.login,
        resourceName,
        idNotExisting
      ),
      DataPeps.ServerError.ResourceNotFound
    );
  });

  itError(
    "Get a named resource with a name that has not been associated",
    () =>
      // Alice tries to get the named resource (alice,resourceName+"difference") that does not exist
      new ResourceAPI(ctx.alice.session).getNamed(
        ctx.alice.identity.login,
        resourceName + "difference"
      ),
    DataPeps.ServerError.NamedResourceNotFound,
    () => ({
      login: ctx.alice.identity.login,
      name: resourceName + "difference"
    })
  );

  itError(
    "Get a named resource with an identity that cannot be assumed",
    () =>
      // Bob tries to get the named resource (alice,resourceName) but he cannot assume Alice identity
      new ResourceAPI(ctx.bob.session).getNamed(
        ctx.alice.identity.login,
        resourceName
      ),
    DataPeps.ServerError.IdentityCannotAssumeOwnership
  );

  itError(
    "Put a named resource with a resource ID that does not exist",
    () =>
      // Alice tries to create the named resource (Alice, resourceName, fakeId) with a resource id that does not exist: 1
      new ResourceAPI(ctx.alice.session).setNamed(
        ctx.alice.identity.login,
        resourceName,
        fakeId
      ),
    DataPeps.ServerError.ResourceNotFound,
    () => ({
      id: fakeId
    })
  );

  itError(
    "Get a named resource with a identity that does not exist",
    () =>
      // Alice tries to get the named resource (Alice, resourceName, fakeId) with a resource id that does not exist: 1
      new ResourceAPI(ctx.alice.session).getNamed(randomIdentity, resourceName),
    DataPeps.ServerError.IdentityNotFound
  );

  itError(
    "Get a named resource that could exist but does not",
    () =>
      // Bob tries to get the named resource (Bob,resourceName) that does not exist
      new ResourceAPI(ctx.bob.session).getNamed(
        ctx.bob.identity.login,
        resourceName
      ),
    DataPeps.ServerError.NamedResourceNotFound,
    () => ({
      login: ctx.bob.identity.login,
      name: resourceName
    })
  );

  itError(
    "A device can get a foreign resource associated with its descendant, but cannot decipher it",
    async () => {
      try {
        await new ResourceAPI(ctx.bob.session).setNamed(
          aliceBobChild.identity.login,
          "Bob's named resource",
          bobResource.resource.id
        );
      } catch (e) {
        throw `An unexpected error occurred: ${e}`;
      }

      await new ResourceAPI(ctx.aliceDevice.session).getNamed(
        aliceBobChild.identity.login,
        "Bob's named resource",
        {
          resourceOwner: ctx.bob.identity.login
        }
      );
    },
    DataPeps.ServerError.IdentityCannotAssumeOwnership
  );

  it("Overwrite a named resource", async () => {
    // Alice overwrites the named resource (Alice, resourceName, resourceA) with (Alice, resourceName, resourceC)
    await new ResourceAPI(ctx.alice.session).setNamed(
      ctx.alice.identity.login,
      resourceName,
      resourceC.resource.id
    );

    // access to the overwritten named resource
    let namedResource = await new ResourceAPI(ctx.alice.session).getNamed(
      ctx.alice.identity.login,
      resourceName
    );

    // verification that the obtained resource is the same as the original
    Utils.checkFetchedResource(namedResource, resourceC);
  });
});
