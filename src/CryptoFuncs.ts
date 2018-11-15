import * as nacl from "tweetnacl";
import { api } from "./proto";
import { IdentityPublicKey, IdentityKeyKind } from "./DataPeps";
import { Error, SDKKind } from "./Error";
import { Uint8Tool, Crypto } from "./Tools";

export interface ResolvedCipher {
  message: Uint8Array;
  nonce: Uint8Array;
  sign: IdentityPublicKey;
}

export interface EncryptFuncs {
  encrypt(
    publicKey: Uint8Array,
    message: Uint8Array
  ): { message: Uint8Array; nonce: Uint8Array };
}

export interface DecryptFuncs {
  decrypt(cipher: ResolvedCipher): Uint8Array;
  decryptList(ciphers: ResolvedCipher[]): Uint8Array;
}

export class Encryption extends api.IdentityEncryption {
  // Master encryption material
  secret: Uint8Array;
  private masterKeyPair: nacl.BoxKeyPair;
  // Sharing material
  private sharingKeyPair: nacl.BoxKeyPair;
  // Encryption material
  private boxKeyPair: nacl.BoxKeyPair;
  // Signing material
  private signKeyPair: nacl.SignKeyPair;
  private readKeyPair: nacl.SignKeyPair;

  constructor(properties?: api.IIdentityEncryption) {
    super(properties);
  }

  encrypt(type: api.ResourceType): EncryptFuncs {
    switch (type) {
      case api.ResourceType.ANONYMOUS:
        return new EncryptAnonymous();
      case api.ResourceType.SES:
        return new EncryptSES(
          this.boxKeyPair.secretKey,
          this.signKeyPair.secretKey
        );
    }
  }

  decrypt(
    type: api.ResourceType,
    secretKey = this.boxKeyPair.secretKey
  ): DecryptFuncs {
    switch (type) {
      case api.ResourceType.ANONYMOUS:
        return new DecryptAnonymous(secretKey);
      case api.ResourceType.SES:
        return new DecryptSES(secretKey);
    }
  }

  getPublic(): api.IdentityEncryption {
    return this;
  }

  generate(secret: Uint8Array, creator: Encryption) {
    this.version = 1;
    this.secret = secret;
    this.generateMasterKey();
    this.generateKeys(creator);
  }

  generateWithMasterPublicKey(
    publicKey: Uint8Array,
    salt: Uint8Array,
    creator: Encryption
  ) {
    if (publicKey != null && publicKey.length != 0) {
      this.masterKeyPair = { publicKey, secretKey: null };
      this.masterSalt = salt;
      this.masterPublicKey = publicKey;
    }
    this.generate(null, creator);
  }

  recoverWithKeys(keys: api.IDelegatedKeys, creator: IdentityPublicKey) {
    this.version = keys.version;
    this.sharingKeyPair = nacl.box.keyPair.fromSecretKey(keys.sharingKey);
    this.boxKeyPair = nacl.box.keyPair.fromSecretKey(keys.boxKey);
    this.signKeyPair = nacl.sign.keyPair.fromSecretKey(keys.signKey);
    this.readKeyPair = nacl.sign.keyPair.fromSecretKey(keys.readKey);
  }

  recover(secret: Uint8Array, creator: IdentityPublicKey) {
    this.secret = secret;
    // Recompute the master key
    this.generateMasterKey();
    // Recompute the sharing material
    try {
      this.sharingKeyPair = this.decryptKeyWithMasterKey(
        this.sharingEncrypted,
        creator
      );
    } catch (err) {
      if (err instanceof Error && err.kind == SDKKind.DecryptFail) {
        throw new Error({
          kind: SDKKind.BadSecret,
          payload: err
        });
      }
      throw err;
    }
    // Recompute the encryption material
    this.boxKeyPair = this.decryptKeyWithKey(
      api.IdentityShareKind.SHARING,
      this.boxEncrypted,
      creator
    );
    // Recompute the signing material
    this.signKeyPair = this.decryptKeyWithKey(
      api.IdentityShareKind.SHARING,
      this.signEncrypted,
      creator
    );
    this.readKeyPair = this.decryptKeyWithKey(
      api.IdentityShareKind.BOX,
      this.readEncrypted,
      creator
    );
  }

