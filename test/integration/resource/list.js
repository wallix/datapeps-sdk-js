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
describe("resource.list", function () {
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
    var aliceRes1;
    var aliceRes2;
    var bobRes;
    var sharedRes;
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
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test/A", { description: "This is a test resource for Alice 1" }, [alice.login])];
                case 11:
                    aliceRes1 = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test/A", { description: "This is a test resource for Alice 2" }, [alice.login])];
                case 12:
                    aliceRes2 = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).create("test/A", { description: "This is a test resource for Bob" }, [bob.login])];
                case 13:
                    bobRes = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check resources created by alice", function () { return __awaiter(_this, void 0, void 0, function () {
        var got;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).list()];
                case 1:
                    got = _a.sent();
                    chai_1.expect(got).to.be.deep.equal([aliceRes2, aliceRes1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check resources created by bob", function () { return __awaiter(_this, void 0, void 0, function () {
        var got;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).list()];
                case 1:
                    got = _a.sent();
                    chai_1.expect(got).to.be.deep.equal([bobRes]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check alice can access to its resources after key renewal", function () { return __awaiter(_this, void 0, void 0, function () {
        var got;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).renewKeys(aliceSession.login)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).list()];
                case 2:
                    got = _a.sent();
                    chai_1.expect(got).to.be.deep.equal([aliceRes2, aliceRes1]);
                    return [2 /*return*/];
            }
        });
    }); });
    var aliceRes3;
    it("Check alice can access to a new resource after key renewal", function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, got;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, aliceSession.renewKeys()];
                case 1:
                    _b.sent();
                    _a = chai_1.expect;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(aliceRes1.id)];
                case 2:
                    _a.apply(void 0, [_b.sent()]).to.be.deep.equal(aliceRes1); //TODO: remove when key staling has been fixed for resource creation
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test/A", { description: "This is a test resource for Alice 3" }, [alice.login])];
                case 3:
                    aliceRes3 = _b.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).list()];
                case 4:
                    got = _b.sent();
                    chai_1.expect(got).to.be.deep.equal([aliceRes3, aliceRes2, aliceRes1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check bob can access to a resource shared by alice", function () { return __awaiter(_this, void 0, void 0, function () {
        var got;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test/A", { description: "resource created by alice shared with bob" }, [alice.login, bob.login])];
                case 1:
                    sharedRes = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).list()];
                case 2:
                    got = _a.sent();
                    chai_1.expect(got).to.be.deep.equal([sharedRes, bobRes]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check charlie can access to a resource created by alice shared by bob", function () { return __awaiter(_this, void 0, void 0, function () {
        var got;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).extendSharingGroup(sharedRes.id, [
                        charlie.login
                    ])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(charlieSession).list()];
                case 2:
                    got = _a.sent();
                    chai_1.expect(got).to.be.deep.equal([sharedRes]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Successfully parse resources with custom function", function () { return __awaiter(_this, void 0, void 0, function () {
        var contentRes1, contentRes2, options, got;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contentRes1 = "Hello World!";
                    contentRes2 = "Hello Charlie!";
                    options = {
                        serialize: function (payload) { return new TextEncoder().encode(payload); }
                    };
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(charlieSession).create("test/A", contentRes1, [charlie.login], options)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(charlieSession).create("test/A", contentRes2, [charlie.login], options)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(charlieSession).list({
                            parse: function (bytes) {
                                try {
                                    return new TextDecoder("utf-8").decode(bytes);
                                }
                                catch (e) {
                                    return "";
                                }
                            }
                        })];
                case 3:
                    got = _a.sent();
                    chai_1.expect(got[1].payload).to.be.equal(contentRes1);
                    chai_1.expect(got[0].payload).to.be.equal(contentRes2);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check device can list resources by assuming alice identity", function () { return __awaiter(_this, void 0, void 0, function () {
        var got;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(deviceSession).list({
                        assume: alice.login
                    })];
                case 1:
                    got = _a.sent();
                    chai_1.expect(got).to.be.deep.equal([sharedRes, aliceRes3, aliceRes2, aliceRes1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Check offset and limit", function () { return __awaiter(_this, void 0, void 0, function () {
        var got;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).list({ limit: 10 })];
                case 1:
                    got = _a.sent();
                    chai_1.expect(got).to.be.deep.equal([sharedRes, aliceRes3, aliceRes2, aliceRes1]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).list({
                            limit: 2
                        })];
                case 2:
                    got = _a.sent();
                    chai_1.expect(got).to.be.deep.equal([sharedRes, aliceRes3]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).list({
                            limit: 2,
                            offset: 1
                        })];
                case 3:
                    got = _a.sent();
                    chai_1.expect(got).to.be.deep.equal([aliceRes3, aliceRes2]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).list({
                            limit: 2,
                            offset: 5
                        })];
                case 4:
                    got = _a.sent();
                    chai_1.expect(got).to.be.deep.equal([]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=list.js.map