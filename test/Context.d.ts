import * as DataPeps from "../src/DataPeps";
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
export interface userPayload {
    description: string;
    firstname: string;
    lastname: string;
}
export interface userCtx {
    identity: DataPeps.Identity<Uint8Array>;
    secret: Uint8Array;
}
export declare function user(init: initCtx, name: string): Promise<userCtx>;
export interface userAndSessionCtx extends userCtx {
    session: DataPeps.Session;
}
export declare function userAndSession(init: initCtx, name: string): Promise<userAndSessionCtx>;
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
    app: DataPeps.Identity<Uint8Array>;
    apps: DataPeps.Identity<Uint8Array>[];
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
export declare function identities(init: initCtx, kind: string, n: number): Promise<identitiesCtx>;
