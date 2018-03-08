"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var nacl = require("tweetnacl");
var proto_1 = require("./proto");
var Error_1 = require("./Error");
var Tools_1 = require("./Tools");
var Encryption = /** @class */ (function (_super) {
    __extends(Encryption, _super);
    function Encryption(properties) {
        return _super.call(this, properties) || this;
    }
    Encryption.prototype.encrypt = function (type) {
        switch (type) {
            case proto_1.types.ResourceType.ANONYMOUS: return new EncryptAnonymous();
            case proto_1.types.ResourceType.SES: return new EncryptSES(this.boxKeyPair.secretKey, this.signKeyPair.secretKey);
        }
    };
    Encryption.prototype.decrypt = function (type, secretKey) {
        if (secretKey === void 0) { secretKey = this.boxKeyPair.secretKey; }
        switch (type) {
            case proto_1.types.ResourceType.ANONYMOUS: return new DecryptAnonymous(secretKey);
            case proto_1.types.ResourceType.SES: return new DecryptSES(secretKey);
        }
    };
    Encryption.prototype.getPublic = function () {
        return this;
    };
    Encryption.prototype.generate = function (secret, creator) {
        this.version = 1;
        this.secret = secret;
        this.generateMasterKey();
        this.generateKeys(creator);
    };
    Encryption.prototype.generateWithMasterPublicKey = function (publicKey, salt, creator) {
        if (publicKey != null && publicKey.length != 0) {
            this.masterKeyPair = { publicKey: publicKey, secretKey: null };
            this.masterSalt = salt;
            this.masterPublicKey = publicKey;
        }
        this.generate(null, creator);
    };
    Encryption.prototype.recoverWithKeys = function (keys, creator) {
        this.version = keys.version;
        this.sharingKeyPair = nacl.box.keyPair.fromSecretKey(keys.sharingKey);
        this.boxKeyPair = nacl.box.keyPair.fromSecretKey(keys.boxKey);
        this.signKeyPair = nacl.sign.keyPair.fromSecretKey(keys.signKey);
        this.readKeyPair = nacl.sign.keyPair.fromSecretKey(keys.readKey);
    };
    Encryption.prototype.recover = function (secret, creator) {
        this.secret = secret;
        // Recompute the master key
        this.generateMasterKey();
        // Recompute the sharing material
        try {
            this.sharingKeyPair = this.decryptKeyWithMasterKey(this.sharingEncrypted, creator);
        }
        catch (err) {
            if (err instanceof Error_1.Error && err.kind == Error_1.SDKKind.SDKDecryptFail) {
                throw new Error_1.Error({
                    kind: Error_1.SDKKind.SDKEncryptionDecryptFail,
                    payload: err
                });
            }
            throw err;
        }
        // Recompute the encryption material
        this.boxKeyPair = this.decryptKeyWithKey(proto_1.types.IdentityShareKind.SHARING, this.boxEncrypted, creator);
        // Recompute the signing material
        this.signKeyPair = this.decryptKeyWithKey(proto_1.types.IdentityShareKind.SHARING, this.signEncrypted, creator);
        this.readKeyPair = this.decryptKeyWithKey(proto_1.types.IdentityShareKind.BOX, this.readEncrypted, creator);
    };
    Encryption.prototype.generateMasterSalt = function () {
        if (this.masterSalt == null || this.masterSalt.length == 0) {
            this.masterSalt = nacl.randomBytes(16);
        }
    };
    Encryption.prototype.generateMasterKey = function () {
        if (this.secret != null) {
            this.generateMasterSalt();
            var masterKey = Tools_1.Crypto.PBKDF2(this.secret, this.masterSalt, 5000, nacl.secretbox.keyLength);
            this.masterKeyPair = nacl.box.keyPair.fromSecretKey(masterKey);
            this.masterPublicKey = this.masterKeyPair.publicKey;
        }
    };
    Encryption.prototype.generateKeys = function (creator) {
        // Create the cryptograĥic material
        this.sharingKeyPair = nacl.box.keyPair();
        this.boxKeyPair = nacl.box.keyPair();
        this.signKeyPair = nacl.sign.keyPair();
        this.readKeyPair = nacl.sign.keyPair();
        // Encrypt the cryptographic material
        this.sharingEncrypted = this.encryptKeyForMasterKey(this.sharingKeyPair, creator);
        this.boxEncrypted = this.encryptKeyForKey(proto_1.types.IdentityShareKind.SHARING, this.boxKeyPair, creator);
        this.signEncrypted = this.encryptKeyForKey(proto_1.types.IdentityShareKind.SHARING, this.signKeyPair, creator);
        this.readEncrypted = this.encryptKeyForKey(proto_1.types.IdentityShareKind.BOX, this.readKeyPair, creator);
    };
    Encryption.prototype.sign = function (msg) {
        return nacl.sign.detached(msg, this.signKeyPair.secretKey);
    };
    Encryption.prototype.encryptKey = function (kind, encryption, publicKey) {
        return encryption.encrypt(proto_1.types.ResourceType.SES).encrypt(publicKey, this.getSecretKey(kind));
    };
    Encryption.prototype.getPublicKey = function (kind) {
        switch (kind) {
            case proto_1.types.IdentityShareKind.BOX: return this.boxKeyPair.publicKey;
            case proto_1.types.IdentityShareKind.SHARING: return this.sharingKeyPair.publicKey;
        }
    };
    Encryption.prototype.getSecretKey = function (kind) {
        switch (kind) {
            case proto_1.types.IdentityShareKind.BOX: return this.boxKeyPair.secretKey;
            case proto_1.types.IdentityShareKind.SHARING: return this.sharingKeyPair.secretKey;
        }
    };
    Encryption.prototype.encryptKeyForMasterKey = function (_a, creator) {
        var publicKey = _a.publicKey, secretKey = _a.secretKey;
        if (this.masterKeyPair == null) {
            return { publicKey: publicKey, nonce: null, encryptedKey: null };
        }
        creator = creator == null ? this : creator;
        var _b = creator.encrypt(proto_1.types.ResourceType.SES).encrypt(this.masterKeyPair.publicKey, secretKey), message = _b.message, nonce = _b.nonce;
        return { nonce: nonce, publicKey: publicKey, encryptedKey: message };
    };
    Encryption.prototype.decryptKeyWithMasterKey = function (_a, creator) {
        var nonce = _a.nonce, publicKey = _a.publicKey, encryptedKey = _a.encryptedKey;
        var cipher = {
            nonce: nonce, sign: creator, message: encryptedKey
        };
        return {
            publicKey: publicKey,
            secretKey: this.decrypt(proto_1.types.ResourceType.SES, this.masterKeyPair.secretKey).decrypt(cipher)
        };
    };
    Encryption.prototype.encryptKeyForKey = function (kind, _a, creator) {
        var publicKey = _a.publicKey, secretKey = _a.secretKey;
        creator = creator == null ? this : creator;
        var _b = creator.encrypt(proto_1.types.ResourceType.SES).encrypt(this.getPublicKey(kind), secretKey), message = _b.message, nonce = _b.nonce;
        return { nonce: nonce, publicKey: publicKey, encryptedKey: message };
    };
    Encryption.prototype.decryptKeyWithKey = function (kind, _a, creator) {
        var nonce = _a.nonce, publicKey = _a.publicKey, encryptedKey = _a.encryptedKey;
        var cipher = {
            nonce: nonce, sign: creator, message: encryptedKey
        };
        return {
            publicKey: publicKey,
            secretKey: this.decrypt(proto_1.types.ResourceType.SES, this.getSecretKey(kind)).decrypt(cipher)
        };
    };
    return Encryption;
}(proto_1.types.IdentityEncryption));
exports.Encryption = Encryption;
/////////////////////////////////////////////////
// Anonymous
/////////////////////////////////////////////////
var EncryptAnonymous = /** @class */ (function () {
    function EncryptAnonymous() {
    }
    EncryptAnonymous.prototype.encrypt = function (publicKey, message) {
        var nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
        //console.log("encrypt anonymous", Base64.encode(nonce))
        var keypair = nacl.box.keyPair();
        message = nacl.box(message, nonce, publicKey, keypair.secretKey);
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
            throw new Error_1.Error({ kind: Error_1.SDKKind.SDKDecryptFail });
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
        var cipher = nacl.box(msgSign, nonce, publicKey, this.boxSecretKey);
        return { nonce: nonce, message: nacl.sign(cipher, this.signSecretKey) };
    };
    return EncryptSES;
}());
var DecryptSES = /** @class */ (function () {
    function DecryptSES(secretKey) {
        this.secretKey = secretKey;
    }
    DecryptSES.decrypt = function (secretKey, _a) {
        var message = _a.message, nonce = _a.nonce, sign = _a.sign;
        var cipher = nacl.sign.open(message, sign.sign);
        if (cipher == null) {
            throw new Error_1.Error({
                kind: Error_1.SDKKind.SDKDecryptFail,
                payload: { kind: "VerifyCipherText", cipher: { cipher: cipher, nonce: nonce, sign: sign } }
            });
        }
        var msgSign = nacl.box.open(cipher, nonce, sign.box, secretKey);
        if (msgSign == null) {
            throw new Error_1.Error({
                kind: Error_1.SDKKind.SDKDecryptFail,
                payload: { kind: "DecryptCipherText", cipher: { cipher: cipher, nonce: nonce, sign: sign } }
            });
        }
        var msg = nacl.sign.open(msgSign, sign.sign);
        if (msg == null) {
            throw new Error_1.Error({
                kind: Error_1.SDKKind.SDKDecryptFail,
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
//# sourceMappingURL=CryptoFuncs.js.map