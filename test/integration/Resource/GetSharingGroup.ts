import * as Config from '../../Config';
import * as DataPeps from '../../../src/DataPeps';
import * as nacl from 'tweetnacl';
import { expect } from 'chai';
import 'mocha';


type TestResource =
    DataPeps.Resource<{ description: string; }>

describe('Resource.getSharingGroup', () => {
    let seed = Math.floor(Math.random() * 99999)

    let aliceSecret = nacl.randomBytes(128)
    let alice: DataPeps.IdentityFields = {
        login: "alice." + seed,
        name: "alice 1",
        kind: "user",
        payload: new TextEncoder().encode(JSON.stringify({
            test: 1
        })),
    }

    let bobSecret = nacl.randomBytes(128)
    let bob: DataPeps.IdentityFields = {
        login: "bob." + seed,
        name: "bob 1",
        kind: "user",
        payload: new TextEncoder().encode(JSON.stringify({
            test: 1
        })),
    }

    let charlieSecret = nacl.randomBytes(128)
    let charlie: DataPeps.IdentityFields = {
        login: "charlie." + seed,
        name: "charlie 1",
        kind: "user",
        payload: new TextEncoder().encode(JSON.stringify({
            test: 1
        })),
    }

    let deviceSecret = nacl.randomBytes(128)
    let device: DataPeps.IdentityFields = {
        login: "device." + seed,
        name: "device 1",
        kind: "device",
        payload: null,
    }

    let aliceSession: DataPeps.Session
    let bobSession: DataPeps.Session
    let charlieSession: DataPeps.Session
    let deviceSession: DataPeps.Session

    before(async () => {
        await Config.init()
        await DataPeps.register(alice, aliceSecret)
        await DataPeps.register(bob, bobSecret)
        await DataPeps.register(charlie, charlieSecret)
        aliceSession = await DataPeps.login(alice.login, aliceSecret)
        bobSession = await DataPeps.login(bob.login, bobSecret)
        charlieSession = await DataPeps.login(charlie.login, charlieSecret)
        await aliceSession.Identity.create(device, { secret: deviceSecret })
        await aliceSession.Identity.extendSharingGroup(alice.login, [device.login])
        deviceSession = await DataPeps.login(device.login, deviceSecret)
    })

    it('Check Alice is in resource sharing group', async () => {
        let aliceRes = await aliceSession.Resource.create("test/A", { description: "This is a test resource for Alice" }, [alice.login])
        let got = await aliceSession.Resource.getSharingGroup(aliceRes.id)
        expect(got.map(share => share.identityID.login)).to.be.deep.equal([aliceSession.login])
        got = await deviceSession.Resource.getSharingGroup(aliceRes.id, {assume: aliceSession.login})
        expect(got.map(share => share.identityID.login)).to.be.deep.equal([aliceSession.login])
    })

    it('Check Alice sharers are in resource sharing group', async () => {
        let sharedRes = await aliceSession.Resource.create("test/A", { description: "This is a test resource for Alice and Bob" }, [alice.login, bob.login])
        let got = await aliceSession.Resource.getSharingGroup(sharedRes.id)
        expect(got.map(share => share.identityID.login)).to.be.deep.equal([aliceSession.login, bobSession.login])
    })

    it('Check Alice sharers have access to sharing group', async () => {
        let sharedRes = await aliceSession.Resource.create("test/A", { description: "This is a test resource for Alice and Bob" }, [alice.login, bob.login])
        let got = await bobSession.Resource.getSharingGroup(sharedRes.id)
        expect(got.map(share => share.identityID.login)).to.be.deep.equal([aliceSession.login, bobSession.login])
    })

    it('Check that the sharing group contains a new identity added with extendSharingGroup', async () => {
        let sharedRes = await aliceSession.Resource.create("test/A", { description: "This is a test resource for Alice and Bob then shared by Bob with Charlie" }, [alice.login, bob.login])
        await bobSession.Resource.extendSharingGroup(sharedRes.id, [charlie.login])
        let expectSharingGroup = [aliceSession.login, bobSession.login, charlieSession.login];
        let gotSharingGroup = await aliceSession.Resource.getSharingGroup(sharedRes.id)
        expect(gotSharingGroup.map(share => share.identityID.login)).to.be.deep.equal(expectSharingGroup)
        gotSharingGroup = await bobSession.Resource.getSharingGroup(sharedRes.id)
        expect(gotSharingGroup.map(share => share.identityID.login)).to.be.deep.equal(expectSharingGroup)
        gotSharingGroup = await charlieSession.Resource.getSharingGroup(sharedRes.id)
        expect(gotSharingGroup.map(share => share.identityID.login)).to.be.deep.equal(expectSharingGroup)
    })

    it('Check right identity version in sharing group after key renewal of sharers', async () => {
        await bobSession.renewKeys()
        let sharedRes = await aliceSession.Resource.create("test/A", { description: "This is a test resource for Alice and Bob" }, [alice.login, bob.login])
        let got = await aliceSession.Resource.getSharingGroup(sharedRes.id)
        expect(got.map(share => share.identityID.login)).to.be.deep.equal([aliceSession.login, bobSession.login])
        expect(got.map(share => share.identityID.version)).to.be.deep.equal([1, 2])
    })

    it('Check error on resource not found', async () => {
        try {
            await aliceSession.Resource.getSharingGroup(1234567)
        } catch (e) {
            expect(e).is.instanceOf(DataPeps.Error)
            let d = e as DataPeps.Error
            expect(d.kind).to.be.equal(DataPeps.ServerError.ResourceNotFound)
            return
        }
        throw new Error("should receive ResourceNotFound error")
    })

    it('Check error on resource not accessible', async () => {
        try {
            let sharedRes = await aliceSession.Resource.create("test/A", { description: "This is a test resource for Alice and Bob" }, [alice.login, bob.login])
            let got = await charlieSession.Resource.getSharingGroup(sharedRes.id)
        } catch (e) {
            expect(e).is.instanceOf(DataPeps.Error)
            let d = e as DataPeps.Error
            expect(d.kind).to.be.equal(DataPeps.ServerError.ResourceNotFound)
            return
        }
        throw new Error("should receive ResourceNotFound error")
    })

})
