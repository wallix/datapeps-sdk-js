import * as nacl from "tweetnacl";
import { IdentityPublicKeyID } from "./IdentityAPI";
import { wallix } from "./proto";
import {
  IdentityKeySet,
  MasterPrivateSeed,
  MasterPublicSeed,
  IdentityEncryptedKeySet
} from "./IdentityKeySet";
import { SignedCipher, CipherType } from "./Cryptor";

import api = wallix.gopeps.protobuf.datapeps;

/**
 * Declare some usefull function that generates, exports and recovers IdentityKeySet to objects that are formatted to the API.
 */
export namespace IdentityKeySetAPI {
  /**
   * Generate a new IdentityKeySet then export with the secret as seed.
   * @param id The identifer of the IdentityKeySet to generate.
   * @param seed
   */
  export function initWithSecret(
    id: IdentityPublicKeyID,
    secret: Uint8Array | string
  ): {
    encryptedKeySet: api.IIdentityEncryptedKeySet;
    keySet: IdentityKeySet;
  } {
    let seed = secret == null ? null : MasterPrivateSeed.fromSecret(secret);
    return IdentityKeySetAPI.initWithMasterSeed(id, seed);
  }

  /**
   * Generate a new IdentityKeySet then export with the a seed.
   * @param id The identifer of the IdentityKeySet to generate.
   * @param seed
   */
  export function initWithMasterSeed(
    id: IdentityPublicKeyID,
    seed: MasterPublicSeed
  ): {
    encryptedKeySet: api.IIdentityEncryptedKeySet;
    keySet: IdentityKeySet;
  } {
    let keySet = IdentityKeySet.generate(id);
    return {
      keySet,
      encryptedKeySet: {
        ...keySet.export(seed),
        masterSalt: seed == null ? null : seed.masterSalt,
        masterPublicKey: seed == null ? null : seed.publicKey,
        version: id.version
      }
    };
  }

  /**
   * Recover an IdentityKeySet from encrypted keys.
   * @param id
   * @param encryptedKeys
   */
  export function recoverWithEncrytedKeys(
    id: IdentityPublicKeyID,
    keySet: IdentityKeySet,
    sharingKey: SignedCipher[],
    encryptedKeys: {
      boxEncrypted: api.IIdentityEncryptedKey;
      signEncrypted: api.IIdentityEncryptedKey;
      readEncrypted?: api.IIdentityEncryptedKey;
    }
  ): IdentityKeySet {
    // Decrypt the sharingKey with this IdentityKeySet
    let sharingKeyPair = nacl.box.keyPair.fromSecretKey(
      keySet.decryptor(CipherType.NACL_SES).decryptList(sharingKey)
    );
    // Decrypt the rest of the IdentityKeySet
    return IdentityKeySet.recoverWithEncryptedKeysFromSharingKey(
      id,
      sharingKeyPair,
      encryptedKeys as IdentityEncryptedKeySet
    );
  }

  export function recoverWithPathElt(
    keySet: IdentityKeySet,
    elt: api.IdentityGetKeySetResponse.IPathElt
  ): IdentityKeySet {
    let sharingKey = keySet.decryptor(CipherType.NACL_SES).decrypt({
      message: elt.sharedKey.message,
      nonce: elt.sharedKey.nonce,
      sign: {
        login: elt.id.login,
        version: elt.id.version,
        box: elt.encryptedKeySet.boxEncrypted.publicKey,
        sign: elt.encryptedKeySet.signEncrypted.publicKey
      }
    });
    let sharingKeyPair = nacl.box.keyPair.fromSecretKey(sharingKey);
    return IdentityKeySet.recoverWithEncryptedKeysFromSharingKey(
      elt.id as IdentityPublicKeyID,
      sharingKeyPair,
      elt.encryptedKeySet as IdentityEncryptedKeySet
    );
  }

  /**
   * Recover an IdentityKeySet from encrypted keys.
   * @param id
   * @param encryptedKeys
   */
  export function recoverWithSecret(
    login: string,
    secret: Uint8Array | string,
    encryptedKeySet: api.IIdentityEncryptedKeySet
  ): IdentityKeySet {
    let seed = MasterPrivateSeed.fromSecret(secret, encryptedKeySet.masterSalt);
    return IdentityKeySet.recover(
      { login, version: encryptedKeySet.version },
      seed,
      encryptedKeySet as IdentityEncryptedKeySet
    );
  }
}
