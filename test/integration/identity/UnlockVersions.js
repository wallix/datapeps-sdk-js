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
var Utils = require("../../Utils");
var DataPeps_1 = require("../../../src/DataPeps");
function expectCannotAssumeOwnershipToGetAResource(session, id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Utils.expectError(new DataPeps_1.ResourceAPI(session).get(id), DataPeps.ServerError.IdentityCannotAssumeOwnership)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
describe("identity.UnlockVersions", function () {
    var seed = Math.floor(Math.random() * 99999);
    var aliceSecret = nacl.randomBytes(128);
    var deviceSecret = nacl.randomBytes(128);
    var otherPassword = "other password";
    var adminSecret1 = "an admin secret";
    var adminSecret2 = "a second admin secret";
    var adminSecret3 = "a third admin secret";
    var alice = {
        login: "alice." + seed,
        name: "alice 1",
        kind: "user",
        payload: null
    };
    var device = {
        login: "device." + seed,
        name: "device 1",
        kind: "device",
        payload: null
    };
    var aliceSession;
    var deviceSession;
    var adminSession;
    var resv1, resv2, resv3, resv4, resv5, resv6, resv7;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
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
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).create(device, {
                            secret: deviceSecret
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).extendSharingGroup(alice.login, [
                            device.login
                        ])];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(device.login, deviceSecret)];
                case 6:
                    deviceSession = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Create identity and resource v1", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test", { description: "This is a test resource for Alice v1" }, [alice.login])];
                case 1:
                    resv1 = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Create identity and resource v2", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Config.adminLogin()];
                case 1:
                    adminSession = _a.sent();
                    return [4 /*yield*/, aliceSession.renewKeys()];
                case 2:
                    _a.sent(); // v2
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, aliceSecret)];
                case 3:
                    aliceSession = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test", { description: "This is a test resource for Alice v2" }, [alice.login])];
                case 4:
                    resv2 = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Create identity and resource v3", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, aliceSession.renewKeys(otherPassword)];
                case 1:
                    _a.sent(); // v3
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, otherPassword)];
                case 2:
                    aliceSession = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test", { description: "This is a test resource for Alice v3" }, [alice.login])];
                case 3:
                    resv3 = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Create identity and resource v4", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).overwriteKeys(alice.login, adminSecret1)];
                case 1:
                    _a.sent(); // key reset: v4
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, adminSecret1)];
                case 2:
                    aliceSession = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test", { description: "This is a test resource for Alice v4" }, [alice.login])];
                case 3:
                    resv4 = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Create identity and resource v5", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, aliceSession.renewKeys()];
                case 1:
                    _a.sent(); // v5
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, adminSecret1)];
                case 2:
                    aliceSession = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test", { description: "This is a test resource for Alice v5" }, [alice.login])];
                case 3:
                    resv5 = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Create identity and resource v6", function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).overwriteKeys(alice.login, adminSecret2)];
                case 1:
                    _b.sent(); // key reset: v6
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, adminSecret2)];
                case 2:
                    aliceSession = _b.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test", { description: "This is a test resource for Alice v6" }, [alice.login])];
                case 3:
                    resv6 = _b.sent();
                    _a = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv6.id)];
                case 4:
                    _a.apply(void 0, [_b.sent()]).to.be.deep.equal(resv6);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Create identity and resource v7", function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, aliceSession.renewKeys()];
                case 1:
                    _c.sent(); // v7
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, adminSecret2)];
                case 2:
                    aliceSession = _c.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test", { description: "This is a test resource for Alice v7" }, [alice.login])];
                case 3:
                    resv7 = _c.sent();
                    _a = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv6.id)];
                case 4:
                    _a.apply(void 0, [_c.sent()]).to.be.deep.equal(resv6);
                    _b = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv7.id)];
                case 5:
                    _b.apply(void 0, [_c.sent()]).to.be.deep.equal(resv7);
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv1.id)];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv2.id)];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv3.id)];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv4.id)];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv5.id)];
                case 10:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Unlock no version when providing a bad secret", function () { return __awaiter(_this, void 0, void 0, function () {
        var unlockedSessions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).unlockVersions(alice.login, "a bad secret")];
                case 1:
                    unlockedSessions = _a.sent();
                    chai_1.expect(unlockedSessions.length).to.be.equal(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Unlock several versions which shares the same secret", function () { return __awaiter(_this, void 0, void 0, function () {
        var unlockedSessions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).unlockVersions(alice.login, adminSecret1)];
                case 1:
                    unlockedSessions = _a.sent();
                    chai_1.expect(unlockedSessions.length).to.be.equal(2);
                    chai_1.expect(unlockedSessions.map(function (unlocked) { return unlocked.version; }).sort(function (a, b) { return a - b; })).to.be.deep.equal([4, 5]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("After unlock of v4 and v5, the related resources become accessible", function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv4.id)];
                case 1:
                    _a.apply(void 0, [_c.sent()]).to.be.deep.equal(resv4);
                    _b = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv5.id)];
                case 2:
                    _b.apply(void 0, [_c.sent()]).to.be.deep.equal(resv5);
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv1.id)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv2.id)];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv3.id)];
                case 5:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Unlock v1 and v2", function () { return __awaiter(_this, void 0, void 0, function () {
        var unlockedSessions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).unlockVersions(alice.login, aliceSecret)];
                case 1:
                    unlockedSessions = _a.sent();
                    chai_1.expect(unlockedSessions.length).to.be.equal(2);
                    chai_1.expect(unlockedSessions.map(function (unlocked) { return unlocked.version; }).sort(function (a, b) { return a - b; })).to.be.deep.equal([1, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Unlock v3", function () { return __awaiter(_this, void 0, void 0, function () {
        var unlockedSessions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).unlockVersions(alice.login, otherPassword)];
                case 1:
                    unlockedSessions = _a.sent();
                    chai_1.expect(unlockedSessions.length).to.be.equal(1);
                    chai_1.expect(unlockedSessions.map(function (unlocked) { return unlocked.version; })).to.be.deep.equal([3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("After unlock all versions are accessible", function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv1.id)];
                case 1:
                    _a.apply(void 0, [_h.sent()]).to.be.deep.equal(resv1);
                    _b = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv2.id)];
                case 2:
                    _b.apply(void 0, [_h.sent()]).to.be.deep.equal(resv2);
                    _c = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv3.id)];
                case 3:
                    _c.apply(void 0, [_h.sent()]).to.be.deep.equal(resv3);
                    _d = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv4.id)];
                case 4:
                    _d.apply(void 0, [_h.sent()]).to.be.deep.equal(resv4);
                    _e = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv5.id)];
                case 5:
                    _e.apply(void 0, [_h.sent()]).to.be.deep.equal(resv5);
                    _f = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv6.id)];
                case 6:
                    _f.apply(void 0, [_h.sent()]).to.be.deep.equal(resv6);
                    _g = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv7.id)];
                case 7:
                    _g.apply(void 0, [_h.sent()]).to.be.deep.equal(resv7);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Create new locked versions for tests from a device (with assume)", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).overwriteKeys(alice.login, adminSecret3)];
                case 1:
                    _a.sent(); // key reset: v8
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, adminSecret3)];
                case 2:
                    aliceSession = _a.sent();
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv1.id)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv2.id)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv3.id)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv4.id)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv5.id)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv6.id)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, expectCannotAssumeOwnershipToGetAResource(aliceSession, resv7.id)];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Unlock alice versions with its device", function () { return __awaiter(_this, void 0, void 0, function () {
        var unlockedSessions, _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(deviceSession).unlockVersions(alice.login, adminSecret2)];
                case 1:
                    unlockedSessions = _h.sent();
                    chai_1.expect(unlockedSessions.length).to.be.equal(2);
                    chai_1.expect(unlockedSessions.map(function (unlocked) { return unlocked.version; }).sort(function (a, b) { return a - b; })).to.be.deep.equal([6, 7]);
                    chai_1.expect(unlockedSessions.map(function (unlocked) { return unlocked.login; })).to.be.deep.equal([
                        alice.login,
                        alice.login
                    ]);
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, adminSecret3)];
                case 2:
                    aliceSession = _h.sent();
                    // all resources are now accessible
                    _a = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv1.id)];
                case 3:
                    // all resources are now accessible
                    _a.apply(void 0, [_h.sent()]).to.be.deep.equal(resv1);
                    _b = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv2.id)];
                case 4:
                    _b.apply(void 0, [_h.sent()]).to.be.deep.equal(resv2);
                    _c = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv3.id)];
                case 5:
                    _c.apply(void 0, [_h.sent()]).to.be.deep.equal(resv3);
                    _d = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv4.id)];
                case 6:
                    _d.apply(void 0, [_h.sent()]).to.be.deep.equal(resv4);
                    _e = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv5.id)];
                case 7:
                    _e.apply(void 0, [_h.sent()]).to.be.deep.equal(resv5);
                    _f = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv6.id)];
                case 8:
                    _f.apply(void 0, [_h.sent()]).to.be.deep.equal(resv6);
                    _g = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resv7.id)];
                case 9:
                    _g.apply(void 0, [_h.sent()]).to.be.deep.equal(resv7);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=UnlockVersions.js.map