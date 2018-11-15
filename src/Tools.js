"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nacl = require("tweetnacl");
var Error_1 = require("./Error");
var Base64 = /** @class */ (function () {
    function Base64() {
    }
    /**
     * Decode a base64 string to an Uint8Array
     */
    Base64.decode = function (s) {
        if (s == null)
            return null;
        var i, d = atob(s), b = new Uint8Array(d.length);
        for (i = 0; i < d.length; i++)
            b[i] = d.charCodeAt(i);
        return b;
    };
    /**
     * Encode a Uint8Array to a base64 string
     */
    Base64.encode = function (arr) {
        var i, s = [], len = arr.length;
        for (i = 0; i < len; i++)
            s.push(String.fromCharCode(arr[i]));
        return btoa(s.join(""));
    };
    return Base64;
}());
exports.Base64 = Base64;
var Uint8Tool = /** @class */ (function () {
    function Uint8Tool() {
    }
    Uint8Tool.convert = function (arg) {
        if (typeof arg === "string") {
            return new TextEncoder().encode(arg);
        }
        return arg;
    };
    /**
     * Fill the whole array with value
     */
    Uint8Tool.fill = function (array, value) {
        for (var i = 0; i < array.byteLength; i++) {
            array[i] = value;
        }
    };
    /**
     * Compute the xor of two arrays into the first one
     */
    Uint8Tool.xor = function (array0, array1) {
        if (array0.byteLength != array1.byteLength) {
            throw new Error_1.Error({
                kind: Error_1.SDKKind.SDKInternalError,
                payload: { array0: array0, array1: array1 }
            });
        }
        for (var i = 0; i < array0.byteLength; i++) {
            array0[i] = array0[i] ^ array1[i];
        }
    };
    /**
     * Returns the concat of two array
     */
    Uint8Tool.concat = function (ar1, ar2) {
        var concatArray = new Uint8Array(ar1.byteLength + ar2.byteLength);
        concatArray.set(ar1, 0);
        concatArray.set(ar2, ar1.byteLength);
        return concatArray;
    };
    Uint8Tool.equals = function (a, b) {
        if (a.byteLength != b.byteLength) {
            return false;
        }
        for (var i = 0; i < a.byteLength; i++) {
            if (a[i] != b[i])
                return false;
        }
        return true;
    };
    return Uint8Tool;
}());
exports.Uint8Tool = Uint8Tool;
var Crypto = /** @class */ (function () {
    function Crypto() {
    }
    /**
     * Password-Based Key Derivation Function 2
     * @param password The password to derive
     * @param salt The salt used to derive
     * @param nb The number of iteration
     * @param length of the desired key
     * @return The derivated key
     */
    Crypto.PBKDF2 = function (password, salt, c, length) {
        var blockSize = 128; // Bytes, specified in rfc4868.
        var hashLength = 64;
        // Check derived key length. (4294967295 = 2^4294967295)
        if (length > 4294967295 * hashLength)
            throw "pbkdf2: derived key is too large";
        // Compute the HMAC key used for each iteration.
        // Algorithm is the same as HMAC.
        var key = password;
        if (key.byteLength > blockSize)
            key = nacl.hash(key);
        if (key.byteLength < blockSize) {
            var tmpkey = new Uint8Array(new ArrayBuffer(blockSize));
            tmpkey.set(key, 0);
            key = tmpkey;
        }
        // Compute key pads.
        var okeypad = new Uint8Array(blockSize);
        Uint8Tool.fill(okeypad, 0x5c);
        Uint8Tool.xor(okeypad, key);
        var ikeypad = new Uint8Array(blockSize);
        Uint8Tool.fill(ikeypad, 0x36);
        Uint8Tool.xor(ikeypad, key);
        // Master key, initially empty.
        var masterKey = new Uint8Array(length);
        /** Done with the preparations.
         * Apply hmac with the computed pads.
         */
        function hmac(data) {
            return nacl.hash(Uint8Tool.concat(okeypad, nacl.hash(Uint8Tool.concat(ikeypad, data))));
        }
        // BIG endian encoding of integer i.
        function INT(i) {
            return new Uint8Array([
                (i >> 24) & 0xff,
                (i >> 16) & 0xff,
                (i >> 8) & 0xff,
                i & 0xff
            ]);
        }
        /** Check description of the algorithm
         * http://en.wikipedia.org/wiki/PBKDF2
         * also: rfc2898
         */
        function F(salt, c, i) {
            var concat = Uint8Tool.concat(salt, INT(i));
            var u = hmac(concat);
            var t = new Uint8Array(u);
            for (var n = 1; n < c; n++) {
                u = hmac(u);
                Uint8Tool.xor(t, u);
            }
            return t;
        }
        // Loop until the master key has been completed.
        var nLoop = length / hashLength; // Number of iterations.
        var clen = 0; // Accumulated length.
        var i = 1;
        for (; i <= nLoop; i++) {
            masterKey.set(F(salt, c, i), clen);
            clen += hashLength;
        }
        // Final iteration, possibly void.
        if (clen < length)
            masterKey.set(F(salt, c, i).subarray(0, length - clen), clen);
        // Return the master key.
        return masterKey;
    };
    return Crypto;
}());
exports.Crypto = Crypto;
//# sourceMappingURL=Tools.js.map