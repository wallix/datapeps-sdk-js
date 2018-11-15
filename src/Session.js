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
var proto_1 = require("./proto");
var DataPeps_1 = require("./DataPeps");
var DataPeps_2 = require("./DataPeps");
var Error_1 = require("./Error");
var Tools_1 = require("./Tools");
var CryptoFuncs_1 = require("./CryptoFuncs");
var Identity_1 = require("./Identity");
var Resource_1 = require("./Resource");
var Admin_1 = require("./Admin");
var Application_1 = require("./Application");
var MemoryPublicKeyCache = /** @class */ (function () {
    function MemoryPublicKeyCache() {
        this.cache = {};
    }
    MemoryPublicKeyCache.prototype.latest = function (login) {
        var keys = this.cache[login];
        return keys == null || keys.length == 0 ? null : keys[keys.length - 1];
    };
    MemoryPublicKeyCache.prototype.get = function (_a) {
        var login = _a.login, version = _a.version;
        var keys = this.cache[login];
        return keys == null || keys.length == 0 ? null : keys[version];
    };
    MemoryPublicKeyCache.prototype.set = function (_a, pk) {
        var login = _a.login, version = _a.version;
        var keys = this.cache[login];
        if (keys == null) {
            this.cache[login] = [];
        }
        this.cache[login][version] = pk;
    };
    return MemoryPublicKeyCache;
}());
var TrustOnFirstUse = /** @class */ (function () {
    function TrustOnFirstUse(session) {
        this.session = session;
    }
    TrustOnFirstUse.prototype.trust = function (pk, mandate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (pk.version == 1) {
                            if (DataPeps_1.debug) {
                                console.log("TrustFirstUse", pk.login, Tools_1.Base64.encode(pk.sign), Tools_1.Base64.encode(pk.box), " mandate by ", mandate);
                            }
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, this.session.getPublicKey(mandate)];
                    case 1:
                        _a.sent();
                        if (DataPeps_1.debug) {
                            console.log("TrustByMandate", pk.login, pk.version, Tools_1.Base64.encode(pk.sign), Tools_1.Base64.encode(pk.box), " mandate by ", mandate);
                        }
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    return TrustOnFirstUse;
}());
function loginWithKeys(client, keys) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _login(client, keys.login, function (e, c) {
                        var encryption = new CryptoFuncs_1.Encryption(e);
                        encryption.recoverWithKeys(keys, c);
                        return encryption;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function _login(client, login, recover, options) {
    return __awaiter(this, void 0, void 0, function () {
        var saltKind, createResponse, encryption, token, salt, resolveResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    saltKind = options != null && options.saltKind != null
                        ? options.saltKind
                        : proto_1.api.SessionSaltKind.TIME;
                    return [4 /*yield*/, client.doRequest({
                            method: "POST",
                            code: 201,
                            path: "/api/v4/session/challenge/create",
                            request: function () {
                                return proto_1.api.SessionCreateChallengeRequest.encode({
                                    login: login,
                                    saltKind: saltKind
                                }).finish();
                            },
                            response: proto_1.api.SessionCreateChallengeResponse.decode,
                            before: function (x, b) {
                                return x.setRequestHeader("content-type", "application/x-protobuf");
                            }
                        })];
                case 1:
                    createResponse = _a.sent();
                    encryption = recover(proto_1.api.IdentityEncryption.create(createResponse.encryption), proto_1.api.IdentityPublicKey.create(createResponse.creator));
                    token = createResponse.token;
                    salt = createResponse.salt;
                    return [4 /*yield*/, client.doRequest({
                            method: "POST",
                            code: 200,
                            path: "/api/v4/session/challenge/resolve",
                            request: function () {
                                return proto_1.api.SessionResolveChallengeRequest.encode({
                                    token: token,
                                    salt: salt,
                                    signature: encryption.sign(salt)
                                }).finish();
                            },
                            response: proto_1.api.SessionResolveChallengeResponse.decode,
                            before: function (x, b) {
                                return x.setRequestHeader("content-type", "application/x-protobuf");
                            }
                        })];
                case 2:
                    resolveResponse = _a.sent();
                    saltKind = createResponse.saltKind;
                    salt = createResponse.salt;
                    return [2 /*return*/, new SessionImpl(resolveResponse.login, token, salt, saltKind, encryption, client)];
            }
        });
    });
}
exports._login = _login;
var SessionImpl = /** @class */ (function () {
    function SessionImpl(login, token, salt, saltKind, encryption, client) {
        this.Identity = new Identity_1.IdentityImpl(this);
        this.Resource = new Resource_1.ResourceImpl(this);
        this.Admin = new Admin_1.AdminImpl(this);
        this.encryption = encryption;
        this.token = Tools_1.Base64.encode(token);
        this.salt = salt;
        this.saltKind = saltKind;
        this.login = login;
        this.client = client;
        this.pkCache = new MemoryPublicKeyCache();
        this.trustPolicy = new TrustOnFirstUse(this);
        this.Application = new Application_1.ApplicationImpl(this);
        this.assumeKeyCache = {};
        this.afterRequestHandleSalt();
    }
    SessionImpl.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doProtoRequest({
                            method: "PUT",
                            code: 200,
                            path: "/api/v4/session/close"
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SessionImpl.prototype.renewKeys = function (secret) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Identity.renewKeys(this.login, secret)];
                    case 1:
                        _a.sent();
                        if (secret != null) {
                            this.encryption.secret = Tools_1.Uint8Tool.convert(secret);
                        }
                        return [4 /*yield*/, this.unStale()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionImpl.prototype.getSessionPublicKey = function () {
        var p = this.encryption.getPublic();
        return {
            login: this.login,
            version: this.encryption.version,
            sign: p.signEncrypted.publicKey,
            box: p.boxEncrypted.publicKey
        };
    };
    SessionImpl.prototype.getLatestPublicKey = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLatestPublicKeys([login])];
                    case 1:
                        key = (_a.sent())[0];
                        return [2 /*return*/, key];
                }
            });
        });
    };
    SessionImpl.prototype.getLatestPublicKeys = function (logins) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var chains;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doProtoRequest({
                            method: "POST",
                            code: 200,
                            path: "/api/v4/identities/latestPublicChains",
                            request: function () {
                                return proto_1.api.IdentityGetLatestPublicChainsRequest.encode({
                                    ids: logins.map(function (login) {
                                        var pk = _this.pkCache.latest(login);
                                        return { login: login, since: pk == null ? 0 : pk.version };
                                    })
                                }).finish();
                            },
                            response: proto_1.api.IdentityGetLatestPublicChainsResponse.decode
                        })];
                    case 1:
                        chains = (_a.sent()).chains;
                        return [4 /*yield*/, this.validateChains(chains)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, logins.map(function (login) { return _this.pkCache.latest(login); })];
                }
            });
        });
    };
    SessionImpl.prototype.getPublicKey = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPublicKeys([id])];
                    case 1:
                        key = (_a.sent())[0];
                        return [2 /*return*/, key];
                }
            });
        });
    };
    SessionImpl.prototype.getPublicKeys = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var requestIds, logins, chains;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestIds = {};
                        ids.forEach(function (id) {
                            if (_this.pkCache.get(id) != null) {
                                return;
                            }
                            var version = requestIds[id.login];
                            if (version == null || version < id.version) {
                                requestIds[id.login] = id.version;
                            }
                        });
                        logins = Object.keys(requestIds);
                        if (logins.length == 0) {
                            return [2 /*return*/, ids.map(function (id) { return _this.pkCache.get(id); })];
                        }
                        return [4 /*yield*/, this.doProtoRequest({
                                method: "POST",
                                code: 200,
                                path: "/api/v4/identities/publicChains",
                                request: function () {
                                    return proto_1.api.IdentityGetPublicChainsRequest.encode({
                                        ids: Object.keys(requestIds).map(function (login) {
                                            var pk = _this.pkCache.latest(login);
                                            var since = pk == null ? 0 : pk.version;
                                            var version = requestIds[login];
                                            return { id: { login: login, version: version }, since: since };
                                        })
                                    }).finish();
                                },
                                response: proto_1.api.IdentityGetPublicChainsResponse.decode
                            })];
                    case 1:
                        chains = (_a.sent()).chains;
                        return [4 /*yield*/, this.validateChains(chains)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, ids.map(function (id) { return _this.pkCache.get(id); })];
                }
            });
        });
    };
    SessionImpl.prototype.resolveAccessRequest = function (requestId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sign, resource, r, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.doProtoRequest({
                            method: "GET",
                            code: 200,
                            path: "/api/v4/delegatedAccess/" + requestId.toString(),
                            response: proto_1.api.DelegatedGetResponse.decode
                        })];
                    case 1:
                        _a = _b.sent(), sign = _a.sign, resource = _a.resource;
                        return [4 /*yield*/, Resource_1.makeResourceFromResponse(resource, proto_1.api.ResourceType.ANONYMOUS, this, null, null)];
                    case 2:
                        r = _b.sent();
                        msg = Tools_1.Uint8Tool.concat(new TextEncoder().encode(this.login), r.publicKey());
                        if (!nacl.sign.detached.verify(msg, sign, r.creator.sign)) {
                            throw new Error_1.Error({
                                kind: Error_1.SDKKind.IdentitySignChainInvalid,
                                payload: {
                                    requestId: requestId,
                                    requester: r.creator
                                }
                            });
                        }
                        return [2 /*return*/, new AccessRequestResolverImpl(requestId, r, this)];
                }
            });
        });
    };
    SessionImpl.prototype.createSession = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var keys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getKeys(login)];
                    case 1:
                        keys = _a.sent();
                        return [2 /*return*/, loginWithKeys(this.client, keys)];
                }
            });
        });
    };
    SessionImpl.prototype.setTrustPolicy = function (policy) {
        this.trustPolicy = policy;
    };
    SessionImpl.prototype.setPublicKeyCache = function (cache) {
        this.pkCache = cache;
    };
    SessionImpl.prototype.getSecretToken = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var keys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getKeys(login)];
                    case 1:
                        keys = _a.sent();
                        return [2 /*return*/, Tools_1.Base64.encode(keys.signKey)];
                }
            });
        });
    };
    SessionImpl.prototype.listDelegatedAccess = function (login, options) {
        return __awaiter(this, void 0, void 0, function () {
            var accesses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doProtoRequest({
                            method: "GET",
                            code: 200,
                            path: "/api/v4/delegatedAccesses",
                            response: proto_1.api.DelegatedAccessListResponse.decode,
                            assume: { login: login, kind: DataPeps_2.IdentityAccessKind.READ },
                            params: options
                        })];
                    case 1:
                        accesses = (_a.sent()).accesses;
                        return [2 /*return*/, accesses.map(function (access) {
                                return (__assign({}, access, { resolved: access.resolved, created: new Date(access.created * 1000) }));
                            })];
                }
            });
        });
    };
    SessionImpl.prototype.sign = function (message) {
        return this.encryption.sign(message);
    };
    SessionImpl.prototype.doRequest = function (r) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var assumeParams, xhr, r2, resp, err_1, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getAssumeParams(r.assume)];
                    case 1:
                        assumeParams = _b.sent();
                        r2 = __assign({}, r, { before: function (x, body) {
                                xhr = x;
                                if (r.before != null) {
                                    r.before(x, body);
                                }
                                _this.beforeRequest(x, body, assumeParams);
                            } });
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 11]);
                        return [4 /*yield*/, this.client.doRequest(r2)];
                    case 3:
                        resp = _b.sent();
                        this.afterRequest(xhr);
                        return [2 /*return*/, resp];
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
                        if (e_1 instanceof Error_1.Error && e_1.kind == Error_1.SDKKind.BadSecret) {
                            throw err_1;
                        }
                        throw e_1;
                    case 8: return [2 /*return*/, this.doRequest(r)];
                    case 9:
                        this.clearAssumeParams(r.assume.login);
                        return [2 /*return*/, this.doRequest(r)];
                    case 10:
                        if (xhr != null) {
                            // Ensure that request was done before validating salt
                            this.afterRequest(xhr);
                        }
                        throw err_1;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    SessionImpl.prototype.doProtoRequest = function (r) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.doRequest(__assign({}, r, { before: function (x, b) {
                            x.setRequestHeader("content-type", "application/x-protobuf");
                            if (r.before != null) {
                                r.before(x, b);
                            }
                        } }))];
            });
        });
    };
    SessionImpl.prototype.validateChains = function (chains) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(chains.map(function (chain) { return _this.validateChain(chain); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionImpl.prototype.validateChain = function (_a) {
        var login = _a.login, version = _a.version, chains = _a.chains;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var firstVersion, pk, _b, box, sign, mandate;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        // work on a duplicate of the chains parameter as shift() change the object
                        chains = chains.slice();
                        firstVersion = version - chains.length;
                        if (firstVersion < 0) {
                            throw new Error_1.Error({
                                kind: Error_1.SDKKind.InvalidServerChain,
                                payload: { login: login, version: version, chains: chains }
                            });
                        }
                        pk = this.pkCache.get({ login: login, version: firstVersion });
                        if (!(firstVersion == 0)) return [3 /*break*/, 3];
                        if (!(pk == null)) return [3 /*break*/, 2];
                        _b = chains.shift(), box = _b.box, sign = _b.sign, mandate = _b.mandate;
                        pk = { login: login, version: 1, box: box, sign: sign };
                        return [4 /*yield*/, this.trustPolicy.trust(pk, mandate)];
                    case 1:
                        _c.sent();
                        this.pkCache.set({ login: login, version: 1 }, pk);
                        return [3 /*break*/, 3];
                    case 2:
                        if (!Tools_1.Uint8Tool.equals(pk.box, chains[0].box) ||
                            !Tools_1.Uint8Tool.equals(pk.sign, chains[0].sign)) {
                            throw new Error_1.Error({
                                kind: Error_1.SDKKind.IdentitySignChainInvalid,
                                payload: { login: login, version: 1 }
                            });
                        }
                        _c.label = 3;
                    case 3: 
                    // Check the sign chains and update the cache
                    return [4 /*yield*/, chains.reduce(function (ppk, _a) {
                            var box = _a.box, sign = _a.sign, chain = _a.chain, mandate = _a.mandate;
                            return __awaiter(_this, void 0, void 0, function () {
                                var pk, id, pksign, mpk;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, ppk];
                                        case 1:
                                            pk = _b.sent();
                                            id = { login: login, version: pk.version + 1 };
                                            pksign = pk.sign;
                                            if (!(mandate != null)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this.trustPolicy.trust(pk, mandate)];
                                        case 2:
                                            _b.sent();
                                            return [4 /*yield*/, this.getPublicKey(mandate)];
                                        case 3:
                                            mpk = _b.sent();
                                            pksign = mpk.sign;
                                            _b.label = 4;
                                        case 4:
                                            if (!nacl.sign.detached.verify(Tools_1.Uint8Tool.concat(box, sign), chain, pksign)) {
                                                throw new Error_1.Error({
                                                    kind: Error_1.SDKKind.IdentitySignChainInvalid,
                                                    payload: { login: login, version: version }
                                                });
                                            }
                                            pk = { login: login, version: id.version, box: box, sign: sign };
                                            this.pkCache.set(id, pk);
                                            return [2 /*return*/, pk];
                                    }
                                });
                            });
                        }, Promise.resolve(pk))];
                    case 4:
                        // Check the sign chains and update the cache
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionImpl.prototype.afterRequest = function (request) {
        var salt = request.getResponseHeader("x-peps-salt");
        if (salt == null) {
            throw new Error_1.Error({
                kind: Error_1.SDKKind.ProtocolError,
                payload: {
                    missing: "x-peps-salt",
                    headers: request.getAllResponseHeaders()
                }
            });
        }
        this.salt = Tools_1.Base64.decode(salt);
        this.afterRequestHandleSalt();
    };
    SessionImpl.prototype.afterRequestHandleSalt = function () {
        var secondsServer = (this.salt[0] << 24) +
            (this.salt[1] << 16) +
            (this.salt[2] << 8) +
            this.salt[3];
        var secondsLocal = Math.floor(Date.now() / 1000);
        this.deltaSaltTime = secondsServer - secondsLocal;
    };
    SessionImpl.prototype.beforeRequest = function (request, body, assume) {
        var salt = this.getSalt();
        var tosign = body == null ? salt : Tools_1.Uint8Tool.concat(body, salt);
        request.setRequestHeader("x-peps-token", this.token);
        request.setRequestHeader("x-peps-signature", Tools_1.Base64.encode(this.encryption.sign(tosign)));
        request.setRequestHeader("x-peps-salt", Tools_1.Base64.encode(salt));
        if (assume == null) {
            return;
        }
        request.setRequestHeader("x-peps-assume-access", assume.kind.toString());
        request.setRequestHeader("x-peps-assume-identity", assume.key.login + "/" + assume.key.version);
        var key = assume.kind == DataPeps_2.IdentityAccessKind.READ
            ? assume.key.readKey
            : assume.key.signKey;
        request.setRequestHeader("x-peps-assume-signature", Tools_1.Base64.encode(nacl.sign.detached(tosign, key)));
    };
    SessionImpl.prototype.getSalt = function () {
        switch (this.saltKind) {
            case proto_1.api.SessionSaltKind.RAND:
                return this.salt;
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
    SessionImpl.prototype.unStale = function () {
        var _this = this;
        return this.doProtoRequest({
            method: "PUT",
            code: 200,
            path: "/api/v4/session/unStale",
            response: proto_1.api.SessionUnStaleResponse.decode
        }).then(function (_a) {
            var encryption = _a.encryption, creator = _a.creator;
            _this.clearAssumeParams(_this.login);
            var e = new CryptoFuncs_1.Encryption(encryption);
            e.recover(_this.encryption.secret, creator);
            _this.encryption = e;
        });
    };
    SessionImpl.prototype.resolveCipherList = function (ciphers) {
        return __awaiter(this, void 0, void 0, function () {
            var signs, publicKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        signs = ciphers.map(function (cipher) { return cipher.sign; });
                        return [4 /*yield*/, this.getPublicKeys(signs)];
                    case 1:
                        publicKeys = _a.sent();
                        return [2 /*return*/, ciphers.map(function (_a) {
                                var message = _a.message, nonce = _a.nonce, sign = _a.sign;
                                var pk = publicKeys.find(function (pk) { return sign.login == pk.login && sign.version == pk.version; });
                                if (pk == null) {
                                    throw new Error_1.Error({
                                        kind: Error_1.SDKKind.SDKInternalError,
                                        payload: { reason: "cannot find pk", sign: sign }
                                    });
                                }
                                return { message: message, nonce: nonce, sign: pk };
                            })];
                }
            });
        });
    };
    SessionImpl.prototype.decryptCipherList = function (type, ciphers, secretKey) {
        return __awaiter(this, void 0, void 0, function () {
            var resolvedCiphers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolveCipherList(ciphers)];
                    case 1:
                        resolvedCiphers = _a.sent();
                        return [2 /*return*/, this.encryption
                                .decrypt(type, secretKey)
                                .decryptList(resolvedCiphers)];
                }
            });
        });
    };
    SessionImpl.prototype.getAssumeParams = function (assume) {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (assume == null) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.getKeys(assume.login)];
                    case 1:
                        key = _a.sent();
                        return [2 /*return*/, { key: key, kind: assume.kind }];
                }
            });
        });
    };
    SessionImpl.prototype.getKeys = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var key, keys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = this.assumeKeyCache[login];
                        if (key != null) {
                            return [2 /*return*/, key];
                        }
                        return [4 /*yield*/, this.fetchKeys(login)];
                    case 1:
                        keys = _a.sent();
                        this.assumeKeyCache[login] = keys;
                        return [2 /*return*/, keys];
                }
            });
        });
    };
    SessionImpl.prototype.fetchKeys = function (login, version) {
        return __awaiter(this, void 0, void 0, function () {
            var sharingKey_1, signKey_1, boxKey_1, readKey_1, params, _a, sharingKey, signKey, boxKey, readKey, identityVersion, decryptedSharingKey, _b, cipherSignkey, cipherBoxKey, cipherReadKey, decryptedSignKey, decryptedBoxKey, decryptedReadKey;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.login == login &&
                            (version == undefined || this.encryption.version == version)) {
                            sharingKey_1 = this.encryption.sharingKeyPair.secretKey;
                            signKey_1 = this.encryption.signKeyPair.secretKey;
                            boxKey_1 = this.encryption.boxKeyPair.secretKey;
                            readKey_1 = this.encryption.readKeyPair.secretKey;
                            return [2 /*return*/, {
                                    sharingKey: sharingKey_1,
                                    signKey: signKey_1,
                                    boxKey: boxKey_1,
                                    readKey: readKey_1,
                                    version: this.encryption.version,
                                    login: login
                                }];
                        }
                        if (version != undefined) {
                            params = { version: version.toString() };
                        }
                        return [4 /*yield*/, this.doProtoRequest({
                                method: "GET",
                                path: "/api/v4/identity/" + encodeURI(login) + "/keys",
                                code: 200,
                                response: proto_1.api.IdentityGetKeysResponse.decode,
                                params: params
                            })];
                    case 1:
                        _a = _c.sent(), sharingKey = _a.sharingKey, signKey = _a.signKey, boxKey = _a.boxKey, readKey = _a.readKey, identityVersion = _a.version;
                        return [4 /*yield*/, this.decryptCipherList(proto_1.api.ResourceType.SES, sharingKey)];
                    case 2:
                        decryptedSharingKey = _c.sent();
                        return [4 /*yield*/, this.resolveCipherList([signKey, boxKey, readKey])];
                    case 3:
                        _b = _c.sent(), cipherSignkey = _b[0], cipherBoxKey = _b[1], cipherReadKey = _b[2];
                        decryptedSignKey = this.encryption
                            .decrypt(proto_1.api.ResourceType.SES, decryptedSharingKey)
                            .decrypt(cipherSignkey);
                        decryptedBoxKey = this.encryption
                            .decrypt(proto_1.api.ResourceType.SES, decryptedSharingKey)
                            .decrypt(cipherBoxKey);
                        decryptedReadKey = this.encryption
                            .decrypt(proto_1.api.ResourceType.SES, decryptedBoxKey)
                            .decrypt(cipherReadKey);
                        return [2 /*return*/, {
                                sharingKey: decryptedSharingKey,
                                signKey: decryptedSignKey,
                                boxKey: decryptedBoxKey,
                                readKey: decryptedReadKey,
                                version: identityVersion,
                                login: login
                            }];
                }
            });
        });
    };
    SessionImpl.prototype.clearAssumeParams = function (login) {
        delete this.assumeKeyCache[login];
    };
    return SessionImpl;
}());
exports.SessionImpl = SessionImpl;
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
            var keys, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.doRequest({
                                method: "GET",
                                code: 200,
                                path: "/api/v4/delegatedAccess/" + this.id.toString() + "/keys",
                                response: proto_1.api.DelegatedGetKeysResponse.decode,
                                before: function (x, b) {
                                    return x.setRequestHeader("content-type", "application/x-protobuf");
                                }
                            })];
                    case 1:
                        keys = (_a.sent()).keys;
                        this.keys = proto_1.api.DelegatedKeys.decode(this.resource.decrypt(keys));
                        this.resolve();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        this.reason = e_2;
                        this.reject(e_2);
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
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.wait()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, loginWithKeys(this.client, this.keys)];
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
exports.AccessRequestImpl = AccessRequestImpl;
var AccessRequestResolverImpl = /** @class */ (function () {
    function AccessRequestResolverImpl(id, resource, session) {
        this.id = id;
        this.requesterKey = resource.creator;
        this.resource = resource;
        this.session = session;
    }
    AccessRequestResolverImpl.prototype.resolve = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var keys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.fetchKeys(login)];
                    case 1:
                        keys = _a.sent();
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "PUT",
                                code: 200,
                                path: "/api/v4/delegatedAccess/" + this.id.toString() + "/keys",
                                request: function () {
                                    return proto_1.api.DelegatedPostKeysRequest.encode({
                                        keys: _this.resource.encrypt(proto_1.api.DelegatedKeys.encode(keys).finish())
                                    }).finish();
                                }
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
//# sourceMappingURL=Session.js.map