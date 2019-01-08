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
var Context = require("../../Context");
var chai_1 = require("chai");
require("mocha");
var DataPeps_1 = require("../../../src/DataPeps");
describe("resource.getAccessLogs", function () {
    var alice, bob, device;
    var aliceSession, bobSession, deviceSession;
    var aliceRes1;
    var aliceRes2;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var init, ctx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Context.init()];
                case 1:
                    init = _a.sent();
                    return [4 /*yield*/, Context.aliceBobWithDeviceAndGroup(init)];
                case 2:
                    ctx = _a.sent();
                    alice = ctx.alice.identity;
                    bob = ctx.bob.identity;
                    aliceSession = ctx.alice.session;
                    bobSession = ctx.bob.session;
                    device = ctx.aliceDevice.identity;
                    deviceSession = ctx.aliceDevice.session;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test/A", null, [
                            alice.login,
                            bob.login
                        ])];
                case 3:
                    aliceRes1 = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test/A", null, [
                            alice.login
                        ])];
                case 4:
                    aliceRes2 = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Alice read the resource1, alice check access", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(aliceRes1.id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({ limit: 1 })];
                case 2:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(1);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(1);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(1);
                    chai_1.expect(logs[0].reason).to.be.equals("Read");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Bob read the resource1, alice check access", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).get(aliceRes1.id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({ limit: 1 })];
                case 2:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(1);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(bob.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(1);
                    chai_1.expect(logs[0].assume.login).to.be.equals(bob.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(1);
                    chai_1.expect(logs[0].reason).to.be.equals("Read");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Device read the resource1, alice check access", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(deviceSession).get(aliceRes1.id, {
                        assume: alice.login
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({ limit: 1 })];
                case 2:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(1);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(device.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(1);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(1);
                    chai_1.expect(logs[0].reason).to.be.equals("Read");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Alice read the resource2, alice check access", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(aliceRes2.id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({ limit: 1 })];
                case 2:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(1);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes2.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(1);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(1);
                    chai_1.expect(logs[0].reason).to.be.equals("Read");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Alice renew keys and access to the resource1, alice check access", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, aliceSession.renewKeys()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(aliceRes1.id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({ limit: 1 })];
                case 3:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(1);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(2);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(2);
                    chai_1.expect(logs[0].reason).to.be.equals("Read");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Alice check accesses of its resources", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({ limit: 5 })];
                case 1:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(5);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(2);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(2);
                    chai_1.expect(logs[0].reason).to.be.equals("Read");
                    chai_1.expect(logs[1].resourceID.toString()).to.be.equals(aliceRes2.id.toString());
                    chai_1.expect(logs[1].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[1].owner.version).to.be.equals(1);
                    chai_1.expect(logs[1].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[1].assume.version).to.be.equals(1);
                    chai_1.expect(logs[1].reason).to.be.equals("Read");
                    chai_1.expect(logs[2].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[2].owner.login).to.be.equals(device.login);
                    chai_1.expect(logs[2].owner.version).to.be.equals(1);
                    chai_1.expect(logs[2].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[2].assume.version).to.be.equals(1);
                    chai_1.expect(logs[2].reason).to.be.equals("Read");
                    chai_1.expect(logs[3].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[3].owner.login).to.be.equals(bob.login);
                    chai_1.expect(logs[3].owner.version).to.be.equals(1);
                    chai_1.expect(logs[3].assume.login).to.be.equals(bob.login);
                    chai_1.expect(logs[3].assume.version).to.be.equals(1);
                    chai_1.expect(logs[3].reason).to.be.equals("Read");
                    chai_1.expect(logs[4].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[4].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[4].owner.version).to.be.equals(1);
                    chai_1.expect(logs[4].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[4].assume.version).to.be.equals(1);
                    chai_1.expect(logs[4].reason).to.be.equals("Read");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Device check accesses of alice resources", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(deviceSession).getAccessLogs({
                        limit: 5,
                        assume: alice.login
                    })];
                case 1:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(5);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(2);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(2);
                    chai_1.expect(logs[0].reason).to.be.equals("Read");
                    chai_1.expect(logs[1].resourceID.toString()).to.be.equals(aliceRes2.id.toString());
                    chai_1.expect(logs[1].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[1].owner.version).to.be.equals(1);
                    chai_1.expect(logs[1].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[1].assume.version).to.be.equals(1);
                    chai_1.expect(logs[1].reason).to.be.equals("Read");
                    chai_1.expect(logs[2].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[2].owner.login).to.be.equals(device.login);
                    chai_1.expect(logs[2].owner.version).to.be.equals(1);
                    chai_1.expect(logs[2].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[2].assume.version).to.be.equals(1);
                    chai_1.expect(logs[2].reason).to.be.equals("Read");
                    chai_1.expect(logs[3].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[3].owner.login).to.be.equals(bob.login);
                    chai_1.expect(logs[3].owner.version).to.be.equals(1);
                    chai_1.expect(logs[3].assume.login).to.be.equals(bob.login);
                    chai_1.expect(logs[3].assume.version).to.be.equals(1);
                    chai_1.expect(logs[3].reason).to.be.equals("Read");
                    chai_1.expect(logs[4].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[4].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[4].owner.version).to.be.equals(1);
                    chai_1.expect(logs[4].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[4].assume.version).to.be.equals(1);
                    chai_1.expect(logs[4].reason).to.be.equals("Read");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Bob check accesses of its resources", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).getAccessLogs()];
                case 1:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(4);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(2);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(2);
                    chai_1.expect(logs[0].reason).to.be.equals("Read");
                    chai_1.expect(logs[1].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[1].owner.login).to.be.equals(device.login);
                    chai_1.expect(logs[1].owner.version).to.be.equals(1);
                    chai_1.expect(logs[1].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[1].assume.version).to.be.equals(1);
                    chai_1.expect(logs[1].reason).to.be.equals("Read");
                    chai_1.expect(logs[2].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[2].owner.login).to.be.equals(bob.login);
                    chai_1.expect(logs[2].owner.version).to.be.equals(1);
                    chai_1.expect(logs[2].assume.login).to.be.equals(bob.login);
                    chai_1.expect(logs[2].assume.version).to.be.equals(1);
                    chai_1.expect(logs[2].reason).to.be.equals("Read");
                    chai_1.expect(logs[3].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[3].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[3].owner.version).to.be.equals(1);
                    chai_1.expect(logs[3].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[3].assume.version).to.be.equals(1);
                    chai_1.expect(logs[3].reason).to.be.equals("Read");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Alice check accesses of its resources, with resource filters", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({
                        resourceIDs: [aliceRes1.id]
                    })];
                case 1:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(4);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(2);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(2);
                    chai_1.expect(logs[0].reason).to.be.equals("Read");
                    chai_1.expect(logs[1].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[1].owner.login).to.be.equals(device.login);
                    chai_1.expect(logs[1].owner.version).to.be.equals(1);
                    chai_1.expect(logs[1].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[1].assume.version).to.be.equals(1);
                    chai_1.expect(logs[1].reason).to.be.equals("Read");
                    chai_1.expect(logs[2].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[2].owner.login).to.be.equals(bob.login);
                    chai_1.expect(logs[2].owner.version).to.be.equals(1);
                    chai_1.expect(logs[2].assume.login).to.be.equals(bob.login);
                    chai_1.expect(logs[2].assume.version).to.be.equals(1);
                    chai_1.expect(logs[2].reason).to.be.equals("Read");
                    chai_1.expect(logs[3].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[3].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[3].owner.version).to.be.equals(1);
                    chai_1.expect(logs[3].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[3].assume.version).to.be.equals(1);
                    chai_1.expect(logs[3].reason).to.be.equals("Read");
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({
                            limit: 2,
                            resourceIDs: [aliceRes1.id]
                        })];
                case 2:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(2);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(2);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(2);
                    chai_1.expect(logs[0].reason).to.be.equals("Read");
                    chai_1.expect(logs[1].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[1].owner.login).to.be.equals(device.login);
                    chai_1.expect(logs[1].owner.version).to.be.equals(1);
                    chai_1.expect(logs[1].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[1].assume.version).to.be.equals(1);
                    chai_1.expect(logs[1].reason).to.be.equals("Read");
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({
                            offset: 2,
                            resourceIDs: [aliceRes1.id]
                        })];
                case 3:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(2);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(bob.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(1);
                    chai_1.expect(logs[0].assume.login).to.be.equals(bob.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(1);
                    chai_1.expect(logs[0].reason).to.be.equals("Read");
                    chai_1.expect(logs[1].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[1].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[1].owner.version).to.be.equals(1);
                    chai_1.expect(logs[1].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[1].assume.version).to.be.equals(1);
                    chai_1.expect(logs[1].reason).to.be.equals("Read");
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({
                            resourceIDs: [aliceRes2.id]
                        })];
                case 4:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(1);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes2.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(1);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(1);
                    chai_1.expect(logs[0].reason).to.be.equals("Read");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Alice share the resource2, alice check access", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).extendSharingGroup(aliceRes2.id, [
                        bob.login
                    ])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({ limit: 1 })];
                case 2:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(1);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes2.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(2);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(2);
                    chai_1.expect(logs[0].reason).to.be.equals("Share");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Alice list its resources, alice check access", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).list()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({ limit: 2 })];
                case 2:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(2);
                    chai_1.expect(logs[0].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(2);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(2);
                    chai_1.expect(logs[0].reason).to.be.equals("Read");
                    chai_1.expect(logs[1].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[1].owner.version).to.be.equals(2);
                    chai_1.expect(logs[1].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[1].assume.version).to.be.equals(2);
                    chai_1.expect(logs[1].reason).to.be.equals("Read");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check custom reason for get access", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(aliceRes1.id, {
                        reason: "specific access"
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({ limit: 1 })];
                case 2:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(1);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes1.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(2);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(2);
                    chai_1.expect(logs[0].reason).to.be.equals("specific access");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check custom reason for list access", function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).list({
                        reason: "specific list access",
                        limit: 1
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).getAccessLogs({ limit: 1 })];
                case 2:
                    logs = _a.sent();
                    chai_1.expect(logs.length).to.be.equals(1);
                    chai_1.expect(logs[0].resourceID.toString()).to.be.equals(aliceRes2.id.toString());
                    chai_1.expect(logs[0].owner.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].owner.version).to.be.equals(2);
                    chai_1.expect(logs[0].assume.login).to.be.equals(alice.login);
                    chai_1.expect(logs[0].assume.version).to.be.equals(2);
                    chai_1.expect(logs[0].reason).to.be.equals("specific list access");
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=getAccessLogs.js.map