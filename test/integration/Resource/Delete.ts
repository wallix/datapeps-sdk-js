import * as Config from '../../Config'
import * as DataPeps from '../../../src/DataPeps'
import * as nacl from 'tweetnacl'
import { expect } from 'chai'
import * as mocha from 'mocha'
import * as Long from 'long'

function checkFetchedResource(
    resourceFetched: DataPeps.Resource<{}>,
    resourceExpected: DataPeps.Resource<{}>,
    encryptedContent: Uint8Array,
    expectedContent: Uint8Array) {
        expect(resourceFetched).to.not.be.null
        expect(resourceFetched.id).to.be.deep.equals(resourceExpected.id)
        expect(resourceFetched.payload)
            .to.be.deep.equals(resourceExpected.payload)
        let decryptedContent = resourceFetched.decrypt(encryptedContent)
        expect(decryptedContent).to.not.be.null
        expect(decryptedContent).to.be.deep.equals(expectedContent)
}

function checkResourceNotFoundError(err,
    resourceId: DataPeps.ID, errorOccurred: {isTrue: boolean}) {
        expect(err).to.not.be.null
        expect(err).instanceof(DataPeps.Error)
        expect(err.kind).equal(DataPeps.ServerError.ResourceNotFound)
        expect(err.payload.id).to.be.deep.equals(resourceId)
        errorOccurred.isTrue = true
}

