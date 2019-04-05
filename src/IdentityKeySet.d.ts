import { api } from "./proto";
import * as nacl from "tweetnacl";
import { Encryptor, Decryptor, CipherType } from "./Cryptor";
import { IdentityPublicKey, IdentityPublicKeyID } from "./IdentityAPI";
export interface MasterPublicSeed {
    masterSalt: Uint8Array;
    publicKey: Uint8Array;
}
export interface MasterPrivateSeed extends MasterPublicSeed {
    secretKey: Uint8Array;
}
export declare namespace MasterPrivateSeed {
    function fromSecret(secret: string | Uint8Array, masterSalt?: Uint8Array): MasterPrivateSeed;
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
export declare class IdentityKeySet {
    /** The version number of the IdentityKeySet. */
    id: IdentityPublicKeyID;
    private sharingKeyPair;
    private boxKeyPair;
    private signKeyPair;
    private readKeyPair;
    private constructor();
    /**
     * Generate a new IdentityKeySet.
     */
    static generate(id: IdentityPublicKeyID): IdentityKeySet;
    static fromDelegatedKeys(keys: api.IDelegatedKeys): IdentityKeySet;
    toDelegatedKeys(): api.IDelegatedKeys;
    /**
     * Export the IdentityKeySet in an encrypted form that can be safely transmitted.
     * @param creator The IdentityKeySet of the identity that exports.
     * @param seed An optional MasterSeed to export the sharing key.
     */
    export(seed?: MasterPublicSeed): IdentityEncryptedKeySet;
    private exportSharingKey(seed);
    private exportKeyPairForKey(keyPair, publicKey);
    /**
     * Recover an IdentityEncryptedKeySet thanks a master seed.
     * @param seed
     * @param encryptKeySet
     * @param creator
     */
    static recover(keySetID: IdentityPublicKeyID, seed: MasterPrivateSeed, encryptKeySet: IdentityEncryptedKeySet): IdentityKeySet;
    /**
     * Decrypt and set all the keys from a keySet that already have its sharingKeyPair initialized
     */
    static recoverWithEncryptedKeysFromSharingKey(id: IdentityPublicKeyID, sharingKeyPair: nacl.BoxKeyPair, encryptedKeys: {
        boxEncrypted: IdentityEncryptedKey;
        signEncrypted: IdentityEncryptedKey;
        readEncrypted?: IdentityEncryptedKey;
    }): IdentityKeySet;
    /**
     * Share a specific key of the IdentityKeySet.
     * @param kind The key to share.
     * @param sharer The IdentityKeySet that do the sharing.
     * @param publicKey The IdentityPublicKey that is the target of the sharing.
     * @return An encryptedKey and the nonce that be used to encrypt the key.
     */
    shareKey(kind: api.IdentityShareKind, publicKey: IdentityPublicKey): {
        encryptedKey: Uint8Array;
        nonce: Uint8Array;
    };
    /**
     * Sign the public keys of the given IdentityKeySet.
     * @param keySet The IdentityKeySet to sign.
     */
    signKeys(keySet: IdentityKeySet): Uint8Array;
    /**
     * Returns the public keys of the keySet.
     */
    public(): IdentityPublicKey;
    /**
     * Returns encryptors for a type of resource.
     * @param type
     */
    encryptor(type: CipherType): Encryptor;
    /**
     * Returns encryptors for a type of resource.
     * @param type
     */
    static decryptor(type: CipherType, secretKey: Uint8Array): Decryptor;
    /**
     * Returns decryptors for a type of resource.
     * @param type
     */
    decryptor(type: CipherType): Decryptor;
    /**
     * Sign a message.
     * @param msg
     */
    sign(msg: Uint8Array, kind?: api.IdentityAccessKeyKind): Uint8Array;
    getSecretToken(): Uint8Array;
    private getSecretKey(kind);
    private getSecretSignKey(kind);
}
