import { IdentityPublicKeyID, KvalAPI, KvalDelegatesAPI } from "./DataPeps";
import { SessionImpl } from "./Session";
export declare class Kval implements KvalAPI {
    private session;
    constructor(session: SessionImpl);
    put(namespace: string, key: Uint8Array, value: Uint8Array): Promise<void>;
    get(namespace: string, key: Uint8Array): Promise<{
        value: Uint8Array;
        pk: IdentityPublicKeyID;
    }>;
    private sign(r);
    private verify(r);
    private static messageToSign(_);
}
export declare class KvalDelegates implements KvalDelegatesAPI {
    private static NS;
    private kval;
    constructor(kval: Kval);
    put(login: string, application: string, delegates: string[]): Promise<void>;
    get(login: string, application: string): Promise<string[]>;
    private static key(login, application);
}
