import * as Config from "../../Config";
import * as Context from "../../Context";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";
import * as mocha from "mocha";
import * as Long from "long";
import * as Utils from "../../Utils";

describe("resource.delete", () => {
  let seed = Math.floor(Math.random() * 99999);

  let ctx: Context.aliceBobWithDeviceAndGroupCtx;

  let aliceChildSecret = nacl.randomBytes(128);
  let aliceChild: Context.userAndSessionCtx;

  let resourceA: Utils.Resource, resourceB: Utils.Resource;
  let resourceC: Utils.Resource, resourceD: Utils.Resource;

  let randomResourceId: number;
  let randomResourceIdLong: Long;

  before(async () => {
    let init = await Context.init();
    ctx = await Context.aliceBobWithDeviceAndGroup(init);
    aliceChild = await Context.userAndSession(init, "aliceChild");

    let resourceADataPeps = await aliceChild.session.Resource.create(
      "test kind",
      { text: "payload A" },
      [
        aliceChild.identity.login,
        ctx.alice.identity.login,
        ctx.bob.identity.login
      ]
    );
    resourceA = new Utils.Resource(resourceADataPeps, "Content A");

    let resourceBDataPeps = await aliceChild.session.Resource.create(
      "test kind",
      { text: "payload B" },
      [aliceChild.identity.login, ctx.alice.identity.login]
    );
    resourceB = new Utils.Resource(resourceBDataPeps, "Content B");

    let resourceCDataPeps = await aliceChild.session.Resource.create(
      "test kind",
      { text: "payload C" },
      [aliceChild.identity.login, ctx.alice.identity.login]
    );
    resourceC = new Utils.Resource(resourceADataPeps, "Content C");

    let resourceDDataPeps = await aliceChild.session.Resource.create(
      "test kind",
      { text: "payload D" },
      [
        aliceChild.identity.login,
        ctx.alice.identity.login,
        ctx.bob.identity.login
      ]
    );
    resourceD = new Utils.Resource(resourceDDataPeps, "Content D");

    // random resourceId generation
    randomResourceId = Math.floor(Math.random() * 0xffffffff);
    let low = Math.floor(Math.random() * 0xffffffff);
    let high = Math.floor(Math.random() * 0x7fffffff);
    randomResourceIdLong = new Long(low, high, true);
  });

  it("A sharer cannot hard delete the resource A", async () => {
    // Alice gets the resourceA (she is in its sharing group)
    let resourceAlice = await ctx.alice.session.Resource.get(
      resourceA.resource.id
    );
    Utils.checkFetchedResource(resourceAlice, resourceA);

    let errorOccurred = { isTrue: false };
    try {
      // Alice hard deletes the resourceA (IMPOSSIBLE because she IS NOT its creator)
      await ctx.alice.session.Resource.delete(resourceA.resource.id);
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceA.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Bob gets the resourceA (he is in its sharing group)
    // (resourceA does still exist because Alice could not hard delete it)
    let resourceBob = await ctx.bob.session.Resource.get(resourceA.resource.id);
    Utils.checkFetchedResource(resourceBob, resourceA);
  });

  it("A sharer of the resource owner cannot hard-delete the resource A", async () => {
    // Bob gets the resourceA (he is in its sharing group)
    let resourceBob = await ctx.bob.session.Resource.get(resourceA.resource.id);
    Utils.checkFetchedResource(resourceBob, resourceA);

    let errorOccurred = { isTrue: false };
    try {
      // Bob hard deletes the resourceA (IMPOSSIBLE because he IS NOT its creator)
      await ctx.bob.session.Resource.delete(resourceA.resource.id);
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceA.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Alice gets the resourceA (she is in its sharing group)
    // (resourceA does still exist because Bob could not hard delete it)
    let resourceAlice = await ctx.alice.session.Resource.get(
      resourceA.resource.id
    );
    Utils.checkFetchedResource(resourceAlice, resourceA);
  });

  it("After failing to hard-delete the resource A, the sharer can still access it", async () => {
    // Bob gets the resourceA (he is in its sharing group)
    let resourceBob = await ctx.bob.session.Resource.get(resourceA.resource.id);
    Utils.checkFetchedResource(resourceBob, resourceA);

    let errorOccurred = { isTrue: false };
    try {
      // Bob hard deletes the resourceA (IMPOSSIBLE because he IS NOT its creator)
      await ctx.bob.session.Resource.delete(resourceA.resource.id);
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceA.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Bob gets the resourceA (he is in its sharing group)
    // (resourceA does still exist because Bob could not hard delete it)
    resourceBob = await ctx.bob.session.Resource.get(resourceA.resource.id);
    Utils.checkFetchedResource(resourceBob, resourceA);
  });

  it("A sharer can soft delete the resource A", async () => {
    // Alice gets the resourceA (she is in its sharing group)
    let resourceAlice = await ctx.alice.session.Resource.get(
      resourceA.resource.id
    );
    Utils.checkFetchedResource(resourceAlice, resourceA);

    // Alice soft deletes the resourceA (she is in its sharing group)
    await ctx.alice.session.Resource.unlink(resourceA.resource.id);

    let errorOccurred = { isTrue: false };
    try {
      // Alice gets the resourceA (IMPOSSIBLE because she is NO MORE in its sharing group)
      await ctx.alice.session.Resource.get(resourceA.resource.id);
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceA.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Bob gets the resourceA (he is in its sharing group)
    let resourceBob = await ctx.bob.session.Resource.get(resourceA.resource.id);
    Utils.checkFetchedResource(resourceBob, resourceA);
  });

  it("The owner can hard delete the resource A", async () => {
    // AliceChild gets the resourceA (she is in its sharing group)
    let resourceAliceChild = await aliceChild.session.Resource.get(
      resourceA.resource.id
    );
    Utils.checkFetchedResource(resourceAliceChild, resourceA);

    // AliceChild hard deletes the resourceA (he is in its creator)
    await aliceChild.session.Resource.delete(resourceA.resource.id);

    let errorOccurred = { isTrue: false };
    try {
      // AliceChild gets the resourceA (IMPOSSIBLE because it NO MORE EXISTS, AliceChild was in its sharing group)
      let resource = await aliceChild.session.Resource.get(
        resourceA.resource.id
      );
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceA.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      // Bob gets the resourceA (IMPOSSIBLE because it NO MORE EXISTS, Bob was in its sharing group)
      let resource = await ctx.bob.session.Resource.get(resourceA.resource.id);
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceA.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("An identity cannot soft-delete the resource B, that was not shared with it", async () => {
    let errorOccurred = { isTrue: false };
    try {
      // Bob gets the resourceB (IMPOSSIBLE because he IS NOT in its sharing group)
      let resourceBob = await ctx.bob.session.Resource.get(
        resourceB.resource.id
      );
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceB.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      // Bob soft deletes the resourceB (IMPOSSIBLE because he IS NOT in its sharing group)
      await ctx.bob.session.Resource.unlink(resourceB.resource.id);
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceB.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    // AliceChild gets the resourceB (he is in its sharing group)
    let resourceAliceChild = await aliceChild.session.Resource.get(
      resourceB.resource.id
    );
    Utils.checkFetchedResource(resourceAliceChild, resourceB);
  });

  it("An identity cannot hard-delete the resource B, that was not shared with it", async () => {
    let errorOccurred = { isTrue: false };
    try {
      // Bob gets the resourceB (IMPOSSIBLE because he IS NOT in its sharing group)
      let resourceBob = await ctx.bob.session.Resource.get(
        resourceB.resource.id
      );
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceB.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      // Bob hard deletes the resourceB (IMPOSSIBLE because he IS NOT its creator)
      await ctx.bob.session.Resource.delete(resourceB.resource.id);
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceB.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    // AliceChild gets the resourceB (he is in its sharing group)
    let resourceAliceChild = await aliceChild.session.Resource.get(
      resourceB.resource.id
    );
    Utils.checkFetchedResource(resourceAliceChild, resourceB);
  });

  it("When the owner soft deletes the resource B, the sharing group can still access it", async () => {
    // AliceChild gets the resourceB (he is in its sharing group)
    let resourceAliceChild = await aliceChild.session.Resource.get(
      resourceB.resource.id
    );
    Utils.checkFetchedResource(resourceAliceChild, resourceB);

    // AliceChild soft deletes the resourceB (he is in its sharing group)
    await aliceChild.session.Resource.unlink(resourceB.resource.id);

    let errorOccurred = { isTrue: false };
    try {
      // AliceChild gets the resourceB (IMPOSSIBLE because he is NO MORE in its sharing group)
      let resource = await aliceChild.session.Resource.get(
        resourceB.resource.id
      );
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceB.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Alice gets the resourceB (she is in its sharing group)
    let resourceAlice = await ctx.alice.session.Resource.get(
      resourceB.resource.id
    );
    Utils.checkFetchedResource(resourceAlice, resourceB);
  });

  it("The owner can hard-delete the resource B, without being in the resource's sharing group", async () => {
    // Alice gets the resourceB (she is in its sharing group)
    let resourceAlice = await ctx.alice.session.Resource.get(
      resourceB.resource.id
    );
    Utils.checkFetchedResource(resourceAlice, resourceB);

    let errorOccurred = { isTrue: false };
    try {
      // AliceChild gets the resourceB (IMPOSSIBLE because he is NO MORE in its sharing group)
      let resource = await aliceChild.session.Resource.get(
        resourceB.resource.id
      );
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceB.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    // AliceChild hard deletes the resourceB (he is its creator)
    await aliceChild.session.Resource.delete(resourceB.resource.id);

    errorOccurred.isTrue = false;
    try {
      // AliceChild gets the resourceB (IMPOSSIBLE because it NO MORE exists)
      let resource = await aliceChild.session.Resource.get(
        resourceB.resource.id
      );
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceB.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      // Alice gets the resourceB (IMPOSSIBLE because it NO MORE exists)
      let resource = await ctx.alice.session.Resource.get(
        resourceB.resource.id
      );
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceB.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("The owner can soft-delete the resource D after renewing the key", async () => {
    // AliceChild renews its keys
    await aliceChild.session.renewKeys();

    // AliceChild gets the resourceD (he is in its sharing group)
    let resourceAliceChild = await aliceChild.session.Resource.get(
      resourceD.resource.id
    );
    Utils.checkFetchedResource(resourceAliceChild, resourceD);

    // AliceChild soft deletes the resourceD (he is in its sharing group)
    await aliceChild.session.Resource.unlink(resourceD.resource.id);

    let errorOccurred = { isTrue: false };
    try {
      // AliceChild gets the resourceD (IMPOSSIBLE because he is NO MORE in its sharing group)
      let resource = await aliceChild.session.Resource.get(
        resourceD.resource.id
      );
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceD.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Alice gets the resourceD (she is in its sharing group)
    let resourceAlice = await ctx.alice.session.Resource.get(
      resourceD.resource.id
    );
    Utils.checkFetchedResource(resourceAlice, resourceD);
  });

  it("A sharer can soft-delete the resource D after renewing the key", async () => {
    // Alice renews its keys
    await ctx.alice.session.renewKeys();

    // Alice gets the resourceD (she is in its sharing group)
    let resourceAlice = await ctx.alice.session.Resource.get(
      resourceD.resource.id
    );
    Utils.checkFetchedResource(resourceAlice, resourceD);

    // Alice soft deletes the resourceD (she is in its sharing group)
    await ctx.alice.session.Resource.unlink(resourceD.resource.id);

    let errorOccurred = { isTrue: false };
    try {
      // Alice gets the resourceD (IMPOSSIBLE because she is NO MORE in its sharing group)
      let resource = await ctx.alice.session.Resource.get(
        resourceD.resource.id
      );
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceD.resource.id,
        errorOccurred
      );
    }
    expect(errorOccurred.isTrue).to.be.true;

    // Bob gets the resourceD (he is in its sharing group)
    let resourceBob = await ctx.bob.session.Resource.get(resourceD.resource.id);
    Utils.checkFetchedResource(resourceBob, resourceD);
  });

  it("The owner can hard-delete the resource D after renewing the key", async () => {
    // Bob gets the resourceD (he is in its sharing group)
    let resourceBob = await ctx.bob.session.Resource.get(resourceD.resource.id);

    Utils.checkFetchedResource(resourceBob, resourceD);

    // AliceChild renews its keys
    await aliceChild.session.renewKeys();

    // AliceChild hard deletes the resourceD (he is its creator)
    await aliceChild.session.Resource.delete(resourceD.resource.id);

    let errorOccurred = { isTrue: false };
    try {
      // Bob gets the resourceD (IMPOSSIBLE because it NO MORE exists, he was in its sharing group)
      let resourceBob = await ctx.bob.session.Resource.get(
        resourceD.resource.id
      );
    } catch (err) {
      Utils.checkResourceNotFoundError(
        err,
        resourceD.resource.id,
        errorOccurred
      );
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
        Utils.checkResourceNotFoundError(
          err,
          randomResourceIdLong,
          errorOccurred
        );
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
        Utils.checkResourceNotFoundError(
          err,
          randomResourceIdLong,
          errorOccurred
        );
      }
      expect(errorOccurred.isTrue).to.be.true;
      errorOccurred.isTrue = false;
    }
  });
});
