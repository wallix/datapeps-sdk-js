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
var Application_1 = require("./Application");
var Tools_1 = require("./Tools");
/**
 * Expose all specific types and functions for JWT application.
 */
var ApplicationJWT;
(function (ApplicationJWT) {
    /**
     * An enumeration that define all algorithm supported by DataPeps
     */
    var Algorithm;
    (function (Algorithm) {
        Algorithm[Algorithm["HS256"] = 0] = "HS256";
        Algorithm[Algorithm["HS384"] = 1] = "HS384";
        Algorithm[Algorithm["HS512"] = 2] = "HS512";
        Algorithm[Algorithm["RS256"] = 3] = "RS256";
        Algorithm[Algorithm["RS384"] = 4] = "RS384";
        Algorithm[Algorithm["RS512"] = 5] = "RS512";
        Algorithm[Algorithm["ES256"] = 6] = "ES256";
        Algorithm[Algorithm["ES384"] = 7] = "ES384";
        Algorithm[Algorithm["ES512"] = 8] = "ES512";
    })(Algorithm = ApplicationJWT.Algorithm || (ApplicationJWT.Algorithm = {}));
    /**
     * Create a DataPeps session and an application session.
     * @param appID The identifier of your DataPeps application.
     * @param appLogin The login of the identity in the referential of the application.
     * @param secret The secret of the DataPeps identity.
     * @param connector The JWT connector of your application
     * @return(p) On success the promise will be resolved with the DataPeps session,
     * the application session and a boolean that indicates if its the first connection
     * of the user to the DataPeps service.
     * On error the promise will be rejected with an {@link Error} with kind:
     * - `ApplicationInvalidToken` if the JWT token returned by the connector is invalid.
     * - `BadSecret` if the secret of the user is wrong.
     * - `ApplicationConfigNotFound` if the `appID` is not configured.
     */
    function createSession(appID, appLogin, secret, connector) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, session, appSecret, appSession, e_1, appSession, token, session;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 9]);
                        return [4 /*yield*/, Application_1.secure(appID, appLogin, secret)];
                    case 1:
                        _a = _b.sent(), session = _a.session, appSecret = _a.secret;
                        // The DataPeps Identity exists, connect to the application
                        if (secret instanceof Uint8Array) {
                            secret = appSecret;
                        }
                        else {
                            secret = Tools_1.Uint8Tool.decode(appSecret);
                        }
                        return [4 /*yield*/, connector.createSession(appLogin, secret)];
                    case 2:
                        appSession = _b.sent();
                        return [2 /*return*/, { session: session, appSession: appSession, isNew: false }];
                    case 3:
                        e_1 = _b.sent();
                        if (!(e_1.kind == proto_1.api.PepsErrorKind.IdentityNotFound)) return [3 /*break*/, 8];
                        return [4 /*yield*/, connector.createSession(appLogin, secret)];
                    case 4:
                        appSession = _b.sent();
                        return [4 /*yield*/, connector.getToken(appSession)];
                    case 5:
                        token = _b.sent();
                        // Create the DataPeps Identity
                        return [4 /*yield*/, Application_1.createUser(appID, { jwt: { token: token } }, secret)];
                    case 6:
                        // Create the DataPeps Identity
                        _b.sent();
                        return [4 /*yield*/, Application_1.secure(appID, appLogin, secret)];
                    case 7:
                        session = (_b.sent()).session;
                        return [2 /*return*/, { session: session, appSession: appSession, isNew: true }];
                    case 8: throw e_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    ApplicationJWT.createSession = createSession;
})(ApplicationJWT = exports.ApplicationJWT || (exports.ApplicationJWT = {}));
//# sourceMappingURL=ApplicationJWT.js.map