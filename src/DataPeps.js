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
var Long = require("long");
var protobugjs = require("protobufjs");
var proto_1 = require("./proto");
var Tools_1 = require("./Tools");
var CryptoFuncs_1 = require("./CryptoFuncs");
var HTTP_1 = require("./HTTP");
var Session_1 = require("./Session");
var Resource_1 = require("./Resource");
var Error_1 = require("./Error");
exports.Error = Error_1.Error;
exports.ServerError = Error_1.ServerKind;
exports.SDKError = Error_1.SDKKind;
exports.RegisterTokenStatus = proto_1.types.RegisterTokenStatus;
protobugjs.util.Long = Long;
protobugjs.configure();
var defaultAPIURL = "https://api.datapeps.com";
var defaultWSURL = "https://ws.datapeps.com";
var client = new HTTP_1.Client(defaultAPIURL, defaultWSURL);
var webSocketURL = defaultWSURL;
/**
 * Configure the endpoint of the SDK.
 * @param APIUrl The url of the DataPeps service.
 */
function configure(APIUrl, WSUrl) {
    client = new HTTP_1.Client(APIUrl, WSUrl);
    webSocketURL = WSUrl;
}
exports.configure = configure;
var bs58 = require('bs58');
var sha = require('sha.js');
/**
 * Returns the hash of an IdentityPublicKey.
 * The hash is computed thanks a sha2156 of the concat of box and sign key.
 * @param key The key to hash.
 * @return(h) The hash of the key.
 */
exports.hashIdentityPublicKey = function (key) {
    var h = Tools_1.Uint8Tool.concat(key.box, key.sign);
    return new Uint8Array(new sha.sha256().update(h).digest());
};
/**
 * Returns a human redeable representation of the an IdentityPublicKey.
 * The representation is the hash of the IdentityPublicKey encoded in base58.
 * @param key The key to print.
 * @return(s) The string representation of the key.
 */
exports.printIdentityPublicKey = function (key) {
    return bs58.encode(exports.hashIdentityPublicKey(key));
};
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
                case 0: return [4 /*yield*/, _register("/api/v4/register", identity, secret, function (r) { return proto_1.types.IdentityRegisterRequest.encode(r).finish(); })];
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
                    return [4 /*yield*/, _register("/api/v4/register/link/" + encodeURIComponent(btoken), identity, secret, function (r) { return proto_1.types.RegisterPostLinkTokenRequest.encode(r).finish(); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.registerWithToken = registerWithToken;
function _register(path, identity, secret, request) {
    return __awaiter(this, void 0, void 0, function () {
        var encryption;
        return __generator(this, function (_a) {
            encryption = new CryptoFuncs_1.Encryption();
            encryption.generate(Tools_1.Uint8Tool.convert(secret), null);
            return [2 /*return*/, client.doRequest({
                    method: "POST", code: 201, path: path,
                    request: function () { return request({ identity: identity, encryption: encryption }); },
                    before: function (x, b) { return x.setRequestHeader("content-type", "application/x-protobuf"); }
                })];
        });
    });
}
/**
 * Request an access to a delegated identity of the given login.
 * @param login The login of identity to request its access.
 * @param sign A function to sign the access request.
 * The signature must be computed on the concatenation of the `login` and the `publicKey`,
 * thanks the `requester` sign private key.
 * @return(p) a promise that rejects with an {@link Error} with kind
 * - `IdentityNotFound` if the identity doesn't exists..
 */
function requestDelegatedAccess(login, sign) {
    return __awaiter(this, void 0, void 0, function () {
        var encrypt, keypair, _a, box, version, encryptedKey, signResult, id, resource;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    encrypt = new CryptoFuncs_1.EncryptAnonymous();
                    keypair = nacl.box.keyPair();
                    return [4 /*yield*/, getLatestPublicKey(login)];
                case 1:
                    _a = _b.sent(), box = _a.box, version = _a.version;
                    encryptedKey = encrypt.encrypt(box, keypair.secretKey);
                    return [4 /*yield*/, sign({ login: login, publicKey: keypair.publicKey })];
                case 2:
                    signResult = _b.sent();
                    return [4 /*yield*/, client.doRequest({
                            method: "POST", code: 201,
                            path: "/api/v4/delegatedAccess",
                            request: function () { return proto_1.types.DelegatedPostRequest.encode({
                                publicKey: keypair.publicKey,
                                sign: signResult.sign,
                                requester: signResult.requester,
                                sharing: {
                                    encryptedKey: encryptedKey.message,
                                    nonce: encryptedKey.nonce,
                                    login: login, version: version
                                },
                            }).finish(); },
                            response: proto_1.types.DelegatedPostResponse.decode,
                            before: function (x, b) {
                                x.setRequestHeader("content-type", "application/x-protobuf");
                            }
                        })];
                case 3:
                    id = (_b.sent()).id;
                    resource = new Resource_1.Resource(0, null, null, keypair, null, null);
                    return [2 /*return*/, new Session_1.AccessRequestImpl(id, login, client, resource)];
            }
        });
    });
}
exports.requestDelegatedAccess = requestDelegatedAccess;
/**
 * Get the latest public key of the given identity login.
 * @param login The login of identity to get the key.
 * @return(p) On success the promise will be resolved with the public key of `login`.
 * On error the promise will be rejected with an {@link Error} with kind
 * - `IdentityNotFound` if the identity is not found.
 */
