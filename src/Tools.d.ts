/// <reference types="long" />
export declare class Base64 {
    /**
     * Decode a base64 string to an Uint8Array
     */
    static decode(sBase64: string): Uint8Array;
    /**
     * Encode a Uint8Array to a base64 string
     */
    static encode(aBytes: any): string;
}
export declare class Uint8Tool {
    static encode(s: string): Uint8Array;
    static decode(u: Uint8Array): string;
    static convert(arg: string | Uint8Array): Uint8Array;
    /**
     * Fill the whole array with value
     */
    static fill(array: Uint8Array, value: number): void;
    /**
     * Compute the xor of two arrays into the first one
     */
    static xor(array0: Uint8Array, array1: Uint8Array): void;
    /**
     * Returns the concat of two array
     */
    static concat(ar1: Uint8Array, ar2: Uint8Array): Uint8Array;
    static equals(a: Uint8Array, b: Uint8Array): boolean;
}
export declare class Crypto {
    /**
     * Password-Based Key Derivation Function 2
     * @param password The password to derive
     * @param salt The salt used to derive
     * @param nb The number of iteration
     * @param length of the desired key
     * @return The derivated key
     */
    static PBKDF2(password: Uint8Array, salt: Uint8Array, c: number, length: number): Uint8Array;
}
export declare function timestampToDate(timestamp: number | Long): Date;
