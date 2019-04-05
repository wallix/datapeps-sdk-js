import { api } from "./proto";
import * as nacl from "tweetnacl";
import {
  Encryptor,
  EncryptAnonymous,
  EncryptSES,
  Decryptor,
  DecryptAnonymous,
  DecryptSES,
  CipherType
} from "./Cryptor";
import { IdentityPublicKey, IdentityPublicKeyID } from "./IdentityAPI";
import { Error, SDKKind } from "./Error";
import { Crypto, Uint8Tool } from "./Tools";
import { Cipher } from "crypto";

/**
 * The default length of the salt used to derivate the master key of an IdentityKeySet.
 */
const MASTER_KEY_SALT_LENGTH = 16;

export interface MasterPublicSeed {
  masterSalt: Uint8Array;
  publicKey: Uint8Array;
}

export interface MasterPrivateSeed extends MasterPublicSeed {
  secretKey: Uint8Array;
}

export namespace MasterPrivateSeed {
  export function fromSecret(
    secret: string | Uint8Array,
    masterSalt = nacl.randomBytes(MASTER_KEY_SALT_LENGTH)
  ): MasterPrivateSeed {
    let masterKey = Crypto.PBKDF2(
      Uint8Tool.convert(secret),
      masterSalt,
      5000,
      nacl.secretbox.keyLength
    );
    return { masterSalt, ...nacl.box.keyPair.fromSecretKey(masterKey) };
  }
}

export interface IdentityEncryptedKey {
  nonce: Uint8Array;
  publicKey: Uint8Array;
  encryptedKey: Uint8Array;
}

export interface IdentityEncryptedKeySet {
  sharingEncrypted: IdentityEncryptedKey;
  boxEncrypted: IdentityEncryptedKey;
  signEncrypted: IdentityEncryptedKey;
  readEncrypted?: IdentityEncryptedKey;
}

/**
 * An IdentityKeySet is the cryptographic material of a version of a DataPeps Identity.
 */
export class IdentityKeySet {
  /** The version number of the IdentityKeySet. */
  id: IdentityPublicKeyID;
  // Sharing material
  private sharingKeyPair: nacl.BoxKeyPair;
  // Encryption material
  private boxKeyPair: nacl.BoxKeyPair;
  // Signing material
  private signKeyPair: nacl.SignKeyPair;
  private readKeyPair: nacl.SignKeyPair;

  private constructor(id: IdentityPublicKeyID) {
    this.id = id;
  }

  /**
   * Generate a new IdentityKeySet.
   */
  static generate(id: IdentityPublicKeyID): IdentityKeySet {
    let keySet = new IdentityKeySet(id);
    keySet.sharingKeyPair = nacl.box.keyPair();
    keySet.boxKeyPair = nacl.box.keyPair();
    keySet.signKeyPair = nacl.sign.keyPair();
    keySet.readKeyPair = nacl.sign.keyPair();
    return keySet;
  }

  // TODO - Redesign this?
  static fromDelegatedKeys(keys: api.IDelegatedKeys): IdentityKeySet {
    let keySet = new IdentityKeySet({
      version: keys.version,
      login: keys.login
    });
    keySet.sharingKeyPair = nacl.box.keyPair.fromSecretKey(keys.sharingKey);
    keySet.boxKeyPair = nacl.box.keyPair.fromSecretKey(keys.boxKey);
    keySet.signKeyPair = nacl.sign.keyPair.fromSecretKey(keys.signKey);
    keySet.readKeyPair = nacl.sign.keyPair.fromSecretKey(keys.readKey);
    return keySet;
  }
  toDelegatedKeys(): api.IDelegatedKeys {
    return {
      login: this.id.login,
      version: this.id.version,
      sharingKey: this.sharingKeyPair.secretKey,
      boxKey: this.boxKeyPair.secretKey,
      signKey: this.signKeyPair.secretKey,
      readKey: this.readKeyPair.secretKey
    };
  }

  /**
   * Export the IdentityKeySet in an encrypted form that can be safely transmitted.
   * @param creator The IdentityKeySet of the identity that exports.
   * @param seed An optional MasterSeed to export the sharing key.
   */
  export(seed?: MasterPublicSeed): IdentityEncryptedKeySet {
    // Encrypt the sharingKey with the master seed
    let sharingEncrypted: IdentityEncryptedKey =
      seed == null || seed.publicKey == null || seed.publicKey.length == 0
        ? {
            publicKey: this.sharingKeyPair.publicKey,
            encryptedKey: null,
            nonce: null
          }
        : this.exportSharingKey(seed);
    // Encrypt the boxKey for sharingKey
    let boxEncrypted = this.exportKeyPairForKey(
      this.boxKeyPair,
      this.sharingKeyPair.publicKey
    );
    // Encrypt the signKey for sharingKey
    let signEncrypted = this.exportKeyPairForKey(
      this.signKeyPair,
      this.sharingKeyPair.publicKey
    );
    // Encrypt the readKey for boxKey
    let readEncrypted = this.exportKeyPairForKey(
      this.readKeyPair,
      this.boxKeyPair.publicKey
    );
    return {
      sharingEncrypted,
      boxEncrypted,
      signEncrypted,
      readEncrypted
    };
  }

