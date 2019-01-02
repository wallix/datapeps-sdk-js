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
describe("session.listDelegatedAccess", function () {
    var seed = Math.floor(Math.random() * 99999);
    var aliceSecret = nacl.randomBytes(128);
    var alice = {
        login: "alice." + seed,
        name: "alice test identity, TS",
        kind: "user",
        payload: null
    };
    var aliceApp = {
        login: "aliceApp." + seed,
        name: "Awesome E2EE application",
        kind: "app",
        payload: null
    };
    var bobSecret = nacl.randomBytes(128);
    var bob = {
        login: "bob." + seed,
        name: "bob test identity, TS",
        kind: "user",
        payload: null
    };
    var sdk = Config.sdk;
    var aliceSession;
    var bobSession;
    var accessRequests;
    // Create identities, open sessions and request delegated accesses
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var appSession, sign;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Config.init()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sdk.register(alice, aliceSecret)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, sdk.register(bob, bobSecret)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, aliceSecret)];
                case 4:
                    aliceSession = _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(bob.login, bobSecret)];
                case 5:
                    bobSession = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).create(aliceApp, {
                            sharingGroup: [alice.login]
                        })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, aliceSession.createSession(aliceApp.login)];
                case 7:
                    appSession = _a.sent();
                    sign = function (_a) {
                        var login = _a.login, publicKey = _a.publicKey;
                        var ulogin = new TextEncoder().encode(login);
                        var toSign = new Uint8Array(ulogin.byteLength + publicKey.byteLength);
                        toSign.set(ulogin, 0);
                        toSign.set(publicKey, ulogin.byteLength);
                        var sign = appSession.sign(toSign);
                        return Promise.resolve({ requester: aliceApp.login, sign: sign });
                    };
                    return [4 /*yield*/, Promise.all(new Array(10)
                            .fill(null)
                            .map(function () { return DataPeps_1.DelegatedAccess.request(bob.login, sign); }))];
                case 8:
                    accessRequests = _a.sent();
                    accessRequests.sort(function (a, b) { return DataPeps.ID.compare(b.id, a.id); });
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice checks the list of requests of delegated access, using limit", function () { return __awaiter(_this, void 0, void 0, function () {
        var limit, accesses, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    limit = accessRequests.length / 2;
                    return [4 /*yield*/, new DataPeps_1.DelegatedAccessAPI(aliceSession).list(aliceApp.login, {
                            limit: limit
                        })];
                case 1:
                    accesses = _a.sent();
                    chai_1.expect(accesses.length).to.be.equals(limit);
                    for (i = 0; i < limit; i++) {
                        chai_1.expect(accesses[i].id).to.be.deep.equals(accessRequests[i].id);
                        chai_1.expect(accesses[i].resolved).to.be.false;
                        chai_1.expect(accesses[i].requester.login).to.be.equals(aliceApp.login);
                        chai_1.expect(accesses[i].target.login).to.be.equals(bob.login);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice checks the list of requests of delegated access, using maxID", function () { return __awaiter(_this, void 0, void 0, function () {
        var limit, offset, accesses, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    limit = accessRequests.length / 2;
                    offset = accessRequests.length / 2;
                    return [4 /*yield*/, new DataPeps_1.DelegatedAccessAPI(aliceSession).list(aliceApp.login, {
                            limit: limit,
                            maxID: accessRequests[offset - 1].id
                        })];
                case 1:
                    accesses = _a.sent();
                    chai_1.expect(accesses.length).to.be.equals(limit);
                    for (i = 0; i < limit; i++) {
                        chai_1.expect(accesses[i].id).to.be.deep.equals(accessRequests[offset + i].id);
                        chai_1.expect(accesses[i].resolved).to.be.false;
                        chai_1.expect(accesses[i].requester.login).to.be.equals(aliceApp.login);
                        chai_1.expect(accesses[i].target.login).to.be.equals(bob.login);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice checks the list of requests of delegated access, using sinceID", function () { return __awaiter(_this, void 0, void 0, function () {
        var limit, offset, accesses, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    limit = accessRequests.length / 2;
                    offset = accessRequests.length / 2;
                    return [4 /*yield*/, new DataPeps_1.DelegatedAccessAPI(aliceSession).list(aliceApp.login, {
                            limit: limit,
                            sinceID: accessRequests[offset].id
                        })];
                case 1:
                    accesses = _a.sent();
                    chai_1.expect(accesses.length).to.be.equals(limit);
                    for (i = 0; i < limit; i++) {
                        chai_1.expect(accesses[i].id).to.be.deep.equals(accessRequests[i].id);
                        chai_1.expect(accesses[i].resolved).to.be.false;
                        chai_1.expect(accesses[i].requester.login).to.be.equals(aliceApp.login);
                        chai_1.expect(accesses[i].target.login).to.be.equals(bob.login);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it("bob resolve some requests", function () { return __awaiter(_this, void 0, void 0, function () {
        var promises, resolvers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = [];
                    return [4 /*yield*/, Promise.all(accessRequests
                            .filter(function (_, i) { return i % 2 == 0; })
                            .map(function (r) { return new DataPeps_1.DelegatedAccessAPI(bobSession).resolveAccessRequest(r.id); }))];
                case 1:
                    resolvers = _a.sent();
                    return [4 /*yield*/, Promise.all(resolvers.map(function (resolver) { return resolver.resolve(bob.login); }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice checks that the request has flagged as resolved", function () { return __awaiter(_this, void 0, void 0, function () {
        var limit, accesses, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    limit = accessRequests.length;
                    return [4 /*yield*/, new DataPeps_1.DelegatedAccessAPI(aliceSession).list(aliceApp.login, {
                            limit: limit
                        })];
                case 1:
                    accesses = _a.sent();
                    chai_1.expect(accesses.length).to.be.equals(limit);
                    for (i = 0; i < limit; i++) {
                        chai_1.expect(accesses[i].id).to.be.deep.equals(accessRequests[i].id);
                        chai_1.expect(accesses[i].resolved).to.be.equals(i % 2 == 0);
                        chai_1.expect(accesses[i].requester.login).to.be.equals(aliceApp.login);
                        chai_1.expect(accesses[i].target.login).to.be.equals(bob.login);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    after(function () { return __awaiter(_this, void 0, void 0, function () {
        var _i, accessRequests_1, r, resolver, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, accessRequests_1 = accessRequests;
                    _a.label = 1;
                case 1:
                    if (!(_i < accessRequests_1.length)) return [3 /*break*/, 7];
                    r = accessRequests_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, new DataPeps_1.DelegatedAccessAPI(bobSession).resolveAccessRequest(r.id)];
                case 3:
                    resolver = _a.sent();
                    return [4 /*yield*/, resolver.resolve(bob.login)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=listDelegatedAccess.js.map