  private generateMasterSalt() {
    if (this.masterSalt == null || this.masterSalt.length == 0) {
      this.masterSalt = nacl.randomBytes(16);
    }
  }

  private generateMasterKey() {
    if (this.secret != null) {
      this.generateMasterSalt();
      let masterKey = Crypto.PBKDF2(
        this.secret,
        this.masterSalt,
        5000,
        nacl.secretbox.keyLength
      );
      this.masterKeyPair = nacl.box.keyPair.fromSecretKey(masterKey);
      this.masterPublicKey = this.masterKeyPair.publicKey;
    }
  }

  private generateKeys(creator: Encryption) {
    // Create the cryptograĥic material
    this.sharingKeyPair = nacl.box.keyPair();
    this.boxKeyPair = nacl.box.keyPair();
    this.signKeyPair = nacl.sign.keyPair();
    this.readKeyPair = nacl.sign.keyPair();
    // Encrypt the cryptographic material
    this.sharingEncrypted = this.encryptKeyForMasterKey(
      this.sharingKeyPair,
      creator
    );
    this.boxEncrypted = this.encryptKeyForKey(
      api.IdentityShareKind.SHARING,
      this.boxKeyPair,
      creator
    );
    this.signEncrypted = this.encryptKeyForKey(
      api.IdentityShareKind.SHARING,
      this.signKeyPair,
      creator
    );
    this.readEncrypted = this.encryptKeyForKey(
      api.IdentityShareKind.BOX,
      this.readKeyPair,
      creator
    );
  }

  sign(msg: Uint8Array) {
    return nacl.sign.detached(msg, this.signKeyPair.secretKey);
  }

  encryptKey(
    kind: IdentityKeyKind,
    encryption: Encryption,
    publicKey: Uint8Array
  ) {
    return encryption
      .encrypt(api.ResourceType.SES)
      .encrypt(publicKey, this.getSecretKey(kind));
  }

  getPublicKey(kind: IdentityKeyKind): Uint8Array {
    switch (kind) {
      case api.IdentityShareKind.BOX:
        return this.boxKeyPair.publicKey;
      case api.IdentityShareKind.SHARING:
        return this.sharingKeyPair.publicKey;
    }
  }

  private getSecretKey(kind: IdentityKeyKind): Uint8Array {
    switch (kind) {
      case api.IdentityShareKind.BOX:
        return this.boxKeyPair.secretKey;
      case api.IdentityShareKind.SHARING:
        return this.sharingKeyPair.secretKey;
    }
  }

  private encryptKeyForMasterKey(
    { publicKey, secretKey }: nacl.BoxKeyPair,
    creator: Encryption
  ): api.IIdentityEncryptedKey {
    if (this.masterKeyPair == null) {
      return { publicKey, nonce: null, encryptedKey: null };
    }
    creator = creator == null ? this : creator;
    let { message, nonce } = creator
      .encrypt(api.ResourceType.SES)
      .encrypt(this.masterKeyPair.publicKey, secretKey);
    return { nonce, publicKey, encryptedKey: message };
  }

  private decryptKeyWithMasterKey(
    { nonce, publicKey, encryptedKey }: api.IIdentityEncryptedKey,
    creator: IdentityPublicKey
  ): nacl.BoxKeyPair {
    let cipher = {
      nonce,
      sign: creator,
      message: encryptedKey
    };
    return {
      publicKey,
      secretKey: this.decrypt(
        api.ResourceType.SES,
        this.masterKeyPair.secretKey
      ).decrypt(cipher)
    };
  }

  private encryptKeyForKey(
    kind: IdentityKeyKind,
    { publicKey, secretKey }: nacl.BoxKeyPair,
    creator: Encryption
  ): api.IIdentityEncryptedKey {
    creator = creator == null ? this : creator;
    let { message, nonce } = creator
      .encrypt(api.ResourceType.SES)
      .encrypt(this.getPublicKey(kind), secretKey);
    return { nonce, publicKey, encryptedKey: message };
  }

