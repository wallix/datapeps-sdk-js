import * as nacl from "tweetnacl";
import { SDKKind, Error } from "./Error";

export class Base64 {
  /**
   * Decode a base64 string to an Uint8Array
   */
  static decode(sBase64: string) {
    function b64ToUint6(nChr) {
      return nChr > 64 && nChr < 91
        ? nChr - 65
        : nChr > 96 && nChr < 123
          ? nChr - 71
          : nChr > 47 && nChr < 58
            ? nChr + 4
            : nChr === 43
              ? 62
              : nChr === 47
                ? 63
                : 0;
    }
    var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""),
      nInLen = sB64Enc.length,
      nOutLen = (nInLen * 3 + 1) >> 2,
      taBytes = new Uint8Array(nOutLen);

    for (
      var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0;
      nInIdx < nInLen;
      nInIdx++
    ) {
      nMod4 = nInIdx & 3;
      nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (18 - 6 * nMod4);
      if (nMod4 === 3 || nInLen - nInIdx === 1) {
        for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
          taBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255;
        }
        nUint24 = 0;
      }
    }

    return taBytes;
  }

  /**
   * Encode a Uint8Array to a base64 string
   */
  static encode(aBytes) {
    function uint6ToB64(nUint6) {
      return nUint6 < 26
        ? nUint6 + 65
        : nUint6 < 52
          ? nUint6 + 71
          : nUint6 < 62
            ? nUint6 - 4
            : nUint6 === 62
              ? 43
              : nUint6 === 63
                ? 47
                : 65;
    }

    var nMod3 = 2,
      sB64Enc = "";

    for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
      nMod3 = nIdx % 3;
      nUint24 |= aBytes[nIdx] << ((16 >>> nMod3) & 24);
      if (nMod3 === 2 || aBytes.length - nIdx === 1) {
        sB64Enc += String.fromCharCode(
          uint6ToB64((nUint24 >>> 18) & 63),
          uint6ToB64((nUint24 >>> 12) & 63),
          uint6ToB64((nUint24 >>> 6) & 63),
          uint6ToB64(nUint24 & 63)
        );
        nUint24 = 0;
      }
    }

    return (
      sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) +
      (nMod3 === 2 ? "" : nMod3 === 1 ? "=" : "==")
    );
  }
}

/*
Uint8Tool is a helper class that groups functions for working with Uint8Array typed arrays. 
*/
export class Uint8Converter {
  /**
   * Converts a string to a Uint8Array typed array.
   * @param s The string to convert
   */
  static fromString(s: string): Uint8Array {
    return Uint8Tool.encode(s);
  }

  /**
   * Converts a Uint8Array typed array to string.
   * @param u The Uint8Array typed array to convert
   */
  static toString(u: Uint8Array): string {
    return Uint8Tool.decode(u);
  }
}

export class Uint8Tool {
  static encode(s: string): Uint8Array {
    if (s == null) {
      return new Uint8Array([]);
    }
    try {
      if (TextEncoder != null) {
        return new TextEncoder().encode(s);
      }
    } catch (e) {}
    var u = new Uint8Array(s.length);
    for (var i = 0, len = s.length; i < len; i++) {
      u[i] = s.charCodeAt(i);
    }
    return u;
  }

  static decode(u: Uint8Array): string {
    try {
      if (TextDecoder != null) {
        return new TextDecoder().decode(u);
      }
    } catch (e) {
      return String.fromCharCode.apply(null, u);
    }
  }

  static convert(arg: string | Uint8Array) {
    if (typeof arg === "string") {
      return Uint8Tool.encode(arg);
    }
    return arg;
  }

  /**
   * Fill the whole array with value
   */
  static fill(array: Uint8Array, value: number) {
    for (var i = 0; i < array.byteLength; i++) {
      array[i] = value;
    }
  }

  /**
   * Compute the xor of two arrays into the first one
   */
  static xor(array0: Uint8Array, array1: Uint8Array) {
    if (array0.byteLength != array1.byteLength) {
      throw new Error({
        kind: SDKKind.SDKInternalError,
        payload: { array0, array1 }
      });
    }
    for (var i = 0; i < array0.byteLength; i++) {
      array0[i] = array0[i] ^ array1[i];
    }
  }

  /**
   * Returns the concat of two array
   */
  static concat(ar1: Uint8Array, ar2: Uint8Array) {
    var concatArray = new Uint8Array(ar1.byteLength + ar2.byteLength);
    concatArray.set(ar1, 0);
    concatArray.set(ar2, ar1.byteLength);
    return concatArray;
  }

  static equals(a: Uint8Array, b: Uint8Array): boolean {
    if (a.byteLength != b.byteLength) {
      return false;
    }
    for (let i = 0; i < a.byteLength; i++) {
      if (a[i] != b[i]) return false;
    }
    return true;
  }
}

export class Crypto {
  /**
   * Password-Based Key Derivation Function 2
   * @param password The password to derive
   * @param salt The salt used to derive
   * @param nb The number of iteration
   * @param length of the desired key
   * @return The derivated key
   */
  static PBKDF2(
    password: Uint8Array,
    salt: Uint8Array,
    c: number,
    length: number
  ) {
    var blockSize = 128; // Bytes, specified in rfc4868.
    var hashLength = 64;
    // Check derived key length. (4294967295 = 2^4294967295)
    if (length > 4294967295 * hashLength)
      throw "pbkdf2: derived key is too large";
    // Compute the HMAC key used for each iteration.
    // Algorithm is the same as HMAC.
    var key = password;
    if (key.byteLength > blockSize) key = nacl.hash(key);
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
      return nacl.hash(
        Uint8Tool.concat(okeypad, nacl.hash(Uint8Tool.concat(ikeypad, data)))
      );
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
  }
}

export function timestampToDate(timestamp: number | Long): Date {
  return new Date((timestamp as number) * 1000);
}
