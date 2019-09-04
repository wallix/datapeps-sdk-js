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
var nacl = require("tweetnacl");
var proto_1 = require("./proto");
var Error_1 = require("./Error");
var Tools_1 = require("./Tools");
var api = proto_1.wallix.gopeps.protobuf.datapeps;
var MemoryPublicKeysCache = /** @class */ (function () {
    function MemoryPublicKeysCache() {
        this.cache = {};
    }
    MemoryPublicKeysCache.prototype.latest = function (login) {
        var keys = this.cache[login];
        return keys == null || keys.length == 0 ? null : keys[keys.length - 1];
    };
    MemoryPublicKeysCache.prototype.get = function (_a) {
        var login = _a.login, version = _a.version;
        var keys = this.cache[login];
        return keys == null || keys.length == 0 ? null : keys[version];
    };
    MemoryPublicKeysCache.prototype.set = function (_a, pk) {
        var login = _a.login, version = _a.version;
        var keys = this.cache[login];
        if (keys == null) {
            this.cache[login] = [];
        }
        this.cache[login][version] = pk;
    };
    return MemoryPublicKeysCache;
}());
exports.MemoryPublicKeysCache = MemoryPublicKeysCache;
var PublicKeysManager = /** @class */ (function () {
    function PublicKeysManager(client, cache, trustPolicy) {
        this.cache = cache;
        this.client = client;
        this.trustPolicy = trustPolicy;
    }
    PublicKeysManager.prototype.getLatestPublicKey = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLatestPublicKeys([login])];
                    case 1: return [2 /*return*/, (_a.sent())[0]];
                }
            });
        });
    };
    PublicKeysManager.prototype.getLatestPublicKeys = function (logins) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var chains;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.doRequest({
                            method: "POST",
                            expectedCode: 200,
                            path: "/api/v1/identities/latestPublicChains",
                            headers: new Headers({ "content-type": "application/x-protobuf" }),
                            body: api.IdentityGetLatestPublicChainsRequest.encode({
                                ids: logins.map(function (login) {
                                    var pk = _this.cache.latest(login);
                                    return { login: login, since: pk == null ? 0 : pk.version };
                                })
                            }).finish(),
                            response: api.IdentityGetLatestPublicChainsResponse.decode
                        })];
                    case 1:
                        chains = (_a.sent()).body.chains;
                        return [4 /*yield*/, this.validateChains(chains)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, logins.map(function (login) { return _this.cache.latest(login); })];
                }
            });
        });
    };
    PublicKeysManager.prototype.getPublicKeys = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var requestIds, logins, chains;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestIds = {};
                        ids.forEach(function (id) {
                            if (_this.cache.get(id) != null) {
                                return;
                            }
                            var version = requestIds[id.login];
                            if (version == null || version < id.version) {
                                requestIds[id.login] = id.version;
                            }
                        });
                        logins = Object.keys(requestIds);
                        if (logins.length == 0) {
                            return [2 /*return*/, ids.map(function (id) { return _this.cache.get(id); })];
                        }
                        return [4 /*yield*/, this.client.doRequest({
                                method: "POST",
                                expectedCode: 200,
                                path: "/api/v1/identities/publicChains",
                                headers: new Headers({ "content-type": "application/x-protobuf" }),
                                body: api.IdentityGetPublicChainsRequest.encode({
                                    ids: Object.keys(requestIds).map(function (login) {
                                        var pk = _this.cache.latest(login);
                                        var since = pk == null ? 0 : pk.version;
                                        var version = requestIds[login];
                                        return { id: { login: login, version: version }, since: since };
                                    })
                                }).finish(),
                                response: api.IdentityGetPublicChainsResponse.decode
                            })];
                    case 1:
                        chains = (_a.sent()).body.chains;
                        return [4 /*yield*/, this.validateChains(chains)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, ids.map(function (id) { return _this.cache.get(id); })];
                }
            });
        });
    };
    PublicKeysManager.prototype.getPublicKey = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var publicKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPublicKeys([id])];
                    case 1:
                        publicKeys = _a.sent();
                        return [2 /*return*/, publicKeys[0]];
                }
            });
        });
    };
    PublicKeysManager.prototype.resolveCipherList = function (ciphers) {
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
    PublicKeysManager.prototype.setTrustPolicy = function (policy) {
        this.trustPolicy = policy;
    };
    PublicKeysManager.prototype.validateChains = function (chains) {
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
    // TODO(SSH): chains -> chain or links (the former is better)
    PublicKeysManager.prototype.validateChain = function (_a) {
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
                        pk = this.cache.get({ login: login, version: firstVersion });
                        if (!(firstVersion == 0)) return [3 /*break*/, 3];
                        if (!(pk == null)) return [3 /*break*/, 2];
                        _b = chains.shift(), box = _b.box, sign = _b.sign, mandate = _b.mandate;
                        pk = { login: login, version: 1, box: box, sign: sign };
                        return [4 /*yield*/, this.trustPolicy.trust(pk, mandate)];
                    case 1:
                        _c.sent();
                        this.cache.set({ login: login, version: 1 }, pk);
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
                                            this.cache.set(id, pk);
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
    return PublicKeysManager;
}());
exports.PublicKeysManager = PublicKeysManager;
//# sourceMappingURL=PublicKeyManager.js.map