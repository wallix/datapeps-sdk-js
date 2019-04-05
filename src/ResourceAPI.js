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
var proto_1 = require("./proto");
var ResourceInternal_1 = require("./ResourceInternal");
var Cryptor_1 = require("./Cryptor");
var ResourceType;
(function (ResourceType) {
    ResourceType[ResourceType["ANONYMOUS"] = 0] = "ANONYMOUS";
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
var ResourceAPI = /** @class */ (function () {
    function ResourceAPI(session) {
        this.session = session;
    }
    /**
     * Create and share a resource between a set of identities.
     * @param kind A hint of the kind of the resource.
     * @param payload A custom payload to describes the resource.
     * @param sharingGroup The set of identities to share the resource to create.
     * @param options A collection of options:
     *  - serialize: A function that be used to serialize the payload. By default JSON.stringify.
     * @return(p) On success the promise will be resolved with the created resource.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityNotFound` if one of identities doesn't exists.
     */
    ResourceAPI.prototype.create = function (kind, payload, sharingGroup, options) {
        return __awaiter(this, void 0, void 0, function () {
            var encryptFunc, type, creator, _a, body, keypair, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options == null ? {} : options;
                        encryptFunc = this.session.encryption.encryptor(Cryptor_1.CipherType.NACL_SES);
                        type = proto_1.api.ResourceType.ANONYMOUS;
                        creator = this.session.getSessionPublicKey();
                        return [4 /*yield*/, ResourceInternal_1.createBodyRequest(payload, sharingGroup, encryptFunc, this.session, options)];
                    case 1:
                        _a = _b.sent(), body = _a.body, keypair = _a.keypair;
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST",
                                expectedCode: 201,
                                path: "/api/v1/resources",
                                body: proto_1.api.ResourcePostRequest.encode(__assign({}, body, { type: type,
                                    kind: kind })).finish(),
                                response: proto_1.api.ResourcePostResponse.decode
                            })];
                    case 2:
                        id = (_b.sent()).id;
                        return [2 /*return*/, new ResourceInternal_1.ResourceBox(id, kind, payload, keypair, creator)];
                }
            });
        });
    };
    /**
     * Get the resources accessible to the identity.
     * @param options A collection of options:
     *  - parse: A function used to parse the resource payload. By default JSON.parse.
     *  - offset: Skip this number of results.
     *  - limit: Limit the length of the result (default: 10).
     *  - assume: Return resources of the assume identity instead.
     *  - reason: Gives an annotative reason to list these resources
     * @return(p) On success the promise will be resolved with a list of all resources accessible to the identity.
     * On error the promise will be rejected with an {@link Error}
     */
    ResourceAPI.prototype.list = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var assume, parse, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options != null ? options : {};
                        assume = options.assume != null ? options.assume : this.session.login;
                        parse = options.parse;
                        params = options.reason != null
                            ? __assign({}, options, { access_reason: options.reason }) : options;
                        delete params.parse;
                        return [4 /*yield*/, this.session
                                .doProtoRequest({
                                method: "GET",
                                expectedCode: 200,
                                path: "/api/v1/resources",
                                assume: { login: assume, kind: proto_1.api.IdentityAccessKeyKind.READ },
                                params: params,
                                response: function (r) { return proto_1.api.ResourceListResponse.decode(r).resources; }
                            })
                                .then(function (resources) {
                                return ResourceInternal_1.makeResourcesFromResponses(resources, _this.session, parse);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get a resource thanks its identifier.
     * @param id The identifier of the resource to get.
     * @param options A collection of options:
     *  - assume: Assume this identity to access the resource.
     *  - parse: A function used to parse the resource payload. By default JSON.parse.
     *  - reason: Gives an annotative reason to get this resources
     * @return(p) On success the promise will be resolved with the resource.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `ResourceNotFound` if the resource does not exists.
     */
    ResourceAPI.prototype.get = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var assume, params, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options != null ? options : {};
                        assume = options.assume != null ? options.assume : this.session.login;
                        params = options.reason != null ? { access_reason: options.reason } : undefined;
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "GET",
                                expectedCode: 200,
                                path: "/api/v1/resource/" + id,
                                assume: { login: assume, kind: proto_1.api.IdentityAccessKeyKind.READ },
                                params: params,
                                response: function (r) { return proto_1.api.ResourceGetResponse.decode(r); }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, ResourceInternal_1.makeResourceFromResponse(response, Cryptor_1.CipherType.NACL_SES, this.session, options.parse)];
                }
            });
        });
    };
    /**
     * Get the resource associated with the tuple <identityLogin, resourceName>.
     * @param login The login of the identity involved in the association
     * @param resourceName The resource name involved in the association
     * @return(p) On success the promise will be resolved with resource associated with the tuple <identityLogin, resourceName>. On error the promise will be rejected with an {@link Error} with kind:
     * - `DataPeps.ServerError.IdentityNotFound` if the identity cannot be assumed or if the identity does not exist.
     * - `DataPeps.ServerError.NamedResourceNotFound` if the NamedResource does not exist.
     */
    ResourceAPI.prototype.getNamed = function (login, resourceName, options) {
        return __awaiter(this, void 0, void 0, function () {
            var assume, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options != null ? options : {};
                        assume = { login: login, kind: proto_1.api.IdentityAccessKeyKind.READ };
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "GET",
                                expectedCode: 200,
                                assume: assume,
                                path: "/api/v1/identity/" +
                                    encodeURIComponent(login) +
                                    "/resource/" +
                                    encodeURIComponent(resourceName),
                                response: function (r) { return proto_1.api.IdentityGetNamedResourceResponse.decode(r); }
                            })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, ResourceInternal_1.makeResourceFromResponse(resp.resource, Cryptor_1.CipherType.NACL_SES, this.session, options.parse)];
                }
            });
        });
    };
    /**
     * Save a one-to-one association between the key <login, resourceName> and a resourceID.
     * @param login The login of the identity involved in the association
     * @param resourceName The desired resource name involved in the association
     * @param resourceID The ID of the resource involved in the association
     * @return(p) On success the promise will be resolved with void. On error the promise will be rejected with an {@link Error} with kind:
     * - `DataPeps.ServerError.IdentityNotFound` if the identity cannot be assumed or if the identity does not exist.
     * - `DataPeps.ServerError.ResourceNotFound` if the resource does not exist.
     */
    ResourceAPI.prototype.setNamed = function (login, resourceName, resourceID) {
        return __awaiter(this, void 0, void 0, function () {
            var assume, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assume = { login: login, kind: proto_1.api.IdentityAccessKeyKind.WRITE };
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "PUT",
                                expectedCode: 200,
                                assume: assume,
                                path: "/api/v1/identity/" + encodeURI(login) + "/resource/" + encodeURIComponent(resourceName),
                                body: proto_1.api.IdentitySetNamedResourceRequest.encode({
                                    resourceID: resourceID
                                }).finish()
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * Soft-delete a resource thanks its identifier. It deletes only the copy.
     * @param id The identifier of the resource to delete.
     * @param options A collection of options:
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `ResourceNotFound` if the resource does not exists.
     */
    ResourceAPI.prototype.unlink = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var assume;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options != null ? options : {};
                        assume = options.assume != null ? options.assume : this.session.login;
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "DELETE",
                                expectedCode: 200,
                                path: "/api/v1/resource/" + id,
                                assume: { login: assume, kind: proto_1.api.IdentityAccessKeyKind.WRITE },
                                params: { soft: true }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Hard-delete a resource thanks its identifier. It deletes the resource for all identities in its sharingGroup.
     * @param id The identifier of the resource to delete.
     * @param options A collection of options:
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `ResourceNotFound` if the resource does not exists.
     */
    ResourceAPI.prototype.delete = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var assume;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options != null ? options : {};
                        assume = options.assume != null ? options.assume : this.session.login;
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "DELETE",
                                expectedCode: 200,
                                path: "/api/v1/resource/" + id,
                                assume: { login: assume, kind: proto_1.api.IdentityAccessKeyKind.WRITE },
                                params: { soft: false }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Extends the sharing group of a resource.
     * @param id The identifier of the resource to extend the sharing group.
     * @param sharingGroup The set of identities to add on the sharing of the resource.
     * @param options
     *  - assume: Assume this identity to extend the sharing group.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `ResourceNotFound` if the resource does not exists.
     */
    ResourceAPI.prototype.extendSharingGroup = function (id, sharingGroup, options) {
        if (options === void 0) { options = { assume: this.session.login }; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, encryptedKey, owner, keySet, secretKey, _b, _c, encryptFunc, encryptedSharingGroup;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        options = options != null ? options : {};
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "GET",
                                expectedCode: 200,
                                path: "/api/v1/resource/" + id + "/key",
                                response: proto_1.api.ResourceGetKeyResponse.decode
                            })];
                    case 1:
                        _a = _d.sent(), encryptedKey = _a.encryptedKey, owner = _a.owner;
                        return [4 /*yield*/, this.session.getIdentityKeySet(owner.login, owner.version)];
                    case 2:
                        keySet = _d.sent();
                        _c = (_b = keySet
                            .decryptor(Cryptor_1.CipherType.NACL_SES)).decryptList;
                        return [4 /*yield*/, this.session.resolveCipherList([encryptedKey])];
                    case 3:
                        secretKey = _c.apply(_b, [_d.sent()]);
                        encryptFunc = this.session.encryption.encryptor(Cryptor_1.CipherType.NACL_SES);
                        return [4 /*yield*/, ResourceInternal_1.encryptForSharingGroup(secretKey, sharingGroup, encryptFunc, this.session)];
                    case 4:
                        encryptedSharingGroup = _d.sent();
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "PATCH",
                                expectedCode: 201,
                                path: "/api/v1/resource/" + id + "/sharingGroup",
                                assume: { login: options.assume, kind: proto_1.api.IdentityAccessKeyKind.WRITE },
                                body: proto_1.api.ResourceExtendSharingGroupRequest.encode({
                                    sharingGroup: encryptedSharingGroup
                                }).finish()
                            })];
                    case 5: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    /**
     * Get the latests access logs of resources.
     * @param options A collection of options:
     *  - resourceIds: Filter logs for only resource ids set.
     *  - offset: Skip this number of results.
     *  - limit: Limit the length of the result (default: 10).
     *  - assume: Return logs of the assume identity instead.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error}.
     */
    ResourceAPI.prototype.getAccessLogs = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var assume, logs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options != null ? options : {};
                        assume = options.assume != null ? options.assume : this.session.login;
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST",
                                expectedCode: 200,
                                path: "/api/v1/resources/accessLogs",
                                body: proto_1.api.ResourceGetAccessLogsRequest.encode(options).finish(),
                                response: proto_1.api.ResourceGetAccessLogsResponse.decode,
                                assume: {
                                    login: assume,
                                    kind: proto_1.api.IdentityAccessKeyKind.READ
                                }
                            })];
                    case 1:
                        logs = (_a.sent()).logs;
                        return [2 /*return*/, logs.map(function (log) {
                                return (__assign({}, log, { timestamp: new Date(log.timestamp / 1000000) }));
                            })];
                }
            });
        });
    };
    /**
     * Get the sharing group of a resource. The sharing group of a resource is the set of identities that can
     * access to this resource.
     * @param id The identifier of the identity to get the sharing group.
     * @return(p) On success the promise will be resolved with a list of links that describe accesses to the resource.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `ResourceNotFound` if the resource does not exists.
     */
    ResourceAPI.prototype.getSharingGroup = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var assume;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options != null ? options : {};
                        assume = options.assume != null ? options.assume : this.session.login;
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "GET",
                                expectedCode: 200,
                                path: "/api/v1/resource/" + id + "/sharingGroup",
                                assume: { login: assume, kind: proto_1.api.IdentityAccessKeyKind.READ },
                                response: function (r) {
                                    return proto_1.api.ResourceGetSharingGroupResponse.decode(r)
                                        .sharingGroup;
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ResourceAPI;
}());
exports.ResourceAPI = ResourceAPI;
//# sourceMappingURL=ResourceAPI.js.map