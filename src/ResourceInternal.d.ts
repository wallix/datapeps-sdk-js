import * as nacl from "tweetnacl";
import { Resource, ResourceType } from "./ResourceAPI";
import { api } from "./proto";
import { Encryption, EncryptFuncs } from "./CryptoFuncs";
import { IdentityPublicKey } from "./IdentityAPI";
import { Session } from "./Session";
import { ID } from "./ID";
export declare class ResourceBox<T> implements Resource<T> {
    id: ID;
    kind: string;
    type: ResourceType;
    payload: T;
    creator: IdentityPublicKey;
    private keypair;
    constructor(id: ID, kind: string, payload: T, keypair: nacl.BoxKeyPair, creator: IdentityPublicKey, type?: ResourceType);
    publicKey(): Uint8Array;
    encrypt<T extends Uint8Array | string>(content: T): T;
    private encryptUint8Array(content);
    private encryptString(clear);
    decrypt<T extends Uint8Array | string>(message: T): T;
    private decryptUint8Array(message);
    private decryptString(cipher);
}
export declare function createWithEncryption<T>(kind: string, payload: T, encryption: Encryption, options?: {
    serialize?: ((payload: T) => Uint8Array);
}): {
    resourceRequestBody: api.IResourcePostRequest;
    resource: ResourceBox<T>;
};
export declare function makeResourceFromResponse<T>({resource, encryptedKey, creator}: api.IResourceGetResponse, typeOfKey: api.ResourceType, session: Session, parse?: any, assume?: string): Promise<ResourceBox<T>>;
export declare function makeResource<T>({resource, encryptedKey, creator}: api.IResourceWithKey, typeOfKey: api.ResourceType, session: Session, boxKey?: Uint8Array, parse?: any): Promise<ResourceBox<T>>;
export declare function makeResourcesFromResponses<T>(resources: api.IResourceWithKey[], session: Session, parse?: any): Promise<ResourceBox<T>[]>;
export declare function createBodyRequest<T>(payload: T, sharingGroup: string[], crypto: EncryptFuncs, session: Session, options?: {
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
export declare function encryptForSharingGroup(text: Uint8Array, sharingGroup: string[], crypto: EncryptFuncs, session: Session): Promise<{
    login: string;
    version: number;
    nonce: Uint8Array;
    encryptedKey: Uint8Array;
}[]>;
