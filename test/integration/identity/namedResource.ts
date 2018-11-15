import * as Config from "../../Config";
import * as Context from "../../Context";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import * as mocha from "mocha";
import * as Long from "long";
import { Session } from "inspector";

class ResourceContent {
  plain: Uint8Array;
  encrypted: Uint8Array;

  constructor(resource: DataPeps.Resource<{}>, content: string) {
    let textEncoder = new TextEncoder();
    this.plain = textEncoder.encode(content);
    this.encrypted = resource.encrypt(this.plain);
  }
}

class Resource {
  resource: DataPeps.Resource<{}>;
  content: ResourceContent;

  constructor(resource: DataPeps.Resource<{}>, content: string) {
    this.resource = resource;
    this.content = new ResourceContent(resource, content);
  }
}

function checkFetchedResource(
  resourceFetched: DataPeps.Resource<{}>,
  resourceExpected: Resource
) {
  expect(resourceFetched).to.not.be.null;
  expect(resourceFetched.id).to.be.deep.equals(resourceExpected.resource.id);
  expect(resourceFetched.payload).to.be.deep.equals(
    resourceExpected.resource.payload
  );
  let decryptedContent = resourceFetched.decrypt(
    resourceExpected.content.encrypted
  );
  expect(decryptedContent).to.not.be.null;
  expect(decryptedContent).to.be.deep.equals(resourceExpected.content.plain);
}

function checkResourceNotFoundError(
  err,
  resourceId: DataPeps.ID,
  errorOccurred: { isTrue: boolean }
) {
  expect(err).to.not.be.null;
  expect(err).instanceof(DataPeps.Error);
  expect(err.kind).equal(DataPeps.ServerError.ResourceNotFound);
  expect(err.payload.id).to.be.deep.equals(resourceId);
  errorOccurred.isTrue = true;
}

function checkIdentityCannotAssumeOwnershipError(
  err,
  identity: String,
  errorOccurred: { isTrue: boolean }
) {
  expect(err).to.not.be.null;
  expect(err).instanceof(DataPeps.Error);
  expect(err.kind).equal(DataPeps.ServerError.IdentityCannotAssumeOwnership);
  errorOccurred.isTrue = true;
}

function checkPayloadIdentityNotFoundError(
  err,
  identity: String,
  errorOccurred: { isTrue: boolean }
) {
  expect(err).to.not.be.null;
  expect(err).instanceof(DataPeps.Error);
  expect(err.kind).equal(DataPeps.ServerError.IdentityNotFound);
  // expect(err.payload.login).to.be.deep.equals(identity);
  errorOccurred.isTrue = true;
}

function checkNamedResourceNotFoundError(
  err,
  identity: String,
  name: String,
  errorOccurred: { isTrue: boolean }
) {
  expect(err).to.not.be.null;
  expect(err).instanceof(DataPeps.Error);
  expect(err.kind).equal(DataPeps.ServerError.NamedResourceNotFound);
  expect(err.payload.login).to.be.deep.equals(identity);
  expect(err.payload.name).to.be.deep.equals(name);
  errorOccurred.isTrue = true;
}

