import * as nacl from "tweetnacl";
import { api } from "./proto";
import { makeResourceFromResponse } from "./ResourceInternal";
import { Error, SDKKind } from "./Error";
import { Encryption } from "./CryptoFuncs";
import { Uint8Tool } from "./Tools";
import { Resource } from "./ResourceAPI";
import { Session } from "./Session";
import { ID } from "./ID";
import { client } from "./HTTP";

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

/** Allows to indicate which kind of access shoudl be used in a {@link SessionRequest}*/
export enum IdentityAccessKind {
  READ = 0,
  WRITE = 1
}

/** Allows to indicate which kind of field should be sorted. */
export enum IdentitySortingField {
  LOGIN = 0,
  CREATED = 1,
  KIND = 2
}

export enum IdentitySortingOrder {
  DESC = 0,
  ASC = 1
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
    let { publicKeys } = await client.doRequest({
      method: "POST",
      code: 200,
      path: "/api/v4/identities/latestPublicKeys",
      request: () =>
        api.IdentityGetLatestPublicKeysRequest.encode({ logins }).finish(),
      response: api.IdentityGetLatestPublicKeysResponse.decode,
      before(x, b) {
        x.setRequestHeader("content-type", "application/x-protobuf");
      }
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
      code: 200,
      path: "/api/v4/identity/" + encodeURI(login),
      response: r => IdentityX.fromapi(api.Identity.decode(r))
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
    identities: Identity<Uint8Array>[]
    totalIdentitiesCount: number
  }> {
    if (options.sortingField === undefined) {
      options.sortingField = IdentitySortingField.CREATED;
    }
    if (options.sortingOrder === undefined) {
      options.sortingOrder = IdentitySortingOrder.ASC;
    }
    return await this.session.doProtoRequest({
      method: "GET",
      code: 200,
      path: "/api/v4/identities/list",
      params: options,
      response: r => {
        let { identities, totalIdentitiesCount } = api.IdentityListResponse.decode(r);
        return {
          identities: identities.map(IdentityX.fromapi),
          totalIdentitiesCount
        }
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
    let encryption = new Encryption();
    encryption.generate(
      Uint8Tool.convert(options.secret),
      (this.session as any).encryption
    );
    let publicKeys = await this.session.getLatestPublicKeys(osharingGroup);
    let sharingGroup = publicKeys.map(({ login, version, box, sign }) => {
      let kind = api.IdentityShareKind.SHARING;
      let { message, nonce } = encryption.encryptKey(
        kind,
        (this.session as any).encryption,
        box
      );
      return {
        login,
        version,
        nonce,
        kind,
        encryptedKey: message
      };
    });
    let epub = encryption.getPublic();
    return await this.session.doProtoRequest<void>({
      method: "POST",
      code: 201,
      path: "/api/v4/identity",
      request: () =>
        api.IdentityCreateRequest.encode({
          identity,
          sharingGroup,
          encryption,
          email: options.email,
          signChain: (this.session as any).encryption.sign(
            Uint8Tool.concat(
              epub.boxEncrypted.publicKey,
              epub.signEncrypted.publicKey
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
      code: 200,
      path: "/api/v4/identity/" + encodeURI(identity.login),
      request: () => api.IdentityFields.encode(identity).finish()
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
    let kind = api.IdentityShareKind.SHARING;
    let assume = { login, kind: IdentityAccessKind.WRITE };
    let {
      encryption,
      creator,
      sharingGroup
    } = await this.session.doProtoRequest({
      method: "GET",
      code: 200,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/keysToRenew",
      response: api.IdentityGetKeysToRenewResponse.decode,
      assume
    });
    let { key } = await (this.session as any).getAssumeParams({
      login,
      kind: IdentityAccessKind.WRITE
    });
    // Generate a fresh encryption
    let next = new Encryption();
    if (secret == null) {
      next.generateWithMasterPublicKey(
        encryption.masterPublicKey,
        encryption.masterSalt,
        (this.session as any).encryption
      );
    } else {
      next.generate(
        Uint8Tool.convert(secret),
        (this.session as any).encryption
      );
    }
    next.version = key.version + 1;
    let epub = next.getPublic();
    let { message, nonce } = (this.session as any).encryption
      .encrypt(api.ResourceType.SES)
      .encrypt(epub.boxEncrypted.publicKey, key.sharingKey);
    let backward = { nonce, encryptedKey: message };
    await this.session.doProtoRequest({
      method: "POST",
      code: 201,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/keysToRenew",
      request: () =>
        api.IdentityPostKeysToRenewRequest.encode({
          encryption: epub,
          backward,
          signChain: nacl.sign.detached(
            Uint8Tool.concat(
              epub.boxEncrypted.publicKey,
              epub.signEncrypted.publicKey
            ),
            key.signKey
          ),
          sharingGroup: sharingGroup.map(({ login, version, box, sign }) => {
            let { message, nonce } = next.encryptKey(
              kind,
              (this.session as any).encryption,
              box
            );
            return {
              login,
              version,
              encryptedKey: message,
              nonce,
              kind
            };
          })
        }).finish(),
      assume
    });
    (this.session as any).clearAssumeParams(login);
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
      code: 200,
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
    (this.session as any).clearAssumeParams(login);
    let { key } = await (this.session as any).getAssumeParams({
      login,
      kind: IdentityAccessKind.WRITE
    });
    let publicKeys = await this.session.getLatestPublicKeys(sharingGroup);
    return await this.session.doProtoRequest<void>({
      method: "PATCH",
      code: 201,
      path: "/api/v4/identity/" + encodeURI(login) + "/sharingGroup",
      assume: { login, kind: IdentityAccessKind.WRITE },
      request: () =>
        api.IdentityShareRequest.encode({
          version: key.version,
          sharingGroup: publicKeys.map(({ login, version, box, sign }) => {
            let kind = api.IdentityShareKind.SHARING;
            let { message, nonce } = (this.session as any).encryption
              .encrypt(api.ResourceType.SES)
              .encrypt(box, key.sharingKey);
            return {
              login,
              version,
              nonce,
              kind,
              encryptedKey: message
            };
          })
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
    return this.editSharingGraph(login, { sharingGroup });
  }

  async editSharingGraph(
    login: string,
    options?: {
      sharingGroup?: string[];
      overwriteKeys?: { secret: string | Uint8Array };
    }
  ) {
    options = options != null ? options : {};
    let graph = await this.getSharingGraph(login, {
      withKeys: options.overwriteKeys == null
    });
    if (graph[0].login != login) {
      throw new Error({
        kind: SDKKind.SDKInternalError,
        payload: { login, graph, hint: "unexpected graph" }
      });
    }
    if (options.sharingGroup != null) {
      // Replace the sharing group of login
      graph[0].sharingGroup = await this.session.getLatestPublicKeys(
        options.sharingGroup
      );
    }
    // Filter only latest identites
    graph = graph.filter(elt => elt.latest);
    if (options.overwriteKeys != null) {
      // If keys are overwritten, we only update:
      // - the main identity
      // - the graph elements in which the only element in sharing group is the main identity (for example a delegate, but not a group)
      graph = graph.filter(
        elt =>
          elt.login == login ||
          (elt.sharingGroup.length == 1 && elt.sharingGroup[0].login == login)
      );
    }
    let newBoxPublicKeys = new Map<string, IdentityPublicKey>();
    let encryptedGraph = graph
      .map(elt => {
        let encryption = new Encryption();
        if (options.overwriteKeys != null && elt.login === login) {
          // Overwrite the key of main identity with secret
          encryption.generate(
            Uint8Tool.convert(options.overwriteKeys.secret),
            (this.session as any).encryption
          );
        } else {
          encryption.generateWithMasterPublicKey(
            elt.masterPublicKey,
            null,
            (this.session as any).encryption
          );
        }
        encryption.version = elt.version + 1;
        newBoxPublicKeys.set(elt.login, {
          login,
          sign: null,
          box: encryption.getPublicKey(api.IdentityShareKind.BOX),
          version: encryption.version
        });
        return { elt, encryption };
      })
      .map(({ elt, encryption }) => {
        let epub = encryption.getPublic();
        let backward:
          | { nonce: Uint8Array; encryptedKey: Uint8Array }
          | undefined;
        let signChain: Uint8Array;
        if (options.overwriteKeys != null) {
          // administrator signs the 'overwrited' new version of identity
          signChain = (this.session as any).encryption.sign(
            Uint8Tool.concat(
              epub.boxEncrypted.publicKey,
              epub.signEncrypted.publicKey
            )
          );
        } else {
          // the new version of identity is signed by the previous one (as keys are accessible by current session)
          let { message, nonce } = (this.session as any).encryption
            .encrypt(api.ResourceType.SES)
            .encrypt(epub.boxEncrypted.publicKey, elt.sharingKey);
          backward = { nonce, encryptedKey: message };
          signChain = nacl.sign.detached(
            Uint8Tool.concat(
              epub.boxEncrypted.publicKey,
              epub.signEncrypted.publicKey
            ),
            elt.signKey
          );
        }
        return {
          login: elt.login,
          version: elt.version + 1,
          encryption: epub,
          signChain,
          sharingGroup: elt.sharingGroup.map(pk => {
            let kind = api.IdentityShareKind.SHARING;
            let newPk = newBoxPublicKeys.get(pk.login);
            pk = newPk != null ? newPk : pk;
            let { message, nonce } = encryption.encryptKey(
              kind,
              (this.session as any).encryption,
              pk.box
            );
            return {
              login: pk.login,
              version: pk.version,
              encryptedKey: message,
              nonce,
              kind
            };
          }),
          backward
        };
      });
    return await this.session.doProtoRequest<void>({
      method: "POST",
      code: 201,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGraph",
      assume:
        options.overwriteKeys != null
          ? undefined
          : { login, kind: IdentityAccessKind.WRITE },
      request: () =>
        api.IdentityPostSharingGraphRequest.encode({
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
      code: 200,
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
      code: 200,
      path: "/api/v4/identities/latestPublicChains",
      request: () =>
        api.IdentityGetLatestPublicChainsRequest.encode({
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
      code: 200,
      path: "/api/v4/identity/" + encodeURI(login) + "/lockedVersions",
      params: options,
      assume:
        login == this.session.login
          ? null
          : { login, kind: IdentityAccessKind.READ },
      response: r => {
        return api.IdentityGetLockedVersionsResponse.decode(
          r
        ).lockedVersions.map(lockedVersion => {
          return {
            ...lockedVersion,
            publicKey: {
              ...lockedVersion.publicKey.publicKey,
              created: new Date(
                (lockedVersion.publicKey.created as number) * 1000
              )
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
    let publicKey: Uint8Array;
    if (login == this.session.login) {
      publicKey = (this.session as any).encryption.getPublic().boxEncrypted
        .publicKey;
    } else {
      // TODO: possible race condition between the assumed version here and when sending the request
      publicKey = (await this.session.getLatestPublicKey(login)).box;
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
      let encryption = new Encryption(
        api.IdentityEncryption.create(locked.challenge.encryption)
      );
      try {
        encryption.recover(
          Uint8Tool.convert(secret),
          api.IdentityPublicKey.create(locked.challenge.creator)
        );
        unlockedVersions.push(locked.publicKey);

        // the current version of session identity is signed by the unlocked one (as keys are accessible by current session)
        let { message, nonce } = encryption.encryptKey(
          api.IdentityShareKind.SHARING,
          encryption,
          publicKey
        );
        let backward = { nonce, encryptedKey: message };

        resolvedChallengesWithEncryptedKeys.push(
          new api.UnlockVersionsRequest.UnlockedVersion({
            resolvedChallenge: {
              token: locked.challenge.token,
              salt: locked.challenge.salt,
              signature: encryption.sign(locked.challenge.salt)
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
        code: 200,
        assume:
          login == this.session.login
            ? null
            : { login, kind: IdentityAccessKind.WRITE },
        path: "/api/v4/identity/" + encodeURI(login) + "/unlockVersions",
        request: () =>
          api.UnlockVersionsRequest.encode({
            unlockedVersions: resolvedChallengesWithEncryptedKeys
          }).finish(),
        response: api.SessionResolveChallengeResponse.decode
      });
    }
    return unlockedVersions;
  }

  /**
   * Save a one-to-one association between a tuple <identityLogin, resourceName> and a resourceID.
   * @param login The login of the identity involved in the association
   * @param resourceName The desired resource name involved in the association
   * @param resourceID The ID of the resource involved in the association
   * @return(p) On success the promise will be resolved with void. On error the promise will be rejected with an {@link Error} with kind:
   * - `DataPeps.ServerError.IdentityNotFound` if the identity cannot be assumed or if the identity does not exist.
   * - `DataPeps.ServerError.ResourceNotFound` if the resource does not exist.
   */
  async setNamedResource(
    login: string,
    resourceName: string,
    resourceID: ID
  ): Promise<void> {
    let assume = { login, kind: IdentityAccessKind.WRITE };
    let res = await this.session.doProtoRequest<void>({
      method: "PUT",
      code: 200,
      assume,
      path: `/api/v4/identity/${encodeURI(login)}/resource/${encodeURIComponent(
        resourceName
      )}`,
      request: () =>
        api.IdentitySetNamedResourceRequest.encode({
          resourceID
        }).finish()
    });
    return res;
  }

  /**
   * Get the resource associated with the tuple <identityLogin, resourceName>.
   * @param login The login of the identity involved in the association
   * @param resourceName The resource name involved in the association
   * @return(p) On success the promise will be resolved with resource associated with the tuple <identityLogin, resourceName>. On error the promise will be rejected with an {@link Error} with kind:
   * - `DataPeps.ServerError.IdentityNotFound` if the identity cannot be assumed or if the identity does not exist.
   * - `DataPeps.ServerError.NamedResourceNotFound` if the NamedResource does not exist.
   */
  async getNamedResource<T>(
    login: string,
    resourceName: string,
    options?: {
      parse?: ((u: Uint8Array) => T);
    }
  ): Promise<Resource<T>> {
    options = options != null ? options : {};
    let assume = { login, kind: IdentityAccessKind.READ };
    let resp = await this.session.doProtoRequest({
      method: "GET",
      code: 200,
      assume,
      path:
        "/api/v4/identity/" +
        encodeURIComponent(login) +
        "/resource/" +
        encodeURIComponent(resourceName),
      response: r => api.IdentityGetNamedResourceResponse.decode(r)
    });
    return makeResourceFromResponse<T>(
      resp.resource,
      api.ResourceType.SES,
      this.session,
      options.parse,
      assume.login
    );
  }

  private async getSharingGraph(
    login: string,
    options?: { withKeys?: boolean }
  ): Promise<IdentitySharingElt[]> {
    options = options != null ? options : {};
    let withKeys = options.withKeys == null ? true : options.withKeys;
    let { graph } = await this.session.doProtoRequest({
      method: "GET",
      code: 200,
      path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGraph",
      assume: withKeys ? { login, kind: IdentityAccessKind.WRITE } : null,
      response: api.IdentityGetSharingGraphResponse.decode
    });
    if (!withKeys) {
      return graph as IdentitySharingElt[];
    }
    // Resolve ciphers in graph
    let ciphers: api.ICipher[] = [];
    graph.forEach((elt, i) => {
      if (i != 0) {
        ciphers.push(graph[i].sharingKey);
      }
      ciphers.push(graph[i].signKey);
      ciphers.push(graph[i].boxKey);
    });
    let resolvedCiphers = await (this.session as any).resolveCipherList(
      ciphers
    );
    let resolvedGraph = graph.map((elt, i) => {
      let sharingKey = i == 0 ? null : resolvedCiphers.shift();
      let signKey = resolvedCiphers.shift();
      let boxKey = resolvedCiphers.shift();
      return { ...elt, sharingKey, signKey, boxKey };
    });
    // Decrypt ciphers in graph
    let { key } = await (this.session as any).getAssumeParams({
      login,
      kind: IdentityAccessKind.WRITE
    });
    let boxKeys: { [login: string]: Uint8Array } = {};
    let firstSharingKey = (await (this.session as any).getAssumeParams({
      login,
      kind: IdentityAccessKind.WRITE
    })).key.sharingKey;
    let x = resolvedGraph.map((elt, i) => {
      let sharingKey: Uint8Array;
      if (i == 0) {
        sharingKey = firstSharingKey;
      } else {
        let boxkey = boxKeys[elt.sharedFrom.login + elt.sharedFrom.version];
        sharingKey = (this.session as any).encryption
          .decrypt(api.ResourceType.SES, boxkey)
          .decrypt(elt.sharingKey);
      }
      let boxKey = (this.session as any).encryption
        .decrypt(api.ResourceType.SES, sharingKey)
        .decrypt(elt.boxKey);
      let signKey = (this.session as any).encryption
        .decrypt(api.ResourceType.SES, sharingKey)
        .decrypt(elt.signKey);
      boxKeys[elt.login + elt.version] = boxKey;
      return { ...elt, sharingKey, boxKey, signKey };
    }) as IdentitySharingElt[];
    return x;
  }
}

interface IdentitySharingElt {
  login: string;
  version: number;
  masterPublicKey: Uint8Array;
  sharingKey: Uint8Array;
  signKey: Uint8Array;
  boxKey: Uint8Array;
  sharingGroup: IdentityPublicKey[];
  latest: boolean;
}

class IdentityX {
  static fromapi(t: api.IIdentity): Identity<Uint8Array> {
    let x = api.Identity.create(t);
    return {
      ...x,
      created: new Date((t.created as number) * 1000)
    };
  }

  static toapi(i: Identity<Uint8Array>): api.IIdentity {
    return {
      ...i,
      created: null
    };
  }
}
