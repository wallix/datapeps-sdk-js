import * as Config from '../Config'
import * as DataPeps from '../../src/DataPeps'
import * as nacl from 'tweetnacl'
import { expect } from 'chai'


describe('Identity', () => {
    let seed = Math.floor(Math.random() * 99999)
    let deviceASecret = nacl.randomBytes(128)
    let deviceA: DataPeps.IdentityFields = {
        login: "alice.deviceA." + seed + "@peps.test",
        name: "An alice device, TS",
        kind: "device",
        payload: new TextEncoder().encode(JSON.stringify({
            uuid: "0987654321",
            type: "Test",
        }))
    }
    let deviceBSecret = nacl.randomBytes(128)
    let deviceB: DataPeps.IdentityFields = {
        login: "alice.deviceB." + seed + "@peps.test",
        name: "Another alice device, TS",
        kind: "device",
        payload: new TextEncoder().encode(JSON.stringify({
            uuid: "1234567890",
            type: "Test",
        }))
    }
    let aliceSecret = nacl.randomBytes(128)
    let alice: DataPeps.IdentityFields = {
        login: "alice." + seed + "@peps.test",
        name: "alice test identity, TS",
        kind: "user",
        payload: new TextEncoder().encode(JSON.stringify({
            firstname: "Alice",
            lastname: "TypeScript",
            tel: "+33712345678"
        }))
    }
    let bobSecret = nacl.randomBytes(128)
    let bob: DataPeps.IdentityFields = {
        login: "bob." + seed + "@peps.test",
        name: "bob test identity, TS",
        kind: "user",
        payload: new TextEncoder().encode(JSON.stringify({
            firstname: "Bob",
            lastname: "TypeScript",
            tel: "+33712345678"
        }))
    }
    let group: DataPeps.IdentityFields = {
        login: "group." + seed + "@peps.test",
        name: "A group for the Identity test, TS",
        kind: "group",
        payload: new TextEncoder().encode(JSON.stringify({
            description: "This is an awsome group!!!"
        }))
    }

    let sdk = Config.sdk
    before(async () => {
        await Config.init()
    })

    it('register alice', async () => {
        await sdk.register(alice, aliceSecret)
    })

    let aliceSession: DataPeps.Session
    it('login with alice', async () => {
        aliceSession = await sdk.login(alice.login, aliceSecret)
        expect(aliceSession).to.be.not.null
    })


    function checkFields(identity: DataPeps.Identity<Uint8Array>, fields: DataPeps.IdentityFields) {
        expect(identity.kind).to.be.equal(fields.kind)
        expect(identity.login).to.be.equal(fields.login)
        expect(identity.name).to.be.equal(fields.name)
        expect(identity.payload).to.be.deep.equal(fields.payload)
    }

    it('get alice identity', async () => {
        let identity = await aliceSession.Identity.get(alice.login)
        checkFields(identity, alice)
    })

    it('setSecret of alice then login', async () => {
        aliceSecret = nacl.randomBytes(128)
        await aliceSession.renewKeys(aliceSecret)
        // The old session must works
        let identity = await aliceSession.Identity.get(alice.login)
        // Try with a new session
        let session = await sdk.login(alice.login, aliceSecret)
        identity = await session.Identity.get(alice.login)
        expect(identity).to.not.be.null

    })

    it('register the alice deviceA', async () => {
        await sdk.register(deviceA, deviceASecret)
    })

    let deviceASession: DataPeps.Session
    it('login with the alice deviceA', async () => {
        deviceASession = await sdk.login(deviceA.login, deviceASecret)
        expect(deviceASession).to.be.not.null
    })

    it('alice share its identity with its device', async () => {
        await aliceSession.Identity.extendSharingGroup(alice.login, [deviceA.login])
    })

    it('create a group shared with alice', async () => {
        await aliceSession.Identity.create(group, { sharingGroup: [alice.login] })
    })

    it('register bob', async () => {
        await sdk.register(bob, bobSecret)
    })

    it('alice thanks its deviceA add bob to the group', async () => {
        await deviceASession.Identity.extendSharingGroup(group.login, [bob.login])
    })

    it('register the alice deviceB', async () => {
        await sdk.register(deviceB, deviceBSecret)
    })

    let deviceBSession: DataPeps.Session
    it('login with the alice deviceB', async () => {
        deviceBSession = await sdk.login(deviceB.login, deviceBSecret)
        expect(deviceBSession).to.be.not.null
    })

    it('alice renew its keys twice', async () => {
        //We renew keys twice too see that the auto unStale works
        await aliceSession.renewKeys()
        await aliceSession.renewKeys()
    })

    it('alice add the deviceB thanks deviceA', async () => {
        await deviceASession.Identity.extendSharingGroup(alice.login, [deviceB.login])
    })

    it('alice remove its device of its sharing group thanks deviceB', async () => {
        await deviceBSession.Identity.replaceSharingGroup(alice.login, [deviceB.login])
    })

    it('the revoked deviceA try to extend the sharing group of alice', async () => {
        try {
            await deviceASession.Identity.extendSharingGroup(alice.login, [bob.login])
        } catch (err) {
            expect(err).to.not.be.null
            expect(err.kind).equal(DataPeps.ServerError.IdentityNotFound)
            return
        }
        throw new Error("The revoked device as already access to alice identity")
    })

    it('deviceB validate public keys of group', async () => {
        let k = await deviceBSession.getLatestPublicKey(group.login)
    })

    it('alice attempt to promote bob to admin', async () => {
        try {
            await aliceSession.Admin.setAdmin(bob.login, true)
        } catch (err) {
            expect(err).to.not.be.null
            expect(err.kind).equal(DataPeps.ServerError.IdentityNotAdmin)
            return
        }
        throw new Error("A non-admin user was able to promote a user to admin")
    })

    let adminSession: DataPeps.Session
    it('login with administrator', async () => {
        adminSession = await Config.adminLogin()
        expect(adminSession).to.be.not.null
    })

    it('administrator promote alice to admin', async () => {
        await adminSession.Admin.setAdmin(alice.login, true)
    })

    it('alice promote bob to admin', async () => {
        await aliceSession.Admin.setAdmin(bob.login, true)
    })

    it('alice list tokens to test its admin right', async () => {
        await adminSession.Admin.listRegisterTokens({ domain: "peps.test" })
    })

    let renewSecret = nacl.randomBytes(128)
    it('adinistrator overwrite keys for alice', async () => {
        await adminSession.Admin.overwriteKeys(alice.login, renewSecret)
    })

    it('alice attempt to list identities', async () => {
        try {
            await aliceSession.Identity.list({ domain: "peps.test" })
        } catch (err) {
            expect(err).instanceof(DataPeps.Error)
            expect(err.kind).equal(DataPeps.ServerError.SessionStale)
            return
        }
        throw new Error("alice could not list identities after key renewal")
    })

    it('login with alice with overwrited keys', async () => {
        aliceSession = await sdk.login(alice.login, renewSecret)
        expect(aliceSession).to.be.not.null
    })

    let bobSession: DataPeps.Session
    it('login with bob', async () => {
        bobSession = await sdk.login(bob.login, bobSecret)
    })

    it('bob check alice keys', async () => {
        await bobSession.getLatestPublicKey(alice.login)
    })

    it('deactivate bob identity', async () => {
        await adminSession.Admin.setActive(bob.login, false)
    })

    it('bob try to do something with its old session', async () => {
        try {
            await bobSession.Identity.get(alice.login)
        } catch (e) {
            return
        }
        throw new Error("bob session is still active")
    })

    it('attempt to login with bob', async () => {
        try {
            await sdk.login(bob.login, bobSecret)
        } catch (err) {
            expect(err).to.not.be.null
            expect(err.kind).equal(DataPeps.ServerError.IdentityNotFound)
            return
        }
        throw new Error("Able to log in with a deactivated user")
    })

    it('reactivate bob identity', async () => {
        await adminSession.Admin.setActive(bob.login, true)
    })

    it('login with bob', async () => {
        bobSession = await sdk.login(bob.login, bobSecret)
        expect(bobSession).to.be.not.null
    })

})
