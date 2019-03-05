import { IdentityPublicKeyID } from "./IdentityAPI";
import { api } from "./proto";
import { IdentityKeySet, MasterPublicSeed } from "./IdentityKeySet";
import { SignedCipher } from "./Cryptor";
/**
 * Declare some usefull function that generates, exports and recovers IdentityKeySet to objects that are formatted to the API.
 */
export declare namespace IdentityKeySetAPI {
    /**
     * Generate a new IdentityKeySet then export with the secret as seed.
     * @param id The identifer of the IdentityKeySet to generate.
     * @param seed
     */
    function initWithSecret(id: IdentityPublicKeyID, secret: Uint8Array | string): {
        encryptedKeySet: api.IIdentityEncryptedKeySet;
        keySet: IdentityKeySet;
    };
    /**
     * Generate a new IdentityKeySet then export with the a seed.
     * @param id The identifer of the IdentityKeySet to generate.
     * @param seed
     */
    function initWithMasterSeed(id: IdentityPublicKeyID, seed: MasterPublicSeed): {
        encryptedKeySet: api.IIdentityEncryptedKeySet;
        keySet: IdentityKeySet;
    };
    /**
     * Recover an IdentityKeySet from encrypted keys.
     * @param id
     * @param encryptedKeys
     */
    function recoverWithEncrytedKeys(id: IdentityPublicKeyID, keySet: IdentityKeySet, sharingKey: SignedCipher[], encryptedKeys: {
        boxEncrypted: api.IIdentityEncryptedKey;
        signEncrypted: api.IIdentityEncryptedKey;
        readEncrypted?: api.IIdentityEncryptedKey;
    }): IdentityKeySet;
    function recoverWithPathElt(keySet: IdentityKeySet, elt: api.IdentityGetKeySetResponse.IPathElt): IdentityKeySet;
    /**
     * Recover an IdentityKeySet from encrypted keys.
     * @param id
     * @param encryptedKeys
     */
    function recoverWithSecret(login: string, secret: Uint8Array | string, encryptedKeySet: api.IIdentityEncryptedKeySet): IdentityKeySet;
}
