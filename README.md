To start working with DataPeps, you need to add DataPeps SDK to your project.

## Using a package manager

The simplest way to get started, is to add DataPeps SDK, using your favourite package manager.

### npm

Go to your project directory and run:

```bash
npm install datapeps-sdk
```

### yarn

Go to your project directory and run:

```bash
yarn add datapeps-sdk
```

## Instantiation of DataPeps SDK

Just add the following line to your code to import the DataPeps SDK:

```typescript
import * as DataPeps from 'datapeps-sdk';
```

## Using the SDK with Node.js

When using DataPeps SDK with [Node.js](https://nodejs.org/) (on backend or if testing with [Mocha](https://mochajs.org/)), you need to add the following packages:
* [@types/text-encoding](https://www.npmjs.com/package/@types/text-encoding)
* [atob](https://www.npmjs.com/package/atob)
* [btoa](https://www.npmjs.com/package/btoa)
* [text-encoding](https://www.npmjs.com/package/text-encoding)
* [ws](https://www.npmjs.com/package/ws)
* [xhr2](https://www.npmjs.com/package/xhr2)

The components above are supported by browsers, but when calling DataPeps API on backend, you need to add them to the project manually along with a couple of lines to configure their usage. We'll show how to do it [further](#adding-dependencies-for-nodejs).

## Hello, DataPeps!

Let's have a glimpse at how exactly DataPeps simplifies cryptography for a developer.

Say there are two friends, Alice and Bob. Alice wants to send a message to Bob; however, Alice is quite rather concerned about data security (good for her!), and she wants to ensure, that only Bob can eventually read the picture. DataPeps to the rescue!

With DataPeps Alice encrypts the message like this:

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

Short and awesome! Now, let's discuss it a bit.

Suppose, Alice and Bob are already registered with DataPeps (we cover the case when they are not a bit [further](#identity-registration)). First of all, Alice needs to [establish a session](Session#session-establishment) with DataPeps server:

```javascript
let aliceSession = await DataPeps.login(aliceLogin, alicePassword);
```
Now, as Alice wants that only Bob reads a message, she needs to encrypt it for Bob (and just for him). For this Alice [creates](Resource#creating-a-resource) "[a resource](Resource)":

```javascript
let resource = await aliceSession.Resource.create("text", "", [bobLogin]);
```

Last, Alice encrypts the message:

```javascript
let messageToBob = "Hello, Bob!";
let encryptedMessage = resource.encrypt(new TextEncoder().encode(messageToBob));
```

Alice sends Bob the encrypted message and the resource's ID:

```javascript
console.log("Alice sent message: \"" + messageToBob + "\"");
return [resource.id, encryptedMessage];
```

When Bob wants to decrypt the message received from Alice, he establishes the session (as Alice did before) and fetches the resource, created by Alice from the DataPeps server, using the resource id:

```javascript
let bobSession = await DataPeps.login(bobLogin, bobPassword);
let resource = await bobSession.Resource.get(resourceId);
```

Bob can now decrypt the message:

```javascript
let decryptedMessage = resource.decrypt(encryptedMessage);
let messageToBob = new TextDecoder().decode(decryptedMessage);
console.log("Bob received a message: \"" + messageToBob + "\"");
```

### Adding dependencies for Node.js

We will use Node.js to run the resulting code, so we will need to satisfy all the relevant [dependencies](#using-the-sdk-with-nodejs):

```javascript
var DataPeps = require("datapeps-sdk");

global["TextEncoder"] = require('text-encoding').TextEncoder;
global["TextDecoder"] = require('text-encoding').TextDecoder;
global["XMLHttpRequest"] = require('xhr2');
global["WebSocket"] = require('ws');
global["btoa"] = require('btoa');
global["atob"] = require('atob');
```

We also need to specify the IP address of the DataPeps service:

```javascript
DataPeps.configure("https://" + process.env.PEPSCRYPTO_HOST);
```

## "Hello, DataPeps" code

Here is the complete example:

<details>
  <summary>
    Show code
  </summary>

```javascript
var DataPeps = require("datapeps-sdk");

global["TextEncoder"] = require('text-encoding').TextEncoder;
global["TextDecoder"] = require('text-encoding').TextDecoder;
global["XMLHttpRequest"] = require('xhr2');
global["WebSocket"] = require('ws');
global["btoa"] = require('btoa');
global["atob"] = require('atob');

DataPeps.configure("https://" + process.env.PEPSCRYPTO_HOST);

let aliceLogin = "aliceliddell@peps.test",
    bobLogin = "bobmorane@peps.test";

let alicePassword = "aliceP@ssw0rd",
    bobPassword = "bobP@ssw0rd";

async function aliceSend() {
    let aliceSession = await DataPeps.login(aliceLogin, alicePassword);
    let resource = await aliceSession.Resource.create("text", "", [bobLogin]);
    let messageToBob = "Hello, Bob!";
    let encryptedMessage = resource.encrypt(new TextEncoder().encode(messageToBob));
    console.log("Alice sent a message: \"" + messageToBob + "\"");
    return [resource.id, encryptedMessage];
}

async function bobReceive(resourceId, encryptedMessage) {
    let bobSession = await DataPeps.login(bobLogin, bobPassword);
    let resource = await bobSession.Resource.get(resourceId);
    let decryptedMessage = resource.decrypt(encryptedMessage);
    let messageToBob = new TextDecoder().decode(decryptedMessage);
    console.log("Bob received a message: \"" + messageToBob + "\"");
}

async function main() {
    var [resourceId, encryptedMessage] = await aliceSend();
    await bobReceive(resourceId, encryptedMessage);
}

main().catch((_) => process.stdout.write("An error has occurred\n"));
```

</details>
<br>
Finally, create the following *package.json* in the project directory:

```json
{
    "name": "hello-datapeps",
    "version": "0.0.1",
    "main": "hello-datapeps.js",
    "scripts": {
        "start": "node hello-datapeps.js"
    },
    "dependencies": {
        "datapeps-sdk": "^0.0.5",
        "@types/text-encoding": "0.0.31",
        "atob": "^2.0.3",
        "btoa": "^1.1.2",
        "text-encoding": "^0.6.4",
        "ws": "^3.3.2",
        "xhr2": "^0.1.4"
    }
}
```

Run the code:

```bash
npm install && node hello-datapeps.js
```

If you use yarn instead of npm, run:

```bash
yarn install && node run hello-datapeps.js
```
