import { Error, SDKKind } from "./Error";
import {
  IdentityKeySet,
  MasterPrivateSeed,
  MasterPublicSeed
} from "./IdentityKeySet";
import { Uint8Tool, timestampToDate } from "./Tools";
import { Session, AssumeOptions } from "./Session";
import { client } from "./HTTP";
import {
  IdentitySerializer,
  IdentitySortingOrder,
  IdentityRequestsUtils
} from "./IdentityInternal";
import { api } from "./proto";
import { SignedCipher } from "./Cryptor";
import { IdentityKeySetAPI } from "./IdentityKeySetAPI";

export { IdentitySortingOrder };

/**
 * An {@Identity} owns several keys, this is a reference to the unique version of an identity public key.
 */
export interface IdentityPublicKeyID {
  login: string;
  version: number;
}

/**
 * An object containing a locked key
 */
export interface LockedVersion {
  /** The publicKey of the locked key */
  publicKey: IdentityPublicKeyWithMetadata;
}

/**
 * An {@Identity} owns several keys, this refers to the unique version of an identity public key.
 */
export interface IdentityPublicKey extends IdentityPublicKeyID {
  sign: Uint8Array;
  box: Uint8Array;
}

export namespace IdentityPublicKey {
  const bs58 = require("bs58");
  const sha = require("sha.js");
  /**
   * Returns the hash of an IdentityPublicKey.
   * The hash is computed thanks a sha2156 of the concat of box and sign key.
   * @param key The key to hash.
   * @return(h) The hash of the key.
   */
  export const hash = (key: IdentityPublicKey): Uint8Array => {
    let h = Uint8Tool.concat(key.box, key.sign);
    return new Uint8Array(new sha.sha256().update(h).digest());
  };

  /**
   * Returns a human redeable representation of the an IdentityPublicKey.
   * The representation is the hash of the IdentityPublicKey encoded in base58.
   * @param key The key to print.
   * @return(s) The string representation of the key.
   */
  export const print = (key: IdentityPublicKey): string => {
    return bs58.encode(IdentityPublicKey.hash(key));
  };
}

/**
 * an identity public key with its creation date
 */
export interface IdentityPublicKeyWithMetadata extends IdentityPublicKey {
  created: Date;
}

/**
 * The description of the fields of an identity.
 */
export interface IdentityFields {
  /** The login of the identity. */
  login: string;
  /** A descriptive name for the identity. */
  name: string;
  /** The kind of the identity. */
  kind: string;
  /** A payload to have a more structured description of the identity. */
  payload: Uint8Array;
}

/**
 * The description of the state of an identity.
 */
export interface Identity<T> {
  /** The login of the identity. */
  login: string;
  /** A descriptive name for the identity. */
  name: string;
  /** The kind of the identity. */
  kind: string;
  /** The creation date of the identity. */
  created: Date;
  /** Indicates if the identity is an admin. */
  admin: boolean /** Indicates if the identity is active. */;
  active: boolean;
  /** A payload to have a more structured description of the identity. */
  payload: T;
}

/**
 * IdentityKeyKind indicates which kind of keys is shared has between two identities.
 */
export type IdentityKeyKind = api.IdentityShareKind;

/**
 * IdentityShareLink describes a share link between two identities.
 */
export type IdentityShareLink = {
  id: IdentityPublicKeyID;
  kind: IdentityKeyKind;
  locked: boolean;
};

/** Allows to indicate which kind of field should be sorted. */
export enum IdentitySortingField {
  LOGIN = 0,
  CREATED = 1,
  KIND = 2
}

export class IdentityAPI {
  private session: Session;

  constructor(session: Session) {
    this.session = session;
  }

  /**
   * Get the latest public key of the given identity login.
   * @param login The login of identity to get the key.
   * @return(p) On success the promise will be resolved with the public key of `login`.
   * On error the promise will be rejected with an {@link Error} with kind
   * - `IdentityNotFound` if the identity is not found.
   */
  static async getLatestPublicKeys(
    logins: string[]
  ): Promise<IdentityPublicKey[]> {
    let {
      body: { publicKeys }
    } = await client.doRequest({
      method: "POST",
      expectedCode: 200,
      path: "/api/v4/identities/latestPublicKeys",
      body: api.IdentityGetLatestPublicKeysRequest.encode({ logins }).finish(),
      response: api.IdentityGetLatestPublicKeysResponse.decode,
      headers: new Headers({
        "content-type": "application/x-protobuf"
      })
    });
    return publicKeys as IdentityPublicKey[];
  }

