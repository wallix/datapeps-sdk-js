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
var Long = require("long");
var protobufjs = require("protobufjs");
var proto_1 = require("./proto");
var Tools_1 = require("./Tools");
var HTTP = require("./HTTP");
var IdentityKeySetAPI_1 = require("./IdentityKeySetAPI");
var Error_1 = require("./Error");
exports.Error = Error_1.Error;
exports.ServerError = Error_1.ServerKind;
exports.SDKError = Error_1.SDKKind;
protobufjs.util.Long = Long;
protobufjs.configure();
/**
 * Register a new DataPeps identity.
 * @param identity The description of the identity to register.
 *  The login MUST be a peps email address, i.e. <login>@<pepsdomain>
 * @param secret The secret of the identity.
 * @return(p) a promise that rejects with an {@link Error} with kind
 * - `IdentityInvalidLogin` if identity.login is not a valid login.
 * - `IdentityAlreadyExists` if identity.login already exists.
 */
function register(identity, secret) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _register("/api/v1/register", identity, secret, function (r) {
                        return proto_1.api.IdentityRegisterRequest.encode(r).finish();
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.register = register;
/**
 * Register a new external identity, using a preallocated token from {@link sendRegisterLink}.
 * @param identity The description of the identity to register.
 *  The login MUST be the email address associated with the token, i.e. <login>@<domain>
 * @param secret The secret of the identity.
 * @return(p) a promise that rejects with an {@link Error} with kind
 * - `IdentityInvalidLogin` if identity.login is not the one associated with the token.
 * - `IdentityAlreadyExists` if identity.login already exists.
 * - `RegisterTokenNotFound` if `token` is not found.
 */
function registerWithToken(token, identity, secret) {
    return __awaiter(this, void 0, void 0, function () {
        var btoken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    btoken = token instanceof Uint8Array ? Tools_1.Base64.encode(token) : token;
                    return [4 /*yield*/, _register("/api/v1/register/link/" + encodeURIComponent(btoken), identity, secret, function (r) { return proto_1.api.RegisterPostLinkTokenRequest.encode(r).finish(); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.registerWithToken = registerWithToken;
function _register(path, identity, secret, request) {
    return __awaiter(this, void 0, void 0, function () {
        var encryptedKeySet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    encryptedKeySet = IdentityKeySetAPI_1.IdentityKeySetAPI.initWithSecret({ version: 1, login: identity.login }, secret).encryptedKeySet;
                    return [4 /*yield*/, HTTP.client.doRequest({
                            method: "POST",
                            expectedCode: 201,
                            path: path,
                            body: request({ identity: identity, encryption: encryptedKeySet }),
                            headers: new Headers({
                                "content-type": "application/x-protobuf"
                            })
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Send an email to register a new identity.
 * The email sent will contain a registration link and a registration
 * token which can be used by {@link registerWithToken}
 * @param email The email address recipient for the registration email.
 * @return(p) On success the promise will be resolved with void.
 * On error the promise will be rejected with an {@link Error} with kind
 * - `RegisterInvalidEmail` if the `email` is badly formatted.
 */
function sendRegisterLink(email) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HTTP.client.doRequest({
                        method: "POST",
                        expectedCode: 201,
                        path: "/api/v1/register/link",
                        body: proto_1.api.RegisterLinkRequest.encode({
                            email: email
                        }).finish(),
                        headers: new Headers({
                            "content-type": "application/x-protobuf"
                        })
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.sendRegisterLink = sendRegisterLink;
//# sourceMappingURL=Register.js.map