function getLatestPublicKeys(logins) {
    return __awaiter(this, void 0, void 0, function () {
        var publicKeys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.doRequest({
                        method: "POST", code: 200,
                        path: "/api/v4/identities/latestPublicKeys",
                        request: function () { return proto_1.types.IdentityGetLatestPublicKeysRequest.encode({ logins: logins }).finish(); },
                        response: proto_1.types.IdentityGetLatestPublicKeysResponse.decode,
                        before: function (x, b) {
                            x.setRequestHeader("content-type", "application/x-protobuf");
                        }
                    })];
                case 1:
                    publicKeys = (_a.sent()).publicKeys;
                    return [2 /*return*/, publicKeys];
            }
        });
    });
}
exports.getLatestPublicKeys = getLatestPublicKeys;
/**
 * Get the latest public key of a list of identities.
 * @param logins The login of identities to get the key.
 * @return(p) On success the promise will be resolved with list of the public key in the same order of the `logins` list.
 * On error the promise will be rejected with an {@link Error} with kind
 * - `IdentityNotFound` if an identity is not found.
 */
function getLatestPublicKey(login) {
    return __awaiter(this, void 0, void 0, function () {
        var pk;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getLatestPublicKeys([login])];
                case 1:
                    pk = (_a.sent())[0];
                    return [2 /*return*/, pk];
            }
        });
    });
}
exports.getLatestPublicKey = getLatestPublicKey;
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
                case 0: return [4 /*yield*/, client.doRequest({
                        method: "POST", code: 201,
                        path: "/api/v4/register/link",
                        request: function () { return proto_1.types.RegisterLinkRequest.encode({
                            email: email
                        }).finish(); },
                        before: function (x, b) { return x.setRequestHeader("content-type", "application/x-protobuf"); }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.sendRegisterLink = sendRegisterLink;
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
function login(login, secret, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Session_1._login(client, login, function (e, c) {
                        var encryption = new CryptoFuncs_1.Encryption(e);
                        encryption.recover(Tools_1.Uint8Tool.convert(secret), c);
                        return encryption;
                    }, options)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.login = login;
/** Allows to indicate which kind of access shoudl be used in a {@link SessionRequest}*/
var IdentityAccessKind;
(function (IdentityAccessKind) {
    IdentityAccessKind[IdentityAccessKind["READ"] = 0] = "READ";
    IdentityAccessKind[IdentityAccessKind["WRITE"] = 1] = "WRITE";
})(IdentityAccessKind = exports.IdentityAccessKind || (exports.IdentityAccessKind = {}));
/////////////////////////////////////////////////
// Resource
/////////////////////////////////////////////////
/**
 * The list the cryptographic schemes of a {@link Resource}
 */
var ResourceType;
(function (ResourceType) {
    ResourceType[ResourceType["ANONYMOUS"] = 0] = "ANONYMOUS";
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
//# sourceMappingURL=DataPeps.js.map