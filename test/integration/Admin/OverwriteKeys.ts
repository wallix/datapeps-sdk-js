import * as Config from '../../Config';
import * as DataPeps from '../../../src/DataPeps';
import * as nacl from 'tweetnacl';
import { expect } from 'chai';

describe('Admin.overwriteKeys', () => {
    let seed = Math.floor(Math.random() * 99999)

    let aliceSecret = nacl.randomBytes(128)
    let alice: DataPeps.IdentityFields = {
        login: "alice." + seed,
        name: "alice 1",
        kind: "user",
        payload: null,
    }
    let aliceDelegate: DataPeps.IdentityFields = {
        login: alice.login + '_delegate',
        name: alice.name + '_delegate',
        kind: "delegate",
        payload: null,
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
    let group: DataPeps.IdentityFields = {
        login: alice.login + '_' + bob.login + '_group',
        name: alice.name + '_' + bob.name + '_group',
        kind: "group",
        payload: null,
    }

    let aliceSession: DataPeps.Session
    let aliceDelegateSession: DataPeps.Session
    let bobSession: DataPeps.Session
    let groupSession: DataPeps.Session
    let adminSession: DataPeps.Session

    let aliceDelegateRes: DataPeps.Resource<null>
    let groupRes: DataPeps.Resource<null>

    before(async () => {
        await Config.init()
        await DataPeps.register(alice, aliceSecret)
        await DataPeps.register(bob, bobSecret)
        aliceSession = await DataPeps.login(alice.login, aliceSecret)
        bobSession = await DataPeps.login(bob.login, bobSecret)
        adminSession = await Config.adminLogin()

        await aliceSession.Identity.create(aliceDelegate, { sharingGroup: [alice.login] })
        aliceDelegateSession = await aliceSession.createSession(aliceDelegate.login);

        await aliceSession.Identity.create(group, { sharingGroup: [alice.login, bob.login] })
        groupSession = await aliceSession.createSession(group.login);

        aliceDelegateRes = await aliceDelegateSession.Resource.create("test/A", null, [aliceDelegate.login])
        groupRes = await groupSession.Resource.create("test/A", null, [group.login])
    })

    it('Before overwriteKeys Alice can access the resource of delegate, directly and with assume', async () => {
        let res = await aliceDelegateSession.Resource.get(aliceDelegateRes.id);
        expect(res).to.be.deep.equal(aliceDelegateRes);

        res = await aliceSession.Resource.get(aliceDelegateRes.id, { assume: aliceDelegate.login });
        expect(res).to.be.deep.equal(aliceDelegateRes);
    })

    it('Before overwriteKeys Alice and Bob can access the resource of group', async () => {
        let res = await aliceSession.Resource.get(groupRes.id, { assume: group.login });
        expect(res).to.be.deep.equal(groupRes);

        res = await bobSession.Resource.get(groupRes.id, { assume: group.login });
        expect(res).to.be.deep.equal(groupRes);
    })

    it('Before overwriteKeys delegate and group identities are in access group of alice in v1', async () => {
        let accessGroup = await aliceSession.Identity.getAccessGroup(alice.login);
        expect(accessGroup.length).to.be.equal(2);

        let delegateEl = accessGroup[0];
        expect(delegateEl.id.login).to.be.equal(aliceDelegate.login);
        expect(delegateEl.id.version).to.be.equal(1);

        let groupEl = accessGroup[1];
        expect(groupEl.id.login).to.be.equal(group.login);
        expect(groupEl.id.version).to.be.equal(1);
    })

    it('After overwriteKeys Alice can still access to the delegate identity', async () => {
        let newPassword = 'a new password'
        await adminSession.Admin.overwriteKeys(alice.login, newPassword);
        aliceSession = await DataPeps.login(alice.login, newPassword)
        aliceDelegateSession = await aliceSession.createSession(aliceDelegate.login);
        expect(aliceDelegateSession).to.be.not.null;
        expect(aliceDelegateSession.login).to.be.equal(aliceDelegate.login);

    })

    it('After overwriteKeys Alice can no longer access the resources of the delegate', async () => {
        try {
            let res = await aliceSession.Resource.get(aliceDelegateRes.id, { assume: aliceDelegate.login });
        } catch (err) {
            expect(err).to.not.be.null
            expect(err).instanceof(DataPeps.Error)
            expect(err.kind).equal(DataPeps.ServerError.IdentityNotFound)
            return
        }
        throw new Error("should throw an error")
    })

    it('After overwriteKeys Alice can no longer access the resources of the group', async () => {
        try {
            let res = await aliceSession.Resource.get(groupRes.id, { assume: group.login });
        } catch (err) {
            expect(err).to.not.be.null
            expect(err).instanceof(DataPeps.Error)
            expect(err.kind).equal(DataPeps.ServerError.IdentityNotFound)
            return
        }
        throw new Error("should throw an error")
    })


    it('After overwriteKeys Bob can still access the resource of group', async () => {
        let res = await bobSession.Resource.get(groupRes.id, { assume: group.login });
        expect(res).to.be.deep.equal(groupRes);
    })

    it('After overwriteKeys delegate identity is in access group of alice in v2 (without access to v1) but group identity stays in v1 (locked)', async () => {
        let accessGroup = await aliceSession.Identity.getAccessGroup(alice.login);
        expect(accessGroup.length).to.be.equal(2);

        let delegateEl = accessGroup.filter(el => el.id.login == aliceDelegate.login)[0];
        expect(delegateEl.id.version).to.be.equal(2);
        expect(delegateEl.locked).to.be.equal(false);

        let groupEl = accessGroup.filter(el => el.id.login == group.login)[0];
        expect(groupEl.id.version).to.be.equal(1);
        expect(groupEl.locked).to.be.equal(true);

    })

    it('After overwriteKeys Alice delegate can access to newly created resources', async () => {
        let newCreatedRes = await aliceDelegateSession.Resource.create("test/A", null, [aliceDelegate.login])

        let res = await aliceDelegateSession.Resource.get(newCreatedRes.id);
        expect(res).to.be.deep.equal(newCreatedRes);

        res = await aliceSession.Resource.get(newCreatedRes.id, { assume: aliceDelegate.login });
        expect(res).to.be.deep.equal(newCreatedRes);
    })
})