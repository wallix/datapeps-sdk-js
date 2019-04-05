"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nacl = require("tweetnacl");
var Error_1 = require("./Error");
var Tools_1 = require("./Tools");
var CipherType;
(function (CipherType) {
    CipherType[CipherType["NACL_SES"] = 0] = "NACL_SES";
    CipherType[CipherType["NACL_ANON"] = 1] = "NACL_ANON";
})(CipherType = exports.CipherType || (exports.CipherType = {}));
/////////////////////////////////////////////////
// Anonymous
/////////////////////////////////////////////////
var EncryptAnonymous = /** @class */ (function () {
    function EncryptAnonymous() {
    }
    EncryptAnonymous.prototype.encrypt = function (publicKey, message) {
        var nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
        var keypair = nacl.box.keyPair();
        message = nacl.box(message, nonce, publicKey.box, keypair.secretKey);
        return { nonce: nonce, message: Tools_1.Uint8Tool.concat(keypair.publicKey, message) };
    };
    return EncryptAnonymous;
}());
exports.EncryptAnonymous = EncryptAnonymous;
var DecryptAnonymous = /** @class */ (function () {
    function DecryptAnonymous(secretKey) {
        this.secretKey = secretKey;
    }
    DecryptAnonymous.decrypt = function (secretKey, cipher) {
        var publicKey = cipher.message.slice(0, nacl.box.publicKeyLength);
        var message = cipher.message.slice(nacl.box.publicKeyLength);
        var result = nacl.box.open(message, cipher.nonce, publicKey, secretKey);
        if (result == null) {
            throw new Error_1.Error({ kind: Error_1.SDKKind.DecryptFail });
        }
        return result;
    };
    DecryptAnonymous.prototype.decrypt = function (cipher) {
        return DecryptAnonymous.decrypt(this.secretKey, cipher);
    };
    DecryptAnonymous.decryptList = function (secretKey, ciphers) {
        return ciphers.reduce(function (secretKey, cipher) { return DecryptAnonymous.decrypt(secretKey, cipher); }, secretKey);
    };
    DecryptAnonymous.prototype.decryptList = function (ciphers) {
        return DecryptAnonymous.decryptList(this.secretKey, ciphers);
    };
    return DecryptAnonymous;
}());
exports.DecryptAnonymous = DecryptAnonymous;
/////////////////////////////////////////////////
// Sign Encrypt Sign
/////////////////////////////////////////////////
var EncryptSES = /** @class */ (function () {
    function EncryptSES(boxSecretKey, signSecretKey) {
        this.boxSecretKey = boxSecretKey;
        this.signSecretKey = signSecretKey;
    }
    EncryptSES.prototype.encrypt = function (publicKey, message) {
        var nonce = nacl.randomBytes(nacl.box.nonceLength);
        var msgSign = nacl.sign(message, this.signSecretKey);
        var cipher = nacl.box(msgSign, nonce, publicKey.box, this.boxSecretKey);
        return { nonce: nonce, message: nacl.sign(cipher, this.signSecretKey) };
    };
    return EncryptSES;
}());
exports.EncryptSES = EncryptSES;
var DecryptSES = /** @class */ (function () {
    function DecryptSES(secretKey) {
        this.secretKey = secretKey;
    }
    DecryptSES.decrypt = function (secretKey, _a) {
        var message = _a.message, nonce = _a.nonce, sign = _a.sign;
        var cipher = nacl.sign.open(message, sign.sign);
        if (cipher == null) {
            throw new Error_1.Error({
                kind: Error_1.SDKKind.DecryptFail,
                payload: { kind: "VerifyCipherText", cipher: { cipher: cipher, nonce: nonce, sign: sign } }
            });
        }
        var signedMsg = nacl.box.open(cipher, nonce, sign.box, secretKey);
        if (signedMsg == null) {
            throw new Error_1.Error({
                kind: Error_1.SDKKind.DecryptFail,
                payload: { kind: "DecryptCipherText", cipher: { cipher: cipher, nonce: nonce, sign: sign } }
            });
        }
        var msg = nacl.sign.open(signedMsg, sign.sign);
        if (msg == null) {
            throw new Error_1.Error({
                kind: Error_1.SDKKind.DecryptFail,
                payload: { kind: "VerifyText", cipher: { cipher: cipher, nonce: nonce, sign: sign } }
            });
        }
        return msg;
    };
    DecryptSES.prototype.decrypt = function (cipher) {
        return DecryptSES.decrypt(this.secretKey, cipher);
    };
    DecryptSES.decryptList = function (secretKey, ciphers) {
        return ciphers.reduce(function (secretKey, cipher) { return DecryptSES.decrypt(secretKey, cipher); }, secretKey);
    };
    DecryptSES.prototype.decryptList = function (ciphers) {
        return DecryptSES.decryptList(this.secretKey, ciphers);
    };
    return DecryptSES;
}());
exports.DecryptSES = DecryptSES;
//# sourceMappingURL=Cryptor.js.map