import * as nacl from "tweetnacl";
import { EncryptAnonymous, CipherType } from "./Cryptor";
import { client, Client } from "./HTTP";
import { api } from "./proto";
import { ResourceBox, makeResourceFromResponse } from "./ResourceInternal";
import { Error, SDKKind } from "./Error";
import { Constants } from "./Constants";
import {
  IdentityPublicKey,
  IdentityPublicKeyID,
  IdentityAPI
} from "./IdentityAPI";
import { Uint8Tool, timestampToDate, Base64 } from "./Tools";
import { Session } from "./Session";
import { SessionState } from "./SessionInternal";
import { ID } from "./ID";
import { IdentityKeySet } from "./IdentityKeySet";

export interface DelegatedAccess {
  /**
   * The identifier of the delegated access.
   */
  id: ID;

  /**
   * The public key used by the resolver to encrypt the keys.
   */
  publicKey: Uint8Array;

  /**
   * The signature of the requester.
   */
  sign: Uint8Array;

  /**
   * The identity that request the delegated access.
   */
  requester: IdentityPublicKeyID;

  /**
   * The identity target of the delegated access.
   */
  target: IdentityPublicKeyID;

  /**
   * The date of creation of the delegated access.
   */
  created: Date;

  /**
   * Indicates if the delegated access request has been resolved.
   */
  resolved: boolean;
}

export class DelegatedAccessAPI {
  private api: SessionState;
  constructor(session: Session) {
    this.api = SessionState.create(session);
  }

  /**
   * Get the secret token of an identity.
   */
  async getSecretToken(login: string): Promise<string> {
    let keySet = await this.api.keySet.get(login);
    return Base64.encode(keySet.getSecretToken());
  }

  /**
   * Resolve an access request.
   * @param requestID The id to the access request to resolve.
   */
  async resolveAccessRequest(
    requestId: ID
  ): Promise<DelegatedAccess.RequestResolver> {
    let { sign, resource } = await this.api.client.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: "/api/v1/delegatedAccess/" + requestId.toString(),
      response: api.DelegatedAccessGetResponse.decode
    });
    let r = await makeResourceFromResponse<null>(
      resource,
      CipherType.NACL_ANON,
      this.api.publicKeys,
      this.api.keySet
    );
    // Verify requester's signature
    let msg = Uint8Tool.concat(Uint8Tool.encode(this.api.login), r.publicKey());
    if (!nacl.sign.detached.verify(msg, sign, r.creator.sign)) {
      throw new Error({
        kind: SDKKind.IdentitySignChainInvalid,
        payload: {
          requestId,
          requester: r.creator
        }
      });
    }
    class AccessRequestResolverImpl implements DelegatedAccess.RequestResolver {
      id: ID;
      requesterKey: IdentityPublicKey;
      private api: SessionState;
      private resource: ResourceBox<null>;

      constructor(id: ID, resource: ResourceBox<null>, api: SessionState) {
        this.id = id;
        this.requesterKey = resource.creator;
        this.resource = resource;
        this.api = api;
      }

      async resolve(login: string): Promise<void> {
        let keySet = await this.api.keySet.get(login);
        await this.api.client.doProtoRequest({
          method: "PUT",
          expectedCode: 200,
          path: "/api/v1/delegatedAccess/" + this.id.toString() + "/keys",
          body: api.DelegatedAccessPostKeysRequest.encode({
            keys: this.resource.encrypt(
              api.DelegatedKeys.encode(keySet.toDelegatedKeys()).finish()
            )
          }).finish()
        });
      }
    }
    return new AccessRequestResolverImpl(requestId, r, this.api);
  }

  /**
   * List the requests of DelegatedAccess that the given identity has requested.
   */
  async list(
    login: string,
    options?: {
      limit?: number;
      maxID?: ID;
      sinceID?: ID;
    }
  ): Promise<DelegatedAccess[]> {
    let { accesses } = await this.api.client.doProtoRequest({
      method: "GET",
      expectedCode: 200,
      path: "/api/v1/delegatedAccesses",
      response: api.DelegatedAccessListResponse.decode,
      assume: { login, kind: api.IdentityAccessKeyKind.READ },
      params: options
    });
    return accesses.map(
      access =>
        ({
          ...access,
          resolved: access.resolved,
          created: timestampToDate(access.created)
        } as DelegatedAccess)
    );
  }
}

export namespace DelegatedAccess {
  /**
   * Redefine the AccessRequest.openResolver() default function
   * @param params An object containing the new AccessRequest.openResolver() function
   */
  export function configureAccessRequestResolver(params: {
    open: (id: ID, login: string) => any;
  }) {
    AccessRequestImpl.prototype._openConfigured = params.open;
  }

  /**
   * An access request is a request used for the delegation of the access of an identity.
   * @see {@link requestDelegatedAccess}
   */
  export interface Request {
    /** The id of the AccessRequest. */
    id: ID;

    /** Wait for the resolve of the AccessRequest. */
    wait(): Promise<void>;

    /** Same as wait but returns an authenticated session of the identity that resolved the AccessRequest. */
    waitSession(): Promise<Session>;

