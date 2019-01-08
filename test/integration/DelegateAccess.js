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
var DataPeps_1 = require("../../src/DataPeps");
describe("delegatedAccess", function () {
    var seed = Math.floor(Math.random() * 99999);
    var aliceSecret = nacl.randomBytes(128);
    var alice = {
        login: "alice." + seed,
        name: "alice test identity, TS",
        admin: false,
        active: true,
        kind: "user",
        created: new Date(),
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
        admin: false,
        active: true,
        kind: "user",
        created: new Date(),
        payload: new TextEncoder().encode(JSON.stringify({
            firstname: "Bob",
            lastname: "TypeScript",
            tel: "+33712345678"
        }))
    };
    var sdk = Config.sdk;
    var aliceSession;
    var bobSession;
    // Create alice, bob and a group
    before(function () { return __awaiter(_this, void 0, void 0, function () {
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
                    return [2 /*return*/];
            }
        });
    }); });
    var res;
    var content;
    var encrypted;
    it("bob create a selfish resource", function () { return __awaiter(_this, void 0, void 0, function () {
        var payload, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = nacl.randomBytes(2048);
                    payload = { description: "This is a test resource" };
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).create("test/A", payload, [
                            bob.login
                        ])];
                case 1:
                    res = _a.sent();
                    chai_1.expect(res).to.be.not.null;
                    encrypted = res.encrypt(content);
                    result = res.decrypt(encrypted);
                    chai_1.expect(result).to.be.deep.equals(content);
                    chai_1.expect(res.payload).to.be.deep.equal(payload);
                    return [2 /*return*/];
            }
        });
    }); });
    var accessRequest;
    it("alice request a delegate access to bob", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DataPeps_1.DelegatedAccess.request(bob.login, function (_a) {
                        var login = _a.login, publicKey = _a.publicKey;
                        var ulogin = new TextEncoder().encode(login);
                        var toSign = new Uint8Array(ulogin.byteLength + publicKey.byteLength);
                        toSign.set(ulogin, 0);
                        toSign.set(publicKey, ulogin.byteLength);
                        var sign = aliceSession.sign(toSign);
                        return Promise.resolve({ requester: alice.login, sign: sign });
                    })];
                case 1:
                    accessRequest = _a.sent();
                    chai_1.expect(accessRequest).to.be.not.null;
                    return [2 /*return*/];
            }
        });
    }); });
    var bobResolver;
    it("bob open the access request", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.DelegatedAccessAPI(bobSession).resolveAccessRequest(accessRequest.id)];
                case 1:
                    bobResolver = _a.sent();
                    chai_1.expect(bobResolver.requesterKey.login).to.be.equals(alice.login);
                    return [2 /*return*/];
            }
        });
    }); });
    it("bob resolve the access request with its own credentials", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bobResolver.resolve(bob.login)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var aliceBobSession;
    it("alice wait the bob session", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, accessRequest.waitSession()];
                case 1:
                    aliceBobSession = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice use the session sent by bob to get the resource", function () { return __awaiter(_this, void 0, void 0, function () {
        var resource, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceBobSession).get(res.id)];
                case 1:
                    resource = _a.sent();
                    chai_1.expect(resource).to.be.not.null;
                    result = resource.decrypt(encrypted);
                    chai_1.expect(result).to.be.deep.equals(content);
                    chai_1.expect(resource.payload).to.be.deep.equals(res.payload);
                    return [2 /*return*/];
            }
        });
    }); });
    it("alice list delegated access", function () { return __awaiter(_this, void 0, void 0, function () {
        var accesses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.DelegatedAccessAPI(aliceSession).list(aliceSession.login)];
                case 1:
                    accesses = _a.sent();
                    chai_1.expect(accesses.length).to.be.equals(1);
                    chai_1.expect(accesses[0].requester.login).to.be.equals(alice.login);
                    chai_1.expect(accesses[0].target.login).to.be.equals(bob.login);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=DelegateAccess.js.map