describe("identity.namedResource", () => {
  let resourceA: Resource, resourceB: Resource;
  let resourceName = "nameOfMyResource";
  let ctx: Context.aliceBobWithDeviceAndGroupCtx;
  before(async () => {
    let init = await Context.init();
    ctx = await Context.aliceBobWithDeviceAndGroup(init);

    let resourceADataPeps = await ctx.alice.session.Resource.create(
      "test kind",
      { text: "payload A" },
      [ctx.alice.identity.login]
    );
    resourceA = new Resource(resourceADataPeps, "Content A");

    let resourceBDataPeps = await ctx.alice.session.Resource.create(
      "test kind",
      { text: "payload B" },
      [ctx.alice.identity.login]
    );
    resourceB = new Resource(resourceBDataPeps, "Content B");
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
    checkFetchedResource(namedResourceA, resourceA);

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
    // Alice creates the named resource (Alice, resourceName, resourceA)
    await ctx.alice.session.Identity.setNamedResource(
      ctx.alice.identity.login,
      resourceName,
      resourceA.resource.id
    );
  });

  it("Put a named resource with a login that cannot be assumed", async () => {
    // Alice tries to create the named resource (Bob, resourceName, resourceB) but she is not allowed to assume Bob identity
    let errorOccurred = { isTrue: false };
    try {
      await ctx.alice.session.Identity.setNamedResource(
        ctx.bob.identity.login,
        resourceName,
        resourceA.resource.id
      );
    } catch (err) {
      // checkIdentityCannotAssumeOwnershipError(
      checkPayloadIdentityNotFoundError(
        err,
        ctx.bob.identity.login,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("Put a named resource with a login that does not exists", async () => {
    let errorOccurred = { isTrue: false };
    let random = Math.floor(Math.random() * 0xffffffff);
    let randomIdentity = String(random);
    try {
      // Bob tries to creat the named resource (randomId, resourceName, resourceB) but he is not allowed to assume Alice identity
      await ctx.bob.session.Identity.setNamedResource(
        randomIdentity,
        resourceName,
        resourceB.resource.id
      );
    } catch (err) {
      checkPayloadIdentityNotFoundError(err, randomIdentity, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("Get a resource that has been removed", async () => {
    // saves resourceB.id before deleting it
    let resourceToDelete = await ctx.alice.session.Resource.get(
      resourceB.resource.id
    );
    let idNotExisting = resourceToDelete.id;
    await ctx.alice.session.Resource.delete(idNotExisting);

    // checking that resource B has really been deleted
    let errorOccurred = { isTrue: false };
    try {
      await ctx.alice.session.Resource.get(idNotExisting);
    } catch (err) {
      checkResourceNotFoundError(err, idNotExisting, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
    // Alice tries to create of the named resource (Alice, resourceName, idNotExisting) with a resource id that does not exist (from deleted resourceB)
    errorOccurred = { isTrue: false };
    try {
      await ctx.alice.session.Identity.setNamedResource(
        ctx.alice.identity.login,
        resourceName,
        idNotExisting
      );
    } catch (err) {
      checkResourceNotFoundError(err, idNotExisting, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("Get a named resource with a name that has not been associated", async () => {
    // Alice tries to get the named resource (alice,resourceName+"difference") that does not exist
    let errorOccurred = { isTrue: false };
    try {
      let resource = await ctx.alice.session.Identity.getNamedResource(
        ctx.alice.identity.login,
        resourceName + "difference"
      );
    } catch (err) {
      checkNamedResourceNotFoundError(
        err,
        ctx.alice.identity.login,
        resourceName + "difference",
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("Get a named resource with an identity that cannot be assumed", async () => {
    // Bob tries to get the named resource (alice,resourceName) but he cannot assume Alice identity
    let errorOccurred = { isTrue: false };
    try {
      let namedResourceA = await ctx.bob.session.Identity.getNamedResource(
        ctx.alice.identity.login,
        resourceName
      );
    } catch (err) {
      // checkIdentityCannotAssumeOwnershipError(
      checkPayloadIdentityNotFoundError(
        err,
        ctx.alice.identity.login,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("Put a named resource with a resource ID that does not exists", async () => {
    // Alice tries to create of the named resource (Alice, resourceName, fakeId) with a resource id that does not exist: 1
    let errorOccurred = { isTrue: false };
    let fakeId = new Long(1, 0, true);
    try {
      await ctx.alice.session.Identity.setNamedResource(
        ctx.alice.identity.login,
        resourceName,
        fakeId
      );
    } catch (err) {
      checkResourceNotFoundError(err, fakeId, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("Get a named resource with a identity that does not exists", async () => {
    // Alice tries to create of the named resource (Alice, resourceName, fakeId) with a resource id that does not exist: 1
    let errorOccurred = { isTrue: false };
    let random = Math.floor(Math.random() * 0xffffffff);
    let randomIdentity = String(random);
    try {
      await ctx.alice.session.Identity.getNamedResource(
        randomIdentity,
        resourceName
      );
    } catch (err) {
      checkPayloadIdentityNotFoundError(err, randomIdentity, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("Get a named resource that could exist but does not", async () => {
    // Bob tries to get the named resource (Bob,resourceName) that does not exist
    let errorOccurred = { isTrue: false };
    try {
      let resource = await ctx.bob.session.Identity.getNamedResource(
        ctx.bob.identity.login,
        resourceName
      );
    } catch (err) {
      checkNamedResourceNotFoundError(
        err,
        ctx.bob.identity.login,
        resourceName,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;
  });
});
