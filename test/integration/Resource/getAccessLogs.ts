import * as Config from '../../Config';
import * as DataPeps from '../../../src/DataPeps';
import * as nacl from 'tweetnacl';
import { expect } from 'chai';
import 'mocha';

describe('Resource.getAccessLogs', () => {
    let seed = Math.floor(Math.random() * 99999)

    let aliceSecret = nacl.randomBytes(128)
    let alice: DataPeps.IdentityFields = {
        login: "alice." + seed + "@peps.test",
        name: "alice 1",
        kind: "user",
        payload: null,
    }

    let bobSecret = nacl.randomBytes(128)
    let bob: DataPeps.IdentityFields = {
        login: "bob." + seed + "@peps.test",
        name: "bob 1",
        kind: "user",
        payload: null,
    }

    let deviceSecret = nacl.randomBytes(128)
    let device: DataPeps.IdentityFields = {
        login: "device." + seed + "@peps.test",
        name: "device 1",
        kind: "device",
        payload: null,
    }

    let aliceSession: DataPeps.Session
    let bobSession: DataPeps.Session
    let deviceSession: DataPeps.Session

    let aliceRes1: DataPeps.Resource<null>
    let aliceRes2: DataPeps.Resource<null>

    before(async () => {
        await Config.init()
        await DataPeps.register(alice, aliceSecret)
        await DataPeps.register(bob, bobSecret)
        aliceSession = await DataPeps.login(alice.login, aliceSecret)
        bobSession = await DataPeps.login(bob.login, bobSecret)
        await aliceSession.Identity.create(device, { secret: deviceSecret })
        await aliceSession.Identity.extendSharingGroup(alice.login, [device.login])
        deviceSession = await DataPeps.login(device.login, deviceSecret)
        aliceRes1 = await aliceSession.Resource.create("test/A", null, [alice.login, bob.login])
        aliceRes2 = await aliceSession.Resource.create("test/A", null, [alice.login])

    })

    it('Alice read the resource1, alice check access', async () => {
        await aliceSession.Resource.get(aliceRes1.id)
        let logs = await aliceSession.Resource.getAccessLogs({ limit: 1 })
        expect(logs.length).to.be.equals(1)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[0].owner.login).to.be.equals(alice.login)
        expect(logs[0].owner.version).to.be.equals(1)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(1)
        expect(logs[0].reason).to.be.equals('Read')
    })

    it('Bob read the resource1, alice check access', async () => {
        await bobSession.Resource.get(aliceRes1.id)
        let logs = await aliceSession.Resource.getAccessLogs({ limit: 1 })
        expect(logs.length).to.be.equals(1)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[0].owner.login).to.be.equals(bob.login)
        expect(logs[0].owner.version).to.be.equals(1)
        expect(logs[0].assume.login).to.be.equals(bob.login)
        expect(logs[0].assume.version).to.be.equals(1)
        expect(logs[0].reason).to.be.equals('Read')
    })

    it('Device read the resource1, alice check access', async () => {
        await deviceSession.Resource.get(aliceRes1.id, { assume: alice.login })
        let logs = await aliceSession.Resource.getAccessLogs({ limit: 1 })
        expect(logs.length).to.be.equals(1)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[0].owner.login).to.be.equals(device.login)
        expect(logs[0].owner.version).to.be.equals(1)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(1)
        expect(logs[0].reason).to.be.equals('Read')
    })

    it('Alice read the resource2, alice check access', async () => {
        await aliceSession.Resource.get(aliceRes2.id)
        let logs = await aliceSession.Resource.getAccessLogs({ limit: 1 })
        expect(logs.length).to.be.equals(1)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes2.id.toString())
        expect(logs[0].owner.login).to.be.equals(alice.login)
        expect(logs[0].owner.version).to.be.equals(1)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(1)
        expect(logs[0].reason).to.be.equals('Read')
    })

    it('Alice renew keys and access to the resource1, alice check access', async () => {
        await aliceSession.renewKeys()
        await aliceSession.Resource.get(aliceRes1.id)
        let logs = await aliceSession.Resource.getAccessLogs({ limit: 1 })
        expect(logs.length).to.be.equals(1)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[0].owner.login).to.be.equals(alice.login)
        expect(logs[0].owner.version).to.be.equals(2)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(2)
        expect(logs[0].reason).to.be.equals('Read')
    })

    it('Alice check accesses of its resources', async () => {
        let logs = await aliceSession.Resource.getAccessLogs({ limit: 5 })
        expect(logs.length).to.be.equals(5)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[0].owner.login).to.be.equals(alice.login)
        expect(logs[0].owner.version).to.be.equals(2)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(2)
        expect(logs[0].reason).to.be.equals('Read')
        expect(logs[1].resourceID.toString()).to.be.equals(aliceRes2.id.toString())
        expect(logs[1].owner.login).to.be.equals(alice.login)
        expect(logs[1].owner.version).to.be.equals(1)
        expect(logs[1].assume.login).to.be.equals(alice.login)
        expect(logs[1].assume.version).to.be.equals(1)
        expect(logs[1].reason).to.be.equals('Read')
        expect(logs[2].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[2].owner.login).to.be.equals(device.login)
        expect(logs[2].owner.version).to.be.equals(1)
        expect(logs[2].assume.login).to.be.equals(alice.login)
        expect(logs[2].assume.version).to.be.equals(1)
        expect(logs[2].reason).to.be.equals('Read')
        expect(logs[3].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[3].owner.login).to.be.equals(bob.login)
        expect(logs[3].owner.version).to.be.equals(1)
        expect(logs[3].assume.login).to.be.equals(bob.login)
        expect(logs[3].assume.version).to.be.equals(1)
        expect(logs[3].reason).to.be.equals('Read')
        expect(logs[4].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[4].owner.login).to.be.equals(alice.login)
        expect(logs[4].owner.version).to.be.equals(1)
        expect(logs[4].assume.login).to.be.equals(alice.login)
        expect(logs[4].assume.version).to.be.equals(1)
        expect(logs[4].reason).to.be.equals('Read')
    })


    it('Device check accesses of alice resources', async () => {
        let logs = await deviceSession.Resource.getAccessLogs({ limit: 5, assume: alice.login })
        expect(logs.length).to.be.equals(5)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[0].owner.login).to.be.equals(alice.login)
        expect(logs[0].owner.version).to.be.equals(2)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(2)
        expect(logs[0].reason).to.be.equals('Read')
        expect(logs[1].resourceID.toString()).to.be.equals(aliceRes2.id.toString())
        expect(logs[1].owner.login).to.be.equals(alice.login)
        expect(logs[1].owner.version).to.be.equals(1)
        expect(logs[1].assume.login).to.be.equals(alice.login)
        expect(logs[1].assume.version).to.be.equals(1)
        expect(logs[1].reason).to.be.equals('Read')
        expect(logs[2].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[2].owner.login).to.be.equals(device.login)
        expect(logs[2].owner.version).to.be.equals(1)
        expect(logs[2].assume.login).to.be.equals(alice.login)
        expect(logs[2].assume.version).to.be.equals(1)
        expect(logs[2].reason).to.be.equals('Read')
        expect(logs[3].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[3].owner.login).to.be.equals(bob.login)
        expect(logs[3].owner.version).to.be.equals(1)
        expect(logs[3].assume.login).to.be.equals(bob.login)
        expect(logs[3].assume.version).to.be.equals(1)
        expect(logs[3].reason).to.be.equals('Read')
        expect(logs[4].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[4].owner.login).to.be.equals(alice.login)
        expect(logs[4].owner.version).to.be.equals(1)
        expect(logs[4].assume.login).to.be.equals(alice.login)
        expect(logs[4].assume.version).to.be.equals(1)
        expect(logs[4].reason).to.be.equals('Read')
    })


    it('Bob check accesses of its resources', async () => {
        let logs = await bobSession.Resource.getAccessLogs()
        expect(logs.length).to.be.equals(4)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[0].owner.login).to.be.equals(alice.login)
        expect(logs[0].owner.version).to.be.equals(2)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(2)
        expect(logs[0].reason).to.be.equals('Read')
        expect(logs[1].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[1].owner.login).to.be.equals(device.login)
        expect(logs[1].owner.version).to.be.equals(1)
        expect(logs[1].assume.login).to.be.equals(alice.login)
        expect(logs[1].assume.version).to.be.equals(1)
        expect(logs[1].reason).to.be.equals('Read')
        expect(logs[2].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[2].owner.login).to.be.equals(bob.login)
        expect(logs[2].owner.version).to.be.equals(1)
        expect(logs[2].assume.login).to.be.equals(bob.login)
        expect(logs[2].assume.version).to.be.equals(1)
        expect(logs[2].reason).to.be.equals('Read')
        expect(logs[3].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[3].owner.login).to.be.equals(alice.login)
        expect(logs[3].owner.version).to.be.equals(1)
        expect(logs[3].assume.login).to.be.equals(alice.login)
        expect(logs[3].assume.version).to.be.equals(1)
        expect(logs[3].reason).to.be.equals('Read')
    })

    it('Alice check accesses of its resources, with resource filters', async () => {
        let logs = await aliceSession.Resource.getAccessLogs({ resourceIDs: [aliceRes1.id] })
        expect(logs.length).to.be.equals(4)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[0].owner.login).to.be.equals(alice.login)
        expect(logs[0].owner.version).to.be.equals(2)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(2)
        expect(logs[0].reason).to.be.equals('Read')
        expect(logs[1].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[1].owner.login).to.be.equals(device.login)
        expect(logs[1].owner.version).to.be.equals(1)
        expect(logs[1].assume.login).to.be.equals(alice.login)
        expect(logs[1].assume.version).to.be.equals(1)
        expect(logs[1].reason).to.be.equals('Read')
        expect(logs[2].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[2].owner.login).to.be.equals(bob.login)
        expect(logs[2].owner.version).to.be.equals(1)
        expect(logs[2].assume.login).to.be.equals(bob.login)
        expect(logs[2].assume.version).to.be.equals(1)
        expect(logs[2].reason).to.be.equals('Read')
        expect(logs[3].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[3].owner.login).to.be.equals(alice.login)
        expect(logs[3].owner.version).to.be.equals(1)
        expect(logs[3].assume.login).to.be.equals(alice.login)
        expect(logs[3].assume.version).to.be.equals(1)
        expect(logs[3].reason).to.be.equals('Read')
        logs = await aliceSession.Resource.getAccessLogs({ limit: 2, resourceIDs: [aliceRes1.id] })
        expect(logs.length).to.be.equals(2)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[0].owner.login).to.be.equals(alice.login)
        expect(logs[0].owner.version).to.be.equals(2)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(2)
        expect(logs[0].reason).to.be.equals('Read')
        expect(logs[1].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[1].owner.login).to.be.equals(device.login)
        expect(logs[1].owner.version).to.be.equals(1)
        expect(logs[1].assume.login).to.be.equals(alice.login)
        expect(logs[1].assume.version).to.be.equals(1)
        expect(logs[1].reason).to.be.equals('Read')
        logs = await aliceSession.Resource.getAccessLogs({ offset: 2, resourceIDs: [aliceRes1.id] })
        expect(logs.length).to.be.equals(2)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[0].owner.login).to.be.equals(bob.login)
        expect(logs[0].owner.version).to.be.equals(1)
        expect(logs[0].assume.login).to.be.equals(bob.login)
        expect(logs[0].assume.version).to.be.equals(1)
        expect(logs[0].reason).to.be.equals('Read')
        expect(logs[1].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[1].owner.login).to.be.equals(alice.login)
        expect(logs[1].owner.version).to.be.equals(1)
        expect(logs[1].assume.login).to.be.equals(alice.login)
        expect(logs[1].assume.version).to.be.equals(1)
        expect(logs[1].reason).to.be.equals('Read')
        logs = await aliceSession.Resource.getAccessLogs({ resourceIDs: [aliceRes2.id] })
        expect(logs.length).to.be.equals(1)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes2.id.toString())
        expect(logs[0].owner.login).to.be.equals(alice.login)
        expect(logs[0].owner.version).to.be.equals(1)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(1)
        expect(logs[0].reason).to.be.equals('Read')
    })

    it('Alice share the resource2, alice check access', async () => {
        await aliceSession.Resource.extendSharingGroup(aliceRes2.id, [bob.login])
        let logs = await aliceSession.Resource.getAccessLogs({ limit: 1 })
        expect(logs.length).to.be.equals(1)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes2.id.toString())
        expect(logs[0].owner.login).to.be.equals(alice.login)
        expect(logs[0].owner.version).to.be.equals(2)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(2)
        expect(logs[0].reason).to.be.equals('Share')
    })

    it('Alice list its resources, alice check access', async () => {
        await aliceSession.Resource.list()
        let logs = await aliceSession.Resource.getAccessLogs({ limit: 2 })
        expect(logs.length).to.be.equals(2)
        expect(logs[0].owner.login).to.be.equals(alice.login)
        expect(logs[0].owner.version).to.be.equals(2)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(2)
        expect(logs[0].reason).to.be.equals('Read')
        expect(logs[1].owner.login).to.be.equals(alice.login)
        expect(logs[1].owner.version).to.be.equals(2)
        expect(logs[1].assume.login).to.be.equals(alice.login)
        expect(logs[1].assume.version).to.be.equals(2)
        expect(logs[1].reason).to.be.equals('Read')
    })

    it('Check custom reason for get access', async () => {
        await aliceSession.Resource.get(aliceRes1.id, { reason: 'specific access' })
        let logs = await aliceSession.Resource.getAccessLogs({ limit: 1 })
        expect(logs.length).to.be.equals(1)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString())
        expect(logs[0].owner.login).to.be.equals(alice.login)
        expect(logs[0].owner.version).to.be.equals(2)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(2)
        expect(logs[0].reason).to.be.equals('specific access')
    })

    it('Check custom reason for list access', async () => {
        await aliceSession.Resource.list({ reason: 'specific list access', limit:1 })
        let logs = await aliceSession.Resource.getAccessLogs({ limit: 1 })
        expect(logs.length).to.be.equals(1)
        expect(logs[0].resourceID.toString()).to.be.equals(aliceRes2.id.toString())
        expect(logs[0].owner.login).to.be.equals(alice.login)
        expect(logs[0].owner.version).to.be.equals(2)
        expect(logs[0].assume.login).to.be.equals(alice.login)
        expect(logs[0].assume.version).to.be.equals(2)
        expect(logs[0].reason).to.be.equals('specific list access')
    })
})
