import {
  identityAndSession,
  identityAndSessionCtx,
  init,
  initCtx
} from "../../Context";
import { IdentityAPI, ServerError } from "../../../src/DataPeps";
import { itError } from "../../Utils";

describe("session.createSession.cycles", () => {
  /**
   * alice --> bob --> charlie    dave
   *   ^                   |
   *   |-------------------|
   *
   *
   * Alice tries to create a Dave's session
   */
  let firstGroup: {
    alice: identityAndSessionCtx;
    bob: identityAndSessionCtx;
    charlie: identityAndSessionCtx;
    dave: identityAndSessionCtx;
  };

  /**
   *         ->   bob   -
   *        /            \
   * alice -              -> dave
   *        \            /
   *         -> charlie -
   */
  let secondGroup: {
    alice: identityAndSessionCtx;
    bob: identityAndSessionCtx;
    charlie: identityAndSessionCtx;
    dave: identityAndSessionCtx;
  };

  before(async () => {
    let initCtx = init();
    await initFirstGroup(initCtx);
    await initSecondGroup(initCtx);
  });

  it("Second group: Alice creates a Dave's session", async () =>
    secondGroup.alice.session.createSession(secondGroup.dave.identity.login));

  itError(
    "alice tries to create a Dave's session",
    () =>
      firstGroup.alice.session.createSession(firstGroup.dave.identity.login),
    ServerError.IdentityCannotAssumeOwnership
  );

  let initFirstGroup = async (init: initCtx) => {
    firstGroup = {
      alice: await identityAndSession(init, { name: "alice" }),
      bob: await identityAndSession(init, { name: "bob" }),
      charlie: await identityAndSession(init, { name: "charlie" }),
      dave: await identityAndSession(init, { name: "dave" })
    };
    await new IdentityAPI(firstGroup.bob.session).extendSharingGroup(
      firstGroup.bob.identity.login,
      [firstGroup.alice.identity.login]
    );
    await new IdentityAPI(firstGroup.charlie.session).extendSharingGroup(
      firstGroup.charlie.identity.login,
      [firstGroup.bob.identity.login]
    );
    await new IdentityAPI(firstGroup.alice.session).extendSharingGroup(
      firstGroup.alice.identity.login,
      [firstGroup.charlie.identity.login]
    );
  };

  let initSecondGroup = async (init: initCtx) => {
    secondGroup = {
      alice: await identityAndSession(init, { name: "alice" }),
      bob: await identityAndSession(init, { name: "bob" }),
      charlie: await identityAndSession(init, { name: "charlie" }),
      dave: await identityAndSession(init, { name: "dave" })
    };

    await new IdentityAPI(secondGroup.bob.session).extendSharingGroup(
      secondGroup.bob.identity.login,
      [secondGroup.alice.identity.login]
    );
    await new IdentityAPI(secondGroup.charlie.session).extendSharingGroup(
      secondGroup.charlie.identity.login,
      [secondGroup.alice.identity.login]
    );
    await new IdentityAPI(secondGroup.dave.session).extendSharingGroup(
      secondGroup.dave.identity.login,
      [secondGroup.bob.identity.login, secondGroup.charlie.identity.login]
    );
  };
});
