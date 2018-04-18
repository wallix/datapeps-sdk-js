import * as Config from '../Config'
import * as DataPeps from '../../src/DataPeps'
import * as nacl from 'tweetnacl'
import { expect } from 'chai'

describe('Resource', () => {
    let seed = Math.floor(Math.random() * 99999)
    let aliceSecret = nacl.randomBytes(128)
    let alice: DataPeps.Identity<Uint8Array> = {
        login: "alice." + seed + "@peps.test",
        name: "alice test identity, TS",
        admin: false,
        active: true,
        kind: "user",
        created: new Date(),
        payload: new TextEncoder().encode(JSON.stringify({
            firstname: "Alice",
            lastname: "TypeScript",
            tel: "+33712345678"
        }))
    }
    let bobSecret = nacl.randomBytes(128)
    let bob: DataPeps.Identity<Uint8Array> = {
        login: "bob." + seed + "@peps.test",
        name: "bob test identity, TS",
        admin: false,
        active: true,
        kind: "user",
        created: new Date(),
        payload: new TextEncoder().encode(JSON.stringify({
            firstname: "Bob",
            lastname: "TypeScript",
            tel: "+33712345678"
        }))
    }
    let group: DataPeps.Identity<Uint8Array> = {
        login: "group." + seed + "@peps.test",
        name: "A group for the Resource test, TS",
        admin: false,
        active: true,
        kind: "group",
        created: new Date(),
        payload: new TextEncoder().encode(JSON.stringify({
            description: "This is an awsome group!!!"
        }))
    }

    let sdk = Config.sdk
    let aliceSession: DataPeps.Session
    let bobSession: DataPeps.Session
    // Create alice, bob and a group
    before(async () => {
        await Config.init()
        await sdk.register(alice, aliceSecret)
        await sdk.register(bob, bobSecret)
        aliceSession = await sdk.login(alice.login, aliceSecret)
        bobSession = await sdk.login(bob.login, bobSecret)
        await aliceSession.Identity.create(group, { sharingGroup: [alice.login, bob.login] })
    })

    let res: DataPeps.Resource<any>
    let content: Uint8Array
    let encrypted: Uint8Array
    it('alice creates a selfish resource', async () => {
        content = nacl.randomBytes(2048)
        let payload = { description: "This is a test resource" }
        res = await aliceSession.Resource.create("test/A", payload, [alice.login])
        expect(res).to.be.not.null
        encrypted = res.encrypt(content)
        let result = res.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(res.payload).to.be.deep.equal(payload)
    })

    it('alice retrieves the resource and decrypt the encrypted content', async () => {
        let resource = await aliceSession.Resource.get(res.id)
        expect(resource).to.be.not.null
        let result = resource.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(resource.payload).to.be.deep.equals(res.payload)
    })

    it('bob try to retrieve the resource', async () => {
        try {
            await bobSession.Resource.get(res.id)
        } catch (err) {
            expect(err).instanceof(DataPeps.Error)
            expect(err.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound)
            expect(err.payload.id).to.be.deep.equals(res.id)
            return
        }
        throw new Error("bob should not can retreive this resource")
    })

    it('alice creates a resource, shared with alice and bob', async () => {
        content = nacl.randomBytes(2048)
        let payload = { description: "This is a test resource" }
        let resource = await aliceSession.Resource.create("test/B", payload, [alice.login, bob.login])
        expect(resource).to.be.not.null
        encrypted = resource.encrypt(content)
        let result = resource.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(resource.payload).to.be.deep.equal(payload)
        res = resource
    })

    let resourceAlice: DataPeps.Resource<any>
    it('alice retrieves the shared resource and decrypts the encrypted content', async () => {
        resourceAlice = await aliceSession.Resource.get(res.id)
        expect(resourceAlice).to.be.not.null
        let result = resourceAlice.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(resourceAlice.payload).to.be.deep.equals(res.payload)
    })

    it('bob retrieves the shared resource and decrypts the encrypted content', async () => {
        let resource = await bobSession.Resource.get(res.id)
        expect(resource).to.be.not.null
        let result = resource.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(resource.payload).to.be.deep.equals(res.payload)
    })

    it('alice renews its keys', async () => {
        await aliceSession.renewKeys()
    })

    it('after key renewal alice retrieves the shared resource and decrypts the encrypted content', async () => {
        let resource = await aliceSession.Resource.get(res.id)
        expect(resource).to.be.not.null
        let result = resource.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(resource.payload).to.be.deep.equals(res.payload)
    })

    let resourceBob: DataPeps.Resource<any>
    it('after key renews bob retrieves the shared resource and decrypt the encrypted content', async () => {
        resourceBob = await bobSession.Resource.get(res.id)
        expect(resourceBob).to.be.not.null
        let result = resourceBob.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(resourceBob.payload).to.be.deep.equals(res.payload)
    })

    let contentBob: Uint8Array
    let encryptedBob: Uint8Array
    it('bob encrypts a data with the alice resource', () => {
        contentBob = nacl.randomBytes(2048)
        encryptedBob = resourceBob.encrypt(contentBob)
        let result = resourceBob.decrypt(encryptedBob)
        expect(result).to.be.deep.equals(contentBob)
    })

    it('alice decrypts the data encrypted by bob', () => {
        let result = resourceAlice.decrypt(encryptedBob)
        expect(result).to.be.deep.equals(contentBob)
    })

    it('bob tries to delete the alice resource', async () => {
        try {
            await bobSession.Resource.delete(res.id)
        } catch (err) {
            expect(err).instanceof(DataPeps.Error)
            expect(err.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound)
            expect(err.payload.id).to.be.deep.equals(res.id)
            return
        }
        throw new Error("bob should not delete the alice resource")
    })

    it('bob deletes its copy of the alice resource', async () => {
        await bobSession.Resource.delete(res.id, { soft: true })
        let resource = await aliceSession.Resource.get(res.id)
        expect(resource).to.be.not.null
        let result = resource.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(resource.payload).to.be.deep.equals(res.payload)
        try {
            return await bobSession.Resource.get(res.id)
        } catch (err) {
            expect(err).instanceof(DataPeps.Error)
            expect(err.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound)
            expect(err.payload.id).to.be.deep.equals(res.id)
        }
    })

    it('alice deletes its resource', async () => {
        await aliceSession.Resource.delete(res.id)
        try {
            await aliceSession.Resource.get(res.id)
        } catch (err) {
            expect(err).instanceof(DataPeps.Error)
            expect(err.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound)
            expect(err.payload.id).to.be.deep.equals(res.id)
            return
        }
        throw new Error("alice get the deleted resource")
    })

    it('alice creates a resource, shared with the group', async () => {
        content = nacl.randomBytes(2048)
        let payload = { description: "This is a test resource" }
        res = await aliceSession.Resource.create("test/C", payload, [group.login])
        expect(res).to.be.not.null
        encrypted = res.encrypt(content)
        let result = res.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(res.payload).to.be.deep.equal(payload)
    })

    it('alice along the group retrieves the resource and decrypts the encrypted content', async () => {
        let resource = await aliceSession.Resource.get(res.id, { assume: group.login })
        expect(resource).to.be.not.null
        let result = resource.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(resource.payload).to.be.deep.equals(res.payload)
    })

    it('bob try to retrieves the resource without group', async () => {
        try {
            await bobSession.Resource.get(res.id)
        } catch (err) {
            expect(err).instanceof(DataPeps.Error)
            expect(err.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound)
            expect(err.payload.id).to.be.deep.equals(res.id)
            return
        }
        throw new Error("bob should not can retreive this resource")
    })

    it('bob along the group retrieves the shared resource and decrypts the encrypted content', async () => {
        let resource = await bobSession.Resource.get(res.id, { assume: group.login })
        expect(resource).to.be.not.null
        let result = resource.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(resource.payload).to.be.deep.equals(res.payload)
    })

    it('alice renews keys of the group', async () => {
        await aliceSession.Identity.renewKeys(group.login)
    })

    it('after key renewal, alice along the group retrieves the resource and decrypts the encrypted content', async () => {
        let resource = await aliceSession.Resource.get(res.id, { assume: group.login })
        expect(resource).to.be.not.null
        let result = resource.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(resource.payload).to.be.deep.equals(res.payload)
    })

    it('after key renewal, bob along the group retrieves the shared resource and decrypts the encrypted content', async () => {
        let resource = await bobSession.Resource.get(res.id, { assume: group.login })
        expect(resource).to.be.not.null
        let result = resource.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(resource.payload).to.be.deep.equals(res.payload)
    })

    it('check error on decrypt fail', async () => {
        try {
            let resource = await bobSession.Resource.get(res.id, { assume: group.login })
            expect(resource).to.be.not.null
            let result = resource.decrypt(nacl.randomBytes(128))
        } catch (err) {
            expect(err).instanceof(DataPeps.Error)
            expect(err.kind).to.be.equals(DataPeps.SDKError.DecryptFail)
            return
        }
        throw new Error("illegal decrypt doesn't throw error");
    })

})