describe('Resource.delete', () => {
    let seed = Math.floor(Math.random() * 99999)

    let aliceSecret = nacl.randomBytes(128)
    let alice: DataPeps.IdentityFields = {
        login: "alice." + seed + "@peps.test",
        name: "alice test identity, TS",
        kind: "user",
        payload: null,
    }

    let bobSecret = nacl.randomBytes(128)
    let bob: DataPeps.IdentityFields = {
        login: "bob." + seed + "@peps.test",
        name: "alice test identity, TS",
        kind: "user",
        payload: null,
    }

    let aliceChildSecret = nacl.randomBytes(128)
    let aliceChild: DataPeps.IdentityFields = {
        login: "aliceChild." + seed + "@peps.test",
        name: "aliceChild test identity, TS",
        kind: "user",
        payload: null,
    }

    let aliceSession: DataPeps.Session,
        bobSession: DataPeps.Session,
        aliceChildSession: DataPeps.Session

    let resourceA: DataPeps.Resource<any>,
        resourceB: DataPeps.Resource<any>,
        resourceC: DataPeps.Resource<any>,
        resourceD: DataPeps.Resource<any>

    let resourceAContent: Uint8Array,
        resourceBContent: Uint8Array,
        resourceCContent: Uint8Array,
        resourceDContent: Uint8Array

    let resourceAEncryptedContent: Uint8Array,
        resourceBEncryptedContent: Uint8Array,
        resourceCEncryptedContent: Uint8Array,
        resourceDEncryptedContent: Uint8Array

    let randomResourceId: number
    let randomResourceIdLong: Long
    
    before(async() => {
        await Config.init()
        await DataPeps.register(alice, aliceSecret)
        await DataPeps.register(bob, bobSecret)
        aliceSession = await DataPeps.login(alice.login, aliceSecret)
        await aliceSession.Identity.create(aliceChild,
            {secret: aliceChildSecret, sharingGroup: [bob.login]})
        bobSession = await DataPeps.login(bob.login, bobSecret)
        aliceChildSession =
            await DataPeps.login(aliceChild.login, aliceChildSecret)
        
        let textEncoder = new TextEncoder()
        resourceA = await aliceChildSession.Resource.create(
            "test kind",
            { text: "payload A" },
            [aliceChild.login, alice.login, bob.login])
        resourceB = await aliceChildSession.Resource.create(
            "test kind",
            { text: "payload B" },
            [aliceChild.login, alice.login])
        resourceC = await aliceChildSession.Resource.create(
            "test kind",
            { text: "payload C" },
            [aliceChild.login, alice.login])
        resourceD = await aliceChildSession.Resource.create(
            "test kind",
            { text: "payload D" },
            [aliceChild.login, alice.login, bob.login])

        resourceAContent = textEncoder.encode("Content A")
        resourceBContent = textEncoder.encode("Content B")
        resourceCContent = textEncoder.encode("Content C")
        resourceDContent = textEncoder.encode("Content D")
        
        resourceAEncryptedContent = resourceA.encrypt(resourceAContent)
        resourceBEncryptedContent = resourceB.encrypt(resourceBContent)
        resourceCEncryptedContent = resourceC.encrypt(resourceCContent)
        resourceDEncryptedContent = resourceD.encrypt(resourceDContent)

        randomResourceId = Math.floor(Math.random() * 9999999)

        let low = Math.floor(Math.random() * 9999999999)
        let high = Math.floor(Math.random() * 9999999999)
        randomResourceIdLong = new Long(low, high, true)
    })

    it("A sharer cannot hard delete the resource A", async() => {
        let resourceAlice = await aliceSession.Resource.get(resourceA.id)
        checkFetchedResource(resourceAlice, resourceA,
            resourceAEncryptedContent, resourceAContent)

        let errorOccurred = {isTrue: false}
        try {
            await aliceSession.Resource.delete(resourceA.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceA.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true
        
        errorOccurred.isTrue = false
        try {
            await aliceSession.Resource.delete(resourceA.id, {soft: false})
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceA.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        let resourceBob = await bobSession.Resource.get(resourceA.id)
        checkFetchedResource(resourceBob, resourceA,
            resourceAEncryptedContent, resourceAContent)
    })

    it ("A sharer of the resource owner cannot hard-delete the resource A", async() => {
        let resourceBob = await bobSession.Resource.get(resourceA.id)
        checkFetchedResource(resourceBob, resourceA,
            resourceAEncryptedContent, resourceAContent)
        
        let errorOccurred = {isTrue: false}
        try {
            await bobSession.Resource.delete(resourceA.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceA.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true
        
        errorOccurred.isTrue = false
        try {
            await bobSession.Resource.delete(resourceA.id, {soft: false})
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceA.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        let resourceAlice = await aliceSession.Resource.get(resourceA.id)
        checkFetchedResource(resourceAlice, resourceA,
            resourceAEncryptedContent, resourceAContent)
    })

    it ("After failing to delete the resource A, the sharer can still access it", async() => {
        let resourceBob = await bobSession.Resource.get(resourceA.id)
        checkFetchedResource(resourceBob, resourceA,
            resourceAEncryptedContent, resourceAContent)

        let errorOccurred = {isTrue: false}
        try {
            await bobSession.Resource.delete(resourceA.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceA.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true
        
        errorOccurred.isTrue = false
        try {
            await bobSession.Resource.delete(resourceA.id, {soft: false})
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceA.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        resourceBob = await bobSession.Resource.get(resourceA.id)
        checkFetchedResource(resourceBob, resourceA,
            resourceAEncryptedContent, resourceAContent)
    })

    it("A sharer can soft delete the resource A", async() => {
        let resourceAlice = await aliceSession.Resource.get(resourceA.id)
        checkFetchedResource(resourceAlice, resourceA,
            resourceAEncryptedContent, resourceAContent)

        await aliceSession.Resource.delete(resourceA.id, {soft: true})

        let errorOccurred = {isTrue: false}
        try {
            await aliceSession.Resource.get(resourceA.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceA.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        let resourceBob = await bobSession.Resource.get(resourceA.id)
        checkFetchedResource(resourceBob, resourceA,
            resourceAEncryptedContent, resourceAContent)
    })

    it("The owner can hard delete the resource A", async() => {
        let resourceAliceChild = await aliceChildSession.Resource.get(
            resourceA.id)
        checkFetchedResource(resourceAliceChild, resourceA,
            resourceAEncryptedContent, resourceAContent)   

        await aliceChildSession.Resource.delete(resourceA.id)

        let errorOccurred = {isTrue: false}
        try {
            let resource =
                await aliceChildSession.Resource.get(resourceA.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceA.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        errorOccurred.isTrue = false
        try {
            let resource =
                await bobSession.Resource.get(resourceA.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceA.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true
    })

    it("An identity cannot soft-delete the resource B, that was not shared with it", async() => {
        let errorOccurred = {isTrue: false}
        try {
            let resourceBob = await bobSession.Resource.get(resourceB.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceB.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        errorOccurred.isTrue = false
        try {
            await bobSession.Resource.delete(resourceB.id, {soft: true})
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceB.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        let resourceAliceChild = await aliceChildSession.Resource.get(
            resourceB.id)
        checkFetchedResource(resourceAliceChild, resourceB,
            resourceBEncryptedContent, resourceBContent) 
    })

    it("An identity cannot hard-delete the resource B, that was not shared with it", async() => {
        let errorOccurred = {isTrue: false}
        try {
            let resourceBob = await bobSession.Resource.get(resourceB.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceB.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        errorOccurred.isTrue = false
        try {
            await bobSession.Resource.delete(resourceB.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceB.id,errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        errorOccurred.isTrue = false
        try {
            await bobSession.Resource.delete(resourceB.id, {soft: false})
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceB.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        let resourceAliceChild = await aliceChildSession.Resource.get(
            resourceB.id)
        checkFetchedResource(resourceAliceChild, resourceB,
            resourceBEncryptedContent, resourceBContent) 
    })

    it("When the owner soft deletes the resource B, the sharing group can still access it", async() => {
        let resourceAliceChild = await aliceChildSession.Resource.get(
            resourceB.id)
        checkFetchedResource(resourceAliceChild, resourceB,
            resourceBEncryptedContent, resourceBContent) 

        await aliceChildSession.Resource.delete(resourceB.id, {soft: true})
        
        let errorOccurred = {isTrue: false}
        try {
            let resource =
                await aliceChildSession.Resource.get(resourceB.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceB.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        let resourceAlice = await aliceSession.Resource.get(resourceB.id)
        checkFetchedResource(resourceAlice, resourceB,
            resourceBEncryptedContent, resourceBContent) 
    })

    it ("The owner can hard-delete the resource B, without being in the resource's sharing group", async() => {
        let resourceAlice = await aliceSession.Resource.get(resourceB.id)
        checkFetchedResource(resourceAlice, resourceB,
            resourceBEncryptedContent, resourceBContent) 
        
        let errorOccurred = {isTrue: false}
        try {
            let resource = await aliceChildSession.Resource.get(resourceB.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceB.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true
        
        await aliceChildSession.Resource.delete(resourceB.id)

        errorOccurred.isTrue = false
        try {
            let resource = await aliceChildSession.Resource.get(resourceB.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceB.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        errorOccurred.isTrue = false
        try {
            let resource = await aliceSession.Resource.get(resourceB.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceB.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true
    })

    it ("The owner can hard-delete the resource C, by passing false as the \"soft\" option", async() => {
        let resourceAlice = await aliceSession.Resource.get(resourceC.id)
        checkFetchedResource(resourceAlice, resourceC,
            resourceCEncryptedContent, resourceCContent) 
        
        await aliceChildSession.Resource.delete(resourceC.id, {soft: false})

        let errorOccurred = {isTrue: false}
        try {
            let resource = await aliceChildSession.Resource.get(resourceC.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceC.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        errorOccurred.isTrue = false
        try {
            resourceAlice = await aliceSession.Resource.get(resourceC.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceC.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true
    })

    it("The owner can soft-delete the resource D after renewing the key", async() => {
        aliceChildSession.renewKeys()

        let resourceAliceChild =
            await aliceChildSession.Resource.get(resourceD.id)
        checkFetchedResource(resourceAliceChild, resourceD,
            resourceDEncryptedContent, resourceDContent) 

        await aliceChildSession.Resource.delete(resourceD.id, {soft: true})
        
        let errorOccurred = {isTrue: false}
        try {
            let resource =
                await aliceChildSession.Resource.get(resourceD.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceD.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        let resourceAlice = await aliceSession.Resource.get(resourceD.id)
        checkFetchedResource(resourceAlice, resourceD,
            resourceDEncryptedContent, resourceDContent)
    })

    it("A sharer can soft-delete the resource D after renewing the key", async() => {
        aliceSession.renewKeys()

        let resourceAlice =
            await aliceSession.Resource.get(resourceD.id)
        checkFetchedResource(resourceAlice, resourceD,
            resourceDEncryptedContent, resourceDContent)

        await aliceSession.Resource.delete(resourceD.id, {soft: true})

        let errorOccurred = {isTrue: false}
        try {
            let resource =
                await aliceChildSession.Resource.get(resourceAlice.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceD.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true

        let resourceBob = await bobSession.Resource.get(resourceD.id)
        checkFetchedResource(resourceBob, resourceD,
            resourceDEncryptedContent, resourceDContent)
    })

    it("The owner can hard-delete the resource D after renewing the key", async() => {
        let resourceBob = await bobSession.Resource.get(resourceD.id)
        checkFetchedResource(resourceBob, resourceD,
            resourceDEncryptedContent, resourceDContent)
        
        aliceChildSession.renewKeys()

        await aliceChildSession.Resource.delete(resourceD.id)
        
        let errorOccurred = {isTrue: false}
        try {
            let resourceBob = await bobSession.Resource.get(resourceD.id)
        }
        catch(err) {
            checkResourceNotFoundError(err, resourceD.id, errorOccurred)
        }
        expect(errorOccurred.isTrue).to.be.true
    })

    it("The server returns ResourceNotFound error, when a user tries to delete an inexistant resource", async() => {
        let errorOccurred = {isTrue: false}
        for (let i = 0; i < 2; i++) {
            try {
                await aliceSession.Resource.get(randomResourceId)
            }
            catch(err) {
                let randomResourceIdLong = new Long(randomResourceId, 0, true)
                checkResourceNotFoundError(err, randomResourceIdLong,
                    errorOccurred)
            }
            expect(errorOccurred.isTrue).to.be.true
            errorOccurred.isTrue = false
        }

        errorOccurred.isTrue = false
        for (let i = 0; i < 2; i++) {
            try {
                await aliceSession.Resource.get(randomResourceIdLong)
            }
            catch(err) {
                checkResourceNotFoundError(err, randomResourceIdLong,
                    errorOccurred)
            }
            expect(errorOccurred.isTrue).to.be.true
            errorOccurred.isTrue = false
        }
    })
})