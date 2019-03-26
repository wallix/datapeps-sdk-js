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
var HTTP = require("./HTTP");
var ResourceInternal_1 = require("./ResourceInternal");
var Session_1 = require("./Session");
var ResourceAPI_1 = require("./ResourceAPI");
var IdentityKeySetAPI_1 = require("./IdentityKeySetAPI");
/**
 * Create a user thanks an external referential of identities
 * @param appID The identifier of a configured application
 * @param auth The parameter that allows DataPeps to authenticate the user
 * @param secret The identity secret
 * On error the promise will be rejected with an {@link Error} with kind:
 * - `ApplicationInvalidToken` if the JWT token returned by the connector is invalid.
 * - `ApplicationConfigNotFound` if the `appID` is not configured or if the identity `appID` doesn't exists.
 */
function createUser(appID, auth, secret) {
    return __awaiter(this, void 0, void 0, function () {
        var secretBytes, _a, keySet, encryptedKeySet, payload, identity, appIdentityResourceKind, resource, body;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    secretBytes = Tools_1.Uint8Tool.convert(secret);
                    _a = IdentityKeySetAPI_1.IdentityKeySetAPI.initWithSecret({ version: 1, login: null }, secretBytes), keySet = _a.keySet, encryptedKeySet = _a.encryptedKeySet;
                    payload = Tools_1.Uint8Tool.convert(JSON.stringify({
                        appID: appID
                    }));
                    identity = {
                        login: null,
                        name: null,
                        kind: "pepsswarm/4",
                        payload: payload
                    };
                    appIdentityResourceKind = "internal/application/secret";
                    resource = ResourceInternal_1.createWithEncryption(secretBytes, keySet, appIdentityResourceKind, { serialize: function (u) { return u; } });
                    return [4 /*yield*/, HTTP.client.doRequest({
                            method: "POST",
                            expectedCode: 201,
                            path: "/api/v1/application/" + appID + "/identity",
                            body: proto_1.api.RegisterApplicationIdentityRequest.encode({
                                appID: appID,
                                auth: auth,
                                encryption: encryptedKeySet,
                                identity: identity,
                                resources: { appSecret: resource.resourceRequestBody }
                            }).finish(),
                            response: proto_1.api.RegisterApplicationIdentityResponse.decode,
                            headers: new Headers({ "content-type": "application/x-protobuf" })
                        })];
                case 1:
                    body = (_b.sent()).body;
                    return [2 /*return*/, body];
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
                    appLogin = composeApplicationLogin(login, appID);
                    return [4 /*yield*/, Session_1.Session.login(appLogin, secret)];
                case 1:
                    session = _a.sent();
                    identityLogin = login.concat("@", appID);
                    return [4 /*yield*/, new ResourceAPI_1.ResourceAPI(session).getNamed(identityLogin, "appSecret", { parse: function (u) { return u; } })];
                case 2:
                    appSecretResource = _a.sent();
                    return [2 /*return*/, { session: session, secret: appSecretResource.payload }];
            }
        });
    });
}
exports.secure = secure;
function composeApplicationLogin(login, appID) {
    var appLogin = login.concat("@", appID);
    return appLogin;
}
//# sourceMappingURL=Application.js.map