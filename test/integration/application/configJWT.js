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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var DataPeps_1 = require("../../../src/DataPeps");
var Context_1 = require("../../Context");
var nacl = require("tweetnacl");
var chai_1 = require("chai");
var Utils_1 = require("../../Utils");
var Utils_2 = require("./Utils");
describe("applicationAPI.config.JWT", function () {
    var ctx;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var initCtx, devCtx, otherDev;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initCtx = Context_1.init();
                    return [4 /*yield*/, Context_1.dev(initCtx, Utils_2.configs.length + 1)];
                case 1:
                    devCtx = _a.sent();
                    return [4 /*yield*/, Context_1.userAndSession(initCtx, "otherDev")];
                case 2:
                    otherDev = _a.sent();
                    ctx = __assign({}, devCtx, { otherDev: otherDev });
                    return [2 /*return*/];
            }
        });
    }); });
    ///////////////////////////////////////////////
    // Test nominal cases of putConfig / getConfig
    ///////////////////////////////////////////////
    Utils_2.configs.forEach(function (_a, i) {
        var secretKey = _a.secretKey, config = _a.config;
        var signAlgorithm = config.signAlgorithm;
        it("should configure an application with signAlgorithm(" + DataPeps_1.ApplicationJWT.Algorithm[signAlgorithm] + ")", function () { return __awaiter(_this, void 0, void 0, function () {
            var api, getConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = new DataPeps_1.ApplicationAPI(ctx.dev.session);
                        return [4 /*yield*/, api.putConfig(ctx.apps[i].identity.login, { jwt: config })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, api.getConfig(ctx.apps[i].identity.login)];
                    case 2:
                        getConfig = _a.sent();
                        chai_1.expect(getConfig.jwt).not.null;
                        Object.keys(config).forEach(function (k) {
                            chai_1.expect(getConfig.jwt[k], "config field " + k).deep.equals(config[k]);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it("configure an application with default value", function () { return __awaiter(_this, void 0, void 0, function () {
        var config, api, storedConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = {
                        jwt: {
                            key: nacl.randomBytes(128)
                        }
                    };
                    api = new DataPeps_1.ApplicationAPI(ctx.dev.session);
                    return [4 /*yield*/, api.putConfig(ctx.app.identity.login, config)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.getConfig(ctx.app.identity.login)];
                case 2:
                    storedConfig = _a.sent();
                    chai_1.expect(storedConfig.jwt).to.exist;
                    chai_1.expect(storedConfig.jwt.key).to.deep.equal(config.jwt.key);
                    chai_1.expect(storedConfig.jwt.signAlgorithm).to.equal(DataPeps_1.ApplicationJWT.Algorithm.HS256);
                    chai_1.expect(storedConfig.jwt.claimForLogin).to.equal("sub");
                    return [2 /*return*/];
            }
        });
    }); });
    it("overwrite configuration", function () { return __awaiter(_this, void 0, void 0, function () {
        var config, api, storedConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = {
                        jwt: { key: nacl.randomBytes(128), claimForLogin: "field_1" }
                    };
                    api = new DataPeps_1.ApplicationAPI(ctx.dev.session);
                    return [4 /*yield*/, api.putConfig(ctx.app.identity.login, config)];
                case 1:
                    _a.sent();
                    config = { jwt: { key: nacl.randomBytes(128), claimForLogin: "field_2" } };
                    return [4 /*yield*/, api.putConfig(ctx.app.identity.login, config)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, api.getConfig(ctx.app.identity.login)];
                case 3:
                    storedConfig = _a.sent();
                    chai_1.expect(storedConfig.jwt.claimForLogin).to.equal(config.jwt.claimForLogin);
                    chai_1.expect(storedConfig.jwt.key).to.deep.equals(config.jwt.key);
                    return [2 /*return*/];
            }
        });
    }); });
    ///////////////////////////////////////////////
    // Error cases: putConfig
    ///////////////////////////////////////////////
    // `IdentityCannotAssumeAccess` if cannot have right to write the configuration.
    Utils_1.itError("should not configure an application of someone else", function () {
        return new DataPeps_1.ApplicationAPI(ctx.otherDev.session).putConfig(ctx.app.identity.login, {
            jwt: { key: nacl.randomBytes(128), claimForLogin: "login" }
        });
    }, DataPeps_1.ServerError.IdentityCannotAssumeOwnership);
    Utils_1.itError("should not configure with a invalid key RS PEM", function () {
        return new DataPeps_1.ApplicationAPI(ctx.dev.session).putConfig(ctx.app.identity.login, {
            jwt: {
                key: new TextEncoder().encode("-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy2kQaxIDLw6vXEmSyDIU\nW2+7zumTbO9KE2o5/afE55lUyTV8lY+kVZDoRToP6yfiUKYC9t3fFBui50rBdtXJ\nd8TgD7ecw9tdoLiQ8usELOIV1Il+e0NUOocypPRYuI26RzOBQ98ULtqXWRPvW7G3\nXhvwhB7FY31LXSRtbTA2ZOXhl64ZfWYBqWwsFMQ0wmWxnnF60J+NDESR1dWKHrzB\n0gaJAk341Mm0Golftan/R3Bd4uJ3u48gDr2uOzpSZB3m9VbK3sn1/1a2V/1mL20y\n/799hgxtB04Wz+cjm1O6gRuau7q7qxNRkvWL+hoXBXWUv2/WrBcglDr0f9tsvnh4\nfwIDAQAB\n  -----END PUBLIC KEY-----" // Invalid because spaces in front of last line
                ),
                signAlgorithm: DataPeps_1.ApplicationJWT.Algorithm.RS256
            }
        });
    }, DataPeps_1.ServerError.ApplicationConfigInvalid);
    Utils_1.itError("should not configure with a invalid key ES PEM", function () {
        return new DataPeps_1.ApplicationAPI(ctx.dev.session).putConfig(ctx.app.identity.login, {
            jwt: {
                key: new TextEncoder().encode("-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEQ4/x3bCZotGA3n+5CxFmuNZnzB7L\nZUd9C885FDhZN8+oRavvPrWSiGKv72hMKsfL9wVpEygSzZWXqZW+H/w7Jw==\n            -----END PUBLIC KEY-----" // Invalid because spaces in front of last line
                ),
                signAlgorithm: DataPeps_1.ApplicationJWT.Algorithm.ES256
            }
        });
    }, DataPeps_1.ServerError.ApplicationConfigInvalid);
    // ApplicationConfigInvalid` if configuration object is invalid.
    Utils_2.configs.forEach(function (_a, i) {
        var secretKey = _a.secretKey, config = _a.config;
        var signAlgorithm = config.signAlgorithm;
        Utils_1.itError("should not configure with a invalid type of key for the signAlgorithm(" + DataPeps_1.ApplicationJWT.Algorithm[signAlgorithm] + ")", function () {
            return new DataPeps_1.ApplicationAPI(ctx.dev.session).putConfig(ctx.app.identity.login, {
                jwt: {
                    key: Utils_2.invalidKey(signAlgorithm),
                    signAlgorithm: signAlgorithm,
                    claimForLogin: "login"
                }
            });
        }, DataPeps_1.ServerError.ApplicationConfigInvalid);
    });
    // `IdentityNotFound` if the identity `appID` doesn't exists.
    Utils_1.itError("should not configure a non existent application", function () {
        return new DataPeps_1.ApplicationAPI(ctx.dev.session).putConfig("non.existent.app", {
            jwt: { key: nacl.randomBytes(128), claimForLogin: "login" }
        });
    }, DataPeps_1.ServerError.IdentityNotFound);
    ///////////////////////////////////////////////
    // Error cases: getConfig
    ///////////////////////////////////////////////
    // `IdentityCannotAssumeAccess` if cannot have right to read the configuration.
    Utils_1.itError("should not get the configuration of an application of someone else", function () {
        return new DataPeps_1.ApplicationAPI(ctx.otherDev.session).getConfig(ctx.app.identity.login);
    }, DataPeps_1.ServerError.IdentityCannotAssumeOwnership);
    // `IdentityNotFound` if the identity `appID` doesn't exists.
    Utils_1.itError("should not get the configuration rof a non existent identity", function () { return new DataPeps_1.ApplicationAPI(ctx.dev.session).getConfig("non.existent.app"); }, DataPeps_1.ServerError.IdentityNotFound);
    // `ApplicationConfigNotFound` if configuration doesn't exists.
    Utils_1.itError("should receive correct error trying to get non existent configuration as application", function () {
        return new DataPeps_1.ApplicationAPI(ctx.dev.session).getConfig(ctx.apps[Utils_2.configs.length].identity.login);
    }, DataPeps_1.ServerError.ApplicationConfigNotFound);
});
//# sourceMappingURL=configJWT.js.map