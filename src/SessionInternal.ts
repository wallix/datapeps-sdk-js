import * as nacl from "tweetnacl";
import { wallix } from "./proto";
import { IdentityPublicKey, IdentityPublicKeyID } from "./IdentityAPI";
import { Uint8Tool, Base64 } from "./Tools";
import { Session, SessionRequest, TrustPolicy } from "./Session";
import { debug, Client } from "./HTTP";
import { Error, SDKKind, ServerKind } from "./Error";
import {
  IdentityKeySet,
  IdentityEncryptedKeySet,
  MasterPrivateSeed
} from "./IdentityKeySet";
import { IdentityKeySetManager } from "./IdentityKeySetManager";
import { PublicKeysManager, PublicKeysCache } from "./PublicKeyManager";

import api = wallix.gopeps.protobuf.datapeps;

export type SessionParams = {
  token: string;
  login: string;
  salt: Uint8Array;
  saltKind: api.SessionSaltKind;
};

export interface SessionState {
  login: string;
  client: SessionClient;
  keySet: IdentityKeySetManager;
  publicKeys: PublicKeysManager;
}
export namespace SessionState {
  export function create(session: Session) {
    return (session as any).api;
  }

  export function createBase(
    login: string,
    client: SessionClient,
    pkCache: PublicKeysCache,
    trustPolicy: TrustPolicy
  ): SessionState {
    return {
      login,
      client,
      keySet: client.keySet,
      publicKeys: new PublicKeysManager(client.client, pkCache, trustPolicy)
    };
  }
}

export class SessionClient {
  client: Client;
  keySet: IdentityKeySetManager;

  private params: SessionParams;

  private deltaSaltTime: number;
  private secret: Uint8Array;

  constructor(
    params: SessionParams,
    keySet: IdentityKeySet,
    client: Client,
    secret: Uint8Array
  ) {
    this.params = params;
    this.client = client;
    this.secret = secret;
    this.keySet = new IdentityKeySetManager(keySet, this);

    // initialize this.deltaSaltTime
    this.afterRequestHandleSalt();
  }

  async doRequest<T>(request: SessionRequest<T>): Promise<T> {
    await this.addAuthHeaders(request);
    try {
      let response = await this.client.doRequest(request);
      this.handleResponseHeaders(response.headers);
      return response.body;
    } catch (err) {
      switch (err.kind) {
        case ServerKind.SessionStale:
          try {
            await this.unStale();
          } catch (e) {
            if (e instanceof Error && e.kind == SDKKind.IdentityInvalidKeySet) {
              throw err;
            }
            throw e;
          }
          return this.doRequest(request);
        case ServerKind.AssumeStale:
          return this.doRequest(request);
      }
      throw err;
    }
  }

  async doProtoRequest<T>(request: SessionRequest<T>): Promise<T> {
    request.headers = request.headers != null ? request.headers : new Headers();
    request.headers.set("content-type", "application/x-protobuf");
    return await this.doRequest(request);
  }

  async unStale(secret?: Uint8Array): Promise<void> {
    if (secret != null) {
      this.secret = secret;
    }

    let { encryption } = await this.doProtoRequest({
      method: "PUT",
      expectedCode: 200,
      path: "/api/v1/session/unStale",
      response: api.SessionUnStaleResponse.decode
    });
    let seed = MasterPrivateSeed.fromSecret(this.secret, encryption.masterSalt);
    this.keySet.root = IdentityKeySet.recover(
      {
        login: this.keySet.root.id.login,
        version: encryption.version
      },
      seed,
      encryption as IdentityEncryptedKeySet
    );
  }

  setSecret(secret: Uint8Array) {
    this.secret = secret;
  }

  async getAuthHeaders(
    request: SessionRequest<any>
  ): Promise<Map<string, string>> {
    // get session headers
    let body = request.body;
    let headers = new Map<string, string>();
    let salt = this.getSalt();
    headers.set("x-peps-token", this.params.token);
    let tosign = body == null ? salt : Uint8Tool.concat(body, salt);
    // Add assume headers if needed
    if (request.assume != null) {
      let assumeKeySet = await this.keySet.get(request.assume.login);
      let assumeKind = request.assume.kind;
      request.assume.keySet = assumeKeySet;
      headers.set("x-peps-assume-access", assumeKind.toString());
      headers.set(
        "x-peps-assume-identity",
        assumeKeySet.id.login + "/" + assumeKeySet.id.version
      );
      headers.set(
        "x-peps-assume-signature",
        Base64.encode(assumeKeySet.sign(tosign, assumeKind))
      );
    }
    headers.set("x-peps-salt", Base64.encode(salt));
    headers.set(
      "x-peps-signature",
      Base64.encode(this.keySet.root.sign(tosign))
    );
    return headers;
  }

  private async addAuthHeaders(request: SessionRequest<any>) {
    // Add session headers
    let headers = request.headers;
    let h = await this.getAuthHeaders(request);
    h.forEach((v, k) => headers.set(k, v));
  }

  private getSalt(): Uint8Array {
    switch (this.params.saltKind) {
      case api.SessionSaltKind.RAND:
        return this.params.salt;
      case api.SessionSaltKind.TIME:
        let seconds = Math.floor(Date.now() / 1000) + this.deltaSaltTime;
        let salt = new Uint8Array(4);
        salt[0] = (seconds >>> 24) & 0xff;
        salt[1] = (seconds >>> 16) & 0xff;
        salt[2] = (seconds >>> 8) & 0xff;
        salt[3] = seconds & 0xff;
        return salt;
    }
  }

  private handleResponseHeaders(headers: Headers) {
    let salt = headers.get("x-peps-salt");
    if (salt == null) {
      throw new Error({
        kind: SDKKind.ProtocolError,
        payload: { missing: "x-peps-salt", headers }
      });
    }
    this.params.salt = Base64.decode(salt);
    this.afterRequestHandleSalt();
  }

  private afterRequestHandleSalt() {
    let secondsServer =
      (this.params.salt[0] << 24) +
      (this.params.salt[1] << 16) +
      (this.params.salt[2] << 8) +
      this.params.salt[3];
    let secondsLocal = Math.floor(Date.now() / 1000);
    this.deltaSaltTime = secondsServer - secondsLocal;
  }
}

export class TrustOnFirstUse implements TrustPolicy {
  async trust(
    pk: IdentityPublicKey,
    mandate?: IdentityPublicKeyID
  ): Promise<void> {
    if (debug) {
      console.log(
        "TrustFirstUse",
        pk.login,
        Base64.encode(pk.sign),
        Base64.encode(pk.box),
        " mandate by ",
        mandate
      );
    }
    return;
  }
}