    /** Open a control element (a window when calling from a browser) that allows to resolve the access request */
    openResolver(params: any): any;
  }

  /**
   * An object that allows to check and resolve an AccessRequest.
   */
  export interface RequestResolver {
    /** ID of the corresponding AccessRequest */
    id: ID;

    /** The IdentityPublicKey of the identity who signed the access request. */
    requesterKey: IdentityPublicKey;

    /** Resolve the access request with the given login.
     * i.e. the corresponding AccessRequest could use a session authenticated with the identity of the given login.
     */
    resolve(login: string): Promise<void>;
  }

  /**
   * Request an access to a delegated identity of the given login.
   * @param login The login of identity to request its access.
   * @param sign A function to sign the access request.
   * The signature must be computed on the concatenation of the `login` and the `publicKey`,
   * thanks the `requester` sign private key.
   * @return(p) a promise that rejects with an {@link Error} with kind
   * - `IdentityNotFound` if the identity doesn't exists..
   */
  export async function request(
    login: string,
    sign: ((
      info: { login: string; publicKey: Uint8Array }
    ) => Promise<{ sign: Uint8Array; requester: string }>)
  ): Promise<Request> {
    let encrypt = new EncryptAnonymous();
    let keypair = nacl.box.keyPair();
    let { box, version } = await IdentityAPI.getLatestPublicKey(login);
    let encryptedKey = encrypt.encrypt({ box }, keypair.secretKey);
    let signResult = await sign({
      login,
      publicKey: keypair.publicKey
    });
    let {
      body: { id }
    } = await client.doRequest({
      method: "POST",
      expectedCode: 200,
      path: "/api/v1/delegatedAccess",
      body: api.DelegatedAccessPostRequest.encode({
        publicKey: keypair.publicKey,
        sign: signResult.sign,
        requester: signResult.requester,
        sharing: {
          encryptedKey: encryptedKey.message,
          nonce: encryptedKey.nonce,
          login,
          version
        }
      }).finish(),
      response: api.DelegatedAccessPostResponse.decode,
      headers: new Headers({ "content-type": "application/x-protobuf" })
    });
    let resource = new ResourceBox(0, null, null, keypair, null);
    return new AccessRequestImpl(id, login, client, resource);
  }

  class AccessRequestImpl implements Request {
    id: ID;
    login: string;

    private keys: api.IDelegatedKeys;
    private reason: any;
    private client: Client;
    private resource: ResourceBox<null>;
    private resolve: () => void;
    private reject: (reason?: any) => void;

    constructor(
      id: ID,
      login: string,
      client: Client,
      resource: ResourceBox<null>
    ) {
      this.id = id;
      this.login = login;
      this.resolve = () => {};
      this.reject = () => {};
      this.client = client;
      this.resource = resource;
      this.init();
    }

    private async init() {
      try {
        let {
          body: { keys }
        } = await this.client.doRequest({
          method: "GET",
          expectedCode: 200,
          path: "/api/v1/delegatedAccess/" + this.id.toString() + "/keys",
          response: api.DelegatedAccessGetKeysResponse.decode,
          headers: new Headers({ "content-type": "application/x-protobuf" })
        });
        this.keys = api.DelegatedKeys.decode(this.resource.decrypt(keys));
        this.resolve();
      } catch (e) {
        this.reason = e;
        this.reject(e);
      }
    }

    wait(): Promise<void> {
      if (this.keys != null) {
        return Promise.resolve();
      }
      if (this.reason != null) {
        return Promise.reject(this.reason);
      }
      return new Promise((resolve, reject) => {
        let presolve = this.resolve;
        this.resolve = () => {
          resolve();
          presolve();
        };
        let preject = this.reject;
        this.reject = (reason?) => {
          reject(reason);
          preject(reason);
        };
      });
    }

    async waitSession(): Promise<Session> {
      await this.wait();
      return await Session.create(this.client, this.keys.login, e => {
        return IdentityKeySet.fromDelegatedKeys(this.keys);
      });
    }

    openResolver(): any {
      return this._openConfigured(this.id, this.login);
    }

    _openConfigured(id: ID, login: string): any {
      throw new Error({
        kind: SDKKind.SDKInternalError,
        payload: {
          reason:
            "AccessRequest.openResolver() function has not been configured"
        }
      });
    }
  }
}

// Configure the AccessRequest.openResolver() function to be called by default
DelegatedAccess.configureAccessRequestResolver({
  open: (id: ID, login: string): Window => {
    // check if running in browser
    if (typeof window == "undefined" || typeof window.document == "undefined") {
      throw new Error({
        kind: SDKKind.SDKInternalError,
        payload: {
          reason: "AccessRequest.openResolver() must be configured"
        }
      });
    }

    let resolverUrl =
      Constants.Session.RESOLVER_URL +
      "?id=" +
      encodeURIComponent(id.toString()) +
      "&login=" +
      encodeURIComponent(login);
    let features = Constants.Session.RESOLVER_WINDOW_DEFAULT_FEATURES;
    return window.open(resolverUrl, "", features);
  }
});
