"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var proto_1 = require("./proto");
var Error_1 = require("./Error");
var Tools_1 = require("./Tools");
var api = proto_1.wallix.gopeps.protobuf.datapeps;
var defaultAPIURL = "https://api.datapeps.com";
exports.debug = false;
var Client = /** @class */ (function () {
    function Client(host) {
        this.host = host;
    }
    Client.prototype.doRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var host, uri, response, body, _a, err, payload, X;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        host = request.host != null ? request.host : this.host;
                        uri = host + this.uri_query(request.path, request.params);
                        if (exports.debug) {
                            console.log("HTTP", uri, request);
                        }
                        return [4 /*yield*/, fetch(uri, {
                                method: request.method,
                                body: request.body,
                                headers: request.headers
                            })];
                    case 1:
                        response = _b.sent();
                        _a = Uint8Array.bind;
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 2:
                        body = new (_a.apply(Uint8Array, [void 0, _b.sent()]))();
                        // Unexpected code
                        if (response.status != request.expectedCode) {
                            // Unexpected code & no response body
                            if (body == null || body.length == 0) {
                                console.log("error 0");
                                throw new Error_1.Error({
                                    kind: Error_1.SDKKind.BadStatusCode,
                                    code: response.status
                                });
                            }
                            err = void 0;
                            try {
                                err = api.ProtoError.decode(body);
                            }
                            catch (e) {
                                throw new Error_1.Error({
                                    kind: Error_1.SDKKind.BadStatusCode,
                                    code: response.status,
                                    payload: Tools_1.Uint8Tool.decode(body)
                                });
                            }
                            payload = void 0;
                            if (err.payload != null) {
                                X = api[err.payload.type_url.split(".").pop()];
                                payload = X.decode(err.payload.value);
                            }
                            throw new Error_1.Error({ kind: err.kind, code: err.code, payload: payload });
                        }
                        if (request.response == null) {
                            if (body == null && body.length != 0) {
                                console.debug("WARNING: response is not used", body.length);
                            }
                            return [2 /*return*/, { body: null, headers: response.headers }];
                        }
                        // Expected code match
                        try {
                            return [2 /*return*/, { body: request.response(body), headers: response.headers }];
                        }
                        catch (e) {
                            throw new Error_1.Error({
                                kind: Error_1.SDKKind.BadResponse,
                                payload: { error: e, response: response }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.uri_query = function (url, params) {
        if (params == null) {
            return url;
        }
        var uriParams = Object.keys(params)
            .map(function (key) {
            var x = key + "=";
            return params[key].constructor === Array
                ? x + params[key].map(encodeURIComponent).join("&" + x)
                : x + encodeURIComponent(params[key]);
        })
            .join("&");
        if (uriParams.length == 0) {
            return url;
        }
        return url + "?" + uriParams;
    };
    return Client;
}());
exports.Client = Client;
function configure(APIUrl, WSUrl) {
    exports.client = client = new Client(APIUrl);
}
exports.configure = configure;
var client = new Client(defaultAPIURL);
exports.client = client;
//# sourceMappingURL=HTTP.js.map