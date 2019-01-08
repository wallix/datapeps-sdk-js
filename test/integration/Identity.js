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
var DataPeps = require("../../src/DataPeps");
var nacl = require("tweetnacl");
var chai_1 = require("chai");
var Utils_1 = require("../Utils");
var DataPeps_1 = require("../../src/DataPeps");
describe("identity.main", function () {
    var seed = Math.floor(Math.random() * 99999);
    var deviceASecret = nacl.randomBytes(128);
    var deviceA = {
        login: "alice.deviceA." + seed,
        name: "An alice device, TS",
        kind: "device",
        payload: new TextEncoder().encode(JSON.stringify({
            uuid: "0987654321",
            type: "Test"
        }))
    };
    var deviceBSecret = nacl.randomBytes(128);
    var deviceB = {
        login: "alice.deviceB." + seed,
        name: "Another alice device, TS",
        kind: "device",
        payload: new TextEncoder().encode(JSON.stringify({
            uuid: "1234567890",
            type: "Test"
        }))
    };
    var aliceSecret = nacl.randomBytes(128);
    var alice = {
        login: "alice." + seed,
        name: "alice test identity, TS",
        kind: "user",
        payload: new TextEncoder().encode(JSON.stringify({
            firstname: "Alice",
            lastname: "TypeScript",
            tel: "+33712345678"
        }))
    };
    var bobSecret = nacl.randomBytes(128);
    var bob = {
        login: "bob." + seed,
        name: "bob test identity, TS",
        kind: "user",
        payload: new TextEncoder().encode(JSON.stringify({
            firstname: "Bob",
            lastname: "TypeScript",
            tel: "+33712345678"
        }))
    };
    var group = {
        login: "group." + seed,
        name: "A group for the Identity test, TS",
        kind: "group",
        payload: new TextEncoder().encode(JSON.stringify({
            description: "This is an awsome group!!!"
        }))
    };
    var sdk = Config.sdk;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Config.init()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("register alice", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.register(alice, aliceSecret)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var aliceSession;
    it("login with alice", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.Session.login(alice.login, aliceSecret)];
                case 1:
                    aliceSession = _a.sent();
                    chai_1.expect(aliceSession).to.be.not.null;
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
    it("get alice identity", function () { return __awaiter(_this, void 0, void 0, function () {
        var identity;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).get(alice.login)];
                case 1:
                    identity = _a.sent();
                    checkFields(identity, alice);
                    return [2 /*return*/];
            }
        });
    }); });
    it("setSecret of alice then login", function () { return __awaiter(_this, void 0, void 0, function () {
        var identity, session;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    aliceSecret = nacl.randomBytes(128);
                    return [4 /*yield*/, aliceSession.renewKeys(aliceSecret)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).get(alice.login)];
                case 2:
                    identity = _a.sent();
                    return [4 /*yield*/, sdk.Session.login(alice.login, aliceSecret)];
                case 3:
                    session = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(session).get(alice.login)];
                case 4:
                    identity = _a.sent();
                    chai_1.expect(identity).to.not.be.null;
                    return [2 /*return*/];
            }
        });
    }); });
    it("register the alice deviceA", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.register(deviceA, deviceASecret)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var deviceASession;
    it("login with the alice deviceA", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.Session.login(deviceA.login, deviceASecret)];
                case 1:
                    deviceASession = _a.sent();
                    chai_1.expect(deviceASession).to.be.not.null;
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice shares its identity with its device", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).extendSharingGroup(alice.login, [
                        deviceA.login
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("create a group shared with alice", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).create(group, {
                        sharingGroup: [alice.login]
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("register bob", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.register(bob, bobSecret)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice thanks its deviceA add bob to the group", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(deviceASession).extendSharingGroup(group.login, [
                        bob.login
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("register the alice deviceB", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.register(deviceB, deviceBSecret)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var deviceBSession;
    it("login with the alice deviceB", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.Session.login(deviceB.login, deviceBSecret)];
                case 1:
                    deviceBSession = _a.sent();
                    chai_1.expect(deviceBSession).to.be.not.null;
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice renew its keys twice", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //We renew keys twice too see that the auto unStale works
                return [4 /*yield*/, aliceSession.renewKeys()];
                case 1:
                    //We renew keys twice too see that the auto unStale works
                    _a.sent();
                    return [4 /*yield*/, aliceSession.renewKeys()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice add the deviceB thanks deviceA", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(deviceASession).extendSharingGroup(alice.login, [
                        deviceB.login
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice remove its device of its sharing group thanks deviceB", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(deviceBSession).replaceSharingGroup(alice.login, [
                        deviceB.login
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    Utils_1.itError("the revoked deviceA try to extend the sharing group of alice", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(deviceASession).extendSharingGroup(alice.login, [
                        bob.login
                    ])];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, DataPeps.ServerError.IdentityCannotAssumeOwnership);
    it("deviceB validate public keys of group", function () { return __awaiter(_this, void 0, void 0, function () {
        var k;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deviceBSession.getLatestPublicKey(group.login)];
                case 1:
                    k = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice attempt to promote bob to admin", function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, new DataPeps_1.AdminAPI(aliceSession).setAdmin(bob.login, true)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    chai_1.expect(err_1).to.not.be.null;
                    chai_1.expect(err_1.kind).equal(DataPeps.ServerError.IdentityNotAdmin);
                    return [2 /*return*/];
                case 3: throw new Error("A non-admin user was able to promote a user to admin");
            }
        });
    }); });
    var adminSession;
    it("login with administrator", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Config.adminLogin()];
                case 1:
                    adminSession = _a.sent();
                    chai_1.expect(adminSession).to.be.not.null;
                    return [2 /*return*/];
            }
        });
    }); });
    it("administrator promote alice to admin", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).setAdmin(alice.login, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice promote bob to admin", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.AdminAPI(aliceSession).setAdmin(bob.login, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var renewSecret = nacl.randomBytes(128);
    it("administrator overwrite keys for alice", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).overwriteKeys(alice.login, renewSecret)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice attempt to list identities", function () { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).list({})];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    chai_1.expect(err_2).instanceof(DataPeps.Error);
                    chai_1.expect(err_2.kind).equal(DataPeps.ServerError.SessionStale);
                    return [2 /*return*/];
                case 3: throw new Error("alice could not list identities after key renewal");
            }
        });
    }); });
    it("login with alice with overwrited keys", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.Session.login(alice.login, renewSecret)];
                case 1:
                    aliceSession = _a.sent();
                    chai_1.expect(aliceSession).to.be.not.null;
                    return [2 /*return*/];
            }
        });
    }); });
    var bobSession;
    it("login with bob", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.Session.login(bob.login, bobSecret)];
                case 1:
                    bobSession = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("bob check alice keys", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bobSession.getLatestPublicKey(alice.login)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("deactivate bob identity", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).setActive(bob.login, false)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("bob try to do something with its old session", function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(bobSession).get(alice.login)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    return [2 /*return*/];
                case 3: throw new Error("bob session is still active");
            }
        });
    }); });
    it("attempt to login with bob", function () { return __awaiter(_this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sdk.Session.login(bob.login, bobSecret)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    chai_1.expect(err_3).to.not.be.null;
                    chai_1.expect(err_3.kind).equal(DataPeps.ServerError.IdentityNotFound);
                    return [2 /*return*/];
                case 3: throw new Error("Able to log in with a deactivated user");
            }
        });
    }); });
    it("reactivate bob identity", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).setActive(bob.login, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("login with bob", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.Session.login(bob.login, bobSecret)];
                case 1:
                    bobSession = _a.sent();
                    chai_1.expect(bobSession).to.be.not.null;
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=Identity.js.map