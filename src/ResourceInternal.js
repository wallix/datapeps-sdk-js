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
var IdentityAPI_1 = require("./IdentityAPI");
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
        var uClear = new TextEncoder().encode(clear);
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
        return new TextDecoder().decode(clear);
    };
    return ResourceBox;
}());
exports.ResourceBox = ResourceBox;
function createWithEncryption(kind, payload, encryption, options) {
    options = options == null ? {} : options;
    var serialize = options.serialize != null
        ? options.serialize
        : function (p) { return new TextEncoder().encode(JSON.stringify(p)); };
    var encryptionPK = {
        login: null,
        version: null,
        sign: encryption.signEncrypted.publicKey,
        box: encryption.boxEncrypted.publicKey
    };
    var keyPair = nacl.box.keyPair();
    var cryptoSES = encryption.encrypt(proto_1.api.ResourceType.SES);
    var sharer = {};
    var sharerSKEncrypted = cryptoSES.encrypt(encryptionPK.box, keyPair.secretKey);
    sharer.nonce = sharerSKEncrypted.nonce;
    sharer.encryptedKey = sharerSKEncrypted.message;
    var payloadEncrypted = cryptoSES.encrypt(keyPair.publicKey, serialize(payload));
    var body = {
        kind: kind,
        type: proto_1.api.ResourceType.ANONYMOUS,
        payload: payloadEncrypted.message,
        nonce: payloadEncrypted.nonce,
        publicKey: keyPair.publicKey,
        sharingGroup: [sharer]
    };
    var resource = new ResourceBox(null, body.kind, payload, keyPair, encryptionPK);
    return { resourceRequestBody: body, resource: resource };
}
exports.createWithEncryption = createWithEncryption;
function makeResourceFromResponse(_a, typeOfKey, session, parse, assume) {
    var resource = _a.resource, encryptedKey = _a.encryptedKey, creator = _a.creator;
    return __awaiter(this, void 0, void 0, function () {
        var key, secretKeyCipher, accessKey;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    assume = assume != null ? assume : session.login;
                    return [4 /*yield*/, session.getAssumeParams({
                            login: assume,
                            kind: IdentityAPI_1.IdentityAccessKind.READ
                        })];
                case 1:
                    key = (_b.sent()).key;
                    secretKeyCipher = encryptedKey.pop();
                    return [4 /*yield*/, session.decryptCipherList(proto_1.api.ResourceType.SES, encryptedKey, key.boxKey)];
                case 2:
                    accessKey = _b.sent();
                    return [4 /*yield*/, makeResource({ resource: resource, encryptedKey: secretKeyCipher, creator: creator }, typeOfKey, session, accessKey, parse)];
                case 3: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.makeResourceFromResponse = makeResourceFromResponse;
function makeResource(_a, typeOfKey, session, boxKey, parse) {
    var resource = _a.resource, encryptedKey = _a.encryptedKey, creator = _a.creator;
    return __awaiter(this, void 0, void 0, function () {
        var secretKey, keypair, payload, _b, _c, rcreator;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, session.decryptCipherList(typeOfKey, [encryptedKey], boxKey)];
                case 1:
                    secretKey = _d.sent();
                    keypair = nacl.box.keyPair.fromSecretKey(secretKey);
                    parse = parse != null ? parse : function (u) { return JSON.parse(new TextDecoder().decode(u)); };
                    if (!(resource.payload.length == 0)) return [3 /*break*/, 2];
                    _b = null;
                    return [3 /*break*/, 4];
                case 2:
                    _c = parse;
                    return [4 /*yield*/, session.decryptCipherList(proto_1.api.ResourceType.SES, [
                            {
                                message: resource.payload,
                                nonce: resource.nonce,
                                sign: creator
                            }
                        ], keypair.secretKey)];
                case 3:
                    _b = _c.apply(void 0, [_d.sent()]);
                    _d.label = 4;
                case 4:
                    payload = _b;
                    return [4 /*yield*/, session.getPublicKey(creator)];
                case 5:
                    rcreator = _d.sent();
                    return [2 /*return*/, new ResourceBox(resource.id, resource.kind, payload, keypair, rcreator)];
            }
        });
    });
}
exports.makeResource = makeResource;
function makeResourcesFromResponses(resources, session, parse) {
    return __awaiter(this, void 0, void 0, function () {
        var owners, ownersKeys, i, owner, keys, resolvedResources, i, resource, keys, j, _a, _b;
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
                    return [4 /*yield*/, session.fetchKeys(owner.login, owner.version)];
                case 2:
                    keys = _c.sent();
                    ownersKeys.push(keys);
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
                    keys = void 0;
                    for (j = 0; j < owners.length; j++) {
                        if (resource.owner.login == owners[j].login &&
                            resource.owner.version == owners[j].version) {
                            keys = ownersKeys[j];
                        }
                    }
                    _b = (_a = resolvedResources).push;
                    return [4 /*yield*/, makeResource(resource, proto_1.api.ResourceType.SES, session, keys != undefined ? keys.boxKey : undefined, parse)];
                case 6:
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
function createBodyRequest(payload, sharingGroup, crypto, session, options) {
    return __awaiter(this, void 0, void 0, function () {
        var serialize, keypair, encryptedSharingGroup, _a, message, nonce;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = options != null ? options : {};
                    serialize = options.serialize != null
                        ? options.serialize
                        : function (p) { return new TextEncoder().encode(JSON.stringify(p)); };
                    keypair = nacl.box.keyPair();
                    return [4 /*yield*/, encryptForSharingGroup(keypair.secretKey, sharingGroup, crypto, session)];
                case 1:
                    encryptedSharingGroup = _b.sent();
                    _a = crypto.encrypt(keypair.publicKey, serialize(payload)), message = _a.message, nonce = _a.nonce;
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
function encryptForSharingGroup(text, sharingGroup, crypto, session) {
    return __awaiter(this, void 0, void 0, function () {
        var publicKeys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, session.getLatestPublicKeys(sharingGroup)];
                case 1:
                    publicKeys = _a.sent();
                    return [2 /*return*/, publicKeys.map(function (_a) {
                            var login = _a.login, version = _a.version, box = _a.box, sign = _a.sign;
                            var _b = crypto.encrypt(box, text), message = _b.message, nonce = _b.nonce;
                            return { login: login, version: version, nonce: nonce, encryptedKey: message };
                        })];
            }
        });
    });
}
exports.encryptForSharingGroup = encryptForSharingGroup;
//# sourceMappingURL=ResourceInternal.js.map