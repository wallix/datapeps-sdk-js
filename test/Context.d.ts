import * as DataPeps from "../src/DataPeps";
import { IdentityFields } from "../src/DataPeps";
export interface initCtx {
    seed: number;
}
export declare function init(): initCtx;
export interface adminCtx {
    admin: DataPeps.Identity<void>;
    adminSecret: Uint8Array;
    adminSession: DataPeps.Session;
}
export declare function admin(): Promise<adminCtx>;
export interface identityCtx {
    identity: DataPeps.Identity<any>;
    secret: Uint8Array;
}
export interface identityOptions {
    name?: string;
    kind?: string;
    payload?: Uint8Array;
}
export declare function identity(init: initCtx, options: identityOptions): Promise<identityCtx>;
export interface identityAndSessionCtx extends identityCtx {
    session: DataPeps.Session;
}
export declare function identityAndSession(init: initCtx, name: string, options?: identityOptions): Promise<identityAndSessionCtx>;
export interface childIdentityCtx extends identityCtx {
    parent: identityCtx;
}
export interface childIdentityOptions {
    kind?: string;
    payload?: Uint8Array;
    hasSecret?: boolean;
    sharingGroup?: string[];
    domain?: string;
}
export declare function childIdentity(parent: identityAndSessionCtx, init: initCtx, options?: childIdentityOptions): Promise<childIdentityCtx>;
export interface userPayload {
    description: string;
    firstname: string;
    lastname: string;
}
export interface userCtx extends identityCtx {
}
export declare function user(init: initCtx, name: string, domain?: string): Promise<userCtx>;
export interface userAndSessionCtx extends identityAndSessionCtx {
}
export declare function userAndSession(init: initCtx, name: string, domain?: string): Promise<userAndSessionCtx>;
export interface aliceBobCtx {
    alice: userAndSessionCtx;
    bob: userAndSessionCtx;
}
export declare function aliceBob(init: initCtx): Promise<aliceBobCtx>;
export interface aliceBobWithDeviceAndGroupCtx extends aliceBobCtx {
    aliceDevice: userAndSessionCtx;
    bobDevice: userAndSessionCtx;
    group: DataPeps.Identity<Uint8Array>;
}
export interface groupPayload {
    description: string;
}
export declare function aliceBobWithDeviceAndGroup(init: initCtx): Promise<aliceBobWithDeviceAndGroupCtx>;
export interface devCtx {
    dev: userAndSessionCtx;
    app: {
        identity: DataPeps.Identity<Uint8Array>;
        secret: Uint8Array;
    };
    apps: {
        identity: DataPeps.Identity<Uint8Array>;
        secret: Uint8Array;
    }[];
}
/**
 * Create a context with a developer that owns n application
 * @param init
 * @param n
 */
export declare function dev(init: initCtx, n?: number): Promise<devCtx>;
export interface identitiesCtx {
    identities: DataPeps.Identity<Uint8Array>[];
}
export declare function generateIdentities(init: initCtx, n: number, create: (field: IdentityFields, secret: Uint8Array) => Promise<any>, options?: identityOptions): Promise<identitiesCtx>;
export declare function registerIdentities(init: initCtx, n: number, options?: identityOptions): Promise<identitiesCtx>;
