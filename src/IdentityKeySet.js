"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var proto_1 = require("./proto");
var nacl = require("tweetnacl");
var Cryptor_1 = require("./Cryptor");
var Error_1 = require("./Error");
var Tools_1 = require("./Tools");
var api = proto_1.wallix.gopeps.protobuf.datapeps;
/**
 * The default length of the salt used to derivate the master key of an IdentityKeySet.
 */
var MASTER_KEY_SALT_LENGTH = 16;
var MasterPrivateSeed;
(function (MasterPrivateSeed) {
    function fromSecret(secret, masterSalt) {
        if (masterSalt === void 0) { masterSalt = nacl.randomBytes(MASTER_KEY_SALT_LENGTH); }
        var masterKey = Tools_1.Crypto.PBKDF2(Tools_1.Uint8Tool.convert(secret), masterSalt, 5000, nacl.secretbox.keyLength);
        return __assign({ masterSalt: masterSalt }, nacl.box.keyPair.fromSecretKey(masterKey));
    }
    MasterPrivateSeed.fromSecret = fromSecret;
})(MasterPrivateSeed = exports.MasterPrivateSeed || (exports.MasterPrivateSeed = {}));
/**
 * An IdentityKeySet is the cryptographic material of a version of a DataPeps Identity.
 */
