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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Context = require("../../../Context");
var Application = require("../../../../src/Application");
var DataPeps = require("../../../../src/DataPeps");
var Tools_1 = require("../../../../src/Tools");
var nacl = require("tweetnacl");
var chai_1 = require("chai");
var JWT = require("jsonwebtoken");
var DataPeps_1 = require("../../../../src/DataPeps");
describe("application.secure", function () {
    var appADevCtx;
    var appASecretKey = "appASecretKey";
    var appAConfig = {
        jwt: {
            key: Tools_1.Uint8Tool.convert(appASecretKey),
            signAlgorithm: DataPeps.ApplicationJWT.Algorithm.HS256,
            claimForLogin: "login"
        }
    };
    var appAUserSecret = nacl.randomBytes(8);
    var appAAliceLogin = "appA.Alice";
    var appAAliceLoginToken = JWT.sign({ login: appAAliceLogin }, appASecretKey);
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var initCtx, api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Context.init()];
                case 1:
                    initCtx = _a.sent();
                    return [4 /*yield*/, Context.dev(initCtx)];
                case 2:
                    appADevCtx = _a.sent();
                    api = new DataPeps_1.ApplicationAPI(appADevCtx.dev.session);
                    return [4 /*yield*/, api.putConfig(appADevCtx.app.identity.login, appAConfig)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("An application can create a user", function () { return __awaiter(_this, void 0, void 0, function () {
        var createAliceResp, _a, appAUserSession, appAUserApplicationSecret;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Application.createUser(appADevCtx.app.identity.login, { jwt: { token: appAAliceLoginToken.toString() } }, appAUserSecret)];
                case 1:
                    createAliceResp = _b.sent();
                    return [4 /*yield*/, Application.secure(appADevCtx.app.identity.login, appAAliceLogin, appAUserSecret)];
                case 2:
                    _a = _b.sent(), appAUserSession = _a.session, appAUserApplicationSecret = _a.secret;
                    chai_1.expect(appAUserApplicationSecret).to.be.deep.equals(appAUserSecret);
                    chai_1.expect(appAUserSession).to.be.not.null;
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=secure.js.map