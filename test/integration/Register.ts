import * as Config from '../Config'
import * as DataPeps from '../../src/DataPeps'
import * as nacl from 'tweetnacl'
import { expect } from 'chai'

describe('Register', () => {
    let sdk = Config.sdk
    let adminSession: DataPeps.Session
    before(done => {
        Config.init().then(() => {
            return Config.adminLogin()
        }).then(session => {
            adminSession = session
            done()
        }).catch(done)
    })
    let seed = Math.floor(Math.random() * 99999)
    let domain = "toto" + seed + ".test"
    let normanSecret = nacl.randomBytes(128)
    let norman: DataPeps.Identity<Uint8Array> = {
        login: "normanscaife" + seed + "@" + domain,
        name: "norman test identity, TS",
        admin: false,
        active: true,
        kind: "user",
        created: new Date(),
        payload: new TextEncoder().encode(JSON.stringify({
            firstname: "Norman",
            lastname: "TypeScript",
            tel: "+44712345678"
        }))
    }


    it('request a register link', async () => {
        await sdk.sendRegisterLink(norman.login)
    })

    var token: Uint8Array
    it('admin get registered links', async () => {
        let links = await adminSession.Admin.listRegisterTokens({ domain })
        expect(links).to.not.be.null
        var exists = false
        let link = links.find(({ email }) => {
            return email == norman.login
        })
        expect(link).to.not.be.null
        expect(link.status).equal(DataPeps.RegisterTokenStatus.SENT)
        token = link.token
    })

    it('get registered link token', async () => {
        let email = await sdk.getRegisteredEmail(token)
        expect(email).to.not.be.null
        expect(email).equals(norman.login)
    })


    it('call registration endpoint', async () => {
        await sdk.registerWithToken(token, norman, normanSecret)
    })

    let normanSession: DataPeps.Session
    it('login', async () => {
        normanSession = await sdk.login(norman.login, normanSecret)
        expect(normanSession).to.not.be.null
    })
})

