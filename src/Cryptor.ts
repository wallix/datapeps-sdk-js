import * as nacl from "tweetnacl";
import { IdentityPublicKey } from "./IdentityAPI";
import { Error, SDKKind } from "./Error";
import { Uint8Tool } from "./Tools";

export enum CipherType {
  NACL_SES = 0,
  NACL_ANON = 1
}

export interface Cipher {
  message: Uint8Array;
  nonce: Uint8Array;
}

export interface SignedCipher extends Cipher {
  sign: IdentityPublicKey;
}

export interface PublicEncryptKey {
  box: Uint8Array;
}

export interface PublicDecryptKey extends PublicEncryptKey {
  sign: Uint8Array;
}

export interface Encryptor {
  encrypt(
    publicKey: PublicEncryptKey,
    message: Uint8Array
  ): { message: Uint8Array; nonce: Uint8Array };
}

export interface Decryptor {
  decrypt(cipher: SignedCipher): Uint8Array;
  decryptList(ciphers: SignedCipher[]): Uint8Array;
}

/////////////////////////////////////////////////
// Anonymous
/////////////////////////////////////////////////

export class EncryptAnonymous implements Encryptor {
  encrypt(
    publicKey: PublicEncryptKey,
    message: Uint8Array
  ): { message: Uint8Array; nonce: Uint8Array } {
    let nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    let keypair = nacl.box.keyPair();
    message = nacl.box(message, nonce, publicKey.box, keypair.secretKey);
    return { nonce, message: Uint8Tool.concat(keypair.publicKey, message) };
  }
}

export class DecryptAnonymous implements Decryptor {
  private secretKey: Uint8Array;
  constructor(secretKey: Uint8Array) {
    this.secretKey = secretKey;
  }
  static decrypt(secretKey: Uint8Array, cipher: SignedCipher) {
    let publicKey = cipher.message.slice(0, nacl.box.publicKeyLength);
    let message = cipher.message.slice(nacl.box.publicKeyLength);
    let result = nacl.box.open(message, cipher.nonce, publicKey, secretKey);
    if (result == null) {
      throw new Error({ kind: SDKKind.DecryptFail });
    }
    return result;
  }
  decrypt(cipher: SignedCipher): Uint8Array {
    return DecryptAnonymous.decrypt(this.secretKey, cipher);
  }
  static decryptList(
    secretKey: Uint8Array,
    ciphers: SignedCipher[]
  ): Uint8Array {
    return ciphers.reduce(
      (secretKey, cipher) => DecryptAnonymous.decrypt(secretKey, cipher),
      secretKey
    );
  }
  decryptList(ciphers: SignedCipher[]): Uint8Array {
    return DecryptAnonymous.decryptList(this.secretKey, ciphers);
  }
}

/////////////////////////////////////////////////
// Sign Encrypt Sign
/////////////////////////////////////////////////

export class EncryptSES implements Encryptor {
  private boxSecretKey: Uint8Array;
  private signSecretKey: Uint8Array;

  constructor(boxSecretKey: Uint8Array, signSecretKey: Uint8Array) {
    this.boxSecretKey = boxSecretKey;
    this.signSecretKey = signSecretKey;
  }

  encrypt(
    publicKey: IdentityPublicKey,
    message: Uint8Array
  ): { message: Uint8Array; nonce: Uint8Array } {
    let nonce = nacl.randomBytes(nacl.box.nonceLength);
    let msgSign = nacl.sign(message, this.signSecretKey);
    let cipher = nacl.box(msgSign, nonce, publicKey.box, this.boxSecretKey);
    return { nonce, message: nacl.sign(cipher, this.signSecretKey) };
  }
}

export class DecryptSES implements Decryptor {
  private secretKey: Uint8Array;
  constructor(secretKey: Uint8Array) {
    this.secretKey = secretKey;
  }
  static decrypt(
    secretKey,
    { message, nonce, sign }: SignedCipher
  ): Uint8Array {
    let cipher = nacl.sign.open(message, sign.sign);
    if (cipher == null) {
      throw new Error({
        kind: SDKKind.DecryptFail,
        payload: { kind: "VerifyCipherText", cipher: { cipher, nonce, sign } }
      });
    }
    let signedMsg = nacl.box.open(cipher, nonce, sign.box, secretKey);
    if (signedMsg == null) {
      throw new Error({
        kind: SDKKind.DecryptFail,
        payload: { kind: "DecryptCipherText", cipher: { cipher, nonce, sign } }
      });
    }
    let msg = nacl.sign.open(signedMsg, sign.sign);
    if (msg == null) {
      throw new Error({
        kind: SDKKind.DecryptFail,
        payload: { kind: "VerifyText", cipher: { cipher, nonce, sign } }
      });
    }
    return msg;
  }
  decrypt(cipher: SignedCipher): Uint8Array {
    return DecryptSES.decrypt(this.secretKey, cipher);
  }
  static decryptList(
    secretKey: Uint8Array,
    ciphers: SignedCipher[]
  ): Uint8Array {
    return ciphers.reduce(
      (secretKey, cipher) => DecryptSES.decrypt(secretKey, cipher),
      secretKey
    );
  }
  decryptList(ciphers: SignedCipher[]): Uint8Array {
    return DecryptSES.decryptList(this.secretKey, ciphers);
  }
}
