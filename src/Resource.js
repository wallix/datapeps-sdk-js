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
var Tools_1 = require("./Tools");
var ResourceType;
(function (ResourceType) {
    ResourceType[ResourceType["ANONYMOUS"] = 0] = "ANONYMOUS";
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
var Resource = /** @class */ (function () {
    function Resource(id, kind, payload, keypair, creator, type) {
        if (type === void 0) { type = ResourceType.ANONYMOUS; }
        this.id = id;
        this.kind = kind;
        this.payload = payload;
        this.keypair = keypair;
        this.creator = creator;
        this.type = type;
        if (type != ResourceType.ANONYMOUS) {
            throw new Error("Error Resource support yet only anonymous mode");
        }
    }
    Resource.prototype.publicKey = function () {
        return this.keypair.publicKey;
    };
    Resource.prototype.encrypt = function (content) {
        var nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
        var cipher = nacl.secretbox(content, nonce, this.keypair.secretKey);
        return Tools_1.Uint8Tool.concat(nonce, cipher);
    };
    Resource.prototype.decrypt = function (message) {
        var nonce = message.slice(0, nacl.secretbox.nonceLength);
        var cipher = message.slice(nacl.secretbox.nonceLength);
        return nacl.secretbox.open(cipher, nonce, this.keypair.secretKey);
    };
    return Resource;
}());
exports.Resource = Resource;
var ResourceImpl = /** @class */ (function () {
    function ResourceImpl(session) {
        this.session = session;
    }
    ResourceImpl.prototype._createBodyRequest = function (payload, sharingGroup, crypto, options) {
        return __awaiter(this, void 0, void 0, function () {
            var serialize, keypair, encryptedSharingGroup, _a, message, nonce;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options != null ? options : {};
                        serialize = options.serialize != null ? options.serialize :
                            function (p) { return new TextEncoder().encode(JSON.stringify(p)); };
                        keypair = nacl.box.keyPair();
                        return [4 /*yield*/, this.encryptForSharingGroup(keypair.secretKey, sharingGroup, crypto)];
                    case 1:
                        encryptedSharingGroup = _b.sent();
                        _a = crypto.encrypt(keypair.publicKey, serialize(payload)), message = _a.message, nonce = _a.nonce;
                        return [2 /*return*/, {
                                keypair: keypair,
                                body: {
                                    payload: message, nonce: nonce,
                                    publicKey: keypair.publicKey,
                                    sharingGroup: encryptedSharingGroup,
                                }
                            }];
                }
            });
        });
    };
    ResourceImpl.prototype.create = function (kind, payload, sharingGroup, options) {
        return __awaiter(this, void 0, void 0, function () {
            var encryptFunc, type, creator, _a, body, keypair, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options == null ? {} : options;
                        encryptFunc = this.session.encryption.encrypt(proto_1.types.ResourceType.SES);
                        type = proto_1.types.ResourceType.ANONYMOUS;
                        creator = this.session.getSessionPublicKey();
                        return [4 /*yield*/, this._createBodyRequest(payload, sharingGroup, encryptFunc, options)];
                    case 1:
                        _a = _b.sent(), body = _a.body, keypair = _a.keypair;
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST", code: 201,
                                path: "/api/v4/resources",
                                request: function () { return proto_1.types.ResourcePostRequest.encode(__assign({}, body, { type: type, kind: kind })).finish(); },
                                response: proto_1.types.ResourcePostResponse.decode
                            })];
                    case 2:
                        id = (_b.sent()).id;
                        return [2 /*return*/, new Resource(id, kind, payload, keypair, creator)];
                }
            });
        });
    };
    ResourceImpl.prototype.get = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var assume, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options != null ? options : {};
                        assume = options.assume != null ? options.assume : this.session.login;
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "GET", code: 200,
                                path: "/api/v4/resource/" + id,
                                assume: { login: assume, kind: DataPeps_1.IdentityAccessKind.READ },
                                response: function (r) { return proto_1.types.ResourceGetResponse.decode(r); },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this._makeResourceFromResponse(response, proto_1.types.ResourceType.SES, options.parse, assume)];
                }
            });
        });
    };
    ResourceImpl.prototype._makeResourceFromResponse = function (_a, typeOfKey, parse, assume) {
        var resource = _a.resource, encryptedKey = _a.encryptedKey, creator = _a.creator;
        return __awaiter(this, void 0, void 0, function () {
            var key, secretKeyCipher, accessKey, secretKey, keypair, payload, _b, _c, rcreator;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        parse = parse != null ? parse : function (u) { return JSON.parse(new TextDecoder().decode(u)); };
                        assume = assume != null ? assume : this.session.login;
                        return [4 /*yield*/, this.session.getAssumeParams({ login: assume, kind: DataPeps_1.IdentityAccessKind.READ })];
                    case 1:
                        key = (_d.sent()).key;
                        secretKeyCipher = encryptedKey.pop();
                        return [4 /*yield*/, this.session.decryptCipherList(proto_1.types.ResourceType.SES, encryptedKey, key.boxKey)];
                    case 2:
                        accessKey = _d.sent();
                        return [4 /*yield*/, this.session.decryptCipherList(typeOfKey, [secretKeyCipher], accessKey)];
                    case 3:
                        secretKey = _d.sent();
                        keypair = nacl.box.keyPair.fromSecretKey(secretKey);
                        if (!(resource.payload.length == 0)) return [3 /*break*/, 4];
                        _b = null;
                        return [3 /*break*/, 6];
                    case 4:
                        _c = parse;
                        return [4 /*yield*/, this.session.decryptCipherList(proto_1.types.ResourceType.SES, [{
                                    message: resource.payload,
                                    nonce: resource.nonce,
                                    sign: creator
                                }], keypair.secretKey)];
                    case 5:
                        _b = _c.apply(void 0, [_d.sent()]);
                        _d.label = 6;
                    case 6:
                        payload = _b;
                        return [4 /*yield*/, this.session.getPublicKey(creator)];
                    case 7:
                        rcreator = _d.sent();
                        return [2 /*return*/, new Resource(resource.id, resource.kind, payload, keypair, rcreator)];
                }
            });
        });
    };
    ResourceImpl.prototype.delete = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var soft, assume;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options != null ? options : {};
                        soft = options.soft != null ? options.soft : false;
                        assume = options.assume != null ? options.assume : this.session.login;
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "DELETE", code: 200,
                                path: "/api/v4/resource/" + id,
                                assume: { login: assume, kind: DataPeps_1.IdentityAccessKind.WRITE },
                                params: { soft: soft },
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ResourceImpl.prototype.extendSharingGroup = function (id, sharingGroup, options) {
        return __awaiter(this, void 0, void 0, function () {
            var assume, _a, encryptedKey, type, key, secretKey, encryptFunc, encryptedSharingGroup;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options != null ? options : {};
                        assume = options.assume != null ? options.assume : this.session.login;
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "GET", code: 200,
                                path: "/api/v4/resource/" + id + "/key",
                                response: proto_1.types.ResourceGetKeyResponse.decode,
                            })];
                    case 1:
                        _a = _b.sent(), encryptedKey = _a.encryptedKey, type = _a.type;
                        return [4 /*yield*/, this.session.getAssumeParams({ login: assume, kind: DataPeps_1.IdentityAccessKind.READ })];
                    case 2:
                        key = (_b.sent()).key;
                        return [4 /*yield*/, this.session.decryptCipherList(proto_1.types.ResourceType.SES, encryptedKey, key.boxKey)];
                    case 3:
                        secretKey = _b.sent();
                        encryptFunc = this.session.encryption.encrypt(proto_1.types.ResourceType.SES);
                        return [4 /*yield*/, this.encryptForSharingGroup(secretKey, sharingGroup, encryptFunc)];
                    case 4:
                        encryptedSharingGroup = _b.sent();
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "PATCH", code: 201,
                                path: "/api/v4/resource/" + id + "/sharingGroup",
                                request: function () { return proto_1.types.ResourceExtendSharingGroupRequest.encode({
                                    sharingGroup: encryptedSharingGroup
                                }).finish(); }
                            })];
                    case 5: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ResourceImpl.prototype.encryptForSharingGroup = function (text, sharingGroup, crypto) {
        return __awaiter(this, void 0, void 0, function () {
            var publicKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.getLatestPublicKeys(sharingGroup)];
                    case 1:
                        publicKeys = _a.sent();
                        return [2 /*return*/, publicKeys.map(function (_a) {
                                var login = _a.login, version = _a.version, box = _a.box, sign = _a.sign;
                                var _b = crypto.encrypt(box, text), message = _b.message, nonce = _b.nonce;
                                return {
                                    login: login, version: version, nonce: nonce,
                                    encryptedKey: message
                                };
                            })];
                }
            });
        });
    };
    return ResourceImpl;
}());
exports.ResourceImpl = ResourceImpl;
//# sourceMappingURL=Resource.js.map