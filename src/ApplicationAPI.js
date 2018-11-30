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
var DataPeps_1 = require("./DataPeps");
var proto_1 = require("./proto");
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
                                assume: { login: appID, kind: DataPeps_1.IdentityAccessKind.WRITE },
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
                            assume: { login: appID, kind: DataPeps_1.IdentityAccessKind.READ },
                            code: 200,
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
    return ApplicationAPI;
}());
exports.ApplicationAPI = ApplicationAPI;
//# sourceMappingURL=ApplicationAPI.js.map