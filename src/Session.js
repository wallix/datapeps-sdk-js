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
var Tools_1 = require("./Tools");
var HTTP_1 = require("./HTTP");
var SessionInternal_1 = require("./SessionInternal");
var IdentityKeySet_1 = require("./IdentityKeySet");
var PublicKeyManager_1 = require("./PublicKeyManager");
var Session = /** @class */ (function () {
    function Session(params, encryption, client, secret) {
        this.api = SessionInternal_1.SessionState.createBase(params.login, new SessionInternal_1.SessionClient(params, encryption, client, secret), new PublicKeyManager_1.MemoryPublicKeysCache(), new SessionInternal_1.TrustOnFirstUse());
    }
    Object.defineProperty(Session.prototype, "login", {
        /** The login of the {@link Identity} logged into the session */
        get: function () {
            return this.api.login;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Close the session.
     * @return(p) On success the promise will be resolved with void.
     */
    Session.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.client.doProtoRequest({
                            method: "PUT",
                            expectedCode: 200,
                            path: "/api/v1/session/close"
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get the public key of the current session.
     * @return The public key of the current session.
     */
    Session.prototype.getSessionPublicKey = function () {
        return this.api.keySet.getCurrentPublicKey();
    };
    /**
     * Create a new session for an identity that the current session identity can access.
     * @param login The login of the identity to login with.
     */
    Session.prototype.createSession = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var keySet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.keySet.get(login)];
                    case 1:
                        keySet = _a.sent();
                        return [4 /*yield*/, Session.create(this.api.client.client, login, function () {
                                return keySet;
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Set the trust policy for the session, see {@link TrustPolicy} for more details.
     * @param policy The trust policy to set.
     */
    Session.prototype.setTrustPolicy = function (policy) {
        this.api.publicKeys.setTrustPolicy(policy);
    };
    Session.prototype.sign = function (message) {
        return this.api.keySet.sign(message);
    };
    /**
     * Create a new session.
     * @param login The login of the identity to login with.
     * @param secret The secret of the identity.
     * @param options A collection of initialization options that control the sessions:
     *  - saltKind: The kind of salt used to sign authenticated requests to the DataPeps service. The default value is `TIME`. For more details see {@link SessionSaltKind}
     * @return(p) On success the promise will be resolved with a new session.
     * On error the promise will be rejected with an {@link Error} with kind
     * - `IdentityNotFound` if the `login` does not exists or if the identity has no secret.
     */
    Session.login = function (login, secret, options) {
        return __awaiter(this, void 0, void 0, function () {
            var session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Session.createWithSecret(HTTP_1.client, login, function (e) {
                            var seed = IdentityKeySet_1.MasterPrivateSeed.fromSecret(secret, e.masterSalt);
                            var keySet = IdentityKeySet_1.IdentityKeySet.recover({ login: login, version: e.version }, seed, e);
                            return keySet;
                        }, options, secret)];
                    case 1:
                        session = _a.sent();
                        return [2 /*return*/, session];
                }
            });
        });
    };
    Session.create = function (client, login, recover, options) {
        if (options === void 0) { options = { saltKind: proto_1.api.SessionSaltKind.TIME }; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, connectionParameters, identityKeySet;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Session.createSessionMaterial(client, login, recover, options)];
                    case 1:
                        _a = _b.sent(), connectionParameters = _a.connectionParameters, identityKeySet = _a.identityKeySet;
                        return [2 /*return*/, new Session(connectionParameters, identityKeySet, client)];
                }
            });
        });
    };
    Session.createWithSecret = function (client, login, recover, options, secret) {
        if (options === void 0) { options = { saltKind: proto_1.api.SessionSaltKind.TIME }; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, connectionParameters, identityKeySet;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Session.createSessionMaterial(client, login, recover, options)];
                    case 1:
                        _a = _b.sent(), connectionParameters = _a.connectionParameters, identityKeySet = _a.identityKeySet;
                        return [2 /*return*/, new Session(connectionParameters, identityKeySet, client, Tools_1.Uint8Tool.convert(secret))];
                }
            });
        });
    };
    Session.createSessionMaterial = function (client, login, recover, options) {
        if (options === void 0) { options = { saltKind: proto_1.api.SessionSaltKind.TIME }; }
        return __awaiter(this, void 0, void 0, function () {
            var createResponse, identityKeySet, resolveResponse, connectionParameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.doRequest({
                            method: "POST",
                            expectedCode: 201,
                            path: "/api/v1/session/challenge/create",
                            body: proto_1.api.SessionCreateChallengeRequest.encode({
                                login: login,
                                saltKind: options.saltKind
                            }).finish(),
                            response: proto_1.api.SessionCreateChallengeResponse.decode,
                            headers: new Headers({
                                "content-type": "application/x-protobuf"
                            })
                        })];
                    case 1:
                        createResponse = (_a.sent()).body;
                        identityKeySet = recover(proto_1.api.IdentityEncryptedKeySet.create(createResponse.encryption));
                        return [4 /*yield*/, client.doRequest({
                                method: "POST",
                                expectedCode: 200,
                                path: "/api/v1/session/challenge/resolve",
                                body: proto_1.api.SessionResolveChallengeRequest.encode({
                                    token: createResponse.token,
                                    salt: createResponse.salt,
                                    signature: identityKeySet.sign(createResponse.salt)
                                }).finish(),
                                response: proto_1.api.SessionResolveChallengeResponse.decode,
                                headers: new Headers({
                                    "content-type": "application/x-protobuf"
                                })
                            })];
                    case 2:
                        resolveResponse = (_a.sent()).body;
                        connectionParameters = {
                            token: Tools_1.Base64.encode(createResponse.token),
                            login: resolveResponse.login,
                            salt: resolveResponse.salt,
                            saltKind: createResponse.saltKind
                        };
                        identityKeySet.id.login = login;
                        return [2 /*return*/, {
                                connectionParameters: connectionParameters,
                                identityKeySet: identityKeySet
                            }];
                }
            });
        });
    };
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=Session.js.map