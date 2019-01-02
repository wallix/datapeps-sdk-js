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
describe("identity.LockedVersions", function () {
    var seed = Math.floor(Math.random() * 99999);
    var aliceSecret = nacl.randomBytes(128);
    var otherPassword = "other password";
    var adminSecret1 = "an admin secret";
    var alice = {
        login: "alice." + seed,
        name: "alice 1",
        kind: "user",
        payload: null
    };
    var aliceSession;
    var adminSession;
    var publicKeys;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var adminSecret2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Config.init()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.register(alice, aliceSecret)];
                case 2:
                    _a.sent(); // v1
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, aliceSecret)];
                case 3:
                    aliceSession = _a.sent();
                    return [4 /*yield*/, Config.adminLogin()];
                case 4:
                    adminSession = _a.sent();
                    return [4 /*yield*/, aliceSession.renewKeys()];
                case 5:
                    _a.sent(); // v2
                    return [4 /*yield*/, aliceSession.renewKeys(otherPassword)];
                case 6:
                    _a.sent(); // v3
                    return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).overwriteKeys(alice.login, adminSecret1)];
                case 7:
                    _a.sent(); // key reset: v4
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, adminSecret1)];
                case 8:
                    aliceSession = _a.sent();
                    return [4 /*yield*/, aliceSession.renewKeys()];
                case 9:
                    _a.sent(); // v5
                    adminSecret2 = "a second admin secret";
                    return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).overwriteKeys(alice.login, adminSecret2)];
                case 10:
                    _a.sent(); // key reset: v6
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, adminSecret2)];
                case 11:
                    aliceSession = _a.sent();
                    return [4 /*yield*/, aliceSession.renewKeys()];
                case 12:
                    _a.sent(); // v7
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).getPublicKeyHistory(alice.login)];
                case 13:
                    publicKeys = (_a.sent()).sort(function (a, b) { return a.version - b.version; });
                    return [2 /*return*/];
            }
        });
    }); });
    it("Locked version returns only the versions that can not be accessed by the login", function () { return __awaiter(_this, void 0, void 0, function () {
        var lockedKeys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).getLockedVersions(alice.login)];
                case 1:
                    lockedKeys = (_a.sent()).sort(function (a, b) { return a.publicKey.version - b.publicKey.version; });
                    chai_1.expect(lockedKeys.length).to.be.deep.equal(5);
                    publicKeys.slice(0, 5).forEach(function (publicKey, i) {
                        chai_1.expect(lockedKeys[i].publicKey.login).to.be.deep.equal(publicKey.login);
                        chai_1.expect(lockedKeys[i].publicKey.version).to.be.deep.equal(publicKey.version);
                        chai_1.expect(lockedKeys[i].publicKey.box).to.be.deep.equal(publicKey.box);
                        chai_1.expect(lockedKeys[i].publicKey.sign).to.be.deep.equal(publicKey.sign);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("Unlock versions 1-3 and check 4-5 are still locked", function () { return __awaiter(_this, void 0, void 0, function () {
        var lockedKeys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).unlockVersions(alice.login, otherPassword)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).getLockedVersions(alice.login)];
                case 2:
                    lockedKeys = (_a.sent()).sort(function (a, b) { return a.publicKey.version - b.publicKey.version; });
                    chai_1.expect(lockedKeys.length).to.be.deep.equal(2);
                    publicKeys.slice(3, 5).forEach(function (publicKey, i) {
                        chai_1.expect(lockedKeys[i].publicKey.login).to.be.deep.equal(publicKey.login);
                        chai_1.expect(lockedKeys[i].publicKey.version).to.be.deep.equal(publicKey.version);
                        chai_1.expect(lockedKeys[i].publicKey.box).to.be.deep.equal(publicKey.box);
                        chai_1.expect(lockedKeys[i].publicKey.sign).to.be.deep.equal(publicKey.sign);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=LockedVersions.js.map