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
var Error_1 = require("./Error");
var Tools_1 = require("./Tools");
var HTTP_1 = require("./HTTP");
var IdentityInternal_1 = require("./IdentityInternal");
exports.IdentitySortingOrder = IdentityInternal_1.IdentitySortingOrder;
var proto_1 = require("./proto");
var IdentityKeySetAPI_1 = require("./IdentityKeySetAPI");
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
                            path: "/api/v1/identities/latestPublicKeys",
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
                            path: "/api/v1/identity/" + encodeURI(login),
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
                                path: "/api/v1/identities/list",
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
            var osharingGroup, _a, encryptedKeySet, keySet, publicKeys, sharingGroup;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options == null ? {} : options;
                        osharingGroup = options.sharingGroup == null ? [] : options.sharingGroup;
                        _a = IdentityKeySetAPI_1.IdentityKeySetAPI.initWithSecret({ version: 1, login: identity.login }, options.secret), encryptedKeySet = _a.encryptedKeySet, keySet = _a.keySet;
                        return [4 /*yield*/, this.session.getLatestPublicKeys(osharingGroup)];
                    case 1:
                        publicKeys = _b.sent();
                        sharingGroup = IdentityAPI.createSharingGroup(keySet, publicKeys);
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST",
                                expectedCode: 201,
                                path: "/api/v1/identity",
                                body: proto_1.api.IdentityCreateRequest.encode({
                                    identity: identity,
                                    sharingGroup: sharingGroup,
                                    encryption: encryptedKeySet,
                                    email: options.email,
                                    signChain: this.session.encryption.sign(Tools_1.Uint8Tool.concat(encryptedKeySet.boxEncrypted.publicKey, encryptedKeySet.signEncrypted.publicKey))
                                }).finish()
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
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
                            path: "/api/v1/identity/" + encodeURI(identity.login),
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
            var assume, _a, encryption, sharingGroup, currentKeySet, nextKeySetID, _b, nextEncryptedKeySet, nextKeySet, backward, nextSharingGroup, signChain;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        assume = {
                            login: login,
                            kind: proto_1.api.IdentityAccessKeyKind.WRITE
                        };
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "GET",
                                expectedCode: 200,
                                path: "/api/v1/identity/" + encodeURIComponent(login) + "/keysToRenew",
                                response: proto_1.api.IdentityGetKeysToRenewResponse.decode,
                                assume: assume
                            })];
                    case 1:
                        _a = _c.sent(), encryption = _a.encryption, sharingGroup = _a.sharingGroup;
                        currentKeySet = assume.keySet;
                        nextKeySetID = {
                            version: currentKeySet.id.version + 1,
                            login: currentKeySet.id.login
                        };
                        _b = secret != null
                            ? IdentityKeySetAPI_1.IdentityKeySetAPI.initWithSecret(nextKeySetID, secret)
                            : IdentityKeySetAPI_1.IdentityKeySetAPI.initWithMasterSeed(nextKeySetID, {
                                publicKey: encryption.masterPublicKey,
                                masterSalt: encryption.masterSalt
                            }), nextEncryptedKeySet = _b.encryptedKeySet, nextKeySet = _b.keySet;
                        backward = currentKeySet.shareKey(proto_1.api.IdentityShareKind.SHARING, nextKeySet.public());
                        nextSharingGroup = IdentityAPI.createSharingGroup(nextKeySet, sharingGroup);
                        signChain = currentKeySet.signKeys(nextKeySet);
                        // Push the next IdentityKeySet to DataPeps
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST",
                                expectedCode: 201,
                                path: "/api/v1/identity/" + encodeURIComponent(login) + "/keysToRenew",
                                body: proto_1.api.IdentityPostKeysToRenewRequest.encode({
                                    encryption: nextEncryptedKeySet,
                                    sharingGroup: nextSharingGroup,
                                    backward: backward,
                                    signChain: signChain
                                }).finish(),
                                assume: assume
                            })];
                    case 2:
                        // Push the next IdentityKeySet to DataPeps
                        _c.sent();
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
                            path: "/api/v1/identity/" + encodeURIComponent(login) + "/sharingGroup",
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
            var keySet, publicKeys, encryptedKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.getIdentityKeySet(login)];
                    case 1:
                        keySet = _a.sent();
                        return [4 /*yield*/, this.session.getLatestPublicKeys(sharingGroup)];
                    case 2:
                        publicKeys = _a.sent();
                        encryptedKeys = IdentityAPI.createSharingGroup(keySet, publicKeys);
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "PATCH",
                                expectedCode: 201,
                                path: "/api/v1/identity/" + encodeURI(login) + "/sharingGroup",
                                assume: { login: login, kind: proto_1.api.IdentityAccessKeyKind.WRITE },
                                body: proto_1.api.IdentityShareRequest.encode({
                                    version: keySet.id.version,
                                    sharingGroup: encryptedKeys
                                }).finish()
                            })];
                    case 3: 
                    // patch the sharingGroup to DataPeps
                    return [2 /*return*/, _a.sent()];
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
            var graph, _a, nextPublicKeys, encryptedGraph;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getSharingGraphWithKeySet(login)];
                    case 1:
                        graph = _b.sent();
                        if (graph[0].value.keySet.id.login != login) {
                            throw new Error_1.Error({
                                kind: Error_1.SDKKind.SDKInternalError,
                                payload: { login: login, graph: graph, hint: "unexpected graph" }
                            });
                        }
                        // Replace the sharing group of the root identity
                        _a = graph[0];
                        return [4 /*yield*/, this.session.getLatestPublicKeys(sharingGroup)];
                    case 2:
                        // Replace the sharing group of the root identity
                        _a.sharingGroup = _b.sent();
                        // Filter only latest identites
                        graph = graph.filter(function (elt) { return elt.latest; });
                        nextPublicKeys = new Map();
                        encryptedGraph = graph
                            .map(function (elt) {
                            // Create the next IdentityKeySet, for each identities in the graph
                            var keySetID = {
                                version: elt.value.keySet.id.version + 1,
                                login: elt.value.keySet.id.login
                            };
                            var _a = IdentityKeySetAPI_1.IdentityKeySetAPI.initWithMasterSeed(keySetID, elt.value.seed), encryptedKeySet = _a.encryptedKeySet, keySet = _a.keySet;
                            // Put the next IdentityPublicKey in a map
                            nextPublicKeys.set(keySetID.login, keySet.public());
                            return {
                                elt: elt,
                                nextencryptedKeySet: encryptedKeySet,
                                nextKeySet: keySet
                            };
                        })
                            .map(function (_a) {
                            var elt = _a.elt, nextencryptedKeySet = _a.nextencryptedKeySet, nextKeySet = _a.nextKeySet;
                            var currentKeySet = elt.value.keySet;
                            // Create the backward link
                            var backward = currentKeySet.shareKey(proto_1.api.IdentityShareKind.SHARING, nextKeySet.public());
                            // Share the next IdentityKeySet with the sharingGroup of the previous IdentityKeySet
                            var sharingGroup = elt.sharingGroup.map(function (publicKey) {
                                var kind = proto_1.api.IdentityShareKind.SHARING;
                                var nextPublicKey = nextPublicKeys.get(publicKey.login);
                                publicKey = nextPublicKey != null ? nextPublicKey : publicKey;
                                var _a = nextKeySet.shareKey(kind, publicKey), encryptedKey = _a.encryptedKey, nonce = _a.nonce;
                                return {
                                    login: publicKey.login,
                                    version: publicKey.version,
                                    encryptedKey: encryptedKey,
                                    nonce: nonce,
                                    kind: kind
                                };
                            });
                            // Sign the public keys of the next IdentityKeySet with the current IdentityKeySet
                            var signChain = currentKeySet.signKeys(nextKeySet);
                            return {
                                login: nextKeySet.id.login,
                                version: nextKeySet.id.version,
                                encryption: nextencryptedKeySet,
                                signChain: signChain,
                                sharingGroup: sharingGroup,
                                backward: backward
                            };
                        });
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST",
                                expectedCode: 201,
                                path: "/api/v1/identity/" + encodeURIComponent(login) + "/sharingGraph",
                                assume: { login: login, kind: proto_1.api.IdentityAccessKeyKind.WRITE },
                                body: proto_1.api.IdentityPostSharingGraphRequest.encode({
                                    graph: encryptedGraph
                                }).finish()
                            })];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * Generate new keys for an identity.
     * The identity will no longer be able access any things (resources, shared identities, ...) that have previously been shared with it.
     * Only administrator can do this.
     * @param login The login of the identity to set the active status.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityNotFound` if `login` does not exists.
     * - `IdentityNotAdmin` if the identity logged along the current session is not an admin.
     * - `IdentityNotAdminDomain` if the identity logged along with the current session cannot adinistrate the domain of `login`.
     */
    IdentityAPI.prototype.overwriteKeys = function (login, secret) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var graph, nextPublicKeys, encryptedGraph;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSharingGraphWithPublicKey(login)];
                    case 1:
                        graph = _a.sent();
                        if (graph[0].value.id.login != login) {
                            throw new Error_1.Error({
                                kind: Error_1.SDKKind.SDKInternalError,
                                payload: { login: login, graph: graph, hint: "unexpected graph" }
                            });
                        }
                        // Filter only latest identites
                        graph = graph.filter(function (elt) { return elt.latest; });
                        // We do not replace the identities that are shared by another identity
                        // as overwrited identities cannot access to their history.
                        // So we update only:
                        // - the main identity
                        // - the graph elements in which the only element in sharing group is the main identity (for example a delegate, but not a group)
                        graph = graph.filter(function (elt) {
                            return elt.value.id.login == login ||
                                (elt.sharingGroup.length == 1 && elt.sharingGroup[0].login == login);
                        });
                        nextPublicKeys = new Map();
                        encryptedGraph = graph
                            .map(function (elt) {
                            // Create the next IdentityKeySet, for each identities in the graph
                            var keySetID = {
                                version: elt.value.id.version + 1,
                                login: elt.value.id.login
                            };
                            var _a = elt.value.id.login == login
                                ? IdentityKeySetAPI_1.IdentityKeySetAPI.initWithSecret(keySetID, secret)
                                : IdentityKeySetAPI_1.IdentityKeySetAPI.initWithMasterSeed(keySetID, elt.value.seed), encryptedKeySet = _a.encryptedKeySet, keySet = _a.keySet;
                            // Put the next IdentityPublicKey in a map
                            nextPublicKeys.set(keySetID.login, keySet.public());
                            return {
                                elt: elt,
                                nextencryptedKeySet: encryptedKeySet,
                                nextKeySet: keySet
                            };
                        })
                            .map(function (_a) {
                            var elt = _a.elt, nextencryptedKeySet = _a.nextencryptedKeySet, nextKeySet = _a.nextKeySet;
                            // administrator signs the 'overwrited' new version of identity
                            var signChain = _this.session.encryption.sign(Tools_1.Uint8Tool.concat(nextencryptedKeySet.boxEncrypted.publicKey, nextencryptedKeySet.signEncrypted.publicKey));
                            // Share the next IdentityKeySet with the sharingGroup of the previous IdentityKeySet
                            var sharingGroup = elt.sharingGroup.map(function (publicKey) {
                                var kind = proto_1.api.IdentityShareKind.SHARING;
                                var nextPublicKey = nextPublicKeys.get(publicKey.login);
                                publicKey = nextPublicKey != null ? nextPublicKey : publicKey;
                                var _a = nextKeySet.shareKey(kind, publicKey), encryptedKey = _a.encryptedKey, nonce = _a.nonce;
                                return {
                                    login: publicKey.login,
                                    version: publicKey.version,
                                    encryptedKey: encryptedKey,
                                    nonce: nonce,
                                    kind: kind
                                };
                            });
                            return {
                                login: nextKeySet.id.login,
                                version: nextKeySet.id.version,
                                encryption: nextencryptedKeySet,
                                signChain: signChain,
                                sharingGroup: sharingGroup
                            };
                        });
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST",
                                expectedCode: 201,
                                path: "/api/v1/identity/" + encodeURIComponent(login) + "/sharingGraph",
                                body: proto_1.api.IdentityPostSharingGraphRequest.encode({
                                    graph: encryptedGraph
                                }).finish()
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
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
                            path: "/api/v1/identity/" + encodeURIComponent(login) + "/accessGroup",
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
                            path: "/api/v1/identities/latestPublicChains",
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
                                path: "/api/v1/identity/" + encodeURI(login) + "/lockedVersions",
                                params: options,
                                assume: login == this.session.login
                                    ? null
                                    : { login: login, kind: proto_1.api.IdentityAccessKeyKind.READ },
                                response: function (r) {
                                    return proto_1.api.IdentityGetLockedVersionsResponse.decode(r).lockedVersions.map(function (lockedVersion) {
                                        return __assign({}, lockedVersion, { publicKey: __assign({}, lockedVersion.publicKey.publicKey, { created: Tools_1.timestampToDate(lockedVersion.publicKey.created) }) });
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
                        publicKey = this.session.getSessionPublicKey();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.session.getLatestPublicKey(login)];
                    case 3:
                        // TODO: possible race condition between the assumed version here and when sending the request
                        publicKey = _a.sent();
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
                            try {
                                var keySet = IdentityKeySetAPI_1.IdentityKeySetAPI.recoverWithSecret(login, secret, locked.challenge.encryption);
                                unlockedVersions.push(locked.publicKey);
                                // the current version of session identity is signed by the unlocked one (as keys are accessible by current session)
                                var _a = keySet.shareKey(proto_1.api.IdentityShareKind.SHARING, publicKey), encryptedKey = _a.encryptedKey, nonce = _a.nonce;
                                var backward = { nonce: nonce, encryptedKey: encryptedKey };
                                resolvedChallengesWithEncryptedKeys.push(new proto_1.api.UnlockVersionsRequest.UnlockedVersion({
                                    resolvedChallenge: {
                                        token: locked.challenge.token,
                                        salt: locked.challenge.salt,
                                        signature: keySet.sign(locked.challenge.salt)
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
                                    : { login: login, kind: proto_1.api.IdentityAccessKeyKind.WRITE },
                                path: "/api/v1/identity/" + encodeURI(login) + "/unlockVersions",
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
    IdentityAPI.prototype.getSharingGraphWithPublicKey = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var graph;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "GET",
                            expectedCode: 200,
                            path: "/api/v1/identity/" + encodeURIComponent(login) + "/sharingGraph",
                            response: proto_1.api.IdentityGetSharingGraphResponse.decode
                        })];
                    case 1:
                        graph = (_a.sent()).graph;
                        // Return the graph with IdentityPublicKeyID
                        return [2 /*return*/, graph.map(function (_a) {
                                var latest = _a.latest, login = _a.login, version = _a.version, sharingGroup = _a.sharingGroup, masterPublicKey = _a.masterPublicKey;
                                return ({
                                    value: {
                                        id: { login: login, version: version },
                                        seed: { publicKey: masterPublicKey, masterSalt: null }
                                    },
                                    sharingGroup: sharingGroup,
                                    latest: latest
                                });
                            })];
                }
            });
        });
    };
    IdentityAPI.prototype.getSharingGraphWithKeySet = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var assume, graph, rootKeySet, identityKeySets, rootNode, resolvedGraph, decyptedGraph;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assume = {
                            login: login,
                            kind: proto_1.api.IdentityAccessKeyKind.WRITE
                        };
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "GET",
                                expectedCode: 200,
                                path: "/api/v1/identity/" + encodeURIComponent(login) + "/sharingGraph",
                                assume: assume,
                                response: proto_1.api.IdentityGetSharingGraphResponse.decode
                            })];
                    case 1:
                        graph = (_a.sent()).graph;
                        rootKeySet = assume.keySet;
                        identityKeySets = new Map();
                        identityKeySets.set(rootKeySet.id.login + rootKeySet.id.version, rootKeySet);
                        rootNode = graph.shift();
                        if (rootNode.login != rootKeySet.id.login ||
                            rootNode.version != rootKeySet.id.version) {
                            throw new Error_1.Error({
                                kind: Error_1.SDKKind.SDKInternalError,
                                payload: {
                                    message: "unexpected rootNode"
                                }
                            });
                        }
                        return [4 /*yield*/, Promise.all(graph.map(function (elt) { return __awaiter(_this, void 0, void 0, function () {
                                var sharingKey;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this
                                                .session.resolveCipherList([elt.sharingKey])];
                                        case 1:
                                            sharingKey = (_a.sent())[0];
                                            return [2 /*return*/, __assign({}, elt, { sharingKey: sharingKey })];
                                    }
                                });
                            }); }))];
                    case 2:
                        resolvedGraph = _a.sent();
                        decyptedGraph = resolvedGraph.map(function (elt, i) {
                            var parentKeySet = identityKeySets.get(elt.sharedFrom.login + elt.sharedFrom.version);
                            var keySet = IdentityKeySetAPI_1.IdentityKeySetAPI.recoverWithEncrytedKeys({ login: elt.login, version: elt.version }, parentKeySet, [elt.sharingKey], {
                                boxEncrypted: {
                                    encryptedKey: elt.boxKey.message,
                                    nonce: elt.boxKey.nonce,
                                    publicKey: elt.boxPublicKey
                                },
                                signEncrypted: {
                                    encryptedKey: elt.signKey.message,
                                    nonce: elt.signKey.nonce,
                                    publicKey: elt.signPublicKey
                                },
                                readEncrypted: null // TODO
                            });
                            identityKeySets.set(elt.login + elt.version, keySet);
                            var seed = { publicKey: elt.masterPublicKey, masterSalt: null };
                            return {
                                sharingGroup: elt.sharingGroup,
                                latest: elt.latest,
                                value: { keySet: keySet, seed: seed }
                            };
                        });
                        // Reintroduce the rootNode in the graph
                        decyptedGraph.unshift({
                            latest: rootNode.latest,
                            sharingGroup: rootNode.sharingGroup,
                            value: {
                                keySet: rootKeySet,
                                seed: {
                                    publicKey: rootNode.masterPublicKey,
                                    masterSalt: null
                                }
                            }
                        });
                        return [2 /*return*/, decyptedGraph];
                }
            });
        });
    };
    IdentityAPI.createSharingGroup = function (keySet, publicKeys) {
        return publicKeys.map(function (pk) {
            var kind = proto_1.api.IdentityShareKind.SHARING;
            var _a = keySet.shareKey(kind, pk), encryptedKey = _a.encryptedKey, nonce = _a.nonce;
            return {
                login: pk.login,
                version: pk.version,
                nonce: nonce,
                kind: kind,
                encryptedKey: encryptedKey
            };
        });
    };
    return IdentityAPI;
}());
exports.IdentityAPI = IdentityAPI;
//# sourceMappingURL=IdentityAPI.js.map