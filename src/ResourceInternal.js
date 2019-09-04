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
var ResourceAPI_1 = require("./ResourceAPI");
var Tools_1 = require("./Tools");
var Error_1 = require("./Error");
var proto_1 = require("./proto");
var Cryptor_1 = require("./Cryptor");
var IdentityKeySet_1 = require("./IdentityKeySet");
var api = proto_1.wallix.gopeps.protobuf.datapeps;
var ResourceBox = /** @class */ (function () {
    function ResourceBox(id, kind, payload, keypair, creator, type) {
        if (type === void 0) { type = ResourceAPI_1.ResourceType.ANONYMOUS; }
        this.id = id;
        this.kind = kind;
        this.payload = payload;
        this.keypair = keypair;
        this.creator = creator;
        this.type = type;
    }
    ResourceBox.prototype.publicKey = function () {
        return this.keypair.publicKey;
    };
    ResourceBox.prototype.encrypt = function (content) {
        if (content instanceof Uint8Array) {
            return this.encryptUint8Array(content);
        }
        return this.encryptString(content);
    };
    ResourceBox.prototype.encryptUint8Array = function (content) {
        var nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
        var cipher = nacl.secretbox(content, nonce, this.keypair.secretKey);
        return Tools_1.Uint8Tool.concat(nonce, cipher);
    };
    ResourceBox.prototype.encryptString = function (clear) {
        var uClear = Tools_1.Uint8Tool.encode(clear);
        var uEncrypted = this.encryptUint8Array(uClear);
        return Tools_1.Base64.encode(uEncrypted);
    };
    ResourceBox.prototype.decrypt = function (message) {
        if (message instanceof Uint8Array) {
            return this.decryptUint8Array(message);
        }
        return this.decryptString(message);
    };
    ResourceBox.prototype.decryptUint8Array = function (message) {
        var nonce = message.slice(0, nacl.secretbox.nonceLength);
        var cipher = message.slice(nacl.secretbox.nonceLength);
        var text = nacl.secretbox.open(cipher, nonce, this.keypair.secretKey);
        if (text == null) {
            throw new Error_1.Error({
                kind: Error_1.SDKKind.DecryptFail,
                payload: { resource: this.id }
            });
        }
        return text;
    };
    ResourceBox.prototype.decryptString = function (cipher) {
        var uEncrypted = Tools_1.Base64.decode(cipher);
        var clear = this.decryptUint8Array(uEncrypted);
        return Tools_1.Uint8Tool.decode(clear);
    };
    return ResourceBox;
}());
exports.ResourceBox = ResourceBox;
function createWithEncryption(payload, encryption, kind, options) {
    options = options == null ? {} : options;
    var serialize = options.serialize != null
        ? options.serialize
        : function (p) { return Tools_1.Uint8Tool.encode(JSON.stringify(p)); };
    var encryptionPK = encryption.public();
    var keyPair = nacl.box.keyPair();
    var cryptoSES = encryption.encryptor(Cryptor_1.CipherType.NACL_SES);
    var sharer = {};
    var sharerSKEncrypted = cryptoSES.encrypt(encryptionPK, keyPair.secretKey);
    sharer.nonce = sharerSKEncrypted.nonce;
    sharer.encryptedKey = sharerSKEncrypted.message;
    var payloadEncrypted = cryptoSES.encrypt({ box: keyPair.publicKey }, serialize(payload));
    var body = {
        kind: kind,
        type: api.ResourceType.ANONYMOUS,
        payload: payloadEncrypted.message,
        nonce: payloadEncrypted.nonce,
        publicKey: keyPair.publicKey,
        sharingGroup: [sharer]
    };
    var resource = new ResourceBox(null, body.kind, payload, keyPair, encryptionPK);
    return { resourceRequestBody: body, resource: resource };
}
exports.createWithEncryption = createWithEncryption;
function makeResourceFromResponse(_a, typeOfKey, publicKeyManager, keySetManager, parse) {
    var resource = _a.resource, owner = _a.owner, creator = _a.creator, encryptedKey = _a.encryptedKey;
    return __awaiter(this, void 0, void 0, function () {
        var ownerKeySet;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, keySetManager.get(owner.login, owner.version)];
                case 1:
                    ownerKeySet = _b.sent();
                    return [4 /*yield*/, makeResource({ resource: resource, creator: creator, encryptedKey: encryptedKey }, publicKeyManager, ownerKeySet, typeOfKey, parse)];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.makeResourceFromResponse = makeResourceFromResponse;
function makeResource(_a, publicKeyManager, ownerKeySet, typeOfKey, parse) {
    var resource = _a.resource, encryptedKey = _a.encryptedKey, creator = _a.creator;
    if (parse === void 0) { parse = function (u) { return JSON.parse(Tools_1.Uint8Tool.decode(u)); }; }
    return __awaiter(this, void 0, void 0, function () {
        var resolvedKey, secretKey, keypair, creatorPk, payload;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, publicKeyManager.resolveCipherList([encryptedKey])];
                case 1:
                    resolvedKey = (_b.sent())[0];
                    secretKey = ownerKeySet.decryptor(typeOfKey).decrypt(resolvedKey);
                    keypair = nacl.box.keyPair.fromSecretKey(secretKey);
                    if (!Tools_1.Uint8Tool.equals(resource.publicKey, keypair.publicKey)) {
                        throw new Error_1.Error({
                            kind: Error_1.SDKKind.ProtocolError,
                            payload: {
                                message: "public key doesn't match secret key",
                                resource: resource.id
                            }
                        });
                    }
                    return [4 /*yield*/, publicKeyManager.getPublicKey(creator)];
                case 2:
                    creatorPk = _b.sent();
                    payload = resource.payload.length == 0
                        ? null
                        : parse(IdentityKeySet_1.IdentityKeySet.decryptor(Cryptor_1.CipherType.NACL_SES, keypair.secretKey).decrypt({
                            message: resource.payload,
                            nonce: resource.nonce,
                            sign: creatorPk
                        }));
                    return [2 /*return*/, new ResourceBox(resource.id, resource.kind, payload, keypair, creatorPk)];
            }
        });
    });
}
exports.makeResource = makeResource;
function makeResourcesFromResponses(resources, keySetManager, publicKeyManager, parse) {
    return __awaiter(this, void 0, void 0, function () {
        var owners, ownersKeys, i, owner, keySet, resolvedResources, i, resource, keySet, j, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    owners = [];
                    resources.forEach(function (resource) {
                        if (resource.owner != undefined) {
                            if (owners.find(function (id) {
                                return id.login == resource.owner.login &&
                                    id.version == resource.owner.version;
                            }) == undefined) {
                                owners.push(resource.owner);
                            }
                        }
                        else {
                            throw new Error_1.Error({
                                kind: Error_1.SDKKind.SDKInternalError,
                                payload: {
                                    message: "Missing owner field",
                                    resource: resource.resource.id
                                }
                            });
                        }
                    });
                    ownersKeys = [];
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < owners.length)) return [3 /*break*/, 4];
                    owner = owners[i];
                    if (!(owner.login != undefined && owner.version != undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, keySetManager.get(owner.login, owner.version)];
                case 2:
                    keySet = _c.sent();
                    ownersKeys.push(keySet);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    resolvedResources = [];
                    i = 0;
                    _c.label = 5;
                case 5:
                    if (!(i < resources.length)) return [3 /*break*/, 8];
                    resource = resources[i];
                    keySet = void 0;
                    for (j = 0; j < owners.length; j++) {
                        if (resource.owner.login == owners[j].login &&
                            resource.owner.version == owners[j].version) {
                            keySet = ownersKeys[j];
                        }
                    }
                    // TODO(K1): Rid keySet as any
                    _b = (_a = resolvedResources).push;
                    return [4 /*yield*/, makeResource(resource, publicKeyManager, keySet, Cryptor_1.CipherType.NACL_SES, parse)];
                case 6:
                    // TODO(K1): Rid keySet as any
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8: return [2 /*return*/, resolvedResources];
            }
        });
    });
}
exports.makeResourcesFromResponses = makeResourcesFromResponses;
function createBodyRequest(payload, sharingGroup, crypto, publicKeyManager, options) {
    return __awaiter(this, void 0, void 0, function () {
        var serialize, keypair, encryptedSharingGroup, _a, message, nonce;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = options != null ? options : {};
                    serialize = options.serialize != null
                        ? options.serialize
                        : function (p) { return Tools_1.Uint8Tool.encode(JSON.stringify(p)); };
                    keypair = nacl.box.keyPair();
                    return [4 /*yield*/, encryptForSharingGroup(keypair.secretKey, sharingGroup, crypto, publicKeyManager)];
                case 1:
                    encryptedSharingGroup = _b.sent();
                    _a = crypto.encrypt({ box: keypair.publicKey }, serialize(payload)), message = _a.message, nonce = _a.nonce;
                    return [2 /*return*/, {
                            keypair: keypair,
                            body: {
                                payload: message,
                                nonce: nonce,
                                publicKey: keypair.publicKey,
                                sharingGroup: encryptedSharingGroup
                            }
                        }];
            }
        });
    });
}
exports.createBodyRequest = createBodyRequest;
function encryptForSharingGroup(text, sharingGroup, crypto, publicKeyManager) {
    return __awaiter(this, void 0, void 0, function () {
        var publicKeys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, publicKeyManager.getLatestPublicKeys(sharingGroup)];
                case 1:
                    publicKeys = _a.sent();
                    return [2 /*return*/, publicKeys.map(function (pk) {
                            var _a = crypto.encrypt(pk, text), message = _a.message, nonce = _a.nonce;
                            return {
                                login: pk.login,
                                version: pk.version,
                                nonce: nonce,
                                encryptedKey: message
                            };
                        })];
            }
        });
    });
}
exports.encryptForSharingGroup = encryptForSharingGroup;
//# sourceMappingURL=ResourceInternal.js.map