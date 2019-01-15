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
var Utils_1 = require("./Utils");
var JWT = require("jsonwebtoken");
var Context_1 = require("../../Context");
var Application = require("../../../src/Application");
var DataPeps_1 = require("../../../src/DataPeps");
/**
 * Create a devCtx with n applications that are configured with all different
 * JWT configs + 1 application that is not configured.
 */
function devWithAllConfigs(init) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var devCtx, api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Context_1.dev(init, Utils_1.configs.length + 1)];
                case 1:
                    devCtx = _a.sent();
                    api = new DataPeps_1.ApplicationAPI(devCtx.dev.session);
                    return [4 /*yield*/, Promise.all(devCtx.apps.slice(0, Utils_1.configs.length).map(function (app, i) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, api.putConfig(app.identity.login, {
                                            jwt: Utils_1.configs[i].config
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, devCtx];
            }
        });
    });
}
exports.devWithAllConfigs = devWithAllConfigs;
function registerIdentitiesForEachApps(init, dev, configs, n, options) {
    return __awaiter(this, void 0, void 0, function () {
        var promises;
        return __generator(this, function (_a) {
            promises = configs.map(function (config, i) {
                return registerIdentitiesWithApp(init, dev.apps[i].identity, config, n, options);
            });
            return [2 /*return*/, Promise.all(promises)];
        });
    });
}
exports.registerIdentitiesForEachApps = registerIdentitiesForEachApps;
function registerIdentitiesWithApp(init, app, config, n, options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Context_1.generateIdentities(init, n, function (field, secret) { return __awaiter(_this, void 0, void 0, function () {
                        var token, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    token = JWT.sign((_a = {}, _a[config.config.claimForLogin] = field.login, _a), new TextDecoder().decode(config.secretKey), { algorithm: DataPeps_1.ApplicationJWT.Algorithm[config.config.signAlgorithm] });
                                    return [4 /*yield*/, Application.createUser(app.login, { jwt: { token: token } }, secret)];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, options)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//# sourceMappingURL=Context.js.map