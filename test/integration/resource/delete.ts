import * as Config from "../../Config";
import * as Context from "../../Context";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import * as mocha from "mocha";
import * as Long from "long";

function checkFetchedResource(
  resourceFetched: DataPeps.Resource<{}>,
  resourceExpected: DataPeps.Resource<{}>,
  encryptedContent: Uint8Array,
  expectedContent: Uint8Array
) {
  expect(resourceFetched).to.not.be.null;
  expect(resourceFetched.id).to.be.deep.equals(resourceExpected.id);
  expect(resourceFetched.payload).to.be.deep.equals(resourceExpected.payload);
  let decryptedContent = resourceFetched.decrypt(encryptedContent);
  expect(decryptedContent).to.not.be.null;
  expect(decryptedContent).to.be.deep.equals(expectedContent);
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

describe("resource.delete", () => {
  let seed = Math.floor(Math.random() * 99999);

  let aliceChildSecret = nacl.randomBytes(128);
  let aliceChild: Context.userAndSessionCtx;

  let resourceA: DataPeps.Resource<any>,
    resourceB: DataPeps.Resource<any>,
    resourceC: DataPeps.Resource<any>,
    resourceD: DataPeps.Resource<any>;

  let resourceAContent: Uint8Array,
    resourceBContent: Uint8Array,
    resourceCContent: Uint8Array,
    resourceDContent: Uint8Array;

  let resourceAEncryptedContent: Uint8Array,
    resourceBEncryptedContent: Uint8Array,
    resourceCEncryptedContent: Uint8Array,
    resourceDEncryptedContent: Uint8Array;

  let randomResourceId: number;
  let randomResourceIdLong: Long;

  let ctx: Context.aliceBobWithDeviceAndGroupCtx;
  before(async () => {
    let init = await Context.init();
    ctx = await Context.aliceBobWithDeviceAndGroup(init);
    aliceChild = await Context.userAndSession(init, "aliceChild");

    let textEncoder = new TextEncoder();
    // AliceChild creates a resource: resourceA (sharing group: AliceChild, Alice, Bob)
    resourceA = await aliceChild.session.Resource.create(
      "test kind",
      { text: "payload A" },
      [
        aliceChild.identity.login,
        ctx.alice.identity.login,
        ctx.bob.identity.login
      ]
    );
    // AliceChild creates a resource: resourceB (sharing group: AliceChild, Alice)
    resourceB = await aliceChild.session.Resource.create(
      "test kind",
      { text: "payload B" },
      [aliceChild.identity.login, ctx.alice.identity.login]
    );
    // AliceChild creates a resource: resourceC (sharing group: AliceChild, Alice)
    resourceC = await aliceChild.session.Resource.create(
      "test kind",
      { text: "payload C" },
      [aliceChild.identity.login, ctx.alice.identity.login]
    );
    // AliceChild creates a resource: resourceD (sharing group: AliceChild, Alice, Bob)
    resourceD = await aliceChild.session.Resource.create(
      "test kind",
      { text: "payload D" },
      [
        aliceChild.identity.login,
        ctx.alice.identity.login,
        ctx.bob.identity.login
      ]
    );

    // creation of unencrypted messages
    resourceAContent = textEncoder.encode("Content A");
    resourceBContent = textEncoder.encode("Content B");
    resourceCContent = textEncoder.encode("Content C");
    resourceDContent = textEncoder.encode("Content D");

    // laods message encryptions in datapeps resources
    resourceAEncryptedContent = resourceA.encrypt(resourceAContent);
    resourceBEncryptedContent = resourceB.encrypt(resourceBContent);
    resourceCEncryptedContent = resourceC.encrypt(resourceCContent);
    resourceDEncryptedContent = resourceD.encrypt(resourceDContent);

    // random resourceId generation
    randomResourceId = Math.floor(Math.random() * 0xffffffff);
    let low = Math.floor(Math.random() * 0xffffffff);
    let high = Math.floor(Math.random() * 0x7fffffff);
    randomResourceIdLong = new Long(low, high, true);
  });

  it("A sharer cannot hard delete the resource A", async () => {
    // Alice gets the resourceA (she is in its sharing group)
    let resourceAlice = await ctx.alice.session.Resource.get(resourceA.id);
    // ???
    checkFetchedResource(
      resourceAlice,
      resourceA,
      resourceAEncryptedContent,
      resourceAContent
    );

    let errorOccurred = { isTrue: false };
    try {
      // Alice hard deletes the resourceA (IMPOSSIBLE because she IS NOT its creator)
      await ctx.alice.session.Resource.delete(resourceA.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceA.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Bob gets the resourceA (he is in its sharing group)
    // (resourceA does still exist because Alice could not hard delete it)
    let resourceBob = await ctx.bob.session.Resource.get(resourceA.id);
    checkFetchedResource(
      resourceBob,
      resourceA,
      resourceAEncryptedContent,
      resourceAContent
    );
  });

  it("A sharer of the resource owner cannot hard-delete the resource A", async () => {
    // Bob gets the resourceA (he is in its sharing group)
    let resourceBob = await ctx.bob.session.Resource.get(resourceA.id);
    checkFetchedResource(
      resourceBob,
      resourceA,
      resourceAEncryptedContent,
      resourceAContent
    );

    let errorOccurred = { isTrue: false };
    try {
      // Bob hard deletes the resourceA (IMPOSSIBLE because he IS NOT its creator)
      await ctx.bob.session.Resource.delete(resourceA.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceA.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Alice gets the resourceA (she is in its sharing group)
    // (resourceA does still exist because Bob could not hard delete it)
    let resourceAlice = await ctx.alice.session.Resource.get(resourceA.id);
    checkFetchedResource(
      resourceAlice,
      resourceA,
      resourceAEncryptedContent,
      resourceAContent
    );
  });

  it("After failing to hard-delete the resource A, the sharer can still access it", async () => {
    // Bob gets the resourceA (he is in its sharing group)
    let resourceBob = await ctx.bob.session.Resource.get(resourceA.id);
    checkFetchedResource(
      resourceBob,
      resourceA,
      resourceAEncryptedContent,
      resourceAContent
    );

    let errorOccurred = { isTrue: false };
    try {
      // Bob hard deletes the resourceA (IMPOSSIBLE because he IS NOT its creator)
      await ctx.bob.session.Resource.delete(resourceA.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceA.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Bob gets the resourceA (he is in its sharing group)
    // (resourceA does still exist because Bob could not hard delete it)
    resourceBob = await ctx.bob.session.Resource.get(resourceA.id);
    checkFetchedResource(
      resourceBob,
      resourceA,
      resourceAEncryptedContent,
      resourceAContent
    );
  });

  it("A sharer can soft delete the resource A", async () => {
    // Alice gets the resourceA (she is in its sharing group)
    let resourceAlice = await ctx.alice.session.Resource.get(resourceA.id);
    checkFetchedResource(
      resourceAlice,
      resourceA,
      resourceAEncryptedContent,
      resourceAContent
    );

    // Alice soft deletes the resourceA (she is in its sharing group)
    await ctx.alice.session.Resource.unlink(resourceA.id);

    let errorOccurred = { isTrue: false };
    try {
      // Alice gets the resourceA (IMPOSSIBLE because she is NO MORE in its sharing group)
      await ctx.alice.session.Resource.get(resourceA.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceA.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Bob gets the resourceA (he is in its sharing group)
    let resourceBob = await ctx.bob.session.Resource.get(resourceA.id);
    checkFetchedResource(
      resourceBob,
      resourceA,
      resourceAEncryptedContent,
      resourceAContent
    );
  });

  it("The owner can hard delete the resource A", async () => {
    // AliceChild gets the resourceA (she is in its sharing group)
    let resourceAliceChild = await aliceChild.session.Resource.get(
      resourceA.id
    );
    checkFetchedResource(
      resourceAliceChild,
      resourceA,
      resourceAEncryptedContent,
      resourceAContent
    );

    // AliceChild hard deletes the resourceA (he is in its creator)
    await aliceChild.session.Resource.delete(resourceA.id);

    let errorOccurred = { isTrue: false };
    try {
      // AliceChild gets the resourceA (IMPOSSIBLE because it NO MORE EXISTS, AliceChild was in its sharing group)
      let resource = await aliceChild.session.Resource.get(resourceA.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceA.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      // Bob gets the resourceA (IMPOSSIBLE because it NO MORE EXISTS, Bob was in its sharing group)
      let resource = await ctx.bob.session.Resource.get(resourceA.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceA.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("An identity cannot soft-delete the resource B, that was not shared with it", async () => {
    let errorOccurred = { isTrue: false };
    try {
      // Bob gets the resourceB (IMPOSSIBLE because he IS NOT in its sharing group)
      let resourceBob = await ctx.bob.session.Resource.get(resourceB.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      // Bob soft deletes the resourceB (IMPOSSIBLE because he IS NOT in its sharing group)
      await ctx.bob.session.Resource.unlink(resourceB.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    // AliceChild gets the resourceB (he is in its sharing group)
    let resourceAliceChild = await aliceChild.session.Resource.get(
      resourceB.id
    );
    checkFetchedResource(
      resourceAliceChild,
      resourceB,
      resourceBEncryptedContent,
      resourceBContent
    );
  });

  it("An identity cannot hard-delete the resource B, that was not shared with it", async () => {
    let errorOccurred = { isTrue: false };
    try {
      // Bob gets the resourceB (IMPOSSIBLE because he IS NOT in its sharing group)
      let resourceBob = await ctx.bob.session.Resource.get(resourceB.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      // Bob hard deletes the resourceB (IMPOSSIBLE because he IS NOT its creator)
      await ctx.bob.session.Resource.delete(resourceB.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    // AliceChild gets the resourceB (he is in its sharing group)
    let resourceAliceChild = await aliceChild.session.Resource.get(
      resourceB.id
    );
    checkFetchedResource(
      resourceAliceChild,
      resourceB,
      resourceBEncryptedContent,
      resourceBContent
    );
  });

  it("When the owner soft deletes the resource B, the sharing group can still access it", async () => {
    // AliceChild gets the resourceB (he is in its sharing group)
    let resourceAliceChild = await aliceChild.session.Resource.get(
      resourceB.id
    );
    checkFetchedResource(
      resourceAliceChild,
      resourceB,
      resourceBEncryptedContent,
      resourceBContent
    );

    // AliceChild soft deletes the resourceB (he is in its sharing group)
    await aliceChild.session.Resource.unlink(resourceB.id);

    let errorOccurred = { isTrue: false };
    try {
      // AliceChild gets the resourceB (IMPOSSIBLE because he is NO MORE in its sharing group)
      let resource = await aliceChild.session.Resource.get(resourceB.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Alice gets the resourceB (she is in its sharing group)
    let resourceAlice = await ctx.alice.session.Resource.get(resourceB.id);
    checkFetchedResource(
      resourceAlice,
      resourceB,
      resourceBEncryptedContent,
      resourceBContent
    );
  });

  it("The owner can hard-delete the resource B, without being in the resource's sharing group", async () => {
    // Alice gets the resourceB (she is in its sharing group)
    let resourceAlice = await ctx.alice.session.Resource.get(resourceB.id);
    checkFetchedResource(
      resourceAlice,
      resourceB,
      resourceBEncryptedContent,
      resourceBContent
    );

    let errorOccurred = { isTrue: false };
    try {
      // AliceChild gets the resourceB (IMPOSSIBLE because he is NO MORE in its sharing group)
      let resource = await aliceChild.session.Resource.get(resourceB.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    // AliceChild hard deletes the resourceB (he is its creator)
    await aliceChild.session.Resource.delete(resourceB.id);

    errorOccurred.isTrue = false;
    try {
      // AliceChild gets the resourceB (IMPOSSIBLE because it NO MORE exists)
      let resource = await aliceChild.session.Resource.get(resourceB.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      // Alice gets the resourceB (IMPOSSIBLE because it NO MORE exists)
      let resource = await ctx.alice.session.Resource.get(resourceB.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("The owner can soft-delete the resource D after renewing the key", async () => {
    // AliceChild renews its keys
    aliceChild.session.renewKeys();

    // AliceChild gets the resourceD (he is in its sharing group)
    let resourceAliceChild = await aliceChild.session.Resource.get(
      resourceD.id
    );
    checkFetchedResource(
      resourceAliceChild,
      resourceD,
      resourceDEncryptedContent,
      resourceDContent
    );

    // AliceChild soft deletes the resourceD (he is in its sharing group)
    await aliceChild.session.Resource.unlink(resourceD.id);

    let errorOccurred = { isTrue: false };
    try {
      // AliceChild gets the resourceD (IMPOSSIBLE because he is NO MORE in its sharing group)
      let resource = await aliceChild.session.Resource.get(resourceD.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceD.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Alice gets the resourceD (she is in its sharing group)
    let resourceAlice = await ctx.alice.session.Resource.get(resourceD.id);
    checkFetchedResource(
      resourceAlice,
      resourceD,
      resourceDEncryptedContent,
      resourceDContent
    );
  });

  it("A sharer can soft-delete the resource D after renewing the key", async () => {
    // Alice renews its keys
    ctx.alice.session.renewKeys();

    // Alice gets the resourceD (she is in its sharing group)
    let resourceAlice = await ctx.alice.session.Resource.get(resourceD.id);
    checkFetchedResource(
      resourceAlice,
      resourceD,
      resourceDEncryptedContent,
      resourceDContent
    );

    // Alice soft deletes the resourceD (she is in its sharing group)
    await ctx.alice.session.Resource.unlink(resourceD.id);

    let errorOccurred = { isTrue: false };
    try {
      // Alice gets the resourceD (IMPOSSIBLE because she is NO MORE in its sharing group)
      let resource = await ctx.alice.session.Resource.get(resourceD.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceD.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Bob gets the resourceD (he is in its sharing group)
    let resourceBob = await ctx.bob.session.Resource.get(resourceD.id);
    checkFetchedResource(
      resourceBob,
      resourceD,
      resourceDEncryptedContent,
      resourceDContent
    );
  });

  it("The owner can hard-delete the resource D after renewing the key", async () => {
    // Bob gets the resourceD (he is in its sharing group)
    let resourceBob = await ctx.bob.session.Resource.get(resourceD.id);
    checkFetchedResource(
      resourceBob,
      resourceD,
      resourceDEncryptedContent,
      resourceDContent
    );

    // AliceChild renews its keys
    aliceChild.session.renewKeys();

    // AliceChild hard deletes the resourceD (he is its creator)
    await aliceChild.session.Resource.delete(resourceD.id);

    let errorOccurred = { isTrue: false };
    try {
      // Bob gets the resourceD (IMPOSSIBLE because it NO MORE exists, he was in its sharing group)
      let resourceBob = await ctx.bob.session.Resource.get(resourceD.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceD.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("The server returns ResourceNotFound error, when a user tries to delete an inexistant resource", async () => {
    let errorOccurred = { isTrue: false };
    // tests if when Alice asks for a resource (that does not exists), the system does not create that resource
    for (let i = 0; i < 2; i++) {
      try {
        // Alice gets a resource (IMPOSSIBLE because it DOES NOT exist)
        await ctx.alice.session.Resource.get(randomResourceId);
      } catch (err) {
        let randomResourceIdLong = new Long(randomResourceId, 0, true);
        checkResourceNotFoundError(err, randomResourceIdLong, errorOccurred);
      }
      expect(errorOccurred.isTrue).to.be.true;
      errorOccurred.isTrue = false;
    }

    // same test for the type long
    errorOccurred.isTrue = false;
    for (let i = 0; i < 2; i++) {
      try {
        // Alice gets a resource (IMPOSSIBLE because it DOES NOT exist)
        await ctx.alice.session.Resource.get(randomResourceIdLong);
      } catch (err) {
        checkResourceNotFoundError(err, randomResourceIdLong, errorOccurred);
      }
      expect(errorOccurred.isTrue).to.be.true;
      errorOccurred.isTrue = false;
    }
  });
});
