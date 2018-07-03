import { types } from './proto';
import { IdentityAPI, Identity, IdentityPublicKey, IdentityPublicKeyWithMetadata, IdentityShareLink, IdentityFields } from './DataPeps';
import { SessionImpl } from './Session';
export declare class IdentityImpl implements IdentityAPI {
    private session;
    constructor(session: SessionImpl);
    get(login: string): Promise<Identity<Uint8Array>>;
    create(identity: IdentityFields, options: {
        secret?: Uint8Array | string;
        sharingGroup?: string[];
        email?: string;
    }): Promise<void>;
    update(identity: IdentityFields): Promise<void>;
    list(options?: {
        offset?: number;
        limit?: number;
        domain?: string;
        search?: string;
        kind?: string;
    }): Promise<Identity<Uint8Array>[]>;
    getSharingGroup(login: string): Promise<IdentityShareLink[]>;
    getAccessGroup(login: string): Promise<IdentityShareLink[]>;
    renewKeys(login: string, secret?: string | Uint8Array): Promise<void>;
    getPublicKeyHistory(login: string): Promise<IdentityPublicKey[]>;
    getLockedVersions(login: string, options?: {
        withChallenge?: boolean;
    }): Promise<{
        publicKey: IdentityPublicKeyWithMetadata;
        challenge?: types.IdentityGetLockedVersionsResponse.IIdentityChallenge;
    }[]>;
    unlockVersions(login: string, secret: string | Uint8Array): Promise<IdentityPublicKeyWithMetadata[]>;
    extendSharingGroup(login: string, sharingGroup: string[]): Promise<void>;
    replaceSharingGroup(login: string, sharingGroup: string[]): Promise<void>;
    editSharingGraph(login: string, options?: {
        sharingGroup?: string[];
        overwriteKeys?: {
            secret: string | Uint8Array;
        };
    }): Promise<void>;
    private getSharingGraph(login, options?);
}
export declare class IdentityX {
    static fromTypes(t: types.IIdentity): Identity<Uint8Array>;
    static toTypes(i: Identity<Uint8Array>): types.IIdentity;
}
