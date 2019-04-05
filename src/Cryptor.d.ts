import { IdentityPublicKey } from "./IdentityAPI";
export declare enum CipherType {
    NACL_SES = 0,
    NACL_ANON = 1,
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
    encrypt(publicKey: PublicEncryptKey, message: Uint8Array): {
        message: Uint8Array;
        nonce: Uint8Array;
    };
}
export interface Decryptor {
    decrypt(cipher: SignedCipher): Uint8Array;
    decryptList(ciphers: SignedCipher[]): Uint8Array;
}
export declare class EncryptAnonymous implements Encryptor {
    encrypt(publicKey: PublicEncryptKey, message: Uint8Array): {
        message: Uint8Array;
        nonce: Uint8Array;
    };
}
export declare class DecryptAnonymous implements Decryptor {
    private secretKey;
    constructor(secretKey: Uint8Array);
    static decrypt(secretKey: Uint8Array, cipher: SignedCipher): Uint8Array;
    decrypt(cipher: SignedCipher): Uint8Array;
    static decryptList(secretKey: Uint8Array, ciphers: SignedCipher[]): Uint8Array;
    decryptList(ciphers: SignedCipher[]): Uint8Array;
}
export declare class EncryptSES implements Encryptor {
    private boxSecretKey;
    private signSecretKey;
    constructor(boxSecretKey: Uint8Array, signSecretKey: Uint8Array);
    encrypt(publicKey: IdentityPublicKey, message: Uint8Array): {
        message: Uint8Array;
        nonce: Uint8Array;
    };
}
export declare class DecryptSES implements Decryptor {
    private secretKey;
    constructor(secretKey: Uint8Array);
    static decrypt(secretKey: any, {message, nonce, sign}: SignedCipher): Uint8Array;
    decrypt(cipher: SignedCipher): Uint8Array;
    static decryptList(secretKey: Uint8Array, ciphers: SignedCipher[]): Uint8Array;
    decryptList(ciphers: SignedCipher[]): Uint8Array;
}
