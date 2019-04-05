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
var nacl = require("tweetnacl");
var IdentityKeySet_1 = require("./IdentityKeySet");
var Cryptor_1 = require("./Cryptor");
/**
 * Declare some usefull function that generates, exports and recovers IdentityKeySet to objects that are formatted to the API.
 */
var IdentityKeySetAPI;
(function (IdentityKeySetAPI) {
    /**
     * Generate a new IdentityKeySet then export with the secret as seed.
     * @param id The identifer of the IdentityKeySet to generate.
     * @param seed
     */
    function initWithSecret(id, secret) {
        var seed = secret == null ? null : IdentityKeySet_1.MasterPrivateSeed.fromSecret(secret);
        return IdentityKeySetAPI.initWithMasterSeed(id, seed);
    }
    IdentityKeySetAPI.initWithSecret = initWithSecret;
    /**
     * Generate a new IdentityKeySet then export with the a seed.
     * @param id The identifer of the IdentityKeySet to generate.
     * @param seed
     */
    function initWithMasterSeed(id, seed) {
        var keySet = IdentityKeySet_1.IdentityKeySet.generate(id);
        return {
            keySet: keySet,
            encryptedKeySet: __assign({}, keySet.export(seed), { masterSalt: seed == null ? null : seed.masterSalt, masterPublicKey: seed == null ? null : seed.publicKey, version: id.version })
        };
    }
    IdentityKeySetAPI.initWithMasterSeed = initWithMasterSeed;
    /**
     * Recover an IdentityKeySet from encrypted keys.
     * @param id
     * @param encryptedKeys
     */
    function recoverWithEncrytedKeys(id, keySet, sharingKey, encryptedKeys) {
        // Decrypt the sharingKey with this IdentityKeySet
        var sharingKeyPair = nacl.box.keyPair.fromSecretKey(keySet.decryptor(Cryptor_1.CipherType.NACL_SES).decryptList(sharingKey));
        // Decrypt the rest of the IdentityKeySet
        return IdentityKeySet_1.IdentityKeySet.recoverWithEncryptedKeysFromSharingKey(id, sharingKeyPair, encryptedKeys);
    }
    IdentityKeySetAPI.recoverWithEncrytedKeys = recoverWithEncrytedKeys;
    function recoverWithPathElt(keySet, elt) {
        var sharingKey = keySet.decryptor(Cryptor_1.CipherType.NACL_SES).decrypt({
            message: elt.sharedKey.message,
            nonce: elt.sharedKey.nonce,
            sign: {
                login: elt.id.login,
                version: elt.id.version,
                box: elt.encryptedKeySet.boxEncrypted.publicKey,
                sign: elt.encryptedKeySet.signEncrypted.publicKey
            }
        });
        var sharingKeyPair = nacl.box.keyPair.fromSecretKey(sharingKey);
        return IdentityKeySet_1.IdentityKeySet.recoverWithEncryptedKeysFromSharingKey(elt.id, sharingKeyPair, elt.encryptedKeySet);
    }
    IdentityKeySetAPI.recoverWithPathElt = recoverWithPathElt;
    /**
     * Recover an IdentityKeySet from encrypted keys.
     * @param id
     * @param encryptedKeys
     */
    function recoverWithSecret(login, secret, encryptedKeySet) {
        var seed = IdentityKeySet_1.MasterPrivateSeed.fromSecret(secret, encryptedKeySet.masterSalt);
        return IdentityKeySet_1.IdentityKeySet.recover({ login: login, version: encryptedKeySet.version }, seed, encryptedKeySet);
    }
    IdentityKeySetAPI.recoverWithSecret = recoverWithSecret;
})(IdentityKeySetAPI = exports.IdentityKeySetAPI || (exports.IdentityKeySetAPI = {}));
//# sourceMappingURL=IdentityKeySetAPI.js.map