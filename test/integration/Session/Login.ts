import * as Config from '../../Config';
import * as DataPeps from '../../../src/DataPeps';
import * as nacl from 'tweetnacl';
import { expect, assert } from 'chai';

/**
 * This test is about testing of the funtion DataPeps.login
 */
describe('Session.Login', () => {
    let seed = Math.floor(Math.random() * 99999)

    let aliceSecret = nacl.randomBytes(128)
    let alice: DataPeps.IdentityFields = {
        login: "alice." + seed + "@peps.test",
        name: "alice test identity, TS",
        kind: "user",
        payload: null,
    }

    let anotherSecret = nacl.randomBytes(128)
    let another: DataPeps.IdentityFields = {
        login: "another." + seed + "@peps.test",
        name: "another test identity, TS",
        kind: "user",
        payload: null,
    }

    // Register and login alice
    let aliceSession: DataPeps.Session
    before(async () => {
        await Config.init()
        await DataPeps.register(alice, aliceSecret)
        await DataPeps.register(another, anotherSecret)
    })

    function checkAliceSession(session: DataPeps.Session) {
        expect(aliceSession).to.be.not.null
        expect(aliceSession.login).to.be.equals(alice.login)
    }

    it('check alice can login after register', async () => {
        aliceSession = await DataPeps.login(alice.login, aliceSecret)
        checkAliceSession(aliceSession)
    })

    it('check alice can login after renew its keys', async () => {
        await aliceSession.renewKeys()
        aliceSession = await DataPeps.login(alice.login, aliceSecret)
        checkAliceSession(aliceSession)
    })

    it('check alice can login after she has changed her password', async () => {
        aliceSecret = nacl.randomBytes(128)
        await aliceSession.renewKeys(aliceSecret)
        aliceSession = await DataPeps.login(alice.login, aliceSecret)
        checkAliceSession(aliceSession)
    })

    it('check alice can login after an administrator has overwrite her keys', async () => {
        aliceSecret = nacl.randomBytes(128)
        let adminSession = await Config.adminLogin()
        await adminSession.Admin.overwriteKeys(alice.login, aliceSecret)
        aliceSession = await DataPeps.login(alice.login, aliceSecret)
        checkAliceSession(aliceSession)
    })


    it('check alice can login after an identity of its sharing group has changed her password', async () => {
        aliceSession.Identity.extendSharingGroup(aliceSession.login, [another.login])
        let anotherSession = await DataPeps.login(another.login, anotherSecret)
        aliceSecret = nacl.randomBytes(128)
        await anotherSession.Identity.renewKeys(aliceSession.login, aliceSecret)
        aliceSession = await DataPeps.login(alice.login, aliceSecret)
        checkAliceSession(aliceSession)
    })

    it('check error when we try to login with a unexisting login', async () => {
        let login = "unknown@unkown.xxx"
        try {
            await DataPeps.login(login, new Uint8Array(1))
        } catch (err) {
            expect(err).instanceof(DataPeps.Error)
            expect(err.kind).to.be.equals(DataPeps.ServerError.IdentityNotFound)
            expect(err.payload.login).to.be.deep.equals(login)
            return
        }
        throw new Error("login with a unknow identity");
    })

    it('check error when we try to login with a wrong password', async () => {
        try {
            await DataPeps.login(alice.login, new Uint8Array(1))
        } catch (err) {
            expect(err).instanceof(DataPeps.Error)
            expect(err.kind).to.be.equals(DataPeps.SDKError.BadSecret)
            return
        }
        throw new Error("login with a wrong password");
    })
})