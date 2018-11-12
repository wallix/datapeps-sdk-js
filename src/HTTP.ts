import { api } from "./proto";
import { SDKKind, Error } from "./Error";
import { debug } from "./DataPeps";

const defaultAPIURL = "https://api.datapeps.com";
const defaultWSURL = "https://ws.datapeps.com";

export { client, webSocketURL };

export interface Request<T> {
  method: string;
  path: string;
  code: number;
  params?: any;
  body?: any;
  request?: () => Uint8Array;
  response?: (responseBinary: Uint8Array) => T;
  before?: (r: XMLHttpRequest, body: Uint8Array) => void;
  host?: string;
}

export class Client {
  host: string;
  wsHost: string;
  debug: boolean;

  constructor(host: string, wsHost: string) {
    this.host = host;
    this.wsHost = wsHost;
  }

  doRequest<T>(r: Request<T>): Promise<T> {
    let host = r.host != null ? r.host : this.host;
    return new Promise((resolve, reject) => {
      let xmlhttp = new XMLHttpRequest();
      let uri = host + this.uri_query(r.path, r.params);
      xmlhttp.open(r.method, uri, true);
      xmlhttp.responseType = "arraybuffer";
      xmlhttp.setRequestHeader("Cache-Control", "no-cache");
      xmlhttp.onreadystatechange = e => {
        if (xmlhttp.readyState != 4 || xmlhttp.status == 0) {
          return;
        }
        if (debug) {
          console.debug(
            "response(" + r.method + "," + host + r.path + "): ",
            xmlhttp.status
          );
        }
        if (xmlhttp.status != r.code) {
          if (xmlhttp.response == null || xmlhttp.response.byteLength == 0) {
            return reject(
              new Error({
                kind: SDKKind.BadStatusCode,
                code: xmlhttp.status
              })
            );
          }
          let r;
          try {
            let err = api.ProtoError.decode(new Uint8Array(xmlhttp.response));
            let payload;
            if (err.payload != null) {
              let X = api[err.payload.type_url.split(".").pop()];
              payload = X.decode(err.payload.value);
            }
            r = new Error({
              kind: err.kind,
              code: err.code,
              payload: payload
            });
          } catch (e) {
            r = new Error({
              kind: SDKKind.BadStatusCode,
              code: xmlhttp.status,
              payload: new TextDecoder().decode(xmlhttp.response)
            });
          }
          return reject(r);
        }
        if (r.response == null) {
          if (xmlhttp.response == null || xmlhttp.response.length == 0) {
            console.debug("WARNING: response is not used", xmlhttp.response);
          }
          return resolve();
        }
        let resp;
        try {
          resp = r.response(new Uint8Array(xmlhttp.response));
        } catch (e) {
          return reject(
            new Error({
              kind: SDKKind.BadResponse,
              payload: { error: e, response: xmlhttp.response }
            })
          );
        }
        resolve(resp);
      };
      xmlhttp.onerror = e => {
        reject(
          new Error({
            kind: SDKKind.NetworkException,
            payload: { error: e }
          })
        );
      };
      let body: Uint8Array = null;
      if (debug) {
        console.debug("request(" + r.method + "," + host + r.path + ")");
      }
      try {
        if (r.request != null) {
          body = r.request();
        }
        if (r.before != null) {
          r.before(xmlhttp, body);
        }
      } catch (e) {
        return reject(
          new Error({
            kind: SDKKind.SDKInternalError,
            payload: { error: e }
          })
        );
      }
      xmlhttp.send(body);
    });
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
  client = new Client(APIUrl, WSUrl);
  webSocketURL = WSUrl;
}

let webSocketURL = defaultWSURL;
let client = new Client(defaultAPIURL, defaultWSURL);
