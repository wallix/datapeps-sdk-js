import * as Context from "../../Context";
import * as DataPeps from "../../../src/DataPeps";
import { expect } from "chai";
import * as Long from "long";
import { ResourceAPI } from "../../../src/DataPeps";
import { Uint8Tool } from "../../../src/Tools";
import { itErrors, itErrorsParam } from "../../Utils";

class ResourceContent {
  plain: Uint8Array;
  encrypted: Uint8Array;

  constructor(resource: DataPeps.Resource<{}>, content: string) {
    this.plain = Uint8Tool.encode(content);
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

async function fetchAndCheckResource(
  session: DataPeps.Session,
  resource: Resource
): Promise<DataPeps.Resource<{}>> {
  let resourceFecthed = await new ResourceAPI(session).get(
    resource.resource.id
  );
  checkFetchedResource(resourceFecthed, resource);
  return Promise.resolve(resourceFecthed);
}

describe("resource.extendSharingGroup", () => {
  let [alice, bob, charlie, dave]: DataPeps.Identity<Uint8Array>[] = [];
  let [
    aliceSession,
    bobSession,
    charlieSession,
    daveSession
  ]: DataPeps.Session[] = [];

  const nonexistentIdentityLogin = "Ned.Nonexistent";
  const nonexistentIdentityLoginSecond = "Ned.Nonexistent.Jr";

  let resourceA: Resource;
  let resourceB: Resource;
  let resourceC: Resource;
  let resourceD: Resource;

  let randomResourceId: number;
  let randomResourceIdLong: Long;

  before(async () => {
    let init = await Context.init();
    let ctx = await Context.aliceBob(init);
    alice = ctx.alice.identity;
    aliceSession = ctx.alice.session;
    bob = ctx.bob.identity;
    bobSession = ctx.bob.session;

    let cCtx = await Context.userAndSession(init, "charlie");
    charlie = cCtx.identity;
    charlieSession = cCtx.session;
    let dCtx = await Context.userAndSession(init, "dave");
    dave = dCtx.identity;
    daveSession = dCtx.session;

    let resourceADataPeps = await new ResourceAPI(aliceSession).create(
      "test kind",
      { text: "payload A" },
      [alice.login]
    );
    resourceA = new Resource(resourceADataPeps, "Content A");

    let resourceBDataPeps = await new ResourceAPI(aliceSession).create(
      "test kind",
      { text: "payload B" },
      []
    );
    resourceB = new Resource(resourceBDataPeps, "Content B");

    let resourceCDataPeps = await new ResourceAPI(aliceSession).create(
      "test kind",
      { text: "payload C" },
      [alice.login]
    );
    resourceC = new Resource(resourceCDataPeps, "Content C");

    let resourceDDataPeps = await new ResourceAPI(aliceSession).create(
      "test kind",
      { text: "payload D" },
      [alice.login]
    );
    resourceD = new Resource(resourceDDataPeps, "Content D");

    randomResourceId = Math.floor(Math.random() * 0xffffffff);

    let low = Math.floor(Math.random() * 0xffffffff);
    let high = Math.floor(Math.random() * 0x7fffffff);
    randomResourceIdLong = new Long(low, high, true);
  });

  let getGroupsWithNonexistentLogins: () => itErrorsParam<
    string[],
    { logins: string[] }
  >[] = () => {
    let checkPayload = (expected: { logins: string[] }) => {
      return (actual: { logins: string[] }) => {
        let actualSorted = actual.logins.sort();
        let expectedSorted = expected.logins.sort();
        expect(
          expectedSorted,
          `expected deep equality of the actual value ${actualSorted} and the expected value ${expectedSorted}`
        ).deep.equals(actualSorted);
      };
    };
    return [
      {
        arg: [nonexistentIdentityLogin],
        payload: {
          value: { logins: [nonexistentIdentityLogin] }
        }
      },
      {
        arg: [nonexistentIdentityLogin, nonexistentIdentityLogin],
        payload: {
          value: {
            logins: [nonexistentIdentityLogin, nonexistentIdentityLogin]
          }
        }
      },
      {
        arg: [bob.login, nonexistentIdentityLogin],
        payload: {
          value: { logins: [nonexistentIdentityLogin] }
        }
      },
      {
        arg: [bob.login, charlie.login, nonexistentIdentityLogin],
        payload: {
          value: { logins: [nonexistentIdentityLogin] }
        }
      },
      {
        arg: [
          bob.login,
          nonexistentIdentityLogin,
          nonexistentIdentityLoginSecond
        ],
        payload: {
          func: checkPayload({
            logins: [nonexistentIdentityLogin, nonexistentIdentityLoginSecond]
          })
        }
      },
      {
        arg: [
          bob.login,
          charlie.login,
          nonexistentIdentityLogin,
          nonexistentIdentityLoginSecond
        ],
        payload: {
          func: checkPayload({
            logins: [nonexistentIdentityLogin, nonexistentIdentityLoginSecond]
          })
        }
      }
    ];
  };

  it("An identity that is not a Resource A sharer cannot add an himself to the resource sharers", async () => {
    let errorOccurred = { isTrue: false };
    try {
      await new ResourceAPI(bobSession).get(resourceA.resource.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceA.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      await new ResourceAPI(bobSession).extendSharingGroup(
        resourceA.resource.id,
        [bob.login]
      );
    } catch (err) {
      checkResourceNotFoundError(err, resourceA.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("An identity that is not a Resource A sharer cannot add an identity to the resource sharers", async () => {
    let errorOccurred = { isTrue: false };
    try {
      await new ResourceAPI(bobSession).get(resourceA.resource.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceA.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      await new ResourceAPI(bobSession).extendSharingGroup(
        resourceA.resource.id,
        [charlie.login]
      );
    } catch (err) {
      checkResourceNotFoundError(err, resourceA.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("A sharer that is a Resource A sharer since the resource creation can add an identitiy to the resource sharers", async () => {
    await fetchAndCheckResource(aliceSession, resourceA);
    let errorOccurred = { isTrue: false };
    try {
      await new ResourceAPI(bobSession).get(resourceA.resource.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceA.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    await new ResourceAPI(aliceSession).extendSharingGroup(
      resourceA.resource.id,
      [bob.login]
    );
    fetchAndCheckResource(bobSession, resourceA);
  });

  it("An added sharer can add an identity to the sharing group of Resource A", async () => {
    await fetchAndCheckResource(bobSession, resourceA);

    let errorOccurred = { isTrue: false };
    try {
      await new ResourceAPI(charlieSession).get(resourceA.resource.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceA.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    await new ResourceAPI(bobSession).extendSharingGroup(
      resourceA.resource.id,
      [charlie.login]
    );
    await fetchAndCheckResource(charlieSession, resourceA);
  });

  it("If the creator of Resource B is not a sharer, he cannot add himself to sharers", async () => {
    let errorOccurred = { isTrue: false };
    try {
      await new ResourceAPI(aliceSession).get(resourceB.resource.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      await new ResourceAPI(aliceSession).extendSharingGroup(
        resourceB.resource.id,
        [alice.login]
      );
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("If the creator of Resource B is not a sharer, he cannot add another identity to sharers", async () => {
    let errorOccurred = { isTrue: false };
    try {
      await new ResourceAPI(aliceSession).get(resourceB.resource.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      await new ResourceAPI(aliceSession).extendSharingGroup(
        resourceB.resource.id,
        [bob.login]
      );
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("An identity cannot add himself to the Resource B sharers, when the sharing group of the resource is empty", async () => {
    let errorOccurred = { isTrue: false };
    try {
      await new ResourceAPI(bobSession).get(resourceB.resource.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      await new ResourceAPI(bobSession).extendSharingGroup(
        resourceB.resource.id,
        [bob.login]
      );
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("An identity cannot add another identity to the Resource B sharers, when the sharing group of the resource is empty", async () => {
    let errorOccurred = { isTrue: false };
    try {
      await new ResourceAPI(bobSession).get(resourceB.resource.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    errorOccurred.isTrue = false;
    try {
      await new ResourceAPI(bobSession).extendSharingGroup(
        resourceB.resource.id,
        [charlie.login]
      );
    } catch (err) {
      checkResourceNotFoundError(err, resourceB.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;
  });

  it("No error occurs when a sharer extends the sharing group of the resource C with the same user twice", async () => {
    await fetchAndCheckResource(aliceSession, resourceC);

    let errorOccurred = { isTrue: false };
    try {
      await new ResourceAPI(bobSession).get(resourceC.resource.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceC.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    for (let i = 0; i < 2; i++) {
      await new ResourceAPI(aliceSession).extendSharingGroup(
        resourceC.resource.id,
        [bob.login]
      );
      await fetchAndCheckResource(bobSession, resourceC);
    }
  });

  it("No error occurs when a sharer extends the sharing group of the resource C with a repeated user", async () => {
    await fetchAndCheckResource(aliceSession, resourceC);
    await fetchAndCheckResource(bobSession, resourceC);
    await new ResourceAPI(aliceSession).extendSharingGroup(
      resourceC.resource.id,
      [bob.login, bob.login]
    );
    await fetchAndCheckResource(aliceSession, resourceC);
    await fetchAndCheckResource(bobSession, resourceC);

    let errorOccurred = { isTrue: false };
    try {
      await new ResourceAPI(charlieSession).get(resourceC.resource.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceC.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    await new ResourceAPI(aliceSession).extendSharingGroup(
      resourceC.resource.id,
      [charlie.login, charlie.login]
    );

    await fetchAndCheckResource(aliceSession, resourceC);
    await fetchAndCheckResource(bobSession, resourceC);
    await fetchAndCheckResource(charlieSession, resourceC);
  });

  it("No error occurs when a sharer extends the sharing group of the resource C with the same multiple users", async () => {
    await fetchAndCheckResource(aliceSession, resourceC);
    await fetchAndCheckResource(bobSession, resourceC);
    await fetchAndCheckResource(charlieSession, resourceC);

    let errorOccurred = { isTrue: false };
    try {
      await new ResourceAPI(daveSession).get(resourceC.resource.id);
    } catch (err) {
      checkResourceNotFoundError(err, resourceC.resource.id, errorOccurred);
    }
    expect(errorOccurred.isTrue).to.be.true;

    await new ResourceAPI(aliceSession).extendSharingGroup(
      resourceC.resource.id,
      [bob.login, charlie.login, dave.login]
    );

    await fetchAndCheckResource(aliceSession, resourceC);
    await fetchAndCheckResource(bobSession, resourceC);
    await fetchAndCheckResource(charlieSession, resourceC);
    await fetchAndCheckResource(daveSession, resourceC);
  });

  it("No error occurs when a sharer adds himself to the sharing group of the resource C", async () => {
    await fetchAndCheckResource(aliceSession, resourceC);

    await new ResourceAPI(aliceSession).extendSharingGroup(
      resourceC.resource.id,
      [alice.login]
    );

    await fetchAndCheckResource(aliceSession, resourceC);
  });

  itErrors(
    "Sharing a resource with a group with nonexistent identities results in an error",
    getGroupsWithNonexistentLogins,
    (group: string[]) => {
      return new ResourceAPI(aliceSession).extendSharingGroup(
        resourceD.resource.id,
        group
      );
    },
    DataPeps.ServerError.IdentitiesNotFound
  );

  it("An identity cannot add himself to the sharers of an inexisting resource", async () => {
    for (let i = 0; i < 2; i++) {
      let errorOccurred = { isTrue: false };
      try {
        await new ResourceAPI(aliceSession).get(randomResourceId);
      } catch (err) {
        let randomResourceIdLong = new Long(randomResourceId, 0, true);
        checkResourceNotFoundError(err, randomResourceIdLong, errorOccurred);
      }
      expect(errorOccurred.isTrue).to.be.true;
    }

    for (let i = 0; i < 2; i++) {
      let errorOccurred = { isTrue: false };
      try {
        await new ResourceAPI(aliceSession).get(randomResourceIdLong);
      } catch (err) {
        checkResourceNotFoundError(err, randomResourceIdLong, errorOccurred);
      }
      expect(errorOccurred.isTrue).to.be.true;
    }
  });
});
