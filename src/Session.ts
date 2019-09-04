import { wallix } from "./proto";
import { IdentityPublicKey, IdentityPublicKeyID } from "./IdentityAPI";
import { Uint8Tool, Base64, Uint8Converter } from "./Tools";
import { Client, Request, client } from "./HTTP";
import {
  SessionParams,
  SessionState,
  SessionClient,
  TrustOnFirstUse
} from "./SessionInternal";
import {
  IdentityKeySet,
  MasterPrivateSeed,
  IdentityEncryptedKeySet
} from "./IdentityKeySet";
import { MemoryPublicKeysCache } from "./PublicKeyManager";

import api = wallix.gopeps.protobuf.datapeps;

/**
 * Specify how the sdk request should be authenticated by the DataPeps service.
 * - "RAND" means that the service generates a fresh salt for each request `n` which is used to sign request `n+1`. It is the most secure kind of salt, but implies that all requests MUST be done sequentially.
 * - "TIME" means that the service generates a salt based on a timestamp, so a signed request can be authenticated within a time window.
 */
export type SessionSaltKind = api.SessionSaltKind;

export type AssumeOptions = {
  login: string;
  kind: api.IdentityAccessKeyKind;
  keySet?: IdentityKeySet;
};

/**
 * A object that can be used to make authenticated request by a {@link_Session}.
 */
export interface SessionRequest<T> extends Request<T> {
  /**
   * An optional assume parameters to assume the request as another identity.
   */
  assume?: AssumeOptions;
}

export type LoginOptions = {
  saltKind?: api.SessionSaltKind;
};

/**
 * Unknown keys are fetched from the DataPeps service.
 * To mitigate MitM or Operator attacks the client must validate the keys by a side-channel, that could be a hand-check, a tier-service check or whatever...
 */
export interface TrustPolicy {
  trust(pk: IdentityPublicKey, mandate?: IdentityPublicKeyID): Promise<void>;
}

export class Session {
  private api: SessionState;

  private constructor(
    params: SessionParams,
    encryption: IdentityKeySet,
    client: Client,
    secret?: Uint8Array
  ) {
    this.api = SessionState.createBase(
      params.login,
      new SessionClient(params, encryption, client, secret),
      new MemoryPublicKeysCache(),
      new TrustOnFirstUse()
    );
  }

  /** The login of the {@link Identity} logged into the session */
  get login(): string {
    return this.api.login;
  }

  /**
   * Close the session.
   * @return(p) On success the promise will be resolved with void.
   */
  async close(): Promise<void> {
    return await this.api.client.doProtoRequest<void>({
      method: "PUT",
      expectedCode: 200,
      path: "/api/v1/session/close"
    });
  }

  /**
   * Get the public key of the current session.
   * @return The public key of the current session.
   */
  getSessionPublicKey(): IdentityPublicKey {
    return this.api.keySet.getCurrentPublicKey();
  }

  /**
   * Create a new session for an identity that the current session identity can access.
   * @param login The login of the identity to login with.
   */
  async createSession(login: string): Promise<Session> {
    let keySet = await this.api.keySet.get(login);
    return await Session.create(this.api.client.client, login, () => {
      return keySet;
    });
  }

  /**
   * Set the trust policy for the session, see {@link TrustPolicy} for more details.
   * @param policy The trust policy to set.
   */
  setTrustPolicy(policy: TrustPolicy): void {
    this.api.publicKeys.setTrustPolicy(policy);
  }

  sign(message: Uint8Array): Uint8Array {
    return this.api.keySet.sign(message);
  }

  /**
   * Create a new session.
   * @param login The login of the identity to login with.
   * @param secret The secret of the identity.
   * @param options A collection of initialization options that control the sessions:
   *  - saltKind: The kind of salt used to sign authenticated requests to the DataPeps service. The default value is `TIME`. For more details see {@link SessionSaltKind}
   * @return(p) On success the promise will be resolved with a new session.
   * On error the promise will be rejected with an {@link Error} with kind
   * - `IdentityNotFound` if the `login` does not exists or if the identity has no secret.
   */
  static async login(
    login: string,
    secret: string | Uint8Array,
    options?: LoginOptions
  ): Promise<Session> {
    let session = await Session.createWithSecret(
      client,
      login,
      e => {
        let seed = MasterPrivateSeed.fromSecret(secret, e.masterSalt);
        let keySet = IdentityKeySet.recover(
          { login, version: e.version },
          seed,
          e as IdentityEncryptedKeySet
        );
        return keySet;
      },
      options,
      secret
    );
    return session;
  }

  static async create(
    client: Client,
    login: string,
    recover: (e: api.IdentityEncryptedKeySet) => IdentityKeySet,
    options: LoginOptions = {
      saltKind: api.SessionSaltKind.TIME
    }
  ): Promise<Session> {
    let {
      connectionParameters,
      identityKeySet
    } = await Session.createSessionMaterial(client, login, recover, options);
    return new Session(connectionParameters, identityKeySet, client);
  }

  private static async createWithSecret(
    client: Client,
    login: string,
    recover: (e: api.IdentityEncryptedKeySet) => IdentityKeySet,
    options: LoginOptions = {
      saltKind: api.SessionSaltKind.TIME
    },
    secret: string | Uint8Array
  ) {
    let {
      connectionParameters,
      identityKeySet
    } = await Session.createSessionMaterial(client, login, recover, options);
    return new Session(
      connectionParameters,
      identityKeySet,
      client,
      Uint8Tool.convert(secret)
    );
  }

  private static async createSessionMaterial(
    client: Client,
    login: string,
    recover: (e: api.IdentityEncryptedKeySet) => IdentityKeySet,
    options: LoginOptions = {
      saltKind: api.SessionSaltKind.TIME
    }
  ): Promise<{
    connectionParameters: SessionParams;
    identityKeySet: IdentityKeySet;
  }> {
    let { body: createResponse } = await client.doRequest({
      method: "POST",
      expectedCode: 200,
      path: "/api/v1/session/challenge/create",
      body: api.SessionCreateChallengeRequest.encode({
        login: login,
        saltKind: options.saltKind
      }).finish(),
      response: api.SessionCreateChallengeResponse.decode,
      headers: new Headers({
        "content-type": "application/x-protobuf"
      })
    });
    let identityKeySet = recover(
      api.IdentityEncryptedKeySet.create(createResponse.encryption)
    );
    let { body: resolveResponse } = await client.doRequest({
      method: "POST",
      expectedCode: 200,
      path: "/api/v1/session/challenge/resolve",
      body: api.SessionResolveChallengeRequest.encode({
        token: createResponse.token,
        salt: createResponse.salt,
        signature: identityKeySet.sign(createResponse.salt)
      }).finish(),
      response: api.SessionResolveChallengeResponse.decode,
      headers: new Headers({
        "content-type": "application/x-protobuf"
      })
    });
    let connectionParameters: SessionParams = {
      token: Base64.encode(createResponse.token),
      login: resolveResponse.login,
      salt: resolveResponse.salt,
      saltKind: createResponse.saltKind
    };
    identityKeySet.id.login = login;
    return {
      connectionParameters,
      identityKeySet
    };
  }
}
