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
require("mocha");
var DataPeps_1 = require("../../../src/DataPeps");
describe("resource.getSharingGroup", function () {
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
    var charlieSecret = nacl.randomBytes(128);
    var charlie = {
        login: "charlie." + seed,
        name: "charlie 1",
        kind: "user",
        payload: new TextEncoder().encode(JSON.stringify({
            test: 1
        }))
    };
    var deviceSecret = nacl.randomBytes(128);
    var device = {
        login: "device." + seed,
        name: "device 1",
        kind: "device",
        payload: null
    };
    var aliceSession;
    var bobSession;
    var charlieSession;
    var deviceSession;
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
                    return [4 /*yield*/, DataPeps.register(charlie, charlieSecret)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, aliceSecret)];
                case 5:
                    aliceSession = _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(bob.login, bobSecret)];
                case 6:
                    bobSession = _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(charlie.login, charlieSecret)];
                case 7:
                    charlieSession = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).create(device, {
                            secret: deviceSecret
                        })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).extendSharingGroup(alice.login, [
                            device.login
                        ])];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(device.login, deviceSecret)];
                case 10:
                    deviceSession = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check Alice is in resource sharing group", function () { return __awaiter(_this, void 0, void 0, function () {
        var aliceRes, got;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test/A", { description: "This is a test resource for Alice" }, [alice.login])];
                case 1:
                    aliceRes = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getSharingGroup(aliceRes.id)];
                case 2:
                    got = _a.sent();
                    chai_1.expect(got.map(function (share) { return share.identityID.login; })).to.be.deep.equal([
                        aliceSession.login
                    ]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(deviceSession).getSharingGroup(aliceRes.id, {
                            assume: aliceSession.login
                        })];
                case 3:
                    got = _a.sent();
                    chai_1.expect(got.map(function (share) { return share.identityID.login; })).to.be.deep.equal([
                        aliceSession.login
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check Alice sharers are in resource sharing group", function () { return __awaiter(_this, void 0, void 0, function () {
        var sharedRes, got;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test/A", { description: "This is a test resource for Alice and Bob" }, [alice.login, bob.login])];
                case 1:
                    sharedRes = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getSharingGroup(sharedRes.id)];
                case 2:
                    got = _a.sent();
                    chai_1.expect(got.map(function (share) { return share.identityID.login; }).sort()).to.be.deep.equal([
                        aliceSession.login,
                        bobSession.login
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check Alice sharers have access to sharing group", function () { return __awaiter(_this, void 0, void 0, function () {
        var sharedRes, got;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test/A", { description: "This is a test resource for Alice and Bob" }, [alice.login, bob.login])];
                case 1:
                    sharedRes = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).getSharingGroup(sharedRes.id)];
                case 2:
                    got = _a.sent();
                    chai_1.expect(got.map(function (share) { return share.identityID.login; }).sort()).to.be.deep.equal([
                        aliceSession.login,
                        bobSession.login
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check that the sharing group contains a new identity added with extendSharingGroup", function () { return __awaiter(_this, void 0, void 0, function () {
        var sharedRes, expectSharingGroup, gotSharingGroup;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test/A", {
                        description: "This is a test resource for Alice and Bob then shared by Bob with Charlie"
                    }, [alice.login, bob.login])];
                case 1:
                    sharedRes = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).extendSharingGroup(sharedRes.id, [
                            charlie.login
                        ])];
                case 2:
                    _a.sent();
                    expectSharingGroup = [
                        aliceSession.login,
                        bobSession.login,
                        charlieSession.login
                    ];
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getSharingGroup(sharedRes.id)];
                case 3:
                    gotSharingGroup = _a.sent();
                    chai_1.expect(gotSharingGroup.map(function (share) { return share.identityID.login; }).sort()).to.be.deep.equal(expectSharingGroup);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).getSharingGroup(sharedRes.id)];
                case 4:
                    gotSharingGroup = _a.sent();
                    chai_1.expect(gotSharingGroup.map(function (share) { return share.identityID.login; }).sort()).to.be.deep.equal(expectSharingGroup);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(charlieSession).getSharingGroup(sharedRes.id)];
                case 5:
                    gotSharingGroup = _a.sent();
                    chai_1.expect(gotSharingGroup.map(function (share) { return share.identityID.login; }).sort()).to.be.deep.equal(expectSharingGroup);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check right identity version in sharing group after key renewal of sharers", function () { return __awaiter(_this, void 0, void 0, function () {
        var sharedRes, got;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bobSession.renewKeys()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test/A", { description: "This is a test resource for Alice and Bob" }, [alice.login, bob.login])];
                case 2:
                    sharedRes = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getSharingGroup(sharedRes.id)];
                case 3:
                    got = _a.sent();
                    got.sort(function (a, b) {
                        return a.identityID.login < b.identityID.login ? -1 : 1;
                    });
                    chai_1.expect(got.map(function (share) { return share.identityID.login; })).to.be.deep.equal([
                        aliceSession.login,
                        bobSession.login
                    ]);
                    chai_1.expect(got.map(function (share) { return share.identityID.version; })).to.be.deep.equal([1, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check error on resource not found", function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1, d;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getSharingGroup(1234567)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    chai_1.expect(e_1).is.instanceOf(DataPeps.Error);
                    d = e_1;
                    chai_1.expect(d.kind).to.be.equal(DataPeps.ServerError.ResourceNotFound);
                    return [2 /*return*/];
                case 3: throw new Error("should receive ResourceNotFound error");
            }
        });
    }); });
    it("Check error on resource not accessible", function () { return __awaiter(_this, void 0, void 0, function () {
        var sharedRes, got, e_2, d;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test/A", { description: "This is a test resource for Alice and Bob" }, [alice.login, bob.login])];
                case 1:
                    sharedRes = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(charlieSession).getSharingGroup(sharedRes.id)];
                case 2:
                    got = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    chai_1.expect(e_2).is.instanceOf(DataPeps.Error);
                    d = e_2;
                    chai_1.expect(d.kind).to.be.equal(DataPeps.ServerError.ResourceNotFound);
                    return [2 /*return*/];
                case 4: throw new Error("should receive ResourceNotFound error");
            }
        });
    }); });
});
//# sourceMappingURL=GetSharingGroup.js.map