# DataPeps SDK

This repository contains the source for the DataPeps SDK for JavaScript (written in TypeScript), released under the Apache License. 

[DataPeps](https://datapeps.com) is an [End-to-End Encryption](https://en.wikipedia.org/wiki/End-to-end_encryption) platform. By integrating this  SDK in your application, you can encrypt resources on clients (web, mobile, ...) to store and share data securely. For you, as a developer, one of the main benefits is that the cryptography implementation is foolproof and you don't need any knowledge of cryptography.

## Getting started

The simplest way to get started is to add DataPeps SDK, using your favourite package manager.

With `npm`, go to your project directory and run:

```bash
npm install datapeps-sdk --save
```

If you prefer `yarn`, go to your project directory and run:

```bash
yarn add datapeps-sdk
```

Once installed, just add the following line to your code to import the DataPeps SDK:

```typescript
import * as DataPeps from 'datapeps-sdk';
```

If you plan to use DataPeps with Node.js (for testing with [Mocha](https://mochajs.org/) for instance), please read more about dependencies [in the wiki](https://github.com/wallix/datapeps-sdk-js/wiki/Setting-up#using-the-sdk-with-nodejs).

## Hello, DataPeps!

Say there are two friends, Alice and Bob. Alice wants to send a picture to Bob; however, Alice is quite rather concerned about data security (good for her!), and she wants to ensure, that only Bob can eventually read the picture. DataPeps to the rescue!

With DataPeps, Alice encrypts the message like this:

```javascript
async function aliceSend() {
    let aliceSession = await DataPeps.login(aliceLogin, alicePassword);
    let resource = await aliceSession.Resource.create("text", "", [bobLogin]);
    let messageToBob = "Hello, Bob!";
    let encryptedMessage = resource.encrypt(new TextEncoder().encode(messageToBob));
    console.log("Alice sent a message: \"" + messageToBob + "\"");
    return [resource.id, encryptedMessage];
}
```

and Bob decrypts the message like this:

```javascript
async function bobReceive(resourceId, encryptedMessage) {
    let bobSession = await DataPeps.login(bobLogin, bobPassword);
    let resource = await bobSession.Resource.get(resourceId);
    let decryptedMessage = resource.decrypt(encryptedMessage);
    let messageToBob = new TextDecoder().decode(decryptedMessage);
    console.log("Bob received message: \"" + messageToBob + "\"");
}
```

If you want a detailed explanation of the code above, look it up [in the wiki](https://github.com/wallix/datapeps-sdk-js/wiki/Setting-up#hello-datapeps).

Want to try asap? Here is a [complete Gist](https://gist.github.com/hbi-wallix/2229fec260f8670de5657628ef28e522).

## Learn more

DataPeps is written by the Innovation Department at [WALLIX](https://wallix.com). 

- [Website](https://datapeps.com)
- [Twitter](https://twitter.com/DataPeps_WALLIX)