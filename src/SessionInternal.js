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
var Tools_1 = require("./Tools");
var HTTP_1 = require("./HTTP");
var Error_1 = require("./Error");
var IdentityKeySet_1 = require("./IdentityKeySet");
var IdentityKeySetManager_1 = require("./IdentityKeySetManager");
var PublicKeyManager_1 = require("./PublicKeyManager");
var SessionState;
(function (SessionState) {
    function create(session) {
        return session.api;
    }
    SessionState.create = create;
    function createBase(login, client, pkCache, trustPolicy) {
        return {
            login: login,
            client: client,
            keySet: client.keySet,
            publicKeys: new PublicKeyManager_1.PublicKeysManager(client.client, pkCache, trustPolicy)
        };
    }
    SessionState.createBase = createBase;
})(SessionState = exports.SessionState || (exports.SessionState = {}));
var SessionClient = /** @class */ (function () {
    function SessionClient(params, keySet, client, secret) {
        this.params = params;
        this.client = client;
        this.secret = secret;
        this.keySet = new IdentityKeySetManager_1.IdentityKeySetManager(keySet, this);
        // initialize this.deltaSaltTime
        this.afterRequestHandleSalt();
    }
    SessionClient.prototype.doRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.addAuthHeaders(request)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 11]);
                        return [4 /*yield*/, this.client.doRequest(request)];
                    case 3:
                        response = _b.sent();
                        this.handleResponseHeaders(response.headers);
                        return [2 /*return*/, response.body];
                    case 4:
                        err_1 = _b.sent();
                        _a = err_1.kind;
                        switch (_a) {
                            case Error_1.ServerKind.SessionStale: return [3 /*break*/, 5];
                            case Error_1.ServerKind.AssumeStale: return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 10];
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.unStale()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _b.sent();
                        if (e_1 instanceof Error_1.Error && e_1.kind == Error_1.SDKKind.IdentityInvalidKeySet) {
                            throw err_1;
                        }
                        throw e_1;
                    case 8: return [2 /*return*/, this.doRequest(request)];
                    case 9: return [2 /*return*/, this.doRequest(request)];
                    case 10: throw err_1;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    SessionClient.prototype.doProtoRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.headers = request.headers != null ? request.headers : new Headers();
                        request.headers.set("content-type", "application/x-protobuf");
                        return [4 /*yield*/, this.doRequest(request)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SessionClient.prototype.unStale = function (secret) {
        return __awaiter(this, void 0, void 0, function () {
            var encryption, seed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (secret != null) {
                            this.secret = secret;
                        }
                        return [4 /*yield*/, this.doProtoRequest({
                                method: "PUT",
                                expectedCode: 200,
                                path: "/api/v1/session/unStale",
                                response: proto_1.api.SessionUnStaleResponse.decode
                            })];
                    case 1:
                        encryption = (_a.sent()).encryption;
                        seed = IdentityKeySet_1.MasterPrivateSeed.fromSecret(this.secret, encryption.masterSalt);
                        this.keySet.root = IdentityKeySet_1.IdentityKeySet.recover({
                            login: this.keySet.root.id.login,
                            version: encryption.version
                        }, seed, encryption);
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionClient.prototype.setSecret = function (secret) {
        this.secret = secret;
    };
    SessionClient.prototype.addAuthHeaders = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var body, headers, salt, tosign, assumeKeySet, assumeKind;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = request.body;
                        headers = request.headers;
                        salt = this.getSalt();
                        headers.set("x-peps-token", this.params.token);
                        tosign = body == null ? salt : Tools_1.Uint8Tool.concat(body, salt);
                        if (!(request.assume != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.keySet.get(request.assume.login)];
                    case 1:
                        assumeKeySet = _a.sent();
                        assumeKind = request.assume.kind;
                        request.assume.keySet = assumeKeySet;
                        headers.set("x-peps-assume-access", assumeKind.toString());
                        headers.set("x-peps-assume-identity", assumeKeySet.id.login + "/" + assumeKeySet.id.version);
                        headers.set("x-peps-assume-signature", Tools_1.Base64.encode(assumeKeySet.sign(tosign, assumeKind)));
                        _a.label = 2;
                    case 2:
                        headers.set("x-peps-salt", Tools_1.Base64.encode(salt));
                        headers.set("x-peps-signature", Tools_1.Base64.encode(this.keySet.root.sign(tosign)));
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionClient.prototype.getSalt = function () {
        switch (this.params.saltKind) {
            case proto_1.api.SessionSaltKind.RAND:
                return this.params.salt;
            case proto_1.api.SessionSaltKind.TIME:
                var seconds = Math.floor(Date.now() / 1000) + this.deltaSaltTime;
                var salt = new Uint8Array(4);
                salt[0] = (seconds >>> 24) & 0xff;
                salt[1] = (seconds >>> 16) & 0xff;
                salt[2] = (seconds >>> 8) & 0xff;
                salt[3] = seconds & 0xff;
                return salt;
        }
    };
    SessionClient.prototype.handleResponseHeaders = function (headers) {
        var salt = headers.get("x-peps-salt");
        if (salt == null) {
            throw new Error_1.Error({
                kind: Error_1.SDKKind.ProtocolError,
                payload: { missing: "x-peps-salt", headers: headers }
            });
        }
        this.params.salt = Tools_1.Base64.decode(salt);
        this.afterRequestHandleSalt();
    };
    SessionClient.prototype.afterRequestHandleSalt = function () {
        var secondsServer = (this.params.salt[0] << 24) +
            (this.params.salt[1] << 16) +
            (this.params.salt[2] << 8) +
            this.params.salt[3];
        var secondsLocal = Math.floor(Date.now() / 1000);
        this.deltaSaltTime = secondsServer - secondsLocal;
    };
    return SessionClient;
}());
exports.SessionClient = SessionClient;
var TrustOnFirstUse = /** @class */ (function () {
    function TrustOnFirstUse() {
    }
    TrustOnFirstUse.prototype.trust = function (pk, mandate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (HTTP_1.debug) {
                    console.log("TrustFirstUse", pk.login, Tools_1.Base64.encode(pk.sign), Tools_1.Base64.encode(pk.box), " mandate by ", mandate);
                }
                return [2 /*return*/];
            });
        });
    };
    return TrustOnFirstUse;
}());
exports.TrustOnFirstUse = TrustOnFirstUse;
//# sourceMappingURL=SessionInternal.js.map