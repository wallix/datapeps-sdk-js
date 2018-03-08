import * as nacl from 'tweetnacl';
import { types } from './proto';
import { ID, IdentityPublicKey, ResourceAPI } from './DataPeps';
import { EncryptFuncs } from './CryptoFuncs';
import { SessionImpl } from './Session';
export declare enum ResourceType {
    ANONYMOUS = 0,
}
export declare class Resource<T> {
    id: ID;
    kind: string;
    type: ResourceType;
    payload: T;
    creator: IdentityPublicKey;
    private keypair;
    constructor(id: ID, kind: string, payload: T, keypair: nacl.BoxKeyPair, creator: IdentityPublicKey, type?: ResourceType);
    publicKey(): Uint8Array;
    encrypt(content: Uint8Array): Uint8Array;
    decrypt(message: Uint8Array): Uint8Array;
}
export declare class ResourceImpl implements ResourceAPI {
    private session;
    constructor(session: SessionImpl);
    _createBodyRequest<T>(payload: T, sharingGroup: string[], crypto: EncryptFuncs, options?: {
        serialize?: ((payload: T) => Uint8Array);
    }): Promise<{
        keypair: nacl.BoxKeyPair;
        body: {
            payload: Uint8Array;
            nonce: Uint8Array;
            publicKey: Uint8Array;
            sharingGroup: {
                login: string;
                version: number;
                nonce: Uint8Array;
                encryptedKey: Uint8Array;
            }[];
        };
    }>;
    create<T>(kind: string, payload: T, sharingGroup: string[], options?: {
        serialize?: ((payload: T) => Uint8Array);
        type?: types.ResourceType;
    }): Promise<Resource<T>>;
    get<T>(id: ID, options?: {
        assume?: string;
        parse?: ((u: Uint8Array) => T);
    }): Promise<Resource<T>>;
    _makeResourceFromResponse({resource, encryptedKey, creator}: types.IResourceGetResponse, parse?: any, assume?: any): Promise<Resource<any>>;
    delete(id: ID, options?: {
        soft?: boolean;
        assume?: string;
    }): Promise<void>;
    extendSharingGroup(id: ID, sharingGroup: string[], options?: {
        assume?: string;
    }): Promise<void>;
    private encryptForSharingGroup(text, sharingGroup, crypto);
}
