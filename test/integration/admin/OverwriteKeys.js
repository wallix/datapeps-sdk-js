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
var Utils_1 = require("../../Utils");
var DataPeps_1 = require("../../../src/DataPeps");
describe("admin.overwriteKeys", function () {
    var seed = Math.floor(Math.random() * 99999);
    var aliceSecret = nacl.randomBytes(128);
    var alice = {
        login: "alice." + seed,
        name: "alice 1",
        kind: "user",
        payload: null
    };
    var aliceDelegate = {
        login: alice.login + "_delegate",
        name: alice.name + "_delegate",
        kind: "delegate",
        payload: null
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
    var group = {
        login: alice.login + "_" + bob.login + "_group",
        name: alice.name + "_" + bob.name + "_group",
        kind: "group",
        payload: null
    };
    var aliceSession;
    var aliceDelegateSession;
    var bobSession;
    var groupSession;
    var adminSession;
    var aliceDelegateRes;
    var groupRes;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Config.init()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.register(alice, aliceSecret)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.register(bob, bobSecret)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, aliceSecret)];
                case 4:
                    aliceSession = _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(bob.login, bobSecret)];
                case 5:
                    bobSession = _a.sent();
                    return [4 /*yield*/, Config.adminLogin()];
                case 6:
                    adminSession = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).create(aliceDelegate, {
                            sharingGroup: [alice.login]
                        })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, aliceSession.createSession(aliceDelegate.login)];
                case 8:
                    aliceDelegateSession = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).create(group, {
                            sharingGroup: [alice.login, bob.login]
                        })];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, aliceSession.createSession(group.login)];
                case 10:
                    groupSession = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceDelegateSession).create("test/A", null, [aliceDelegate.login])];
                case 11:
                    aliceDelegateRes = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(groupSession).create("test/A", null, [
                            group.login
                        ])];
                case 12:
                    groupRes = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Before overwriteKeys Alice can access the resource of delegate, directly and with assume", function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceDelegateSession).get(aliceDelegateRes.id)];
                case 1:
                    res = _a.sent();
                    chai_1.expect(res).to.be.deep.equal(aliceDelegateRes);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(aliceDelegateRes.id, {
                            assume: aliceDelegate.login
                        })];
                case 2:
                    res = _a.sent();
                    chai_1.expect(res).to.be.deep.equal(aliceDelegateRes);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Before overwriteKeys Alice and Bob can access the resource of group", function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(groupRes.id, {
                        assume: group.login
                    })];
                case 1:
                    res = _a.sent();
                    chai_1.expect(res).to.be.deep.equal(groupRes);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).get(groupRes.id, {
                            assume: group.login
                        })];
                case 2:
                    res = _a.sent();
                    chai_1.expect(res).to.be.deep.equal(groupRes);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Before overwriteKeys delegate and group identities are in access group of alice in v1", function () { return __awaiter(_this, void 0, void 0, function () {
        var accessGroup, delegateEl, groupEl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).getAccessGroup(alice.login)];
                case 1:
                    accessGroup = _a.sent();
                    chai_1.expect(accessGroup.length).to.be.equal(2);
                    delegateEl = accessGroup.filter(function (el) { return el.id.login == aliceDelegate.login; })[0];
                    chai_1.expect(delegateEl).to.exist;
                    chai_1.expect(delegateEl.id.login).to.be.equal(aliceDelegate.login);
                    chai_1.expect(delegateEl.id.version).to.be.equal(1);
                    groupEl = accessGroup.filter(function (el) { return el.id.login == group.login; })[0];
                    chai_1.expect(groupEl).to.exist;
                    chai_1.expect(groupEl.id.login).to.be.equal(group.login);
                    chai_1.expect(groupEl.id.version).to.be.equal(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it("After overwriteKeys Alice can still access to the delegate identity", function () { return __awaiter(_this, void 0, void 0, function () {
        var newPassword;
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
                    return [4 /*yield*/, aliceSession.createSession(aliceDelegate.login)];
                case 3:
                    aliceDelegateSession = _a.sent();
                    chai_1.expect(aliceDelegateSession).to.be.not.null;
                    chai_1.expect(aliceDelegateSession.login).to.be.equal(aliceDelegate.login);
                    return [2 /*return*/];
            }
        });
    }); });
    Utils_1.itError("After overwriteKeys Alice can no longer access the resources of the delegate", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(aliceDelegateRes.id, {
                        assume: aliceDelegate.login
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, DataPeps.ServerError.IdentityCannotAssumeOwnership);
    Utils_1.itError("After overwriteKeys Alice can no longer access the resources of the group", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(groupRes.id, {
                        assume: group.login
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, DataPeps.ServerError.IdentityCannotAssumeOwnership);
    it("After overwriteKeys Bob can still access the resource of group", function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).get(groupRes.id, {
                        assume: group.login
                    })];
                case 1:
                    res = _a.sent();
                    chai_1.expect(res).to.be.deep.equal(groupRes);
                    return [2 /*return*/];
            }
        });
    }); });
    it("After overwriteKeys delegate identity is in access group of alice in v2 (without access to v1) but group identity stays in v1 (locked)", function () { return __awaiter(_this, void 0, void 0, function () {
        var accessGroup, delegateEl, groupEl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).getAccessGroup(alice.login)];
                case 1:
                    accessGroup = _a.sent();
                    chai_1.expect(accessGroup.length).to.be.equal(2);
                    delegateEl = accessGroup.filter(function (el) { return el.id.login == aliceDelegate.login; })[0];
                    chai_1.expect(delegateEl).to.exist;
                    chai_1.expect(delegateEl.id.version).to.be.equal(2);
                    chai_1.expect(delegateEl.locked).to.be.equal(false);
                    groupEl = accessGroup.filter(function (el) { return el.id.login == group.login; })[0];
                    chai_1.expect(groupEl).to.exist;
                    chai_1.expect(groupEl.id.version).to.be.equal(1);
                    chai_1.expect(groupEl.locked).to.be.equal(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("After overwriteKeys Alice delegate can access to newly created resources", function () { return __awaiter(_this, void 0, void 0, function () {
        var newCreatedRes, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceDelegateSession).create("test/A", null, [aliceDelegate.login])];
                case 1:
                    newCreatedRes = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceDelegateSession).get(newCreatedRes.id)];
                case 2:
                    res = _a.sent();
                    chai_1.expect(res).to.be.deep.equal(newCreatedRes);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(newCreatedRes.id, {
                            assume: aliceDelegate.login
                        })];
                case 3:
                    res = _a.sent();
                    chai_1.expect(res).to.be.deep.equal(newCreatedRes);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=OverwriteKeys.js.map