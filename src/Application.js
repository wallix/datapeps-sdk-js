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
var DataPeps = require("./DataPeps");
var Resource_1 = require("./Resource");
var proto_1 = require("./proto");
var Interface_1 = require("./Interface");
var Tools_1 = require("./Tools");
var CryptoFuncs_1 = require("./CryptoFuncs");
var HTTP = require("./HTTP");
function createUser(appID, auth, secret) {
    return __awaiter(this, void 0, void 0, function () {
        var encryption, secretBytes, payload, identity, resource, body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    encryption = new CryptoFuncs_1.Encryption();
                    secretBytes = Tools_1.Uint8Tool.convert(secret);
                    encryption.generate(secretBytes, null);
                    payload = Tools_1.Uint8Tool.convert(JSON.stringify({}));
                    identity = {
                        login: null,
                        name: null,
                        kind: appID + "/application/user",
                        payload: payload
                    };
                    resource = Resource_1.ResourceImpl.createWithEncryption("application/secret", secretBytes, encryption, { serialize: function (u) { return u; } });
                    body = proto_1.api.RegisterExternalIdentityRequest.encode({
                        appID: appID,
                        auth: auth,
                        encryption: encryption,
                        identity: identity,
                        resources: { appSecret: resource.resourceRequestBody }
                    }).finish();
                    return [4 /*yield*/, HTTP.client.doRequest({
                            method: "POST",
                            code: 201,
                            path: "/api/v4/register/external-identity",
                            request: function () { return body; },
                            response: proto_1.api.RegisterExternalIdentityResponse.decode,
                            before: function (x, b) {
                                return x.setRequestHeader("content-type", "application/x-protobuf");
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.createUser = createUser;
function secure(appID, login, secret) {
    return __awaiter(this, void 0, void 0, function () {
        var appLogin, session, identityLogin, appSecretResource;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appLogin = ApplicationImpl.composeApplicationLogin(login, appID);
                    return [4 /*yield*/, DataPeps.login(appLogin, secret)];
                case 1:
                    session = _a.sent();
                    identityLogin = login.concat("@", appID);
                    return [4 /*yield*/, session.Identity.getNamedResource(identityLogin, "appSecret", { parse: function (u) { return u; } })];
                case 2:
                    appSecretResource = _a.sent();
                    return [2 /*return*/, { session: session, secret: appSecretResource.payload }];
            }
        });
    });
}
exports.secure = secure;
function createJWTSession(appID, appLogin, secret, connector) {
    return __awaiter(this, void 0, void 0, function () {
        var appSecret, _a, session, appSecret_1, app, e_1, app, token, session;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 9]);
                    return [4 /*yield*/, secure(appID, appLogin, secret)];
                case 1:
                    _a = _b.sent(), session = _a.session, appSecret_1 = _a.secret;
                    return [4 /*yield*/, connector.createSession(appLogin, appSecret_1)];
                case 2:
                    app = _b.sent();
                    return [2 /*return*/, { session: session, app: app, new: false }];
                case 3:
                    e_1 = _b.sent();
                    if (!(e_1.kind == proto_1.api.PepsErrorKind.IdentityNotFound)) return [3 /*break*/, 8];
                    return [4 /*yield*/, connector.createSession(appLogin, appSecret)];
                case 4:
                    app = _b.sent();
                    return [4 /*yield*/, connector.getToken(app)];
                case 5:
                    token = _b.sent();
                    // Create the DataPeps Identity
                    return [4 /*yield*/, createUser(appID, { jwt: { token: token } }, secret)];
                case 6:
                    // Create the DataPeps Identity
                    _b.sent();
                    return [4 /*yield*/, secure(appID, appLogin, secret)];
                case 7:
                    session = (_b.sent()).session;
                    return [2 /*return*/, { session: session, app: app, new: true }];
                case 8: throw e_1;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.createJWTSession = createJWTSession;
var ApplicationImpl = /** @class */ (function () {
    function ApplicationImpl(session) {
        this.session = session;
    }
    ApplicationImpl.prototype.putConfig = function (appID, config) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = { jwt: { key: config.key, claimForLogin: config.claimForLogin } };
                        if ("signAlgorithm" in config) {
                            c.jwt["signAlgorithm"] = config.signAlgorithm.valueOf();
                        }
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "PUT",
                                assume: { login: appID, kind: Interface_1.IdentityAccessKind.WRITE },
                                code: 201,
                                path: "/api/v4/identity/" + encodeURI(appID) + "/configure-as-application",
                                request: function () {
                                    return proto_1.api.IdentityConfigurationAsApplicationRequest.encode({
                                        Login: appID,
                                        config: c
                                    }).finish();
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationImpl.prototype.getConfig = function (appID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "GET",
                            assume: { login: appID, kind: Interface_1.IdentityAccessKind.READ },
                            code: 200,
                            path: "/api/v4/identity/" + encodeURI(appID) + "/configure-as-application",
                            response: function (r) {
                                var config = proto_1.api.IdentityConfigurationAsApplicationResponse.decode(r)
                                    .config;
                                return {
                                    key: config.jwt.key,
                                    signAlgorithm: config.jwt.signAlgorithm.valueOf(),
                                    claimForLogin: config.jwt.claimForLogin
                                };
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationImpl.composeApplicationLogin = function (login, appID) {
        var appLogin = login.concat("@", appID);
        return appLogin;
    };
    return ApplicationImpl;
}());
exports.ApplicationImpl = ApplicationImpl;
//# sourceMappingURL=Application.js.map