import * as Config from "../../Config";
import * as DataPeps from "../../../src/DataPeps";
import * as nacl from "tweetnacl";
import { expect } from "chai";

describe("kvalDelegates", () => {
    let seed = Math.floor(Math.random() * 99999);
    let aliceSecret = nacl.randomBytes(128);
    let alice: DataPeps.IdentityFields = {
        login: `alice.${seed}`,
        name: "alice test identity, TS",
        kind: "user",
        payload: undefined,
    };
    let bobSecret = nacl.randomBytes(128);
    let bob: DataPeps.IdentityFields = {
        login: `bob.${seed}`,
        name: "bob test identity, TS",
        kind: "user",
        payload: undefined,
    };
    let app: DataPeps.IdentityFields = {
        login: `app.${seed}`,
        name: "app test identity, TS",
        kind: "user",
        payload: undefined,
    };
    let aliceDelegates = ["toto", "tata"];

    let sdk = Config.sdk;
    let aliceSession: DataPeps.Session;
    let bobSession: DataPeps.Session;

    // Create alice, bob and a group
    before(async () => {
        await Config.init();
        await sdk.register(alice, aliceSecret);
        await sdk.register(bob, bobSecret);
        aliceSession = await sdk.login(alice.login, aliceSecret);
        bobSession = await sdk.login(bob.login, bobSecret);
    });

    it("alice set a list of delegates", async () => {
        await aliceSession.KvalDelegates.put(alice.login, app.login, aliceDelegates);
    });

    it("alice checks the list of its delegates", async () => {
        let r = await aliceSession.KvalDelegates.get(alice.login, app.login);
        expect(r).to.be.deep.equals(aliceDelegates);
    });

    it("bob checks the list of alice's delegates", async () => {
        let r = await bobSession.KvalDelegates.get(alice.login, app.login);
        expect(r).to.be.deep.equals(aliceDelegates);
    });

});
