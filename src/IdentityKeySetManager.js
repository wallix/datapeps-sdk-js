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
var IdentityKeySetAPI_1 = require("./IdentityKeySetAPI");
var api = proto_1.wallix.gopeps.protobuf.datapeps;
var IdentityKeySetManager = /** @class */ (function () {
    function IdentityKeySetManager(root, sessionClient) {
        this.cache = {};
        this.root = root;
        this.sessionClient = sessionClient;
    }
    Object.defineProperty(IdentityKeySetManager.prototype, "root", {
        get: function () {
            return this._root;
        },
        set: function (root) {
            this._root = root;
            this.put(this._root);
        },
        enumerable: true,
        configurable: true
    });
    IdentityKeySetManager.prototype.getCurrentPublicKey = function () {
        var publicKey = this.root.public();
        return {
            login: this.root.id.login,
            version: this.root.id.version,
            sign: publicKey.sign,
            box: publicKey.box
        };
    };
    IdentityKeySetManager.prototype.get = function (login, version) {
        return __awaiter(this, void 0, void 0, function () {
            var keySet_1, keySet, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (login == this.root.id.login && version == null) {
                            version = this.root.id.version;
                        }
                        if (!(version == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetch(this.sessionClient, login, version)];
                    case 1:
                        keySet_1 = _b.sent();
                        this.put(keySet_1);
                        version = keySet_1.id.version;
                        _b.label = 2;
                    case 2:
                        keySet = this.getFromCache(login, version);
                        if (keySet != null) {
                            return [2 /*return*/, keySet];
                        }
                        _a = this.put;
                        return [4 /*yield*/, this.fetch(this.sessionClient, login, version)];
                    case 3:
                        _a.apply(this, [_b.sent()]);
                        return [2 /*return*/, this.getFromCache(login, version)];
                }
            });
        });
    };
    IdentityKeySetManager.prototype.sign = function (msg) {
        return this.root.sign(msg);
    };
    IdentityKeySetManager.prototype.fetch = function (sessionClient, login, version) {
        return __awaiter(this, void 0, void 0, function () {
            var path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sessionClient.doProtoRequest({
                            method: "POST",
                            path: "/api/v1/identity/" + encodeURI(login) + "/keySet",
                            expectedCode: 200,
                            body: api.IdentityGetKeySetRequest.encode({
                                version: version
                            }).finish(),
                            response: api.IdentityGetKeySetResponse.decode
                        })];
                    case 1:
                        path = (_a.sent()).path;
                        if (path.length == 0) {
                            throw new Error_1.Error({
                                kind: Error_1.SDKKind.ProtocolError,
                                payload: { message: "unexpected keySet path" }
                            });
                        }
                        return [2 /*return*/, path.reduce(IdentityKeySetAPI_1.IdentityKeySetAPI.recoverWithPathElt, this.root)];
                }
            });
        });
    };
    IdentityKeySetManager.prototype.put = function (keySet) {
        this.cache[IdentityKeySetManager.composeCacheKey(keySet.id.login, keySet.id.version)] = keySet;
    };
    IdentityKeySetManager.prototype.getFromCache = function (login, version) {
        return this.cache[IdentityKeySetManager.composeCacheKey(login, version)];
    };
    IdentityKeySetManager.composeCacheKey = function (login, version) {
        return login + "/" + version;
    };
    return IdentityKeySetManager;
}());
exports.IdentityKeySetManager = IdentityKeySetManager;
//# sourceMappingURL=IdentityKeySetManager.js.map