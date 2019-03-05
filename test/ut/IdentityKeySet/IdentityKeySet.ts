import { expect } from "chai";
import {
  MasterPrivateSeed,
  IdentityKeySet,
  IdentityEncryptedKeySet
} from "../../../src/IdentityKeySet";
import { api } from "../../../src/proto";
import { IdentityKeySetAPI } from "../../../src/IdentityKeySetAPI";
import { Uint8Tool } from "../../../src/Tools";
import { CipherType } from "../../../src/Cryptor";
import { itError } from "../../Utils";
import { SDKKind } from "../../../src/Error";

describe("ut.IdentityKeySet", () => {
  let keySetID = { login: "alice", version: 9 };
  let secret = "This is my super private secret";

  it("generate", () => {
    let keySet = IdentityKeySet.generate(keySetID);
    expect(keySet.id).deep.equals(keySetID);
    let publicKeySet = keySet.public();
    expect(publicKeySet.login).equals(keySetID.login);
    expect(publicKeySet.version).equals(keySetID.version);
    expect(publicKeySet.box).not.null;
    expect(publicKeySet.sign).not.null;
  });

  function itEncryptDecrypt(type: CipherType) {
    it(`encrypt/decrypt ${CipherType[type]}`, () => {
      let aKeySet = IdentityKeySet.generate(keySetID);
      let bKeySet = IdentityKeySet.generate(keySetID);
      let encryptor = aKeySet.encryptor(type);
      let decryptor = bKeySet.decryptor(type);
      let message = Uint8Tool.encode("Hello world!");
      let encrypted = encryptor.encrypt(bKeySet.public(), message);
      expect(
        decryptor.decrypt({ ...encrypted, sign: aKeySet.public() })
      ).deep.equal(message);
    });
  }
  itEncryptDecrypt(CipherType.NACL_SES);
  itEncryptDecrypt(CipherType.NACL_ANON);

  it("export/recover with a master seed", () => {
    let keySet = IdentityKeySet.generate(keySetID);
    let seed = MasterPrivateSeed.fromSecret(secret);
    let encryptedKeySet = keySet.export(seed);
    let decryptedKeySet = IdentityKeySet.recover(
      keySetID,
      seed,
      encryptedKeySet
    );
    expectKeySetEquals(keySet, decryptedKeySet);
  });

  it("export/recover with a shared key", () => {
    let shareeKeySet = IdentityKeySet.generate({
      login: "sharee",
      version: 67
    });
    let keySet = IdentityKeySet.generate(keySetID);
    let encryptedKeySet = keySet.export();
    let sharedKey = keySet.shareKey(
      api.IdentityShareKind.SHARING,
      shareeKeySet.public()
    );
    let decryptedKeySet = IdentityKeySetAPI.recoverWithEncrytedKeys(
      keySetID,
      shareeKeySet,
      [
        {
          message: sharedKey.encryptedKey,
          nonce: sharedKey.nonce,
          sign: keySet.public()
        }
      ],
      encryptedKeySet
    );
    expectKeySetEquals(keySet, decryptedKeySet);
  });

  itError(
    "recover a keySet with wrong public keys should fail",
    async () => {
      let anotherKeySet = IdentityKeySet.generate(keySetID);
      let keySet = IdentityKeySet.generate(keySetID);
      let seed = MasterPrivateSeed.fromSecret(secret);
      let encryptedKeySet = keySet.export(seed);
      let anotherPublicKeySet = anotherKeySet.public();
      encryptedKeySet.boxEncrypted.publicKey = anotherPublicKeySet.box;
      encryptedKeySet.signEncrypted.publicKey = anotherPublicKeySet.sign;
      IdentityKeySet.recover(keySetID, seed, encryptedKeySet);
    },
    SDKKind.IdentityInvalidKeySet
  );

  itError(
    "recover a keySet that is not self encrypted should fail",
    async () => {
      let anotherKeySet = IdentityKeySet.generate(keySetID);
      let keySet = IdentityKeySet.generate(keySetID);
      let seed = MasterPrivateSeed.fromSecret(secret);
      let encryptedKeySet = keySet.export(seed);
      let anotherPublicKeySet = anotherKeySet.public();
      // Some unsafe access to private methods to build a not self encrypted keySet
      let { message, nonce } = anotherKeySet
        .encryptor(CipherType.NACL_SES)
        .encrypt(
          { box: seed.publicKey },
          (keySet as any).sharingKeyPair.secretKey
        );
      encryptedKeySet.sharingEncrypted.nonce = nonce;
      encryptedKeySet.sharingEncrypted.encryptedKey = message;
      encryptedKeySet.boxEncrypted = (anotherKeySet as any).exportKeyPairForKey(
        (keySet as any).boxKeyPair,
        (keySet as any).sharingKeyPair.publicKey
      );
      encryptedKeySet.signEncrypted = (anotherKeySet as any).exportKeyPairForKey(
        (keySet as any).signKeyPair,
        (keySet as any).sharingKeyPair.publicKey
      );
      encryptedKeySet.readEncrypted = (anotherKeySet as any).exportKeyPairForKey(
        (keySet as any).readKeyPair,
        (keySet as any).boxKeyPair.publicKey
      );
      encryptedKeySet.boxEncrypted.publicKey = anotherPublicKeySet.box;
      encryptedKeySet.signEncrypted.publicKey = anotherPublicKeySet.sign;
      IdentityKeySet.recover(keySetID, seed, encryptedKeySet);
    },
    SDKKind.IdentityInvalidKeySet
  );

  function expectKeySetEquals(a: IdentityKeySet, b: IdentityKeySet) {
    expect(b.id).deep.equals(a.id);
    expect(b.public()).deep.equals(a.public());
    let message = Uint8Tool.encode("Hello world!");
    let encrypted = a
      .encryptor(CipherType.NACL_SES)
      .encrypt(a.public(), message);
    let decrypted = b.decryptor(CipherType.NACL_SES).decrypt({
      message: encrypted.message,
      nonce: encrypted.nonce,
      sign: b.public()
    });
    expect(message).deep.equals(decrypted);
  }
});
