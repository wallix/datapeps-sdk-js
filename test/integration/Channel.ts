import * as Config from '../Config'
import * as Utils from '../Utils'
import * as DataPeps from '../../src/DataPeps'
import * as nacl from 'tweetnacl'
import { expect } from 'chai'


describe('Channel', () => {
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

    let aliceChannel: DataPeps.Channel
    it('alice create a new channel', async () => {
        aliceChannel = await aliceSession.Channel.create([alice.login, bob.login])
        expect(aliceChannel).to.be.not.null
    })


    let lastReceiveAlice: DataPeps.ChannelMessage
    it('alice listen its channel', async () => {
        await aliceChannel.listen(message => {
            lastReceiveAlice = message
        })
    })

    let bobChannel: DataPeps.Channel
    it('bob get its channel', async () => {
        bobChannel = await bobSession.Channel.get(aliceChannel.id)
        expect(bobChannel).to.not.be.null
    })

    let lastReceiveBob: DataPeps.ChannelMessage
    it('bob listen its channel', async () => {
        await bobChannel.listen(message => {
            lastReceiveBob = message
        })
    })

    let message: Uint8Array
    it('alice send a message along the channel', async () => {
        message = nacl.randomBytes(1024)
        await aliceChannel.send(message)
    })

    it('bob wait and check the message', async () => {
        await Utils.wait(10000, () => lastReceiveBob != null)
        expect(lastReceiveBob).to.not.be.undefined
        expect(lastReceiveBob.content).to.be.deep.equal(message)
    })

    it('alice wait and check the message', async () => {
        await Utils.wait(10000, () => lastReceiveAlice != null)
        expect(lastReceiveAlice).to.not.be.null
        expect(lastReceiveAlice.content).to.be.deep.equal(message)
    })

    it('bob send a message along the channel', async () => {
        lastReceiveAlice = null
        lastReceiveBob = null
        message = nacl.randomBytes(1024)
        await aliceChannel.send(message)
    })

    it('bob wait and check the message', async () => {
        await Utils.wait(10000, () => lastReceiveBob != null)
        expect(lastReceiveBob).to.not.be.null
        expect(lastReceiveBob.content).to.be.deep.equal(message)
    })

    it('alice wait and check the message', async () => {
        await Utils.wait(10000, () => lastReceiveAlice != null)
        expect(lastReceiveAlice).to.not.be.null
        expect(lastReceiveAlice.content).to.be.deep.equal(message)
    })

})