  private decryptKeyWithKey(
    kind: IdentityKeyKind,
    { nonce, publicKey, encryptedKey }: api.IIdentityEncryptedKey,
    creator: IdentityPublicKey
  ): nacl.BoxKeyPair {
    let cipher = {
      nonce,
      sign: creator,
      message: encryptedKey
    };
    return {
      publicKey,
      secretKey: this.decrypt(
        api.ResourceType.SES,
        this.getSecretKey(kind)
      ).decrypt(cipher)
    };
  }
}

/////////////////////////////////////////////////
// Anonymous
/////////////////////////////////////////////////

export class EncryptAnonymous implements EncryptFuncs {
  encrypt(
    publicKey: Uint8Array,
    message: Uint8Array
  ): { message: Uint8Array; nonce: Uint8Array } {
    let nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    //console.log("encrypt anonymous", Base64.encode(nonce))
    let keypair = nacl.box.keyPair();
    message = nacl.box(message, nonce, publicKey, keypair.secretKey);
    return { nonce, message: Uint8Tool.concat(keypair.publicKey, message) };
  }
}

class DecryptAnonymous implements DecryptFuncs {
  private secretKey: Uint8Array;
  constructor(secretKey: Uint8Array) {
    this.secretKey = secretKey;
  }
  static decrypt(secretKey: Uint8Array, cipher: ResolvedCipher) {
    let publicKey = cipher.message.slice(0, nacl.box.publicKeyLength);
    let message = cipher.message.slice(nacl.box.publicKeyLength);
    let result = nacl.box.open(message, cipher.nonce, publicKey, secretKey);
    if (result == null) {
      throw new Error({ kind: SDKKind.DecryptFail });
    }
    return result;
  }
  decrypt(cipher: ResolvedCipher): Uint8Array {
    return DecryptAnonymous.decrypt(this.secretKey, cipher);
  }
  static decryptList(
    secretKey: Uint8Array,
    ciphers: ResolvedCipher[]
  ): Uint8Array {
    return ciphers.reduce(
      (secretKey, cipher) => DecryptAnonymous.decrypt(secretKey, cipher),
      secretKey
    );
  }
  decryptList(ciphers: ResolvedCipher[]): Uint8Array {
    return DecryptAnonymous.decryptList(this.secretKey, ciphers);
  }
}

/////////////////////////////////////////////////
// Sign Encrypt Sign
/////////////////////////////////////////////////

class EncryptSES implements EncryptFuncs {
  private boxSecretKey: Uint8Array;
  private signSecretKey: Uint8Array;

  constructor(boxSecretKey: Uint8Array, signSecretKey: Uint8Array) {
    this.boxSecretKey = boxSecretKey;
    this.signSecretKey = signSecretKey;
  }

  encrypt(
    publicKey: Uint8Array,
    message: Uint8Array
  ): { message: Uint8Array; nonce: Uint8Array } {
    let nonce = nacl.randomBytes(nacl.box.nonceLength);
    let msgSign = nacl.sign(message, this.signSecretKey);
    let cipher = nacl.box(msgSign, nonce, publicKey, this.boxSecretKey);
    return { nonce, message: nacl.sign(cipher, this.signSecretKey) };
  }
}

class DecryptSES implements DecryptFuncs {
  private secretKey: Uint8Array;
  constructor(secretKey: Uint8Array) {
    this.secretKey = secretKey;
  }
  static decrypt(
    secretKey,
    { message, nonce, sign }: ResolvedCipher
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
  decrypt(cipher: ResolvedCipher): Uint8Array {
    return DecryptSES.decrypt(this.secretKey, cipher);
  }
  static decryptList(
    secretKey: Uint8Array,
    ciphers: ResolvedCipher[]
  ): Uint8Array {
    return ciphers.reduce(
      (secretKey, cipher) => DecryptSES.decrypt(secretKey, cipher),
      secretKey
    );
  }
  decryptList(ciphers: ResolvedCipher[]): Uint8Array {
    return DecryptSES.decryptList(this.secretKey, ciphers);
  }
}