  // Export the sharing key for a master key
  private exportSharingKey(seed: MasterPublicSeed): IdentityEncryptedKey {
    let { message, nonce } = this.encryptor(CipherType.NACL_SES).encrypt(
      { box: seed.publicKey },
      this.sharingKeyPair.secretKey
    );
    return {
      nonce,
      publicKey: this.sharingKeyPair.publicKey,
      encryptedKey: message
    };
  }

  // Export a key pair
  private exportKeyPairForKey(
    keyPair: nacl.BoxKeyPair,
    publicKey: Uint8Array
  ): IdentityEncryptedKey {
    let { message, nonce } = this.encryptor(CipherType.NACL_SES).encrypt(
      { box: publicKey },
      keyPair.secretKey
    );
    return { nonce, publicKey: keyPair.publicKey, encryptedKey: message };
  }

  /**
   * Recover an IdentityEncryptedKeySet thanks a master seed.
   * @param seed
   * @param encryptKeySet
   * @param creator
   */
  static recover(
    keySetID: IdentityPublicKeyID,
    seed: MasterPrivateSeed,
    encryptKeySet: IdentityEncryptedKeySet
  ): IdentityKeySet {
    let sign = {
      ...keySetID,
      sign: encryptKeySet.signEncrypted.publicKey,
      box: encryptKeySet.boxEncrypted.publicKey
    };
    // Decrypt the sharingKey with the master seed
    let sharingKeyPair: nacl.BoxKeyPair;
    try {
      sharingKeyPair = nacl.box.keyPair.fromSecretKey(
        IdentityKeySet.decryptor(CipherType.NACL_SES, seed.secretKey).decrypt({
          nonce: encryptKeySet.sharingEncrypted.nonce,
          message: encryptKeySet.sharingEncrypted.encryptedKey,
          sign
        })
      );
    } catch (err) {
      if (err instanceof Error && err.kind == SDKKind.DecryptFail) {
        throw new Error({
          kind: SDKKind.IdentityInvalidKeySet,
          payload: {
            message: "IdentityKeySet cannot recover with the master seed",
            error: err
          }
        });
      }
      throw err;
    }
    // Decrypt the rest of the IdentityKeySet
    return IdentityKeySet.recoverWithEncryptedKeysFromSharingKey(
      keySetID,
      sharingKeyPair,
      encryptKeySet
    );
  }

  /**
   * Decrypt and set all the keys from a keySet that already have its sharingKeyPair initialized
   */
  static recoverWithEncryptedKeysFromSharingKey(
    id: IdentityPublicKeyID,
    sharingKeyPair: nacl.BoxKeyPair,
    encryptedKeys: {
      boxEncrypted: IdentityEncryptedKey;
      signEncrypted: IdentityEncryptedKey;
      readEncrypted?: IdentityEncryptedKey;
    }
  ): IdentityKeySet {
    let keySet = new IdentityKeySet(id);
    keySet.sharingKeyPair = sharingKeyPair;
    let sign = {
      login: id.login,
      version: id.version,
      sign: encryptedKeys.signEncrypted.publicKey,
      box: encryptedKeys.boxEncrypted.publicKey
    };
    try {
      // Decrypt the boxKey with the sharingKey
      keySet.boxKeyPair = nacl.box.keyPair.fromSecretKey(
        IdentityKeySet.decryptor(
          CipherType.NACL_SES,
          keySet.sharingKeyPair.secretKey
        ).decrypt({
          message: encryptedKeys.boxEncrypted.encryptedKey,
          nonce: encryptedKeys.boxEncrypted.nonce,
          sign
        })
      );
      // Decrypt the signKey with the sharingKey
      keySet.signKeyPair = nacl.sign.keyPair.fromSecretKey(
        IdentityKeySet.decryptor(
          CipherType.NACL_SES,
          keySet.sharingKeyPair.secretKey
        ).decrypt({
          message: encryptedKeys.signEncrypted.encryptedKey,
          nonce: encryptedKeys.signEncrypted.nonce,
          sign
        })
      );
      // Decrypt the readKey with the boxKey
      if (encryptedKeys.readEncrypted) {
        keySet.readKeyPair = nacl.sign.keyPair.fromSecretKey(
          IdentityKeySet.decryptor(
            CipherType.NACL_SES,
            keySet.boxKeyPair.secretKey
          ).decrypt({
            message: encryptedKeys.readEncrypted.encryptedKey,
            nonce: encryptedKeys.readEncrypted.nonce,
            sign
          })
        );
      }
    } catch (err) {
      if (err instanceof Error && err.kind == SDKKind.DecryptFail) {
        throw new Error({
          kind: SDKKind.IdentityInvalidKeySet,
          payload: err
        });
      }
      throw err;
    }
    // Test that public keys used for the decryption are the same that
    // are well paired with the secret keys that has been decrypted.
    if (
      !Uint8Tool.equals(sign.box, keySet.boxKeyPair.publicKey) ||
      !Uint8Tool.equals(sign.sign, keySet.signKeyPair.publicKey)
    ) {
      throw new Error({
        kind: SDKKind.IdentityInvalidKeySet,
        payload: { message: "IdentityKeySet is not self encrypted", id }
      });
    }
    return keySet;
  }

