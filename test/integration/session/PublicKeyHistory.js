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
describe("session.getPublicKeyHistory", function () {
    var seed = Math.floor(Math.random() * 99999);
    var aliceSecret = nacl.randomBytes(128);
    var alice = {
        login: "alice." + seed,
        name: "alice 1",
        kind: "user",
        payload: null
    };
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
    var publicKeys = [];
    it("Alice can get her public key", function () { return __awaiter(_this, void 0, void 0, function () {
        var aliceKey, aliceKeys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, aliceSession.getLatestPublicKey(alice.login)];
                case 1:
                    aliceKey = _a.sent();
                    chai_1.expect(aliceKey).is.not.null;
                    publicKeys.push(aliceKey);
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).getPublicKeyHistory(alice.login)];
                case 2:
                    aliceKeys = _a.sent();
                    chai_1.expect(aliceKeys).is.not.null;
                    chai_1.expect(aliceKeys).to.be.deep.equal(publicKeys);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Public key history contains old and new versions after renewing key", function () { return __awaiter(_this, void 0, void 0, function () {
        var aliceKey, aliceKeys, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, aliceSession.renewKeys()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, aliceSession.getLatestPublicKey(alice.login)];
                case 2:
                    aliceKey = _a.sent();
                    chai_1.expect(aliceKey).is.not.null;
                    publicKeys.push(aliceKey);
                    return [4 /*yield*/, aliceSession.renewKeys("other password")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, aliceSession.getLatestPublicKey(alice.login)];
                case 4:
                    aliceKey = _a.sent();
                    chai_1.expect(aliceKey).is.not.null;
                    publicKeys.push(aliceKey);
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).getPublicKeyHistory(alice.login)];
                case 5:
                    aliceKeys = _a.sent();
                    chai_1.expect(aliceKeys).is.not.null;
                    for (index = 1; index < aliceKeys.length; index++) {
                        chai_1.expect(aliceKeys[index]).not.to.be.deep.equal(aliceKeys[index - 1]);
                    }
                    chai_1.expect(aliceKeys).to.be.deep.equal(publicKeys);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Public key history contains old and new versions after admin overwrite key", function () { return __awaiter(_this, void 0, void 0, function () {
        var secret, aliceKey, aliceKeys, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    secret = "an admin secret";
                    return [4 /*yield*/, new DataPeps_1.AdminAPI(adminSession).overwriteKeys(alice.login, secret)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(alice.login, secret)];
                case 2:
                    aliceSession = _a.sent();
                    return [4 /*yield*/, aliceSession.getLatestPublicKey(alice.login)];
                case 3:
                    aliceKey = _a.sent();
                    chai_1.expect(aliceKey).is.not.null;
                    publicKeys.push(aliceKey);
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(aliceSession).getPublicKeyHistory(alice.login)];
                case 4:
                    aliceKeys = _a.sent();
                    chai_1.expect(aliceKeys).is.not.null;
                    for (index = 1; index < aliceKeys.length; index++) {
                        chai_1.expect(aliceKeys[index]).not.to.be.deep.equal(aliceKeys[index - 1]);
                    }
                    chai_1.expect(aliceKeys).to.be.deep.equal(publicKeys);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=PublicKeyHistory.js.map