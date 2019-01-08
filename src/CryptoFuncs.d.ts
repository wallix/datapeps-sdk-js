import { api } from "./proto";
import { IdentityPublicKey, IdentityKeyKind } from "./IdentityAPI";
export interface ResolvedCipher {
    message: Uint8Array;
    nonce: Uint8Array;
    sign: IdentityPublicKey;
}
export interface EncryptFuncs {
    encrypt(publicKey: Uint8Array, message: Uint8Array): {
        message: Uint8Array;
        nonce: Uint8Array;
    };
}
export interface DecryptFuncs {
    decrypt(cipher: ResolvedCipher): Uint8Array;
    decryptList(ciphers: ResolvedCipher[]): Uint8Array;
}
export declare class Encryption extends api.IdentityEncryption {
    secret: Uint8Array;
    private masterKeyPair;
    private sharingKeyPair;
    private boxKeyPair;
    private signKeyPair;
    private readKeyPair;
    constructor(properties?: api.IIdentityEncryption);
    encrypt(type: api.ResourceType): EncryptFuncs;
    decrypt(type: api.ResourceType, secretKey?: Uint8Array): DecryptFuncs;
    getPublic(): api.IdentityEncryption;
    generate(secret: Uint8Array, creator: Encryption): void;
    generateWithMasterPublicKey(publicKey: Uint8Array, salt: Uint8Array, creator: Encryption): void;
    recoverWithKeys(keys: api.IDelegatedKeys, creator: IdentityPublicKey): void;
    recover(secret: Uint8Array, creator: IdentityPublicKey): void;
    private generateMasterSalt();
    private generateMasterKey();
    private generateKeys(creator);
    sign(msg: Uint8Array): Uint8Array;
    encryptKey(kind: IdentityKeyKind, encryption: Encryption, publicKey: Uint8Array): {
        message: Uint8Array;
        nonce: Uint8Array;
    };
    getPublicKey(kind: IdentityKeyKind): Uint8Array;
    private getSecretKey(kind);
    private encryptKeyForMasterKey({publicKey, secretKey}, creator);
    private decryptKeyWithMasterKey({nonce, publicKey, encryptedKey}, creator);
    private encryptKeyForKey(kind, {publicKey, secretKey}, creator);
    private decryptKeyWithKey(kind, {nonce, publicKey, encryptedKey}, creator);
}
export declare class EncryptAnonymous implements EncryptFuncs {
    encrypt(publicKey: Uint8Array, message: Uint8Array): {
        message: Uint8Array;
        nonce: Uint8Array;
    };
}
