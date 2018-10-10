import { IdentityPublicKeyID, KvalAPI, KvalDelegatesAPI } from "./DataPeps";
import * as nacl from "tweetnacl";
import * as Long from "long";
import { SessionImpl } from "./Session";
import { api } from "./proto";

export class Kval implements KvalAPI {
  private session: SessionImpl;

  constructor(session: SessionImpl) {
    this.session = session;
  }

  async put(
    namespace: string,
    key: Uint8Array,
    value: Uint8Array
  ): Promise<void> {
    let r = {
      namespace,
      key,
      value,
      created: new Date().getTime()
    };
    this.sign(r);
    await this.session.doProtoRequest({
      method: "PUT",
      code: 201,
      path: `/api/v4/kval/${namespace}`,
      request: () => api.KvalPutRequest.encode(r).finish()
    });
  }

  async get(
    namespace: string,
    key: Uint8Array
  ): Promise<{ value: Uint8Array; pk: IdentityPublicKeyID }> {
    let response = await this.session.doProtoRequest({
      method: "POST",
      code: 200,
      path: `/api/v4/kval/${namespace}`,
      request: () => api.KvalGetRequest.encode({ key }).finish(),
      response: api.KvalGetResponse.decode
    });
    let pk = await this.verify(response);
    return { value: response.value, pk };
  }

  private sign(r: api.IKvalPutRequest) {
    let msg = Kval.messageToSign(r);
    r.signature = this.session.sign(msg);
  }

  private async verify(r: api.KvalGetResponse): Promise<IdentityPublicKeyID> {
    let pkID = r.signedBy as IdentityPublicKeyID;
    let pk = await this.session.getPublicKey(pkID);
    let msg = Kval.messageToSign(r);
    nacl.sign.detached.verify(msg, r.signature, pk.sign);
    return pkID;
  }

  private static messageToSign(_: {
    key?: Uint8Array;
    value?: Uint8Array;
    namespace?: string;
    created?: Long | number;
  }): Uint8Array {
    const ns = new TextEncoder().encode(_.namespace);
    let b = new Uint8Array(
      _.key.byteLength + _.value.byteLength + ns.byteLength + 8
    );
    let offset = 0;
    b.set(_.key, offset);
    offset += _.key.byteLength;
    b.set(_.value, offset);
    offset += _.value.byteLength;
    b.set(ns, offset);
    offset += ns.byteLength;
    let created = Long.fromValue(_.created);
    let high = created.getHighBits();
    b[offset++] = (high >>> 24) & 0xff;
    b[offset++] = (high >>> 16) & 0xff;
    b[offset++] = (high >>> 8) & 0xff;
    b[offset++] = high & 0xff;
    let low = created.getLowBits();
    b[offset++] = (low >>> 24) & 0xff;
    b[offset++] = (low >>> 16) & 0xff;
    b[offset++] = (low >>> 8) & 0xff;
    b[offset++] = low & 0xff;
    return b;
  }
}

export class KvalDelegates implements KvalDelegatesAPI {
  private static NS = "delegates";
  private kval: Kval;

  public constructor(kval: Kval) {
    this.kval = kval;
  }

  public async put(login: string, application: string, delegates: string[]) {
    await this.kval.put(
      KvalDelegates.NS,
      KvalDelegates.key(login, application),
      new TextEncoder().encode(delegates.join(","))
    );
  }

  public async get(login: string, application: string): Promise<string[]> {
    let r = await this.kval.get(
      KvalDelegates.NS,
      KvalDelegates.key(login, application)
    );
    return new TextDecoder().decode(r.value).split(",");
  }

  private static key(login: string, application: string): Uint8Array {
    return new TextEncoder().encode(`${login}/${application}`);
  }
}