var IdentityKeySet = /** @class */ (function () {
    function IdentityKeySet(id) {
        this.id = id;
    }
    /**
     * Generate a new IdentityKeySet.
     */
    IdentityKeySet.generate = function (id) {
        var keySet = new IdentityKeySet(id);
        keySet.sharingKeyPair = nacl.box.keyPair();
        keySet.boxKeyPair = nacl.box.keyPair();
        keySet.signKeyPair = nacl.sign.keyPair();
        keySet.readKeyPair = nacl.sign.keyPair();
        return keySet;
    };
    // TODO - Redesign this?
    IdentityKeySet.fromDelegatedKeys = function (keys) {
        var keySet = new IdentityKeySet({
            version: keys.version,
            login: keys.login
        });
        keySet.sharingKeyPair = nacl.box.keyPair.fromSecretKey(keys.sharingKey);
        keySet.boxKeyPair = nacl.box.keyPair.fromSecretKey(keys.boxKey);
        keySet.signKeyPair = nacl.sign.keyPair.fromSecretKey(keys.signKey);
        keySet.readKeyPair = nacl.sign.keyPair.fromSecretKey(keys.readKey);
        return keySet;
    };
    IdentityKeySet.prototype.toDelegatedKeys = function () {
        return {
            login: this.id.login,
            version: this.id.version,
            sharingKey: this.sharingKeyPair.secretKey,
            boxKey: this.boxKeyPair.secretKey,
            signKey: this.signKeyPair.secretKey,
            readKey: this.readKeyPair.secretKey
        };
    };
    /**
     * Export the IdentityKeySet in an encrypted form that can be safely transmitted.
     * @param creator The IdentityKeySet of the identity that exports.
     * @param seed An optional MasterSeed to export the sharing key.
     */
    IdentityKeySet.prototype.export = function (seed) {
        // Encrypt the sharingKey with the master seed
        var sharingEncrypted = seed == null || seed.publicKey == null || seed.publicKey.length == 0
            ? {
                publicKey: this.sharingKeyPair.publicKey,
                encryptedKey: null,
                nonce: null
            }
            : this.exportSharingKey(seed);
        // Encrypt the boxKey for sharingKey
        var boxEncrypted = this.exportKeyPairForKey(this.boxKeyPair, this.sharingKeyPair.publicKey);
        // Encrypt the signKey for sharingKey
        var signEncrypted = this.exportKeyPairForKey(this.signKeyPair, this.sharingKeyPair.publicKey);
        // Encrypt the readKey for boxKey
        var readEncrypted = this.exportKeyPairForKey(this.readKeyPair, this.boxKeyPair.publicKey);
        return {
            sharingEncrypted: sharingEncrypted,
            boxEncrypted: boxEncrypted,
            signEncrypted: signEncrypted,
            readEncrypted: readEncrypted
        };
    };
    // Export the sharing key for a master key
    IdentityKeySet.prototype.exportSharingKey = function (seed) {
        var _a = this.encryptor(Cryptor_1.CipherType.NACL_SES).encrypt({ box: seed.publicKey }, this.sharingKeyPair.secretKey), message = _a.message, nonce = _a.nonce;
        return {
            nonce: nonce,
            publicKey: this.sharingKeyPair.publicKey,
            encryptedKey: message
        };
    };
    // Export a key pair
    IdentityKeySet.prototype.exportKeyPairForKey = function (keyPair, publicKey) {
        var _a = this.encryptor(Cryptor_1.CipherType.NACL_SES).encrypt({ box: publicKey }, keyPair.secretKey), message = _a.message, nonce = _a.nonce;
        return { nonce: nonce, publicKey: keyPair.publicKey, encryptedKey: message };
    };
    /**
     * Recover an IdentityEncryptedKeySet thanks a master seed.
     * @param seed
     * @param encryptKeySet
     * @param creator
     */
    IdentityKeySet.recover = function (keySetID, seed, encryptKeySet) {
        var sign = __assign({}, keySetID, { sign: encryptKeySet.signEncrypted.publicKey, box: encryptKeySet.boxEncrypted.publicKey });
        // Decrypt the sharingKey with the master seed
        var sharingKeyPair;
        try {
            sharingKeyPair = nacl.box.keyPair.fromSecretKey(IdentityKeySet.decryptor(Cryptor_1.CipherType.NACL_SES, seed.secretKey).decrypt({
                nonce: encryptKeySet.sharingEncrypted.nonce,
                message: encryptKeySet.sharingEncrypted.encryptedKey,
                sign: sign
            }));
        }
        catch (err) {
            if (err instanceof Error_1.Error && err.kind == Error_1.SDKKind.DecryptFail) {
                throw new Error_1.Error({
                    kind: Error_1.SDKKind.IdentityInvalidKeySet,
                    payload: {
                        message: "IdentityKeySet cannot recover with the master seed",
                        error: err
                    }
                });
            }
            throw err;
        }
        // Decrypt the rest of the IdentityKeySet
        return IdentityKeySet.recoverWithEncryptedKeysFromSharingKey(keySetID, sharingKeyPair, encryptKeySet);
    };
    /**
     * Decrypt and set all the keys from a keySet that already have its sharingKeyPair initialized
     */
    IdentityKeySet.recoverWithEncryptedKeysFromSharingKey = function (id, sharingKeyPair, encryptedKeys) {
        var keySet = new IdentityKeySet(id);
        keySet.sharingKeyPair = sharingKeyPair;
        var sign = {
            login: id.login,
            version: id.version,
            sign: encryptedKeys.signEncrypted.publicKey,
            box: encryptedKeys.boxEncrypted.publicKey
        };
        try {
            // Decrypt the boxKey with the sharingKey
            keySet.boxKeyPair = nacl.box.keyPair.fromSecretKey(IdentityKeySet.decryptor(Cryptor_1.CipherType.NACL_SES, keySet.sharingKeyPair.secretKey).decrypt({
                message: encryptedKeys.boxEncrypted.encryptedKey,
                nonce: encryptedKeys.boxEncrypted.nonce,
                sign: sign
            }));
            // Decrypt the signKey with the sharingKey
            keySet.signKeyPair = nacl.sign.keyPair.fromSecretKey(IdentityKeySet.decryptor(Cryptor_1.CipherType.NACL_SES, keySet.sharingKeyPair.secretKey).decrypt({
                message: encryptedKeys.signEncrypted.encryptedKey,
                nonce: encryptedKeys.signEncrypted.nonce,
                sign: sign
            }));
            // Decrypt the readKey with the boxKey
            if (encryptedKeys.readEncrypted) {
                keySet.readKeyPair = nacl.sign.keyPair.fromSecretKey(IdentityKeySet.decryptor(Cryptor_1.CipherType.NACL_SES, keySet.boxKeyPair.secretKey).decrypt({
                    message: encryptedKeys.readEncrypted.encryptedKey,
                    nonce: encryptedKeys.readEncrypted.nonce,
                    sign: sign
                }));
            }
        }
        catch (err) {
            if (err instanceof Error_1.Error && err.kind == Error_1.SDKKind.DecryptFail) {
                throw new Error_1.Error({
                    kind: Error_1.SDKKind.IdentityInvalidKeySet,
                    payload: err
                });
            }
            throw err;
        }
        // Test that public keys used for the decryption are the same that
        // are well paired with the secret keys that has been decrypted.
        if (!Tools_1.Uint8Tool.equals(sign.box, keySet.boxKeyPair.publicKey) ||
            !Tools_1.Uint8Tool.equals(sign.sign, keySet.signKeyPair.publicKey)) {
            throw new Error_1.Error({
                kind: Error_1.SDKKind.IdentityInvalidKeySet,
                payload: { message: "IdentityKeySet is not self encrypted", id: id }
            });
        }
        return keySet;
    };
    /**
     * Share a specific key of the IdentityKeySet.
     * @param kind The key to share.
     * @param sharer The IdentityKeySet that do the sharing.
     * @param publicKey The IdentityPublicKey that is the target of the sharing.
     * @return An encryptedKey and the nonce that be used to encrypt the key.
     */
    IdentityKeySet.prototype.shareKey = function (kind, publicKey) {
        var _a = this.encryptor(Cryptor_1.CipherType.NACL_SES).encrypt(publicKey, this.getSecretKey(kind)), message = _a.message, nonce = _a.nonce;
        return { encryptedKey: message, nonce: nonce };
    };
    /**
     * Sign the public keys of the given IdentityKeySet.
     * @param keySet The IdentityKeySet to sign.
     */
    IdentityKeySet.prototype.signKeys = function (keySet) {
        return this.sign(Tools_1.Uint8Tool.concat(keySet.boxKeyPair.publicKey, keySet.signKeyPair.publicKey));
    };
    /**
     * Returns the public keys of the keySet.
     */
    IdentityKeySet.prototype.public = function () {
        return __assign({}, this.id, { box: this.boxKeyPair.publicKey, sign: this.signKeyPair.publicKey });
    };
    /**
     * Returns encryptors for a type of resource.
     * @param type
     */
    IdentityKeySet.prototype.encryptor = function (type) {
        switch (type) {
            case Cryptor_1.CipherType.NACL_ANON:
                return new Cryptor_1.EncryptAnonymous();
            case Cryptor_1.CipherType.NACL_SES:
                return new Cryptor_1.EncryptSES(this.boxKeyPair.secretKey, this.signKeyPair.secretKey);
        }
    };
    /**
     * Returns encryptors for a type of resource.
     * @param type
     */
    IdentityKeySet.decryptor = function (type, secretKey) {
        switch (type) {
            case Cryptor_1.CipherType.NACL_ANON:
                return new Cryptor_1.DecryptAnonymous(secretKey);
            case Cryptor_1.CipherType.NACL_SES:
                return new Cryptor_1.DecryptSES(secretKey);
        }
    };
    /**
     * Returns decryptors for a type of resource.
     * @param type
     */
    IdentityKeySet.prototype.decryptor = function (type) {
        return IdentityKeySet.decryptor(type, this.boxKeyPair.secretKey);
    };
    /**
     * Sign a message.
     * @param msg
     */
    IdentityKeySet.prototype.sign = function (msg, kind) {
        if (kind === void 0) { kind = proto_1.wallix.gopeps.protobuf.datapeps
            .IdentityAccessKeyKind.WRITE; }
        return nacl.sign.detached(msg, this.getSecretSignKey(kind).secretKey);
    };
    IdentityKeySet.prototype.getSecretToken = function () {
        return this.signKeyPair.secretKey;
    };
    IdentityKeySet.prototype.getSecretKey = function (kind) {
        switch (kind) {
            case api.IdentityShareKind.BOX:
                return this.boxKeyPair.secretKey;
            case api.IdentityShareKind.SHARING:
                return this.sharingKeyPair.secretKey;
        }
    };
    IdentityKeySet.prototype.getSecretSignKey = function (kind) {
        switch (kind) {
            case api.IdentityAccessKeyKind.READ:
                return this.readKeyPair;
            case api.IdentityAccessKeyKind.WRITE:
                return this.signKeyPair;
        }
    };
    return IdentityKeySet;
}());
exports.IdentityKeySet = IdentityKeySet;
//# sourceMappingURL=IdentityKeySet.js.map