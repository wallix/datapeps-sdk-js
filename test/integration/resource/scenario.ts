import * as Config from "../../Config";
import * as Context from "../../Context";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";

describe("resource.scenario", () => {
  let ctx: Context.aliceBobAndGroupCtx;
  // Create alice, bob and a group
  before(async () => {
    let init = Context.init();
    ctx = await Context.aliceBobAndGroup(init);
  });

  let res: DataPeps.Resource<any>;
  let content: Uint8Array;
  let encrypted: Uint8Array;
  it("alice creates a selfish resource", async () => {
    content = nacl.randomBytes(2048);
    let payload = { description: "This is a test resource" };
    res = await ctx.alice.session.Resource.create("test/A", payload, [
      ctx.alice.identity.login
    ]);
    expect(res).to.be.not.null;
    encrypted = res.encrypt(content);
    let result = res.decrypt(encrypted);
    expect(result).to.be.deep.equals(content);
    expect(res.payload).to.be.deep.equal(payload);
  });

  it("alice retrieves the resource and decrypt the encrypted content", async () => {
    let resource = await ctx.alice.session.Resource.get(res.id);
    expect(resource).to.be.not.null;
    let result = resource.decrypt(encrypted);
    expect(result).to.be.deep.equals(content);
    expect(resource.payload).to.be.deep.equals(res.payload);
  });

  it("bob try to retrieve the resource", async () => {
    try {
      await ctx.bob.session.Resource.get(res.id);
    } catch (err) {
      expect(err).instanceof(DataPeps.Error);
      expect(err.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound);
      expect(err.payload.id).to.be.deep.equals(res.id);
      return;
    }
    throw new Error("bob should not can retrieve this resource");
  });

  it("alice creates a resource, shared with alice and bob", async () => {
    content = nacl.randomBytes(2048);
    let payload = { description: "This is a test resource" };
    let resource = await ctx.alice.session.Resource.create("test/B", payload, [
      ctx.alice.identity.login,
      ctx.bob.identity.login
    ]);
    expect(resource).to.be.not.null;
    encrypted = resource.encrypt(content);
    let result = resource.decrypt(encrypted);
    expect(result).to.be.deep.equals(content);
    expect(resource.payload).to.be.deep.equal(payload);
    res = resource;
  });

  let resourceAlice: DataPeps.Resource<any>;
  it("alice retrieves the shared resource and decrypts the encrypted content", async () => {
    resourceAlice = await ctx.alice.session.Resource.get(res.id);
    expect(resourceAlice).to.be.not.null;
    let result = resourceAlice.decrypt(encrypted);
    expect(result).to.be.deep.equals(content);
    expect(resourceAlice.payload).to.be.deep.equals(res.payload);
  });

  it("bob retrieves the shared resource and decrypts the encrypted content", async () => {
    let resource = await ctx.bob.session.Resource.get(res.id);
    expect(resource).to.be.not.null;
    let result = resource.decrypt(encrypted);
    expect(result).to.be.deep.equals(content);
    expect(resource.payload).to.be.deep.equals(res.payload);
  });

  it("alice renews its keys", async () => {
    await ctx.alice.session.renewKeys();
  });

  it("after key renewal alice retrieves the shared resource and decrypts the encrypted content", async () => {
    let resource = await ctx.alice.session.Resource.get(res.id);
    expect(resource).to.be.not.null;
    let result = resource.decrypt(encrypted);
    expect(result).to.be.deep.equals(content);
    expect(resource.payload).to.be.deep.equals(res.payload);
  });

  let resourceBob: DataPeps.Resource<any>;
  it("after key renews bob retrieves the shared resource and decrypt the encrypted content", async () => {
    resourceBob = await ctx.bob.session.Resource.get(res.id);
    expect(resourceBob).to.be.not.null;
    let result = resourceBob.decrypt(encrypted);
    expect(result).to.be.deep.equals(content);
    expect(resourceBob.payload).to.be.deep.equals(res.payload);
  });

  let contentBob: Uint8Array;
  let encryptedBob: Uint8Array;
  it("bob encrypts a data with the alice resource", () => {
    contentBob = nacl.randomBytes(2048);
    encryptedBob = resourceBob.encrypt(contentBob);
    let result = resourceBob.decrypt(encryptedBob);
    expect(result).to.be.deep.equals(contentBob);
  });

  it("alice decrypts the data encrypted by bob", () => {
    let result = resourceAlice.decrypt(encryptedBob);
    expect(result).to.be.deep.equals(contentBob);
  });

  it("bob tries to delete the alice resource", async () => {
    try {
      await ctx.bob.session.Resource.delete(res.id);
    } catch (err) {
      expect(err).instanceof(DataPeps.Error);
      expect(err.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound);
      expect(err.payload.id).to.be.deep.equals(res.id);
      return;
    }
    throw new Error("bob should not delete the alice resource");
  });

  it("bob deletes its copy of the alice resource", async () => {
    await ctx.bob.session.Resource.unlink(res.id);
    let resource = await ctx.alice.session.Resource.get(res.id);
    expect(resource).to.be.not.null;
    let result = resource.decrypt(encrypted);
    expect(result).to.be.deep.equals(content);
    expect(resource.payload).to.be.deep.equals(res.payload);
    try {
      return await ctx.bob.session.Resource.get(res.id);
    } catch (err) {
      expect(err).instanceof(DataPeps.Error);
      expect(err.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound);
      expect(err.payload.id).to.be.deep.equals(res.id);
    }
  });

  it("alice deletes its resource", async () => {
    await ctx.alice.session.Resource.delete(res.id);
    try {
      await ctx.alice.session.Resource.get(res.id);
    } catch (err) {
      expect(err).instanceof(DataPeps.Error);
      expect(err.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound);
      expect(err.payload.id).to.be.deep.equals(res.id);
      return;
    }
    throw new Error("alice get the deleted resource");
  });

  it("alice creates a resource, shared with the group", async () => {
    content = nacl.randomBytes(2048);
    let payload = { description: "This is a test resource" };
    res = await ctx.alice.session.Resource.create("test/C", payload, [
      ctx.group.login
    ]);
    expect(res).to.be.not.null;
    encrypted = res.encrypt(content);
    let result = res.decrypt(encrypted);
    expect(result).to.be.deep.equals(content);
    expect(res.payload).to.be.deep.equal(payload);
  });

  it("alice along the group retrieves the resource and decrypts the encrypted content", async () => {
    let resource = await ctx.alice.session.Resource.get(res.id, {
      assume: ctx.group.login
    });
    expect(resource).to.be.not.null;
    let result = resource.decrypt(encrypted);
    expect(result).to.be.deep.equals(content);
    expect(resource.payload).to.be.deep.equals(res.payload);
  });

  it("bob try to retrieves the resource without group", async () => {
    try {
      await ctx.bob.session.Resource.get(res.id);
    } catch (err) {
      expect(err).instanceof(DataPeps.Error);
      expect(err.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound);
      expect(err.payload.id).to.be.deep.equals(res.id);
      return;
    }
    throw new Error("bob should not can retreive this resource");
  });

  it("bob along the group retrieves the shared resource and decrypts the encrypted content", async () => {
    let resource = await ctx.bob.session.Resource.get(res.id, {
      assume: ctx.group.login
    });
    expect(resource).to.be.not.null;
    let result = resource.decrypt(encrypted);
    expect(result).to.be.deep.equals(content);
    expect(resource.payload).to.be.deep.equals(res.payload);
  });

  it("alice renews keys of the group", async () => {
    await ctx.alice.session.Identity.renewKeys(ctx.group.login);
  });

  it("after key renewal, alice along the group retrieves the resource and decrypts the encrypted content", async () => {
    let resource = await ctx.alice.session.Resource.get(res.id, {
      assume: ctx.group.login
    });
    expect(resource).to.be.not.null;
    let result = resource.decrypt(encrypted);
    expect(result).to.be.deep.equals(content);
    expect(resource.payload).to.be.deep.equals(res.payload);
  });

  it("after key renewal, bob along the group retrieves the shared resource and decrypts the encrypted content", async () => {
    let resource = await ctx.bob.session.Resource.get(res.id, {
      assume: ctx.group.login
    });
    expect(resource).to.be.not.null;
    let result = resource.decrypt(encrypted);
    expect(result).to.be.deep.equals(content);
    expect(resource.payload).to.be.deep.equals(res.payload);
  });

  it("check error on decrypt fail", async () => {
    try {
      let resource = await ctx.bob.session.Resource.get(res.id, {
        assume: ctx.group.login
      });
      expect(resource).to.be.not.null;
      let result = resource.decrypt(nacl.randomBytes(128));
    } catch (err) {
      expect(err).instanceof(DataPeps.Error);
      expect(err.kind).to.be.equals(DataPeps.SDKError.DecryptFail);
      return;
    }
    throw new Error("illegal decrypt doesn't throw error");
  });
});
