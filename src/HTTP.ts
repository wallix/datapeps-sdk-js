import { api } from "./proto";
import { SDKKind, Error } from "./Error";
import { Uint8Tool } from "./Tools";

const defaultAPIURL = "https://api.datapeps.com";

export let debug = false;

export { client };

export interface Request<T> {
  headers?: Headers;
  body?: Uint8Array;
  method: string;
  path: string;
  params?: any;
  expectedCode: number;
  response?: (responseBinary: Uint8Array) => T;
  host?: string;
}

export class Client {
  host: string;
  debug: boolean;

  constructor(host: string) {
    this.host = host;
  }

  async doRequest<T>(
    request: Request<T>
  ): Promise<{ body: T; headers: Headers }> {
    let host = request.host != null ? request.host : this.host;
    let uri = host + this.uri_query(request.path, request.params);
    if (debug) {
      console.log("HTTP", uri, request);
    }
    let response = await fetch(uri, {
      method: request.method,
      body: request.body,
      headers: request.headers
    });
    let body = new Uint8Array(await response.arrayBuffer());
    // Unexpected code
    if (response.status != request.expectedCode) {
      // Unexpected code & no response body
      if (body == null || body.length == 0) {
        throw new Error({
          kind: SDKKind.BadStatusCode,
          code: response.status
        });
      }
      // Unexpected code & response body
      let err;
      try {
        err = api.ProtoError.decode(new Uint8Array(body));
      } catch (e) {
        throw new Error({
          kind: SDKKind.BadStatusCode,
          code: response.status,
          payload: Uint8Tool.decode(body)
        });
      }
      let payload;
      if (err.payload != null) {
        let X = api[err.payload.type_url.split(".").pop()];
        payload = X.decode(err.payload.value);
      }
      throw new Error({ kind: err.kind, code: err.code, payload });
    }
    if (request.response == null) {
      if (body == null && body.length != 0) {
        console.debug("WARNING: response is not used", body.length);
      }
      return { body: null, headers: response.headers };
    }
    // Expected code match
    try {
      return { body: request.response(body), headers: response.headers };
    } catch (e) {
      throw new Error({
        kind: SDKKind.BadResponse,
        payload: { error: e, response }
      });
    }
  }

  private uri_query(url: string, params?: any): string {
    if (params == null) {
      return url;
    }
    var uriParams = Object.keys(params)
      .map(key => {
        let x = key + "=";
        return params[key].constructor === Array
          ? x + params[key].map(encodeURIComponent).join("&" + x)
          : x + encodeURIComponent(params[key]);
      })
      .join("&");
    if (uriParams.length == 0) {
      return url;
    }
    return url + "?" + uriParams;
  }
}

export function configure(APIUrl: string, WSUrl?: string) {
  client = new Client(APIUrl);
}

let client = new Client(defaultAPIURL);
