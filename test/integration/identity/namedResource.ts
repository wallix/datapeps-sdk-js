import * as Context from "../../Context";
import { expect } from "chai";
import * as mocha from "mocha";
import * as Long from "long";
import * as Utils from "../../Utils";
import { itError } from "../../Utils";
import * as DataPeps from "../../../src/DataPeps";

describe("identity.namedResource", () => {
  let resourceA: Utils.Resource, resourceB: Utils.Resource;
  let resourceName = "nameOfMyResource";
  let ctx: Context.aliceBobWithDeviceAndGroupCtx;
  let randomIdentity: string;
  let fakeId: Long;

  before(async () => {
    let init = await Context.init();
    ctx = await Context.aliceBobWithDeviceAndGroup(init);

    let resourceADataPeps = await ctx.alice.session.Resource.create(
      "test kind",
      { text: "payload A" },
      [ctx.alice.identity.login]
    );
    resourceA = new Utils.Resource(resourceADataPeps, "Content A");

    let resourceBDataPeps = await ctx.alice.session.Resource.create(
      "test kind",
      { text: "payload B" },
      [ctx.alice.identity.login]
    );
    resourceB = new Utils.Resource(resourceBDataPeps, "Content B");

    let random = Math.floor(Math.random() * 0xffffffff);
    randomIdentity = String(random);

    fakeId = new Long(1, 0, true);
  });

  it("Creation and access to a named resource", async () => {
    // creation of the named resource (Alice, resourceName, resourceA)
    await ctx.alice.session.Identity.setNamedResource(
      ctx.alice.identity.login,
      resourceName,
      resourceA.resource.id
    );

    // access to the created named resource
    let namedResourceA = await ctx.alice.session.Identity.getNamedResource(
      ctx.alice.identity.login,
      resourceName
    );

    // verification that the obtained resource is the same as the original
    Utils.checkFetchedResource(namedResourceA, resourceA);

    // verification that the obtained resource is the same as the original using encrypt and decrypt
    let plaintext = new Uint8Array([1, 2, 3, 4]);
    let ciphertext = resourceA.resource.encrypt(plaintext);
    let decryption = namedResourceA.decrypt(ciphertext);
    expect(plaintext).to.be.deep.equal(decryption);
  });

  it("Get a named resource when created by an identity in the sharing graph", async () => {
    // AliceDevice creates a named resoure  (Alice, resourceName, resourceA)
    await ctx.aliceDevice.session.Identity.setNamedResource(
      ctx.alice.identity.login,
      resourceName,
      resourceA.resource.id
    );

    // AliceDevice access to the created named resource
    let namedResourceA1 = await ctx.aliceDevice.session.Identity.getNamedResource(
      ctx.alice.identity.login,
      resourceName
    );

    // Alice access to the created named resource
    let namedResourceA2 = await ctx.alice.session.Identity.getNamedResource(
      ctx.alice.identity.login,
      resourceName
    );
  });

  it("Overwrite a named resource", async () => {
    // Alice creates the named resource (Alice, resourceName, resourceB) she overwrites (Alice, resourceName, resourceA)
    await ctx.alice.session.Identity.setNamedResource(
      ctx.alice.identity.login,
      resourceName,
      resourceB.resource.id
    );

    // Alice creates the named resource (Alice, resourceName, resourceA) she overwrites (Alice, resourceName, resourceB)
    await ctx.alice.session.Identity.setNamedResource(
      ctx.alice.identity.login,
      resourceName,
      resourceA.resource.id
    );
  });

  itError(
    "Put a named resource with a login that cannot be assumed",
    () =>
      ctx.alice.session.Identity.setNamedResource(
        ctx.bob.identity.login,
        resourceName,
        resourceA.resource.id
      ),
    DataPeps.ServerError.IdentityNotFound
  );

  itError(
    "Put a named resource with a login that does not exists",
    () =>
      // Bob tries to creat the named resource (randomId, resourceName, resourceB) but he is not allowed to assume Alice identity
      ctx.bob.session.Identity.setNamedResource(
        randomIdentity,
        resourceName,
        resourceB.resource.id
      ),
    DataPeps.ServerError.IdentityNotFound
  );

  it("Get a resource that has been removed", async () => {
    // saves resourceB.id before deleting it
    let resourceToDelete = await ctx.alice.session.Resource.get(
      resourceB.resource.id
    );
    let idNotExisting = resourceToDelete.id;
    await ctx.alice.session.Resource.delete(idNotExisting);

    // checking that resource B has really been deleted
    await Utils.expectError(
      ctx.alice.session.Resource.get(idNotExisting),
      DataPeps.ServerError.ResourceNotFound
    );

    // Alice tries to create of the named resource (Alice, resourceName, idNotExisting) with a resource id that does not exist (from deleted resourceB)
    await Utils.expectError(
      ctx.alice.session.Identity.setNamedResource(
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
      ctx.alice.session.Identity.getNamedResource(
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
      ctx.bob.session.Identity.getNamedResource(
        ctx.alice.identity.login,
        resourceName
      ),
    DataPeps.ServerError.IdentityNotFound
  );

  itError(
    "Put a named resource with a resource ID that does not exists",
    () =>
      // Alice tries to create the named resource (Alice, resourceName, fakeId) with a resource id that does not exist: 1
      ctx.alice.session.Identity.setNamedResource(
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
    "Get a named resource with a identity that does not exists",
    () =>
      // Alice tries to get the named resource (Alice, resourceName, fakeId) with a resource id that does not exist: 1
      ctx.alice.session.Identity.getNamedResource(randomIdentity, resourceName),
    DataPeps.ServerError.IdentityNotFound
  );

  itError(
    "Get a named resource that could exist but does not",
    () =>
      // Bob tries to get the named resource (Bob,resourceName) that does not exist
      ctx.bob.session.Identity.getNamedResource(
        ctx.bob.identity.login,
        resourceName
      ),
    DataPeps.ServerError.NamedResourceNotFound,
    () => ({
      login: ctx.bob.identity.login,
      name: resourceName
    })
  );
});
