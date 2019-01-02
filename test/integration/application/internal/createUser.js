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
var Application = require("../../../../src/Application");
var DataPeps_1 = require("../../../../src/DataPeps");
var DataPeps = require("../../../../src/DataPeps");
var chai_1 = require("chai");
var JWT = require("jsonwebtoken");
var Utils_1 = require("../Utils");
var Context_1 = require("../../../Context");
var Utils_2 = require("../../../Utils");
describe("application.createUser", function () {
    var ctx;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var initCtx, devCtx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Context_1.init()];
                case 1:
                    initCtx = _a.sent();
                    return [4 /*yield*/, Utils_1.devWithAllConfigs(initCtx)];
                case 2:
                    devCtx = _a.sent();
                    ctx = __assign({}, initCtx, devCtx);
                    return [2 /*return*/];
            }
        });
    }); });
    Utils_1.configs.forEach(function (_a, i) {
        var config = _a.config, secretKey = _a.secretKey;
        var signAlgorithm = config.signAlgorithm;
        ///////////////////////////////////////////////
        // Test nominal cases - forEach config
        ///////////////////////////////////////////////
        it("Create user using with signAlgorith(" + DataPeps_1.ApplicationJWT.Algorithm[signAlgorithm] + ")", function () { return __awaiter(_this, void 0, void 0, function () {
            var login, userSecret, token, createAliceResp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        login = "alice" + Math.random();
                        userSecret = "aSoStrongSecret";
                        token = JWT.sign({ login: login }, new TextDecoder().decode(secretKey), {
                            algorithm: DataPeps_1.ApplicationJWT.Algorithm[signAlgorithm]
                        });
                        return [4 /*yield*/, Application.createUser(ctx.apps[i].login, { jwt: { token: token } }, userSecret)];
                    case 1:
                        createAliceResp = _a.sent();
                        chai_1.expect(createAliceResp.login).to.equal(login + "@" + ctx.apps[i].login);
                        return [4 /*yield*/, DataPeps.Session.login(createAliceResp.login, userSecret)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        ///////////////////////////////////////////////
        // Test error cases - forEach config
        ///////////////////////////////////////////////
        Utils_2.itError("Try to create a user with a bad token with signAlgorith(" + DataPeps_1.ApplicationJWT.Algorithm[signAlgorithm] + ")", function () { return __awaiter(_this, void 0, void 0, function () {
            var login, userSecret, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        login = "alice" + Math.random();
                        userSecret = "aSoStrongSecret";
                        token = JWT.sign({ login: login }, Utils_1.getBadAlgoKey(signAlgorithm), {
                            algorithm: DataPeps_1.ApplicationJWT.Algorithm[signAlgorithm]
                        });
                        return [4 /*yield*/, Application.createUser(ctx.apps[i].login, { jwt: { token: token } }, userSecret)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }, DataPeps_1.ServerError.ApplicationInvalidToken);
    });
    ///////////////////////////////////////////////
    // Test error cases
    ///////////////////////////////////////////////
    Utils_2.itError("Try to create a user with an application that doesn't exists", function () { return __awaiter(_this, void 0, void 0, function () {
        var login, userSecret, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = "alice" + Math.random();
                    userSecret = "aSoStrongSecret";
                    token = "BimBam";
                    return [4 /*yield*/, Application.createUser("non.existent.app", { jwt: { token: token } }, userSecret)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, DataPeps_1.ServerError.IdentityNotFound, function () { return ({ login: "non.existent.app" }); });
    Utils_2.itError("Try to create a user with an application that is not configured", function () { return __awaiter(_this, void 0, void 0, function () {
        var login, userSecret, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = "alice" + Math.random();
                    userSecret = "aSoStrongSecret";
                    token = "BimBam";
                    return [4 /*yield*/, Application.createUser(ctx.apps[Utils_1.configs.length].login, { jwt: { token: token } }, userSecret)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, DataPeps_1.ServerError.ApplicationConfigNotFound, function () { return ({ login: ctx.apps[Utils_1.configs.length].login }); });
});
//# sourceMappingURL=createUser.js.map