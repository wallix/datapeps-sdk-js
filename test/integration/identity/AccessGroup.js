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
 * This test is about testing of the funtion DataPeps.IdentityAPI.getAccessGroup
 */
describe("identity.AccessGroup", function () {
    var seed = Math.floor(Math.random() * 99999);
    var aliceSecret = nacl.randomBytes(128);
    var alice = {
        login: "alice." + seed,
        name: "alice test identity, TS",
        kind: "user",
        payload: null
    };
    function getOtherLogin(i) {
        return "other." + i + "." + seed;
    }
    var nothers = 10;
    var others = new Array(nothers).fill(0).map(function (x, i) {
        return {
            login: getOtherLogin(i),
            name: "Other " + i,
            kind: "other",
            payload: null
        };
    });
    // Register and login alice
    var aliceSession;
    var adminSession;
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
                    return [2 /*return*/];
            }
        });
    }); });
    it("create others identities with alice in their sharingGroup", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(others.map(function (other) {
                        return new DataPeps_1.IdentityAPI(aliceSession).create(other, {
                            sharingGroup: [alice.login]
                        });
                    }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    function checkAliceAccessGroup() {
        return __awaiter(this, void 0, void 0, function () {
            var accessGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).getAccessGroup(alice.login)];
                    case 1:
                        accessGroup = _a.sent();
                        chai_1.expect(accessGroup.length).to.be.equals(nothers);
                        others.forEach(function (other) {
                            var link = accessGroup.find(function (link) { return link.id.login == other.login; });
                            chai_1.expect(link).to.not.be.null;
                            chai_1.expect(link.id.login).to.be.equal(other.login);
                            chai_1.expect(link.locked).to.be.equal(false);
                        });
                        return [2 /*return*/];
                }
            });
        });
    }
    it("checks alice accessGroup", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkAliceAccessGroup()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("checks alice accessGroup after renew alice keys", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, aliceSession.renewKeys()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, checkAliceAccessGroup()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("checks alice accessGroup after renew others keys", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(others.map(function (other) {
                        return new DataPeps_1.IdentityAPI(aliceSession).renewKeys(other.login);
                    }))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, checkAliceAccessGroup()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("checks accessgroup are unlocked after delegate key renewal", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).renewKeys(getOtherLogin(0))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("checks alice accessGroup after admin reset keys", function () { return __awaiter(_this, void 0, void 0, function () {
        var newPassword, afterKeyRenewalLogin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newPassword = "a new password";
                    return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).overwriteKeys(alice.login, newPassword)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, newPassword)];
                case 2:
                    aliceSession = _a.sent();
                    // Add new element to accessGroup and check it is unlocked
                    nothers = nothers + 1;
                    afterKeyRenewalLogin = getOtherLogin(nothers);
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).create({
                            login: afterKeyRenewalLogin,
                            name: "Other " + nothers,
                            kind: "other",
                            payload: null
                        }, { sharingGroup: [alice.login] })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=AccessGroup.js.map