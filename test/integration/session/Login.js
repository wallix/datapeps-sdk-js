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
var Config = require("../../Config");
var DataPeps = require("../../../src/DataPeps");
var nacl = require("tweetnacl");
var chai_1 = require("chai");
var DataPeps_1 = require("../../../src/DataPeps");
/**
 * This test is about testing of the funtion DataPeps.Session.login
 */
describe("session.Login", function () {
    var seed = Math.floor(Math.random() * 99999);
    var aliceSecret = nacl.randomBytes(128);
    var alice = {
        login: "alice." + seed,
        name: "alice test identity, TS",
        kind: "user",
        payload: null
    };
    var anotherSecret = nacl.randomBytes(128);
    var another = {
        login: "another." + seed,
        name: "another test identity, TS",
        kind: "user",
        payload: null
    };
    // Register and login alice
    var aliceSession;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Config.init()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.register(alice, aliceSecret)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.register(another, anotherSecret)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    function checkAliceSession(session) {
        chai_1.expect(aliceSession).to.be.not.null;
        chai_1.expect(aliceSession.login).to.be.equals(alice.login);
    }
    it("check alice can login after register", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DataPeps.Session.login(alice.login, aliceSecret)];
                case 1:
                    aliceSession = _a.sent();
                    checkAliceSession(aliceSession);
                    return [2 /*return*/];
            }
        });
    }); });
    it("check alice can login after renew its keys", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, aliceSession.renewKeys()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, aliceSecret)];
                case 2:
                    aliceSession = _a.sent();
                    checkAliceSession(aliceSession);
                    return [2 /*return*/];
            }
        });
    }); });
    it("check alice can login after she has changed her password", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    aliceSecret = nacl.randomBytes(128);
                    return [4 /*yield*/, aliceSession.renewKeys(aliceSecret)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, aliceSecret)];
                case 2:
                    aliceSession = _a.sent();
                    checkAliceSession(aliceSession);
                    return [2 /*return*/];
            }
        });
    }); });
    it("check alice can login after an administrator has overwrite her keys", function () { return __awaiter(_this, void 0, void 0, function () {
        var adminSession;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    aliceSecret = nacl.randomBytes(128);
                    return [4 /*yield*/, Config.adminLogin()];
                case 1:
                    adminSession = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).overwriteKeys(alice.login, aliceSecret)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, aliceSecret)];
                case 3:
                    aliceSession = _a.sent();
                    checkAliceSession(aliceSession);
                    return [2 /*return*/];
            }
        });
    }); });
    it("check alice can login after an identity of its sharing group has changed her password", function () { return __awaiter(_this, void 0, void 0, function () {
        var anotherSession;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).extendSharingGroup(aliceSession.login, [
                        another.login
                    ])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(another.login, anotherSecret)];
                case 2:
                    anotherSession = _a.sent();
                    aliceSecret = nacl.randomBytes(128);
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(anotherSession).renewKeys(aliceSession.login, aliceSecret)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, aliceSecret)];
                case 4:
                    aliceSession = _a.sent();
                    checkAliceSession(aliceSession);
                    return [2 /*return*/];
            }
        });
    }); });
    it("check error when we try to login with a unexisting login", function () { return __awaiter(_this, void 0, void 0, function () {
        var login, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = "unknown@unknown.xxx";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, DataPeps.Session.login(login, new Uint8Array(1))];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    chai_1.expect(err_1).instanceof(DataPeps.Error);
                    chai_1.expect(err_1.kind).to.be.equals(DataPeps.ServerError.IdentityNotFound);
                    chai_1.expect(err_1.payload.login).to.be.deep.equals(login);
                    return [2 /*return*/];
                case 4: throw new Error("login with a unknow identity");
            }
        });
    }); });
    it("check error when we try to login with a wrong password", function () { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, new Uint8Array(1))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    chai_1.expect(err_2).instanceof(DataPeps.Error);
                    chai_1.expect(err_2.kind).to.be.equals(DataPeps.SDKError.BadSecret);
                    return [2 /*return*/];
                case 3: throw new Error("login with a wrong password");
            }
        });
    }); });
});
//# sourceMappingURL=Login.js.map