  /**
   * Get the latest public key of a list of identities.
   * @param logins The login of identities to get the key.
   * @return(p) On success the promise will be resolved with list of the public key in the same order of the `logins` list.
   * On error the promise will be rejected with an {@link Error} with kind
   * - `IdentityNotFound` if an identity is not found.
   */
  static async getLatestPublicKey(login: string): Promise<IdentityPublicKey> {
    let [pk] = await IdentityAPI.getLatestPublicKeys([login]);
    return pk;
  }

  /**
   * Get an identity from the login.
   * @param login The login of the identity to get.
   * @return(p) On success the promise will be resolved with the identity.
   * On error the promise will be rejected with an {@link Error} with kind:
   * - `IdentityNotFound` if the `login` does not exists.
   */
  async get(login: string): Promise<Identity<Uint8Array>> {
    return await this.session.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: "/api/v4/identity/" + encodeURI(login),
      response: r => IdentitySerializer.deserialize(api.Identity.decode(r))
    });
  }

  /**
   * List identities registered on DataPeps.
   * @param options A collection of options:
   *  - offset: Skip this number of results.
   *  - limit: Limit the length of the result (default: 10).
   *  - search: select only logins containing this string
   *  - kind: Filter on a specific kind
   *  - sortingField: Sort the result according to this field, default is CREATED
   *  - sortingOrder: Specifies the sorting order "ASC" or "DESC", default is ASC
   * @return(p) On success the promise will be resolved with a list.
   */
  async list(options?: {
    offset?: number;
    limit?: number;
    search?: string;
    kind?: string;
    sortingField?: IdentitySortingField;
    sortingOrder?: IdentitySortingOrder;
  }): Promise<{
    identities: Identity<Uint8Array>[];
    totalIdentitiesCount: number;
  }> {
    options = options == null ? {} : options;
    if (options.sortingField == null) {
      options.sortingField = IdentitySortingField.CREATED;
    }
    let sortingOrder = IdentityRequestsUtils.resolveSortingOrder(
      options.sortingOrder
    );
    return await this.session.doProtoRequest({
      method: "POST",
      expectedCode: 200,
      path: "/api/v4/identities/list",
      body: api.IdentityListRequest.encode({
        options: {
          offset: options.offset,
          limit: options.limit,
          loginPrefix: options.search,
          kind: options.kind,
          sortedBy: options.sortingField,
          order: sortingOrder
        }
      }).finish(),
      response: r => {
        let {
          identities,
          totalIdentitiesCount
        } = api.IdentityListResponse.decode(r);
        return {
          identities: identities.map(IdentitySerializer.deserialize),
          totalIdentitiesCount
        };
      }
    });
  }

  /**
   * Create a new identity.
   * @param identity The description of the identity.
   * @param options A collection of options:
   *  - secret: An optional secret associated with the created identity that could be used to login.
   *  - sharingGroup: An optional list of identity logins that are shared with the created identity.
   *  - email: An optional email associated with the identity to create.
   * @return(p) On success the promise will be resolved with void.
   * On error the promise will be rejected with an {@link Error} with kind
   * - `IdentityInvalidLogin` if identity.login is not a valid login.
   * - `IdentityAlreadyExists` if identity.login already exists.
   */
  async create(
    identity: IdentityFields,
    options: {
      secret?: Uint8Array | string;
      sharingGroup?: string[];
      email?: string;
    }
  ): Promise<void> {
    options = options == null ? {} : options;
    let osharingGroup =
      options.sharingGroup == null ? [] : options.sharingGroup;
    let { encryptedKeySet, keySet } = IdentityKeySetAPI.initWithSecret(
      { version: 1, login: identity.login },
      options.secret
    );
    let publicKeys = await this.session.getLatestPublicKeys(osharingGroup);
    let sharingGroup = IdentityAPI.createSharingGroup(keySet, publicKeys);
    return await this.session.doProtoRequest<void>({
      method: "POST",
      expectedCode: 201,
      path: "/api/v4/identity",
      body: api.IdentityCreateRequest.encode({
        identity,
        sharingGroup,
        encryption: encryptedKeySet,
        email: options.email,
        signChain: (this.session as any).encryption.sign(
          Uint8Tool.concat(
            encryptedKeySet.boxEncrypted.publicKey,
            encryptedKeySet.signEncrypted.publicKey
          )
        )
      }).finish()
    });
  }

  /**
   * Update an identity.
   * @param identity The fields to update
   * @return(p) On success the promise will be resolved with void.
   * On error the promise will be rejected with an {@link Error} with kind
   * - `IdentityNotFound` if identity.login doesn't not exists.
   */
  async update(identity: IdentityFields): Promise<void> {
    return await this.session.doProtoRequest<void>({
      method: "PUT",
      expectedCode: 200,
      path: "/api/v4/identity/" + encodeURI(identity.login),
      body: api.IdentityFields.encode(identity).finish()
    });
  }

  /**
   * Renew the keys of an identity.
   * @param login The login of the identity to renew the keys.
   * @param secret An optional secret to renew keys, if not retain the old secret as still valid.
   * @return(p) On success the promise will be resolved with void.
   * On error the promise will be rejected with an {@link Error} with kind
   * - `IdentityNotFound` if the identity cannot be accessed.
   */
  async renewKeys(login: string, secret?: string | Uint8Array): Promise<void> {
    // Get the current IdentityEncryptedKeySet and its sharingGroup
    let assume: AssumeOptions = {
      login,
      kind: api.IdentityAccessKeyKind.WRITE
    };
    let { encryption, sharingGroup } = await this.session.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/keysToRenew",
      response: api.IdentityGetKeysToRenewResponse.decode,
      assume
    });
    let currentKeySet = assume.keySet;
    // Generate the next IdentityKeySet.
    // The creator of this IdentityKeySet is the owner of the session.
    let nextKeySetID = {
      version: currentKeySet.id.version + 1,
      login: currentKeySet.id.login
    };
    let { encryptedKeySet: nextEncryptedKeySet, keySet: nextKeySet } =
      secret != null
        ? IdentityKeySetAPI.initWithSecret(nextKeySetID, secret)
        : IdentityKeySetAPI.initWithMasterSeed(nextKeySetID, {
            publicKey: encryption.masterPublicKey,
            masterSalt: encryption.masterSalt
          });
    // Create the backward link,
    // i.e. share the key of the current IdentityKeySet with the next IdentityKeySet
    let backward = currentKeySet.shareKey(
      api.IdentityShareKind.SHARING,
      nextKeySet.public()
    );
    // Share the next IdentityKeySet with the sharingGroup of the previous IdentityKeySet
    let nextSharingGroup = IdentityAPI.createSharingGroup(
      nextKeySet,
      sharingGroup as IdentityPublicKey[]
    );
    // Sign the public keys of the next IdentityKeySet with the current IdentityKeySet
    let signChain = currentKeySet.signKeys(nextKeySet);
    // Push the next IdentityKeySet to DataPeps
    await this.session.doProtoRequest({
      method: "POST",
      expectedCode: 201,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/keysToRenew",
      body: api.IdentityPostKeysToRenewRequest.encode({
        encryption: nextEncryptedKeySet,
        sharingGroup: nextSharingGroup,
        backward,
        signChain
      }).finish(),
      assume
    });
  }

  /**
   * Get the sharing group of an identity. The sharing group of an identity is the set of identities that can
   * access to this identity.
   * @param login The login of the identity to get the sharing group.
   * @return(p) On success the promise will be resolved with a list of links that describe accesses to the identity.
   * On error the promise will be rejected with an {@link Error} with kind
   * - `IdentityNotFound` if the identity cannot be accessed.
   */
  async getSharingGroup(login: string): Promise<IdentityShareLink[]> {
    return await this.session.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGroup",
      response: r =>
        api.IdentityGetSharingGroupResponse.decode(r)
          .sharingGroup as IdentityShareLink[]
    });
  }

  /**
   * Extend the sharing group of an identity.
   * @param login The login of the identity to extend.
   * @param sharingGroup The list of identity logins to add to the sharing group of the identity.
   * @return(p) On success the promise will be resolved with void.
   * On error the promise will be rejected with an {@link Error} with kind
   * - `IdentityNotFound` if the identity cannot be accessed.
   */
  async extendSharingGroup(
    login: string,
    sharingGroup: string[]
  ): Promise<void> {
    // Get the latest IdentityKeySet
    let keySet = await this.session.getIdentityKeySet(login);
    // Share key for the sharingGroup
    let publicKeys = await this.session.getLatestPublicKeys(sharingGroup);
    let encryptedKeys = IdentityAPI.createSharingGroup(keySet, publicKeys);
    // patch the sharingGroup to DataPeps
    return await this.session.doProtoRequest<void>({
      method: "PATCH",
      expectedCode: 201,
      path: "/api/v4/identity/" + encodeURI(login) + "/sharingGroup",
      assume: { login, kind: api.IdentityAccessKeyKind.WRITE },
      body: api.IdentityShareRequest.encode({
        version: keySet.id.version,
        sharingGroup: encryptedKeys
      }).finish()
    });
  }

  /**
   * Replace the sharing group of an identity.
   * @param login The login of the identity to replace the keys.
   * @param sharingGroup The list of identity logins that will comprise the new sharing group of the identity.
   * @return(p) On success the promise will be resolved with void.
   * On error the promise will be rejected with an {@link Error} with kind
   * - `IdentityInvalidLogin` if the identity.login is not a valid login.
   * - `IdentityNotFound` if the identity cannot be accessed.
   */
  async replaceSharingGroup(
    login: string,
    sharingGroup: string[]
  ): Promise<void> {
    // Get the current sharing graph of the identity
    let graph = await this.getSharingGraphWithKeySet(login);
    if (graph[0].value.keySet.id.login != login) {
      throw new Error({
        kind: SDKKind.SDKInternalError,
        payload: { login, graph, hint: "unexpected graph" }
      });
    }
    // Replace the sharing group of the root identity
    graph[0].sharingGroup = await this.session.getLatestPublicKeys(
      sharingGroup
    );
    // Filter only latest identites
    graph = graph.filter(elt => elt.latest);

    let nextPublicKeys = new Map<string, IdentityPublicKey>();
    let encryptedGraph = graph
      .map(elt => {
        // Create the next IdentityKeySet, for each identities in the graph
        let keySetID = {
          version: elt.value.keySet.id.version + 1,
          login: elt.value.keySet.id.login
        };
        let { encryptedKeySet, keySet } = IdentityKeySetAPI.initWithMasterSeed(
          keySetID,
          elt.value.seed
        );
        // Put the next IdentityPublicKey in a map
        nextPublicKeys.set(keySetID.login, keySet.public());
        return {
          elt,
          nextencryptedKeySet: encryptedKeySet,
          nextKeySet: keySet
        };
      })
      .map(({ elt, nextencryptedKeySet, nextKeySet }) => {
        let currentKeySet = elt.value.keySet;
        // Create the backward link
        let backward = currentKeySet.shareKey(
          api.IdentityShareKind.SHARING,
          nextKeySet.public()
        );
        // Share the next IdentityKeySet with the sharingGroup of the previous IdentityKeySet
        let sharingGroup = elt.sharingGroup.map(publicKey => {
          let kind = api.IdentityShareKind.SHARING;
          let nextPublicKey = nextPublicKeys.get(publicKey.login);
          publicKey = nextPublicKey != null ? nextPublicKey : publicKey;
          let { encryptedKey, nonce } = nextKeySet.shareKey(
            kind,
            publicKey as IdentityPublicKey
          );
          return {
            login: publicKey.login,
            version: publicKey.version,
            encryptedKey,
            nonce,
            kind
          };
        });
        // Sign the public keys of the next IdentityKeySet with the current IdentityKeySet
        let signChain = currentKeySet.signKeys(nextKeySet);
        return {
          login: nextKeySet.id.login,
          version: nextKeySet.id.version,
          encryption: nextencryptedKeySet,
          signChain,
          sharingGroup,
          backward
        };
      });
    return await this.session.doProtoRequest<void>({
      method: "POST",
      expectedCode: 201,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGraph",
      assume: { login, kind: api.IdentityAccessKeyKind.WRITE },
      body: api.IdentityPostSharingGraphRequest.encode({
        graph: encryptedGraph
      }).finish()
    });
  }

  /**
   * Generate new keys for an identity.
   * The identity will no longer be able access any things (resources, shared identities, ...) that have previously been shared with it.
   * Only administrator can do this.
   * @param login The login of the identity to set the active status.
   * @return(p) On success the promise will be resolved with void.
   * On error the promise will be rejected with an {@link Error} with kind:
   * - `IdentityNotFound` if `login` does not exists.
   * - `IdentityNotAdmin` if the identity logged along the current session is not an admin.
   * - `IdentityNotAdminDomain` if the identity logged along with the current session cannot adinistrate the domain of `login`.
   */
  async overwriteKeys(
    login: string,
    secret: string | Uint8Array
  ): Promise<void> {
    // Get the current sharing graph of the identity
    let graph = await this.getSharingGraphWithPublicKey(login);
    if (graph[0].value.id.login != login) {
      throw new Error({
        kind: SDKKind.SDKInternalError,
        payload: { login, graph, hint: "unexpected graph" }
      });
    }
    // Filter only latest identites
    graph = graph.filter(elt => elt.latest);

    // We do not replace the identities that are shared by another identity
    // as overwrited identities cannot access to their history.
    // So we update only:
    // - the main identity
    // - the graph elements in which the only element in sharing group is the main identity (for example a delegate, but not a group)
    graph = graph.filter(
      elt =>
        elt.value.id.login == login ||
        (elt.sharingGroup.length == 1 && elt.sharingGroup[0].login == login)
    );
    // Create the overwrited graph of identities
    let nextPublicKeys = new Map<string, IdentityPublicKey>();
    let encryptedGraph = graph
      .map(elt => {
        // Create the next IdentityKeySet, for each identities in the graph
        let keySetID = {
          version: elt.value.id.version + 1,
          login: elt.value.id.login
        };
        let { encryptedKeySet, keySet } =
          elt.value.id.login == login
            ? IdentityKeySetAPI.initWithSecret(keySetID, secret)
            : IdentityKeySetAPI.initWithMasterSeed(keySetID, elt.value.seed);
        // Put the next IdentityPublicKey in a map
        nextPublicKeys.set(keySetID.login, keySet.public());
        return {
          elt,
          nextencryptedKeySet: encryptedKeySet,
          nextKeySet: keySet
        };
      })
      .map(({ elt, nextencryptedKeySet, nextKeySet }) => {
        // administrator signs the 'overwrited' new version of identity
        let signChain = (this.session as any).encryption.sign(
          Uint8Tool.concat(
            nextencryptedKeySet.boxEncrypted.publicKey,
            nextencryptedKeySet.signEncrypted.publicKey
          )
        );
        // Share the next IdentityKeySet with the sharingGroup of the previous IdentityKeySet
        let sharingGroup = elt.sharingGroup.map(publicKey => {
          let kind = api.IdentityShareKind.SHARING;
          let nextPublicKey = nextPublicKeys.get(publicKey.login);
          publicKey = nextPublicKey != null ? nextPublicKey : publicKey;
          let { encryptedKey, nonce } = nextKeySet.shareKey(
            kind,
            publicKey as IdentityPublicKey
          );
          return {
            login: publicKey.login,
            version: publicKey.version,
            encryptedKey,
            nonce,
            kind
          };
        });
        return {
          login: nextKeySet.id.login,
          version: nextKeySet.id.version,
          encryption: nextencryptedKeySet,
          signChain,
          sharingGroup
        };
      });
    return await this.session.doProtoRequest<void>({
      method: "POST",
      expectedCode: 201,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGraph",
      body: api.IdentityPostSharingGraphRequest.encode({
        graph: encryptedGraph
      }).finish()
    });
  }

  /**
   * Get the access group of an identity. The access group of an identity is the set of identities that can
   * accessed by this identity.
   * @param login The login of the identity to get the sharing group.
   * @return(p) On success the promise will be resolved with a list of links that describe accesses by the identity.
   * On error the promise will be rejected with an {@link Error} with kind
   * - `IdentityNotFound` if the identity cannot be accessed.
   */
  async getAccessGroup(login: string): Promise<IdentityShareLink[]> {
    return await this.session.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/accessGroup",
      response: r =>
        api.IdentityGetAccessGroupResponse.decode(r)
          .accessGroup as IdentityShareLink[]
    });
  }

  /**
   * Get all history of public keys of the given identity login.
   * WARNING: These keys are not trusted, i.e. the chain of trust is not validated
   * @param login The login of identity to get the key history.
   * @return(p) On success the promise will be resolved with the history of public keys of `login`.
   * On error the promise will be rejected with an {@link Error} with kind
   * - `IdentityNotFound` if the identity is not found.
   */
  async getPublicKeyHistory(login: string): Promise<IdentityPublicKey[]> {
    let { chains } = await this.session.doProtoRequest({
      method: "POST",
      expectedCode: 200,
      path: "/api/v4/identities/latestPublicChains",
      body: api.IdentityGetLatestPublicChainsRequest.encode({
        ids: [{ login, since: 0 }]
      }).finish(),
      response: api.IdentityGetLatestPublicChainsResponse.decode
    });
    if (chains.length != 1 || chains[0].login !== login) {
      throw new Error({
        kind: SDKKind.SDKInternalError,
        payload: {
          login,
          hint: "unexpected chain in public key history"
        }
      });
    }
    let chain = chains[0];

    return chain.chains.map(chainElt => {
      return {
        login: chain.login,
        version: chainElt.version,
        sign: chainElt.sign,
        box: chainElt.box
      };
    });
  }

  /**
   * Get the keys of the versions of an identity that are locked. A version of an identity is locked if it is not accessible
   * by the current version of the identity
   * @param login The login of the identity to get the sharing group.
   * @param options A collection of initialization options that control the sessions:
   * @return(p) On success the promise will be resolved with a list of the public keys identity that are locked.
   * On error the promise will be rejected with an {@link Error} with kind
   * - `IdentityNotFound` if the identity cannot be accessed.
   */
  async getLockedVersions(
    login: string,
    options?: { withChallenge?: boolean }
  ) {
    options = options != null ? options : {};
    return await this.session.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: "/api/v4/identity/" + encodeURI(login) + "/lockedVersions",
      params: options,
      assume:
        login == this.session.login
          ? null
          : { login, kind: api.IdentityAccessKeyKind.READ },
      response: r => {
        return api.IdentityGetLockedVersionsResponse.decode(
          r
        ).lockedVersions.map(lockedVersion => {
          return {
            ...lockedVersion,
            publicKey: {
              ...lockedVersion.publicKey.publicKey,
              created: timestampToDate(lockedVersion.publicKey.created)
            } as IdentityPublicKeyWithMetadata
          };
        });
      }
    });
  }

  /**
   * Try to unlock the locked versions with the secret passed as parameter.
   * @param secret A secret used to unlock previous versions of the current identity
   * @return(p) On success the promise will be resolved with the list of unlocked identities.
   */
  async unlockVersions(
    login: string,
    secret: string | Uint8Array
  ): Promise<IdentityPublicKeyWithMetadata[]> {
    let lockedVersions = await this.getLockedVersions(login, {
      withChallenge: true
    });
    let unlockedVersions: IdentityPublicKeyWithMetadata[] = [];
    let resolvedChallengesWithEncryptedKeys: api.UnlockVersionsRequest.UnlockedVersion[] = [];
    let publicKey: IdentityPublicKey;
    if (login == this.session.login) {
      publicKey = this.session.getSessionPublicKey();
    } else {
      // TODO: possible race condition between the assumed version here and when sending the request
      publicKey = await this.session.getLatestPublicKey(login);
    }
    lockedVersions.forEach(locked => {
      if (locked.challenge == null) {
        throw new Error({
          kind: SDKKind.SDKInternalError,
          payload: {
            version: locked.publicKey.version,
            hint: "missing challenge to resolve in locked version"
          }
        });
      }
      try {
        let keySet = IdentityKeySetAPI.recoverWithSecret(
          login,
          secret,
          locked.challenge.encryption
        );
        unlockedVersions.push(locked.publicKey);

        // the current version of session identity is signed by the unlocked one (as keys are accessible by current session)
        let { encryptedKey, nonce } = keySet.shareKey(
          api.IdentityShareKind.SHARING,
          publicKey
        );
        let backward = { nonce, encryptedKey };

        resolvedChallengesWithEncryptedKeys.push(
          new api.UnlockVersionsRequest.UnlockedVersion({
            resolvedChallenge: {
              token: locked.challenge.token,
              salt: locked.challenge.salt,
              signature: keySet.sign(locked.challenge.salt)
            },
            backward
          })
        );
      } catch (e) {
        return;
      }
    });
    if (unlockedVersions.length > 0) {
      await this.session.doProtoRequest({
        method: "POST",
        expectedCode: 200,
        assume:
          login == this.session.login
            ? null
            : { login, kind: api.IdentityAccessKeyKind.WRITE },
        path: "/api/v4/identity/" + encodeURI(login) + "/unlockVersions",
        body: api.UnlockVersionsRequest.encode({
          unlockedVersions: resolvedChallengesWithEncryptedKeys
        }).finish(),
        response: api.SessionResolveChallengeResponse.decode
      });
    }
    return unlockedVersions;
  }

  private async getSharingGraphWithPublicKey(
    login: string
  ): Promise<
    IdentitySharingGraph<{ id: IdentityPublicKeyID; seed: MasterPublicSeed }>
  > {
    // Get the graph from DataPeps
    let { graph } = await this.session.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGraph",
      response: api.IdentityGetSharingGraphResponse.decode
    });
    // Return the graph with IdentityPublicKeyID
    return graph.map(
      ({ latest, login, version, sharingGroup, masterPublicKey }) => ({
        value: {
          id: { login, version },
          seed: { publicKey: masterPublicKey, masterSalt: null }
        },
        sharingGroup,
        latest
      })
    );
  }

  private async getSharingGraphWithKeySet(
    login: string
  ): Promise<
    IdentitySharingGraph<{ keySet: IdentityKeySet; seed: MasterPublicSeed }>
  > {
    // Get the graph from DataPeps by assuming the root identity
    let assume: AssumeOptions = {
      login,
      kind: api.IdentityAccessKeyKind.WRITE
    };
    let { graph } = await this.session.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGraph",
      assume,
      response: api.IdentityGetSharingGraphResponse.decode
    });
    // Initialize the map of IdentityKeySet, that be used to decrypts sharingKey of identities in the graph
    let rootKeySet = assume.keySet;
    let identityKeySets = new Map<string, IdentityKeySet>();
    identityKeySets.set(
      rootKeySet.id.login + rootKeySet.id.version,
      rootKeySet
    );
    // The root node is actually the identity that assume the request, so we doesn't need to decrypt it.
    let rootNode = graph.shift();
    if (
      rootNode.login != rootKeySet.id.login ||
      rootNode.version != rootKeySet.id.version
    ) {
      throw new Error({
        kind: SDKKind.SDKInternalError,
        payload: {
          message: "unexpected rootNode"
        }
      });
    }
    // Resolve ciphers of sharingKey
    // TODO - Better resolution
    let resolvedGraph = await Promise.all(
      graph.map(async elt => {
        // TODO - session
        let [sharingKey]: SignedCipher[] = await (this
          .session as any).resolveCipherList([elt.sharingKey]);
        return { ...elt, sharingKey };
      })
    );
    // Decrypts IdentityKeySet of identities in the the graph
    let decyptedGraph = resolvedGraph.map((elt, i) => {
      let parentKeySet = identityKeySets.get(
        elt.sharedFrom.login + elt.sharedFrom.version
      );
      let keySet = IdentityKeySetAPI.recoverWithEncrytedKeys(
        { login: elt.login, version: elt.version },
        parentKeySet,
        [elt.sharingKey],
        {
          boxEncrypted: {
            encryptedKey: elt.boxKey.message,
            nonce: elt.boxKey.nonce,
            publicKey: elt.boxPublicKey
          },
          signEncrypted: {
            encryptedKey: elt.signKey.message,
            nonce: elt.signKey.nonce,
            publicKey: elt.signPublicKey
          },
          readEncrypted: null // TODO
        }
      );
      identityKeySets.set(elt.login + elt.version, keySet);
      let seed = { publicKey: elt.masterPublicKey, masterSalt: null };
      return {
        sharingGroup: elt.sharingGroup,
        latest: elt.latest,
        value: { keySet, seed }
      };
    });
    // Reintroduce the rootNode in the graph
    decyptedGraph.unshift({
      latest: rootNode.latest,
      sharingGroup: rootNode.sharingGroup,
      value: {
        keySet: rootKeySet,
        seed: {
          publicKey: rootNode.masterPublicKey,
          masterSalt: null
        }
      }
    });
    return decyptedGraph;
  }

  private static createSharingGroup(
    keySet: IdentityKeySet,
    publicKeys: IdentityPublicKey[]
  ): api.IIdentityShareEntry[] {
    return publicKeys.map(pk => {
      let kind = api.IdentityShareKind.SHARING;
      let { encryptedKey, nonce } = keySet.shareKey(kind, pk);
      return {
        login: pk.login,
        version: pk.version,
        nonce,
        kind,
        encryptedKey
      };
    });
  }
}

type IdentitySharingGraph<T> = IdentitySharingGraphElt<T>[];
interface IdentitySharingGraphElt<T> {
  value: T;
  sharingGroup: api.IIdentityPublicKey[];
  latest: boolean;
}
