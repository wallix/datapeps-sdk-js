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
var Config = require("../../Config");
var DataPeps = require("../../../src/DataPeps");
var nacl = require("tweetnacl");
var chai_1 = require("chai");
var DataPeps_1 = require("../../../src/DataPeps");
describe("identity.Update", function () {
    var seed = Math.floor(Math.random() * 99999);
    var aliceSecret = nacl.randomBytes(128);
    var alice = {
        login: "alice." + seed,
        name: "alice 1",
        kind: "user",
        payload: new TextEncoder().encode(JSON.stringify({
            test: 1
        }))
    };
    var bobSecret = nacl.randomBytes(128);
    var bob = {
        login: "bob." + seed,
        name: "bob 1",
        kind: "user",
        payload: new TextEncoder().encode(JSON.stringify({
            test: 1
        }))
    };
    var totoAdminSecret = nacl.randomBytes(128);
    var totoAdminEmail = "admin." + seed + "@toto.com";
    var totoAdmin = {
        login: "adminToto." + seed,
        name: "Toto Admin",
        kind: "user",
        payload: null
    };
    var totoUserSecret = nacl.randomBytes(128);
    var totoUserEmail = "user." + seed + "@toto.com";
    var totoUser = {
        login: "userToto." + seed,
        name: "Toto User",
        kind: "user",
        payload: null
    };
    var aliceSession;
    var bobSession;
    var adminSession;
    var totoAdminSession;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Config.init()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.register(alice, aliceSecret)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, aliceSecret)];
                case 3:
                    aliceSession = _a.sent();
                    return [4 /*yield*/, Config.adminLogin()];
                case 4:
                    adminSession = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).create(bob, {
                            sharingGroup: [alice.login],
                            secret: bobSecret
                        })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(bob.login, bobSecret)];
                case 6:
                    bobSession = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(adminSession).create(totoAdmin, {
                            secret: totoAdminSecret,
                            email: totoAdminEmail
                        })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).setAdmin(totoAdmin.login, true)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(totoAdmin.login, totoAdminSecret)];
                case 9:
                    totoAdminSession = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(adminSession).create(totoUser, {
                            secret: totoAdminSecret,
                            email: totoUserEmail
                        })];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    function checkFields(identity, fields) {
        chai_1.expect(identity.kind).to.be.equal(fields.kind);
        chai_1.expect(identity.login).to.be.equal(fields.login);
        chai_1.expect(identity.name).to.be.equal(fields.name);
        chai_1.expect(identity.payload).to.be.deep.equal(fields.payload);
    }
    it("Check alice fields", function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = checkFields;
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).get(alice.login)];
                case 1:
                    _a.apply(void 0, [_b.sent(), alice]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Alice should update its fields", function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    alice.name = "alice 2";
                    alice.payload = new TextEncoder().encode(JSON.stringify({
                        toto: 2
                    }));
                    alice.kind = "another";
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).update(alice)];
                case 1:
                    _b.sent();
                    _a = checkFields;
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).get(alice.login)];
                case 2:
                    _a.apply(void 0, [_b.sent(), alice]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Bob should not update alice fields", function () { return __awaiter(_this, void 0, void 0, function () {
        var up, e_1, d;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    up = __assign({}, alice, { name: "alice bob" });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(bobSession).update(up)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    chai_1.expect(e_1).is.instanceOf(DataPeps.Error);
                    d = e_1;
                    chai_1.expect(d.kind).to.be.equal(DataPeps.ServerError.IdentityNotAdmin);
                    return [2 /*return*/];
                case 4: throw new Error("bob should not update alice fields");
            }
        });
    }); });
    it("Peps admin should update alice fields", function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    alice.name = "alice 3";
                    alice.payload = new TextEncoder().encode(JSON.stringify({
                        titi: 3
                    }));
                    alice.kind = "user";
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(adminSession).update(alice)];
                case 1:
                    _b.sent();
                    _a = checkFields;
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(adminSession).get(alice.login)];
                case 2:
                    _a.apply(void 0, [_b.sent(), alice]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=Update.js.map