  /**
   * Share a specific key of the IdentityKeySet.
   * @param kind The key to share.
   * @param sharer The IdentityKeySet that do the sharing.
   * @param publicKey The IdentityPublicKey that is the target of the sharing.
   * @return An encryptedKey and the nonce that be used to encrypt the key.
   */
  shareKey(
    kind: api.IdentityShareKind,
    publicKey: IdentityPublicKey
  ): { encryptedKey: Uint8Array; nonce: Uint8Array } {
    let { message, nonce } = this.encryptor(CipherType.NACL_SES).encrypt(
      publicKey,
      this.getSecretKey(kind)
    );
    return { encryptedKey: message, nonce };
  }

  /**
   * Sign the public keys of the given IdentityKeySet.
   * @param keySet The IdentityKeySet to sign.
   */
  signKeys(keySet: IdentityKeySet): Uint8Array {
    return this.sign(
      Uint8Tool.concat(
        keySet.boxKeyPair.publicKey,
        keySet.signKeyPair.publicKey
      )
    );
  }

  /**
   * Returns the public keys of the keySet.
   */
  public(): IdentityPublicKey {
    return {
      ...this.id,
      box: this.boxKeyPair.publicKey,
      sign: this.signKeyPair.publicKey
    };
  }

  /**
   * Returns encryptors for a type of resource.
   * @param type
   */
  encryptor(type: CipherType): Encryptor {
    switch (type) {
      case CipherType.NACL_ANON:
        return new EncryptAnonymous();
      case CipherType.NACL_SES:
        return new EncryptSES(
          this.boxKeyPair.secretKey,
          this.signKeyPair.secretKey
        );
    }
  }

  /**
   * Returns encryptors for a type of resource.
   * @param type
   */
  static decryptor(type: CipherType, secretKey: Uint8Array): Decryptor {
    switch (type) {
      case CipherType.NACL_ANON:
        return new DecryptAnonymous(secretKey);
      case CipherType.NACL_SES:
        return new DecryptSES(secretKey);
    }
  }

  /**
   * Returns decryptors for a type of resource.
   * @param type
   */
  decryptor(type: CipherType): Decryptor {
    return IdentityKeySet.decryptor(type, this.boxKeyPair.secretKey);
  }

  /**
   * Sign a message.
   * @param msg
   */
  sign(
    msg: Uint8Array,
    kind: api.IdentityAccessKeyKind = api.IdentityAccessKeyKind.WRITE
  ): Uint8Array {
    return nacl.sign.detached(msg, this.getSecretSignKey(kind).secretKey);
  }

  getSecretToken(): Uint8Array {
    return this.signKeyPair.secretKey;
  }

  private getSecretKey(kind: api.IdentityShareKind): Uint8Array {
    switch (kind) {
      case api.IdentityShareKind.BOX:
        return this.boxKeyPair.secretKey;
      case api.IdentityShareKind.SHARING:
        return this.sharingKeyPair.secretKey;
    }
  }

  private getSecretSignKey(kind: api.IdentityAccessKeyKind): nacl.SignKeyPair {
    switch (kind) {
      case api.IdentityAccessKeyKind.READ:
        return this.readKeyPair;
      case api.IdentityAccessKeyKind.WRITE:
        return this.signKeyPair;
    }
  }
}
