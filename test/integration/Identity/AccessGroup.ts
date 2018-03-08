import * as Config from '../../Config';
import * as DataPeps from '../../../src/DataPeps';
import * as nacl from 'tweetnacl';
import { expect } from 'chai';

describe('Identity.AccessGroup', () => {
    let seed = Math.floor(Math.random() * 99999)

    let aliceSecret = nacl.randomBytes(128)
    let alice: DataPeps.IdentityFields = {
        login: "alice." + seed + "@peps.test",
        name: "alice test identity, TS",
        kind: "user",
        payload: null,
    }

    function getOtherLogin(i: number) {
        return "other." + i + "." + seed + "@peps.test"
    }

    let nothers = 10
    let others = new Array(nothers).fill(0).map((x, i) => {
        return {
            login: getOtherLogin(i),
            name: "Other " + i,
            kind: "other",
            payload: null,
        }
    })

    // Register and login alice
    let aliceSession: DataPeps.Session
    before(async () => {
        await Config.init()
        await DataPeps.register(alice, aliceSecret)
        aliceSession = await DataPeps.login(alice.login, aliceSecret)
    })

    it('create others identities with alice in their sharingGroup', async () => {
        await Promise.all(others.map(other => {
            return aliceSession.Identity.create(
                other, { sharingGroup: [alice.login] },
            )
        }))
    })

    async function checkAliceAccessGroup() {
        let accessGroup = await aliceSession.Identity.getAccessGroup(alice.login)
        expect(accessGroup.length).to.be.equals(nothers)
        others.forEach(other => {
            let link = accessGroup.find((link) => link.id.login == other.login)
            expect(link).to.not.be.null
            expect(link.id.login).to.be.equal(other.login)
        })
    }

    it('checks alice accessGroup', async () => {
        await checkAliceAccessGroup()
    })

    it('checks alice accessGroup after renew alice keys', async () => {
        await aliceSession.renewKeys()
        await checkAliceAccessGroup()
    })

    it('checks alice accessGroup after renew others keys', async () => {
        await Promise.all(others.map((other) => {
            return aliceSession.Identity.renewKeys(other.login)
        }))
        await checkAliceAccessGroup()
    })
})