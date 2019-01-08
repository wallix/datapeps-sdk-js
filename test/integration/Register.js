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
var Config = require("../Config");
var nacl = require("tweetnacl");
var chai_1 = require("chai");
var DataPeps_1 = require("../../src/DataPeps");
var proto_1 = require("../../src/proto");
describe("register.main", function () {
    var sdk = Config.sdk;
    var adminSession;
    before(function (done) {
        Config.init()
            .then(function () {
            return Config.adminLogin();
        })
            .then(function (session) {
            adminSession = session;
            done();
        })
            .catch(done);
    });
    var seed = Math.floor(Math.random() * 99999);
    var domain = "gmail.com";
    var normanSecret = nacl.randomBytes(128);
    var normanEmail = "normanscaife" + seed + "@" + domain;
    var norman = {
        login: "normanscaife" + seed,
        name: "norman test identity, TS",
        admin: false,
        active: true,
        kind: "user",
        created: new Date(),
        payload: new TextEncoder().encode(JSON.stringify({
            firstname: "Norman",
            lastname: "TypeScript",
            tel: "+44712345678"
        }))
    };
    it("request a register link", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.sendRegisterLink(normanEmail)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var token;
    it("admin get registered links", function () { return __awaiter(_this, void 0, void 0, function () {
        var links, link;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).listRegisterTokens({
                        limit: 100
                    })];
                case 1:
                    links = _a.sent();
                    chai_1.expect(links).to.not.be.null;
                    link = links.find(function (_a) {
                        var email = _a.email;
                        return email == normanEmail;
                    });
                    chai_1.expect(link).to.not.be.null;
                    chai_1.expect(link.status).equal(proto_1.api.RegisterTokenStatus.SENT);
                    token = link.token;
                    return [2 /*return*/];
            }
        });
    }); });
    it("call registration endpoint", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.registerWithToken(token, norman, normanSecret)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("login with login", function () { return __awaiter(_this, void 0, void 0, function () {
        var session;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.Session.login(norman.login, normanSecret)];
                case 1:
                    session = _a.sent();
                    chai_1.expect(session).to.not.be.null;
                    chai_1.expect(session.login).to.be.equals(norman.login);
                    return [2 /*return*/];
            }
        });
    }); });
    it("login with email", function () { return __awaiter(_this, void 0, void 0, function () {
        var session;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.Session.login(normanEmail, normanSecret)];
                case 1:
                    session = _a.sent();
                    chai_1.expect(session).to.not.be.null;
                    chai_1.expect(session.login).to.be.equals(norman.login);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=Register.js.map