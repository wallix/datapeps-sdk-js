import { ApplicationJWT } from "../../../src/DataPeps";
import { devCtx, initCtx } from "../../Context";
export declare const HSKey: Uint8Array;
export declare const RSKey: Uint8Array;
export declare const RSSecretKey: Uint8Array;
export declare const ESKey: Uint8Array;
export declare const ESSecretKey: Uint8Array;
export declare function getBadAlgoKey(algo: ApplicationJWT.Algorithm): string;
export declare const configs: {
    secretKey: Uint8Array;
    config: {
        key: Uint8Array;
        signAlgorithm: number;
        claimForLogin: string;
    };
}[];
/**
 * Create a devCtx with n applications that are configured with all different
 * JWT configs + 1 application that is not configured.
 */
export declare function devWithAllConfigs(init: initCtx): Promise<devCtx>;
