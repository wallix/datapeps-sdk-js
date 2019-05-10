"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var nacl = require("tweetnacl");
var Cryptor_1 = require("./Cryptor");
var HTTP_1 = require("./HTTP");
var proto_1 = require("./proto");
var ResourceInternal_1 = require("./ResourceInternal");
var Error_1 = require("./Error");
var Constants_1 = require("./Constants");
var IdentityAPI_1 = require("./IdentityAPI");
var Tools_1 = require("./Tools");
var Session_1 = require("./Session");
var SessionInternal_1 = require("./SessionInternal");
var IdentityKeySet_1 = require("./IdentityKeySet");
var DelegatedAccessAPI = /** @class */ (function () {
    function DelegatedAccessAPI(session) {
        this.api = SessionInternal_1.SessionState.create(session);
    }
    /**
     * Get the secret token of an identity.
     */
    DelegatedAccessAPI.prototype.getSecretToken = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var keySet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.keySet.get(login)];
                    case 1:
                        keySet = _a.sent();
                        return [2 /*return*/, Tools_1.Base64.encode(keySet.getSecretToken())];
                }
            });
        });
    };
    /**
     * Resolve an access request.
     * @param requestID The id to the access request to resolve.
     */
    DelegatedAccessAPI.prototype.resolveAccessRequest = function (requestId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sign, resource, r, msg, AccessRequestResolverImpl;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.api.client.doProtoRequest({
                            method: "GET",
                            expectedCode: 200,
                            path: "/api/v1/delegatedAccess/" + requestId.toString(),
                            response: proto_1.api.DelegatedGetResponse.decode
                        })];
                    case 1:
                        _a = _b.sent(), sign = _a.sign, resource = _a.resource;
                        return [4 /*yield*/, ResourceInternal_1.makeResourceFromResponse(resource, Cryptor_1.CipherType.NACL_ANON, this.api.publicKeys, this.api.keySet)];
                    case 2:
                        r = _b.sent();
                        msg = Tools_1.Uint8Tool.concat(Tools_1.Uint8Tool.encode(this.api.login), r.publicKey());
                        if (!nacl.sign.detached.verify(msg, sign, r.creator.sign)) {
                            throw new Error_1.Error({
                                kind: Error_1.SDKKind.IdentitySignChainInvalid,
                                payload: {
                                    requestId: requestId,
                                    requester: r.creator
                                }
                            });
                        }
                        AccessRequestResolverImpl = /** @class */ (function () {
                            function AccessRequestResolverImpl(id, resource, api) {
                                this.id = id;
                                this.requesterKey = resource.creator;
                                this.resource = resource;
                                this.api = api;
                            }
                            AccessRequestResolverImpl.prototype.resolve = function (login) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var keySet;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.api.keySet.get(login)];
                                            case 1:
                                                keySet = _a.sent();
                                                return [4 /*yield*/, this.api.client.doProtoRequest({
                                                        method: "PUT",
                                                        expectedCode: 200,
                                                        path: "/api/v1/delegatedAccess/" + this.id.toString() + "/keys",
                                                        body: proto_1.api.DelegatedPostKeysRequest.encode({
                                                            keys: this.resource.encrypt(proto_1.api.DelegatedKeys.encode(keySet.toDelegatedKeys()).finish())
                                                        }).finish()
                                                    })];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            };
                            return AccessRequestResolverImpl;
                        }());
                        return [2 /*return*/, new AccessRequestResolverImpl(requestId, r, this.api)];
                }
            });
        });
    };
    /**
     * List the requests of DelegatedAccess that the given identity has requested.
     */
    DelegatedAccessAPI.prototype.list = function (login, options) {
        return __awaiter(this, void 0, void 0, function () {
            var accesses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.client.doProtoRequest({
                            method: "GET",
                            expectedCode: 200,
                            path: "/api/v1/delegatedAccesses",
                            response: proto_1.api.DelegatedAccessListResponse.decode,
                            assume: { login: login, kind: proto_1.api.IdentityAccessKeyKind.READ },
                            params: options
                        })];
                    case 1:
                        accesses = (_a.sent()).accesses;
                        return [2 /*return*/, accesses.map(function (access) {
                                return (__assign({}, access, { resolved: access.resolved, created: Tools_1.timestampToDate(access.created) }));
                            })];
                }
            });
        });
    };
    return DelegatedAccessAPI;
}());
exports.DelegatedAccessAPI = DelegatedAccessAPI;
var DelegatedAccess;
(function (DelegatedAccess) {
    /**
     * Redefine the AccessRequest.openResolver() default function
     * @param params An object containing the new AccessRequest.openResolver() function
     */
    function configureAccessRequestResolver(params) {
        AccessRequestImpl.prototype._openConfigured = params.open;
    }
    DelegatedAccess.configureAccessRequestResolver = configureAccessRequestResolver;
    /**
     * Request an access to a delegated identity of the given login.
     * @param login The login of identity to request its access.
     * @param sign A function to sign the access request.
     * The signature must be computed on the concatenation of the `login` and the `publicKey`,
     * thanks the `requester` sign private key.
     * @return(p) a promise that rejects with an {@link Error} with kind
     * - `IdentityNotFound` if the identity doesn't exists..
     */
    function request(login, sign) {
        return __awaiter(this, void 0, void 0, function () {
            var encrypt, keypair, _a, box, version, encryptedKey, signResult, id, resource;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        encrypt = new Cryptor_1.EncryptAnonymous();
                        keypair = nacl.box.keyPair();
                        return [4 /*yield*/, IdentityAPI_1.IdentityAPI.getLatestPublicKey(login)];
                    case 1:
                        _a = _b.sent(), box = _a.box, version = _a.version;
                        encryptedKey = encrypt.encrypt({ box: box }, keypair.secretKey);
                        return [4 /*yield*/, sign({
                                login: login,
                                publicKey: keypair.publicKey
                            })];
                    case 2:
                        signResult = _b.sent();
                        return [4 /*yield*/, HTTP_1.client.doRequest({
                                method: "POST",
                                expectedCode: 201,
                                path: "/api/v1/delegatedAccess",
                                body: proto_1.api.DelegatedPostRequest.encode({
                                    publicKey: keypair.publicKey,
                                    sign: signResult.sign,
                                    requester: signResult.requester,
                                    sharing: {
                                        encryptedKey: encryptedKey.message,
                                        nonce: encryptedKey.nonce,
                                        login: login,
                                        version: version
                                    }
                                }).finish(),
                                response: proto_1.api.DelegatedPostResponse.decode,
                                headers: new Headers({ "content-type": "application/x-protobuf" })
                            })];
                    case 3:
                        id = (_b.sent()).body.id;
                        resource = new ResourceInternal_1.ResourceBox(0, null, null, keypair, null);
                        return [2 /*return*/, new AccessRequestImpl(id, login, HTTP_1.client, resource)];
                }
            });
        });
    }
    DelegatedAccess.request = request;
    var AccessRequestImpl = /** @class */ (function () {
        function AccessRequestImpl(id, login, client, resource) {
            this.id = id;
            this.login = login;
            this.resolve = function () { };
            this.reject = function () { };
            this.client = client;
            this.resource = resource;
            this.init();
        }
        AccessRequestImpl.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var keys, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.client.doRequest({
                                    method: "GET",
                                    expectedCode: 200,
                                    path: "/api/v1/delegatedAccess/" + this.id.toString() + "/keys",
                                    response: proto_1.api.DelegatedGetKeysResponse.decode,
                                    headers: new Headers({ "content-type": "application/x-protobuf" })
                                })];
                        case 1:
                            keys = (_a.sent()).body.keys;
                            this.keys = proto_1.api.DelegatedKeys.decode(this.resource.decrypt(keys));
                            this.resolve();
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            this.reason = e_1;
                            this.reject(e_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AccessRequestImpl.prototype.wait = function () {
            var _this = this;
            if (this.keys != null) {
                return Promise.resolve();
            }
            if (this.reason != null) {
                return Promise.reject(this.reason);
            }
            return new Promise(function (resolve, reject) {
                var presolve = _this.resolve;
                _this.resolve = function () {
                    resolve();
                    presolve();
                };
                var preject = _this.reject;
                _this.reject = function (reason) {
                    reject(reason);
                    preject(reason);
                };
            });
        };
        AccessRequestImpl.prototype.waitSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.wait()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Session_1.Session.create(this.client, this.keys.login, function (e) {
                                    return IdentityKeySet_1.IdentityKeySet.fromDelegatedKeys(_this.keys);
                                })];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AccessRequestImpl.prototype.openResolver = function () {
            return this._openConfigured(this.id, this.login);
        };
        AccessRequestImpl.prototype._openConfigured = function (id, login) {
            throw new Error_1.Error({
                kind: Error_1.SDKKind.SDKInternalError,
                payload: {
                    reason: "AccessRequest.openResolver() function has not been configured"
                }
            });
        };
        return AccessRequestImpl;
    }());
})(DelegatedAccess = exports.DelegatedAccess || (exports.DelegatedAccess = {}));
// Configure the AccessRequest.openResolver() function to be called by default
DelegatedAccess.configureAccessRequestResolver({
    open: function (id, login) {
        // check if running in browser
        if (typeof window == "undefined" || typeof window.document == "undefined") {
            throw new Error_1.Error({
                kind: Error_1.SDKKind.SDKInternalError,
                payload: {
                    reason: "AccessRequest.openResolver() must be configured"
                }
            });
        }
        var resolverUrl = Constants_1.Constants.Session.RESOLVER_URL +
            "?id=" +
            encodeURIComponent(id.toString()) +
            "&login=" +
            encodeURIComponent(login);
        var features = Constants_1.Constants.Session.RESOLVER_WINDOW_DEFAULT_FEATURES;
        return window.open(resolverUrl, "", features);
    }
});
//# sourceMappingURL=DelegatedAccess.js.map