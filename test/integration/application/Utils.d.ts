import { ApplicationJWT } from "../../../src/DataPeps";
export declare function getBadAlgoKey(algo: ApplicationJWT.Algorithm): string;
export declare function invalidKey(signAlgorithm: ApplicationJWT.Algorithm): Uint8Array;
export declare type JWTConfig = {
    secretKey: Uint8Array;
    config: {
        key: Uint8Array;
        signAlgorithm: ApplicationJWT.Algorithm;
        claimForLogin: string;
    };
};
export declare const configs: JWTConfig[];
