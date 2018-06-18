import * as Config from '../Config'
import * as Utils from '../Utils'
import * as DataPeps from '../../src/DataPeps'
import * as nacl from 'tweetnacl'
import { expect } from 'chai'

describe('DelegatedAccess', () => {
    let seed = Math.floor(Math.random() * 99999)
    let aliceSecret = nacl.randomBytes(128)
    let alice: DataPeps.Identity<Uint8Array> = {
        login: "alice." + seed,
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
        login: "bob." + seed,
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
    })

    let res: DataPeps.Resource<any>
    let content: Uint8Array
    let encrypted: Uint8Array
    it('bob create a selfish resource', async () => {
        content = nacl.randomBytes(2048)
        let payload = { description: "This is a test resource" }
        res = await bobSession.Resource.create("test/A", payload, [bob.login])
        expect(res).to.be.not.null
        encrypted = res.encrypt(content)
        let result = res.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(res.payload).to.be.deep.equal(payload)
    })

    let accessRequest: DataPeps.AccessRequest
    it('alice request a delegate access to bob', async () => {
        accessRequest = await sdk.requestDelegatedAccess(bob.login, (({ login, publicKey }) => {
            let ulogin = new TextEncoder().encode(login)
            let toSign = new Uint8Array(ulogin.byteLength + publicKey.byteLength)
            toSign.set(ulogin, 0)
            toSign.set(publicKey, ulogin.byteLength)
            let sign = aliceSession.sign(toSign)
            return Promise.resolve({ requester: alice.login, sign })
        }))
        expect(accessRequest).to.be.not.null
    })

    let bobResolver: DataPeps.AccessRequestResolver
    it('bob open the access request', async () => {
        bobResolver = await bobSession.resolveAccessRequest(accessRequest.id)
        expect(bobResolver.requesterKey.login).to.be.equals(alice.login)
    })

    it('bob resolve the access request with its own credentials', async () => {
        await bobResolver.resolve(bob.login)
    })

    let aliceBobSession: DataPeps.Session
    it('alice wait the bob session', async () => {
        aliceBobSession = await accessRequest.waitSession()
    })

    it('alice use the session sent by bob to get the resource', async () => {
        let resource = await aliceBobSession.Resource.get(res.id)
        expect(resource).to.be.not.null
        let result = resource.decrypt(encrypted)
        expect(result).to.be.deep.equals(content)
        expect(resource.payload).to.be.deep.equals(res.payload)
    })

    it('alice list delegated access', async () => {
        let accesses = await aliceSession.listDelegatedAccess(aliceSession.login)
        expect(accesses.length).to.be.equals(1)
        expect(accesses[0].requester.login).to.be.equals(alice.login)
        expect(accesses[0].target.login).to.be.equals(bob.login)
    })

})