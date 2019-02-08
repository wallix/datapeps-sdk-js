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
var IdentityAPI_1 = require("./IdentityAPI");
var IdentityInternal_1 = require("./IdentityInternal");
exports.ApplicationIdentitySortingOrder = IdentityInternal_1.IdentitySortingOrder;
/** Allows to indicate which kind of field should be sorted. */
var ApplicationIdentitySortingField;
(function (ApplicationIdentitySortingField) {
    ApplicationIdentitySortingField[ApplicationIdentitySortingField["LOGIN"] = 0] = "LOGIN";
    ApplicationIdentitySortingField[ApplicationIdentitySortingField["CREATED"] = 1] = "CREATED";
})(ApplicationIdentitySortingField = exports.ApplicationIdentitySortingField || (exports.ApplicationIdentitySortingField = {}));
var ApplicationAPI = /** @class */ (function () {
    function ApplicationAPI(session) {
        this.session = session;
    }
    /**
     * Put configuration of an application
     * @param appID the app ID
     * @param config The config of the application.
     * @return(p) On success the promise will be resolved with void.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityCannotAssumeAccess` if cannot have right to write the configuration.
     * - `ApplicationConfigInvalid` if configuration object is invalid.
     * - `IdentityNotFound` if the identity `appID` doesn't exists.
     */
    ApplicationAPI.prototype.putConfig = function (appID, config) {
        return __awaiter(this, void 0, void 0, function () {
            var jwtConfig, c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("jwt" in config)) {
                            return [2 /*return*/];
                        }
                        jwtConfig = config.jwt;
                        c = {
                            jwt: { key: jwtConfig.key, claimForLogin: jwtConfig.claimForLogin }
                        };
                        if ("signAlgorithm" in jwtConfig) {
                            c.jwt["signAlgorithm"] = jwtConfig.signAlgorithm.valueOf();
                        }
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "PUT",
                                assume: { login: appID, kind: IdentityAPI_1.IdentityAccessKind.WRITE },
                                expectedCode: 201,
                                path: "/api/v4/identity/" + encodeURI(appID) + "/configure-as-application",
                                body: proto_1.api.IdentityConfigurationAsApplicationRequest.encode({
                                    Login: appID,
                                    config: c
                                }).finish()
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get configuration of an application
     * @param appID the app ID
     * @return(p) On success the promise will be resolved with an ApplicationConfig.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityCannotAssumeAccess` if cannot have right to read the configuration.
     * - `IdentityNotFound` if the identity `appID` doesn't exists.
     * - `ApplicationConfigNotFound` if configuration doesn't exists.
     */
    ApplicationAPI.prototype.getConfig = function (appID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "GET",
                            assume: { login: appID, kind: IdentityAPI_1.IdentityAccessKind.READ },
                            expectedCode: 200,
                            path: "/api/v4/identity/" + encodeURI(appID) + "/configure-as-application",
                            response: function (r) {
                                var config = proto_1.api.IdentityConfigurationAsApplicationResponse.decode(r)
                                    .config;
                                return {
                                    jwt: {
                                        key: config.jwt.key,
                                        signAlgorithm: config.jwt.signAlgorithm.valueOf(),
                                        claimForLogin: config.jwt.claimForLogin
                                    }
                                };
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get usage overview of an application
     * @param appID the app ID
     * @param options A collection of options:
     *  - since; unix timestamp from which requests data
     * @return(p) On success the promise will be resolved with an ApplicationAPI.UsageOverview.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityCannotAssumeOwnership` if cannot have right to the application.
     * - `IdentityNotFound` if the identity `appID` doesn't exists.
     */
    ApplicationAPI.prototype.getUsageOverview = function (appID, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options == null ? {} : options;
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST",
                                assume: { login: appID, kind: IdentityAPI_1.IdentityAccessKind.READ },
                                expectedCode: 200,
                                path: "/api/v4/application/" + encodeURI(appID) + "/usage-overview",
                                body: proto_1.api.ApplicationUsageOverviewRequest.encode(__assign({ Login: appID }, options)).finish(),
                                response: function (r) {
                                    var overview = proto_1.api.ApplicationUsageOverviewResponse.decode(r).overview;
                                    return {
                                        jwt: __assign({ totalIdentities: 0, newIdentities: 0, newSessions: 0 }, overview.jwt),
                                        delegatedAccess: __assign({ newRequested: 0, newResolved: 0, newDistinctRequested: 0, newDistinctResolved: 0 }, overview.delegates)
                                    };
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * List identities that has been created on behalf of an application
     * @param appID the app ID
     * @param options A collection of options:
     *  - offset: Skip this number of results.
     *  - limit: Limit the length of the result (default: 10).
     *  - loginPrefix: Filter only logins that containing this string
     * @return(p) On success the promise will be resolved with the list of identities
     * and the total of identities that should match the query.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityCannotAssumeOwnership` if cannot have right to the application.
     * - `IdentityNotFound` if the identity `appID` doesn't exists.
     */
    ApplicationAPI.prototype.listIdentities = function (appID, options) {
        return __awaiter(this, void 0, void 0, function () {
            var sortingField, sortingOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options == null ? {} : options;
                        if (options.sortingField == null) {
                            options.sortingField = ApplicationIdentitySortingField.CREATED;
                        }
                        sortingField = options.sortingField;
                        sortingOrder = IdentityInternal_1.IdentityRequestsUtils.resolveSortingOrder(options.sortingOrder);
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST",
                                expectedCode: 200,
                                path: "/api/v4/application/" + encodeURI(appID) + "/identities/list",
                                assume: { login: appID, kind: IdentityAPI_1.IdentityAccessKind.READ },
                                body: proto_1.api.ApplicationListIdentitiesRequest.encode({
                                    options: {
                                        limit: options.limit,
                                        offset: options.offset,
                                        loginPrefix: options.loginPrefix,
                                        sortedBy: sortingField,
                                        order: sortingOrder
                                    }
                                }).finish(),
                                response: function (r) {
                                    var _a = proto_1.api.ApplicationListIdentitiesResponse.decode(r), _identities = _a.identities, totalIdentitiesCount = _a.totalIdentitiesCount;
                                    return {
                                        identities: _identities.map(function (i) {
                                            var identity = IdentityInternal_1.IdentitySerializer.deserialize(i.identity);
                                            return {
                                                identity: identity,
                                                auth: i.auth
                                            };
                                        }),
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
     * Get user's application login from the user's DataPeps login
     * @param dataPepsLogin the user's login in DataPeps
     * @return Returns the user's application login used to generate the given DataPeps login.
     * If the dataPepsLogin is null, undefined, empty or malformatted returns an empty string.
     */
    ApplicationAPI.extractLoginFromDataPepsLogin = function (dataPepsLogin) {
        dataPepsLogin = dataPepsLogin == null ? "" : dataPepsLogin;
        var i = dataPepsLogin.lastIndexOf("@");
        if (i == -1) {
            return "";
        }
        return dataPepsLogin.substr(0, i);
    };
    /** Returns all sessions that been created on behalf of the application.
     * @param appID the app ID
     * @param offset the offset
     * @param limit the limit
     * @return(p) On success the promise will be resolved with an ApplicationAPI.IdentitySession[].
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `IdentityCannotAssumeOwnership` if cannot have right to the application.
     * - `IdentityNotFound` if the identity `appID` doesn't exists.
     */
    ApplicationAPI.prototype.listSessions = function (appID, offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            path: "/api/v4/application/" + encodeURI(appID) + "/identities-session/list",
                            method: "POST",
                            expectedCode: 200,
                            assume: { login: appID, kind: IdentityAPI_1.IdentityAccessKind.READ },
                            body: proto_1.api.ApplicationIdentitySessionListRequest.encode({
                                appID: appID,
                                offset: offset,
                                limit: limit
                            }).finish(),
                            response: function (r) {
                                var list = proto_1.api.ApplicationIdentitySessionListResponse.decode(r);
                                return list.sessions;
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ApplicationAPI;
}());
exports.ApplicationAPI = ApplicationAPI;
//# sourceMappingURL=ApplicationAPI.js.map