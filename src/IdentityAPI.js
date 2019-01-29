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
var Error_1 = require("./Error");
var CryptoFuncs_1 = require("./CryptoFuncs");
var Tools_1 = require("./Tools");
var HTTP_1 = require("./HTTP");
var IdentityInternal_1 = require("./IdentityInternal");
exports.IdentitySortingOrder = IdentityInternal_1.IdentitySortingOrder;
var IdentityPublicKey;
(function (IdentityPublicKey) {
    var bs58 = require("bs58");
    var sha = require("sha.js");
    /**
     * Returns the hash of an IdentityPublicKey.
     * The hash is computed thanks a sha2156 of the concat of box and sign key.
     * @param key The key to hash.
     * @return(h) The hash of the key.
     */
    IdentityPublicKey.hash = function (key) {
        var h = Tools_1.Uint8Tool.concat(key.box, key.sign);
        return new Uint8Array(new sha.sha256().update(h).digest());
    };
    /**
     * Returns a human redeable representation of the an IdentityPublicKey.
     * The representation is the hash of the IdentityPublicKey encoded in base58.
     * @param key The key to print.
     * @return(s) The string representation of the key.
     */
    IdentityPublicKey.print = function (key) {
        return bs58.encode(IdentityPublicKey.hash(key));
    };
})(IdentityPublicKey = exports.IdentityPublicKey || (exports.IdentityPublicKey = {}));
/** Allows to indicate which kind of access shoudl be used in a {@link SessionRequest}*/
var IdentityAccessKind;
(function (IdentityAccessKind) {
    IdentityAccessKind[IdentityAccessKind["READ"] = 0] = "READ";
    IdentityAccessKind[IdentityAccessKind["WRITE"] = 1] = "WRITE";
})(IdentityAccessKind = exports.IdentityAccessKind || (exports.IdentityAccessKind = {}));
/** Allows to indicate which kind of field should be sorted. */
var IdentitySortingField;
(function (IdentitySortingField) {
    IdentitySortingField[IdentitySortingField["LOGIN"] = 0] = "LOGIN";
    IdentitySortingField[IdentitySortingField["CREATED"] = 1] = "CREATED";
    IdentitySortingField[IdentitySortingField["KIND"] = 2] = "KIND";
})(IdentitySortingField = exports.IdentitySortingField || (exports.IdentitySortingField = {}));
var IdentityAPI = /** @class */ (function () {
    function IdentityAPI(session) {
        this.session = session;
    }
    /**
     * Get the latest public key of the given identity login.
     * @param login The login of identity to get the key.
     * @return(p) On success the promise will be resolved with the public key of `login`.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity is not found.
     */
    IdentityAPI.getLatestPublicKeys = function (logins) {
        return __awaiter(this, void 0, void 0, function () {
            var publicKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, HTTP_1.client.doRequest({
                            method: "POST",
                            expectedCode: 200,
                            path: "/api/v4/identities/latestPublicKeys",
                            body: proto_1.api.IdentityGetLatestPublicKeysRequest.encode({ logins: logins }).finish(),
                            response: proto_1.api.IdentityGetLatestPublicKeysResponse.decode,
                            headers: new Headers({
                                "content-type": "application/x-protobuf"
                            })
                        })];
                    case 1:
                        publicKeys = (_a.sent()).body.publicKeys;
                        return [2 /*return*/, publicKeys];
                }
            });
        });
    };
    /**
     * Get the latest public key of a list of identities.
     * @param logins The login of identities to get the key.
     * @return(p) On success the promise will be resolved with list of the public key in the same order of the `logins` list.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if an identity is not found.
     */
    IdentityAPI.getLatestPublicKey = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var pk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, IdentityAPI.getLatestPublicKeys([login])];
                    case 1:
                        pk = (_a.sent())[0];
                        return [2 /*return*/, pk];
                }
            });
        });
    };
    /**
     * Get an identity from the login.
     * @param login The login of the identity to get.
     * @return(p) On success the promise will be resolved with the identity.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityNotFound` if the `login` does not exists.
     */
    IdentityAPI.prototype.get = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "GET",
                            expectedCode: 200,
                            path: "/api/v4/identity/" + encodeURI(login),
                            response: function (r) { return IdentityInternal_1.IdentitySerializer.deserialize(proto_1.api.Identity.decode(r)); }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * List identities registered on DataPeps.
     * @param options A collection of options:
     *  - offset: Skip this number of results.
     *  - limit: Limit the length of the result (default: 10).
     *  - search: select only logins containing this string
     *  - kind: Filter on a specific kind
     *  - sortingField: Sort the result according to this field, default is CREATED
     *  - sortingOrder: Specifies the sorting order "ASC" or "DESC", default is ASC
     * @return(p) On success the promise will be resolved with a list.
     */
    IdentityAPI.prototype.list = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var sortingOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options == null ? {} : options;
                        if (options.sortingField == null) {
                            options.sortingField = IdentitySortingField.CREATED;
                        }
                        sortingOrder = IdentityInternal_1.IdentityRequestsUtils.resolveSortingOrder(options.sortingOrder);
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST",
                                expectedCode: 200,
                                path: "/api/v4/identities/list",
                                body: proto_1.api.IdentityListRequest.encode({
                                    options: {
                                        offset: options.offset,
                                        limit: options.limit,
                                        loginPrefix: options.search,
                                        kind: options.kind,
                                        sortedBy: options.sortingField,
                                        order: sortingOrder
                                    }
                                }).finish(),
                                response: function (r) {
                                    var _a = proto_1.api.IdentityListResponse.decode(r), identities = _a.identities, totalIdentitiesCount = _a.totalIdentitiesCount;
                                    return {
                                        identities: identities.map(IdentityInternal_1.IdentitySerializer.deserialize),
                                        totalIdentitiesCount: totalIdentitiesCount
                                    };
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Create a new identity.
     * @param identity The description of the identity.
     * @param options A collection of options:
     *  - secret: An optional secret associated with the created identity that could be used to login.
     *  - sharingGroup: An optional list of identity logins that are shared with the created identity.
     *  - email: An optional email associated with the identity to create.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityInvalidLogin` if identity.login is not a valid login.
     * - `IdentityAlreadyExists` if identity.login already exists.
     */
    IdentityAPI.prototype.create = function (identity, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var osharingGroup, encryption, publicKeys, sharingGroup, epub;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options == null ? {} : options;
                        osharingGroup = options.sharingGroup == null ? [] : options.sharingGroup;
                        encryption = new CryptoFuncs_1.Encryption();
                        encryption.generate(Tools_1.Uint8Tool.convert(options.secret), this.session.encryption);
                        return [4 /*yield*/, this.session.getLatestPublicKeys(osharingGroup)];
                    case 1:
                        publicKeys = _a.sent();
                        sharingGroup = publicKeys.map(function (_a) {
                            var login = _a.login, version = _a.version, box = _a.box, sign = _a.sign;
                            var kind = proto_1.api.IdentityShareKind.SHARING;
                            var _b = encryption.encryptKey(kind, _this.session.encryption, box), message = _b.message, nonce = _b.nonce;
                            return {
                                login: login,
                                version: version,
                                nonce: nonce,
                                kind: kind,
                                encryptedKey: message
                            };
                        });
                        epub = encryption.getPublic();
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST",
                                expectedCode: 201,
                                path: "/api/v4/identity",
                                body: proto_1.api.IdentityCreateRequest.encode({
                                    identity: identity,
                                    sharingGroup: sharingGroup,
                                    encryption: encryption,
                                    email: options.email,
                                    signChain: this.session.encryption.sign(Tools_1.Uint8Tool.concat(epub.boxEncrypted.publicKey, epub.signEncrypted.publicKey))
                                }).finish()
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update an identity.
     * @param identity The fields to update
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if identity.login doesn't not exists.
     */
    IdentityAPI.prototype.update = function (identity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "PUT",
                            expectedCode: 200,
                            path: "/api/v4/identity/" + encodeURI(identity.login),
                            body: proto_1.api.IdentityFields.encode(identity).finish()
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Renew the keys of an identity.
     * @param login The login of the identity to renew the keys.
     * @param secret An optional secret to renew keys, if not retain the old secret as still valid.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    IdentityAPI.prototype.renewKeys = function (login, secret) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var kind, assume, _a, encryption, creator, sharingGroup, key, next, epub, _b, message, nonce, backward;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        kind = proto_1.api.IdentityShareKind.SHARING;
                        assume = { login: login, kind: IdentityAccessKind.WRITE };
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "GET",
                                expectedCode: 200,
                                path: "/api/v4/identity/" + encodeURIComponent(login) + "/keysToRenew",
                                response: proto_1.api.IdentityGetKeysToRenewResponse.decode,
                                assume: assume
                            })];
                    case 1:
                        _a = _c.sent(), encryption = _a.encryption, creator = _a.creator, sharingGroup = _a.sharingGroup;
                        return [4 /*yield*/, this.session.getAssumeParams({
                                login: login,
                                kind: IdentityAccessKind.WRITE
                            })];
                    case 2:
                        key = (_c.sent()).key;
                        next = new CryptoFuncs_1.Encryption();
                        if (secret == null) {
                            next.generateWithMasterPublicKey(encryption.masterPublicKey, encryption.masterSalt, this.session.encryption);
                        }
                        else {
                            next.generate(Tools_1.Uint8Tool.convert(secret), this.session.encryption);
                        }
                        next.version = key.version + 1;
                        epub = next.getPublic();
                        _b = this.session.encryption
                            .encrypt(proto_1.api.ResourceType.SES)
                            .encrypt(epub.boxEncrypted.publicKey, key.sharingKey), message = _b.message, nonce = _b.nonce;
                        backward = { nonce: nonce, encryptedKey: message };
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST",
                                expectedCode: 201,
                                path: "/api/v4/identity/" + encodeURIComponent(login) + "/keysToRenew",
                                body: proto_1.api.IdentityPostKeysToRenewRequest.encode({
                                    encryption: epub,
                                    backward: backward,
                                    signChain: nacl.sign.detached(Tools_1.Uint8Tool.concat(epub.boxEncrypted.publicKey, epub.signEncrypted.publicKey), key.signKey),
                                    sharingGroup: sharingGroup.map(function (_a) {
                                        var login = _a.login, version = _a.version, box = _a.box, sign = _a.sign;
                                        var _b = next.encryptKey(kind, _this.session.encryption, box), message = _b.message, nonce = _b.nonce;
                                        return {
                                            login: login,
                                            version: version,
                                            encryptedKey: message,
                                            nonce: nonce,
                                            kind: kind
                                        };
                                    })
                                }).finish(),
                                assume: assume
                            })];
                    case 3:
                        _c.sent();
                        this.session.clearAssumeParams(login);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the sharing group of an identity. The sharing group of an identity is the set of identities that can
     * access to this identity.
     * @param login The login of the identity to get the sharing group.
     * @return(p) On success the promise will be resolved with a list of links that describe accesses to the identity.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    IdentityAPI.prototype.getSharingGroup = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "GET",
                            expectedCode: 200,
                            path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGroup",
                            response: function (r) {
                                return proto_1.api.IdentityGetSharingGroupResponse.decode(r)
                                    .sharingGroup;
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Extend the sharing group of an identity.
     * @param login The login of the identity to extend.
     * @param sharingGroup The list of identity logins to add to the sharing group of the identity.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    IdentityAPI.prototype.extendSharingGroup = function (login, sharingGroup) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var key, publicKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.session.clearAssumeParams(login);
                        return [4 /*yield*/, this.session.getAssumeParams({
                                login: login,
                                kind: IdentityAccessKind.WRITE
                            })];
                    case 1:
                        key = (_a.sent()).key;
                        return [4 /*yield*/, this.session.getLatestPublicKeys(sharingGroup)];
                    case 2:
                        publicKeys = _a.sent();
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "PATCH",
                                expectedCode: 201,
                                path: "/api/v4/identity/" + encodeURI(login) + "/sharingGroup",
                                assume: { login: login, kind: IdentityAccessKind.WRITE },
                                body: proto_1.api.IdentityShareRequest.encode({
                                    version: key.version,
                                    sharingGroup: publicKeys.map(function (_a) {
                                        var login = _a.login, version = _a.version, box = _a.box, sign = _a.sign;
                                        var kind = proto_1.api.IdentityShareKind.SHARING;
                                        var _b = _this.session.encryption
                                            .encrypt(proto_1.api.ResourceType.SES)
                                            .encrypt(box, key.sharingKey), message = _b.message, nonce = _b.nonce;
                                        return {
                                            login: login,
                                            version: version,
                                            nonce: nonce,
                                            kind: kind,
                                            encryptedKey: message
                                        };
                                    })
                                }).finish()
                            })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Replace the sharing group of an identity.
     * @param login The login of the identity to replace the keys.
     * @param sharingGroup The list of identity logins that will comprise the new sharing group of the identity.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityInvalidLogin` if the identity.login is not a valid login.
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    IdentityAPI.prototype.replaceSharingGroup = function (login, sharingGroup) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.editSharingGraph(login, { sharingGroup: sharingGroup })];
            });
        });
    };
    IdentityAPI.prototype.editSharingGraph = function (login, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var graph, _a, newBoxPublicKeys, encryptedGraph;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options != null ? options : {};
                        return [4 /*yield*/, this.getSharingGraph(login, {
                                withKeys: options.overwriteKeys == null
                            })];
                    case 1:
                        graph = _b.sent();
                        if (graph[0].login != login) {
                            throw new Error_1.Error({
                                kind: Error_1.SDKKind.SDKInternalError,
                                payload: { login: login, graph: graph, hint: "unexpected graph" }
                            });
                        }
                        if (!(options.sharingGroup != null)) return [3 /*break*/, 3];
                        // Replace the sharing group of login
                        _a = graph[0];
                        return [4 /*yield*/, this.session.getLatestPublicKeys(options.sharingGroup)];
                    case 2:
                        // Replace the sharing group of login
                        _a.sharingGroup = _b.sent();
                        _b.label = 3;
                    case 3:
                        // Filter only latest identites
                        graph = graph.filter(function (elt) { return elt.latest; });
                        if (options.overwriteKeys != null) {
                            // If keys are overwritten, we only update:
                            // - the main identity
                            // - the graph elements in which the only element in sharing group is the main identity (for example a delegate, but not a group)
                            graph = graph.filter(function (elt) {
                                return elt.login == login ||
                                    (elt.sharingGroup.length == 1 && elt.sharingGroup[0].login == login);
                            });
                        }
                        newBoxPublicKeys = new Map();
                        encryptedGraph = graph
                            .map(function (elt) {
                            var encryption = new CryptoFuncs_1.Encryption();
                            if (options.overwriteKeys != null && elt.login === login) {
                                // Overwrite the key of main identity with secret
                                encryption.generate(Tools_1.Uint8Tool.convert(options.overwriteKeys.secret), _this.session.encryption);
                            }
                            else {
                                encryption.generateWithMasterPublicKey(elt.masterPublicKey, null, _this.session.encryption);
                            }
                            encryption.version = elt.version + 1;
                            newBoxPublicKeys.set(elt.login, {
                                login: login,
                                sign: null,
                                box: encryption.getPublicKey(proto_1.api.IdentityShareKind.BOX),
                                version: encryption.version
                            });
                            return { elt: elt, encryption: encryption };
                        })
                            .map(function (_a) {
                            var elt = _a.elt, encryption = _a.encryption;
                            var epub = encryption.getPublic();
                            var backward;
                            var signChain;
                            if (options.overwriteKeys != null) {
                                // administrator signs the 'overwrited' new version of identity
                                signChain = _this.session.encryption.sign(Tools_1.Uint8Tool.concat(epub.boxEncrypted.publicKey, epub.signEncrypted.publicKey));
                            }
                            else {
                                // the new version of identity is signed by the previous one (as keys are accessible by current session)
                                var _b = _this.session.encryption
                                    .encrypt(proto_1.api.ResourceType.SES)
                                    .encrypt(epub.boxEncrypted.publicKey, elt.sharingKey), message = _b.message, nonce = _b.nonce;
                                backward = { nonce: nonce, encryptedKey: message };
                                signChain = nacl.sign.detached(Tools_1.Uint8Tool.concat(epub.boxEncrypted.publicKey, epub.signEncrypted.publicKey), elt.signKey);
                            }
                            return {
                                login: elt.login,
                                version: elt.version + 1,
                                encryption: epub,
                                signChain: signChain,
                                sharingGroup: elt.sharingGroup.map(function (pk) {
                                    var kind = proto_1.api.IdentityShareKind.SHARING;
                                    var newPk = newBoxPublicKeys.get(pk.login);
                                    pk = newPk != null ? newPk : pk;
                                    var _a = encryption.encryptKey(kind, _this.session.encryption, pk.box), message = _a.message, nonce = _a.nonce;
                                    return {
                                        login: pk.login,
                                        version: pk.version,
                                        encryptedKey: message,
                                        nonce: nonce,
                                        kind: kind
                                    };
                                }),
                                backward: backward
                            };
                        });
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST",
                                expectedCode: 201,
                                path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGraph",
                                assume: options.overwriteKeys != null
                                    ? undefined
                                    : { login: login, kind: IdentityAccessKind.WRITE },
                                body: proto_1.api.IdentityPostSharingGraphRequest.encode({
                                    graph: encryptedGraph
                                }).finish()
                            })];
                    case 4: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * Get the access group of an identity. The access group of an identity is the set of identities that can
     * accessed by this identity.
     * @param login The login of the identity to get the sharing group.
     * @return(p) On success the promise will be resolved with a list of links that describe accesses by the identity.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    IdentityAPI.prototype.getAccessGroup = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "GET",
                            expectedCode: 200,
                            path: "/api/v4/identity/" + encodeURIComponent(login) + "/accessGroup",
                            response: function (r) {
                                return proto_1.api.IdentityGetAccessGroupResponse.decode(r)
                                    .accessGroup;
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get all history of public keys of the given identity login.
     * WARNING: These keys are not trusted, i.e. the chain of trust is not validated
     * @param login The login of identity to get the key history.
     * @return(p) On success the promise will be resolved with the history of public keys of `login`.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity is not found.
     */
    IdentityAPI.prototype.getPublicKeyHistory = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var chains, chain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "POST",
                            expectedCode: 200,
                            path: "/api/v4/identities/latestPublicChains",
                            body: proto_1.api.IdentityGetLatestPublicChainsRequest.encode({
                                ids: [{ login: login, since: 0 }]
                            }).finish(),
                            response: proto_1.api.IdentityGetLatestPublicChainsResponse.decode
                        })];
                    case 1:
                        chains = (_a.sent()).chains;
                        if (chains.length != 1 || chains[0].login !== login) {
                            throw new Error_1.Error({
                                kind: Error_1.SDKKind.SDKInternalError,
                                payload: {
                                    login: login,
                                    hint: "unexpected chain in public key history"
                                }
                            });
                        }
                        chain = chains[0];
                        return [2 /*return*/, chain.chains.map(function (chainElt) {
                                return {
                                    login: chain.login,
                                    version: chainElt.version,
                                    sign: chainElt.sign,
                                    box: chainElt.box
                                };
                            })];
                }
            });
        });
    };
    /**
     * Get the keys of the versions of an identity that are locked. A version of an identity is locked if it is not accessible
     * by the current version of the identity
     * @param login The login of the identity to get the sharing group.
     * @param options A collection of initialization options that control the sessions:
     * @return(p) On success the promise will be resolved with a list of the public keys identity that are locked.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the identity cannot be accessed.
     */
    IdentityAPI.prototype.getLockedVersions = function (login, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options != null ? options : {};
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "GET",
                                expectedCode: 200,
                                path: "/api/v4/identity/" + encodeURI(login) + "/lockedVersions",
                                params: options,
                                assume: login == this.session.login
                                    ? null
                                    : { login: login, kind: IdentityAccessKind.READ },
                                response: function (r) {
                                    return proto_1.api.IdentityGetLockedVersionsResponse.decode(r).lockedVersions.map(function (lockedVersion) {
                                        return __assign({}, lockedVersion, { publicKey: __assign({}, lockedVersion.publicKey.publicKey, { created: new Date(lockedVersion.publicKey.created * 1000) }) });
                                    });
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Try to unlock the locked versions with the secret passed as parameter.
     * @param secret A secret used to unlock previous versions of the current identity
     * @return(p) On success the promise will be resolved with the list of unlocked identities.
     */
    IdentityAPI.prototype.unlockVersions = function (login, secret) {
        return __awaiter(this, void 0, void 0, function () {
            var lockedVersions, unlockedVersions, resolvedChallengesWithEncryptedKeys, publicKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLockedVersions(login, {
                            withChallenge: true
                        })];
                    case 1:
                        lockedVersions = _a.sent();
                        unlockedVersions = [];
                        resolvedChallengesWithEncryptedKeys = [];
                        if (!(login == this.session.login)) return [3 /*break*/, 2];
                        publicKey = this.session.encryption.getPublic().boxEncrypted
                            .publicKey;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.session.getLatestPublicKey(login)];
                    case 3:
                        // TODO: possible race condition between the assumed version here and when sending the request
                        publicKey = (_a.sent()).box;
                        _a.label = 4;
                    case 4:
                        lockedVersions.forEach(function (locked) {
                            if (locked.challenge == null) {
                                throw new Error_1.Error({
                                    kind: Error_1.SDKKind.SDKInternalError,
                                    payload: {
                                        version: locked.publicKey.version,
                                        hint: "missing challenge to resolve in locked version"
                                    }
                                });
                            }
                            var encryption = new CryptoFuncs_1.Encryption(proto_1.api.IdentityEncryption.create(locked.challenge.encryption));
                            try {
                                encryption.recover(Tools_1.Uint8Tool.convert(secret), proto_1.api.IdentityPublicKey.create(locked.challenge.creator));
                                unlockedVersions.push(locked.publicKey);
                                // the current version of session identity is signed by the unlocked one (as keys are accessible by current session)
                                var _a = encryption.encryptKey(proto_1.api.IdentityShareKind.SHARING, encryption, publicKey), message = _a.message, nonce = _a.nonce;
                                var backward = { nonce: nonce, encryptedKey: message };
                                resolvedChallengesWithEncryptedKeys.push(new proto_1.api.UnlockVersionsRequest.UnlockedVersion({
                                    resolvedChallenge: {
                                        token: locked.challenge.token,
                                        salt: locked.challenge.salt,
                                        signature: encryption.sign(locked.challenge.salt)
                                    },
                                    backward: backward
                                }));
                            }
                            catch (e) {
                                return;
                            }
                        });
                        if (!(unlockedVersions.length > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST",
                                expectedCode: 200,
                                assume: login == this.session.login
                                    ? null
                                    : { login: login, kind: IdentityAccessKind.WRITE },
                                path: "/api/v4/identity/" + encodeURI(login) + "/unlockVersions",
                                body: proto_1.api.UnlockVersionsRequest.encode({
                                    unlockedVersions: resolvedChallengesWithEncryptedKeys
                                }).finish(),
                                response: proto_1.api.SessionResolveChallengeResponse.decode
                            })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, unlockedVersions];
                }
            });
        });
    };
    IdentityAPI.prototype.getSharingGraph = function (login, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var withKeys, graph, ciphers, resolvedCiphers, resolvedGraph, key, boxKeys, firstSharingKey, x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options != null ? options : {};
                        withKeys = options.withKeys == null ? true : options.withKeys;
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "GET",
                                expectedCode: 200,
                                path: "/api/v4/identity/" + encodeURIComponent(login) + "/sharingGraph",
                                assume: withKeys ? { login: login, kind: IdentityAccessKind.WRITE } : null,
                                response: proto_1.api.IdentityGetSharingGraphResponse.decode
                            })];
                    case 1:
                        graph = (_a.sent()).graph;
                        if (!withKeys) {
                            return [2 /*return*/, graph];
                        }
                        ciphers = [];
                        graph.forEach(function (elt, i) {
                            if (i != 0) {
                                ciphers.push(graph[i].sharingKey);
                            }
                            ciphers.push(graph[i].signKey);
                            ciphers.push(graph[i].boxKey);
                        });
                        return [4 /*yield*/, this.session.resolveCipherList(ciphers)];
                    case 2:
                        resolvedCiphers = _a.sent();
                        resolvedGraph = graph.map(function (elt, i) {
                            var sharingKey = i == 0 ? null : resolvedCiphers.shift();
                            var signKey = resolvedCiphers.shift();
                            var boxKey = resolvedCiphers.shift();
                            return __assign({}, elt, { sharingKey: sharingKey, signKey: signKey, boxKey: boxKey });
                        });
                        return [4 /*yield*/, this.session.getAssumeParams({
                                login: login,
                                kind: IdentityAccessKind.WRITE
                            })];
                    case 3:
                        key = (_a.sent()).key;
                        boxKeys = {};
                        return [4 /*yield*/, this.session.getAssumeParams({
                                login: login,
                                kind: IdentityAccessKind.WRITE
                            })];
                    case 4:
                        firstSharingKey = (_a.sent()).key.sharingKey;
                        x = resolvedGraph.map(function (elt, i) {
                            var sharingKey;
                            if (i == 0) {
                                sharingKey = firstSharingKey;
                            }
                            else {
                                var boxkey = boxKeys[elt.sharedFrom.login + elt.sharedFrom.version];
                                sharingKey = _this.session.encryption
                                    .decrypt(proto_1.api.ResourceType.SES, boxkey)
                                    .decrypt(elt.sharingKey);
                            }
                            var boxKey = _this.session.encryption
                                .decrypt(proto_1.api.ResourceType.SES, sharingKey)
                                .decrypt(elt.boxKey);
                            var signKey = _this.session.encryption
                                .decrypt(proto_1.api.ResourceType.SES, sharingKey)
                                .decrypt(elt.signKey);
                            boxKeys[elt.login + elt.version] = boxKey;
                            return __assign({}, elt, { sharingKey: sharingKey, boxKey: boxKey, signKey: signKey });
                        });
                        return [2 /*return*/, x];
                }
            });
        });
    };
    return IdentityAPI;
}());
exports.IdentityAPI = IdentityAPI;
//# sourceMappingURL=IdentityAPI.js.map