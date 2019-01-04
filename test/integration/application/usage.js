"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var Context_1 = require("../../Context");
var DataPeps_1 = require("../../../src/DataPeps");
var chai_1 = require("chai");
var Utils_1 = require("../../Utils");
var JWT = require("jsonwebtoken");
var Application_1 = require("../../../src/Application");
var nacl = require("tweetnacl");
describe("applicationAPI.usage", function () {
    var ctx;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var initCtx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Context_1.init()];
                case 1:
                    initCtx = _b.sent();
                    _a = [{}, initCtx];
                    return [4 /*yield*/, Context_1.dev(initCtx)];
                case 2:
                    _a = _a.concat([(_b.sent())]);
                    return [4 /*yield*/, Context_1.aliceBob(initCtx)];
                case 3:
                    ctx = __assign.apply(void 0, _a.concat([(_b.sent())]));
                    return [2 /*return*/];
            }
        });
    }); });
    Utils_1.itError("A new user cannot access usage of non existant app", function () { return __awaiter(_this, void 0, void 0, function () {
        var api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = new DataPeps_1.ApplicationAPI(ctx.dev.session);
                    return [4 /*yield*/, api.getUsageOverview(ctx.app.identity.login + ".non.exist")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, DataPeps_1.ServerError.IdentityNotFound);
    Utils_1.itError("Random Alice cannot access usage of dev app", function () { return __awaiter(_this, void 0, void 0, function () {
        var api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = new DataPeps_1.ApplicationAPI(ctx.alice.session);
                    return [4 /*yield*/, api.getUsageOverview(ctx.app.identity.login)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, DataPeps_1.ServerError.IdentityCannotAssumeOwnership);
    it("Get usage of this brand new app and get 0 hits", function () { return __awaiter(_this, void 0, void 0, function () {
        var api, usage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = new DataPeps_1.ApplicationAPI(ctx.dev.session);
                    return [4 /*yield*/, api.getUsageOverview(ctx.app.identity.login)];
                case 1:
                    usage = _a.sent();
                    chai_1.expect(usage).to.deep.equal({
                        jwt: {
                            totalIdentities: 0,
                            newIdentities: 0,
                            newSessions: 0
                        },
                        delegatedAccess: {
                            newRequested: 0,
                            newResolved: 0,
                            newDistinctRequested: 0,
                            newDistinctResolved: 0
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("Get delegates usage of an active dev", function () { return __awaiter(_this, void 0, void 0, function () {
        var appSession, mediator, api, usage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DataPeps_1.Session.login(ctx.app.identity.login, ctx.app.secret)];
                case 1:
                    appSession = _a.sent();
                    mediator = new DelegatedAccessRequestsHandler(appSession);
                    // Request 2 delegated accesses to alice identity for app
                    return [4 /*yield*/, mediator.addRequest(ctx.alice.identity, ctx.alice.session, 2)];
                case 2:
                    // Request 2 delegated accesses to alice identity for app
                    _a.sent();
                    // Make resolve that request
                    return [4 /*yield*/, mediator.resolveAll()];
                case 3:
                    // Make resolve that request
                    _a.sent();
                    // Request 2 delegated access to alice identity for app
                    return [4 /*yield*/, mediator.addRequest(ctx.alice.identity, ctx.alice.session, 2)];
                case 4:
                    // Request 2 delegated access to alice identity for app
                    _a.sent();
                    // Request 1 delegated access to bob identity for app
                    return [4 /*yield*/, mediator.addRequest(ctx.bob.identity, ctx.bob.session, 1)];
                case 5:
                    // Request 1 delegated access to bob identity for app
                    _a.sent();
                    api = new DataPeps_1.ApplicationAPI(ctx.dev.session);
                    return [4 /*yield*/, api.getUsageOverview(ctx.app.identity.login, {
                            since: new Date().getTime() / 1000 - 10
                        })];
                case 6:
                    usage = _a.sent();
                    chai_1.expect(usage.delegatedAccess.newRequested).equals(5);
                    chai_1.expect(usage.delegatedAccess.newResolved).equals(2);
                    chai_1.expect(usage.delegatedAccess.newDistinctRequested).equals(2);
                    chai_1.expect(usage.delegatedAccess.newDistinctResolved).equals(1);
                    // resolve request to cleanup promises
                    mediator.resolveAll();
                    return [4 /*yield*/, api.getUsageOverview(ctx.app.identity.login, {
                            since: new Date().getTime() / 1000 + 1
                        })];
                case 7:
                    usage = _a.sent();
                    // Usage in the future should be empty
                    chai_1.expect(usage).to.deep.equal({
                        jwt: {
                            totalIdentities: 0,
                            newIdentities: 0,
                            newSessions: 0
                        },
                        delegatedAccess: {
                            newRequested: 0,
                            newResolved: 0,
                            newDistinctRequested: 0,
                            newDistinctResolved: 0
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("Get jwt usage of an active dev", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var key, api, usage, charlieDataPepsSecret, isNew, isNewAgain;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = "supersecurekey";
                    api = new DataPeps_1.ApplicationAPI(ctx.dev.session);
                    return [4 /*yield*/, api.putConfig(ctx.app.identity.login, {
                            jwt: { key: new TextEncoder().encode(key) }
                        })];
                case 1:
                    _a.sent();
                    // Let's enroll David, David don't really use the app
                    return [4 /*yield*/, Application_1.createUser(ctx.app.identity.login, { jwt: { token: JWT.sign({ sub: "david" }, key) } }, nacl.randomBytes(8))];
                case 2:
                    // Let's enroll David, David don't really use the app
                    _a.sent();
                    return [4 /*yield*/, api.getUsageOverview(ctx.app.identity.login)];
                case 3:
                    usage = _a.sent();
                    chai_1.expect(usage.jwt.totalIdentities).to.equals(1);
                    chai_1.expect(usage.jwt.newIdentities).to.equals(1);
                    chai_1.expect(usage.jwt.newSessions).to.equals(0);
                    charlieDataPepsSecret = "angelsTest=1234";
                    return [4 /*yield*/, DataPeps_1.ApplicationJWT.createSession(ctx.app.identity.login, "charlie", charlieDataPepsSecret, {
                            createSession: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/];
                            }); }); },
                            getToken: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, JWT.sign({ sub: "charlie" }, key)];
                                });
                            }); }
                        })];
                case 4:
                    isNew = (_a.sent()).new;
                    chai_1.expect(isNew).to.be.true;
                    return [4 /*yield*/, DataPeps_1.ApplicationJWT.createSession(ctx.app.identity.login, "charlie", charlieDataPepsSecret, {
                            createSession: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/];
                            }); }); },
                            getToken: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, JWT.sign({ sub: "charlie" }, key)];
                                });
                            }); }
                        })];
                case 5:
                    isNewAgain = (_a.sent()).new;
                    chai_1.expect(isNewAgain).to.be.false;
                    return [4 /*yield*/, api.getUsageOverview(ctx.app.identity.login)];
                case 6:
                    usage = _a.sent();
                    chai_1.expect(usage.jwt.totalIdentities).to.equals(2);
                    chai_1.expect(usage.jwt.newIdentities).to.equals(2);
                    chai_1.expect(usage.jwt.newSessions).to.equals(2);
                    return [2 /*return*/];
            }
        });
    }); });
});
/* DelegatedAccessHandler is used to store delegatedAccessRequest and resolve them */
var DelegatedAccessRequestsHandler = /** @class */ (function () {
    function DelegatedAccessRequestsHandler(requesterSession) {
        var _this = this;
        this.requests = [];
        this.delegatedAccessSignatureFunction = function (_a) {
            var login = _a.login, publicKey = _a.publicKey;
            var ulogin = new TextEncoder().encode(login);
            var toSign = new Uint8Array(ulogin.byteLength + publicKey.byteLength);
            toSign.set(ulogin, 0);
            toSign.set(publicKey, ulogin.byteLength);
            var sign = _this.requesterSession.sign(toSign);
            return Promise.resolve({ requester: _this.requesterSession.login, sign: sign });
        };
        this.addRequest = function (targetIdentity, targetSession, nbRepeat) { return __awaiter(_this, void 0, void 0, function () {
            var i, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(i < nbRepeat)) return [3 /*break*/, 4];
                        _b = (_a = this.requests).push;
                        _c = {};
                        return [4 /*yield*/, DataPeps_1.DelegatedAccess.request(targetIdentity.login, this.delegatedAccessSignatureFunction)];
                    case 2:
                        _b.apply(_a, [(_c.request = _d.sent(),
                                _c.targetIdentity = targetIdentity,
                                _c.targetSession = targetSession,
                                _c)]);
                        _d.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.requesterSession = requesterSession;
    }
    DelegatedAccessRequestsHandler.prototype.resolveAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, r;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.requests;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        r = _a[_i];
                        return [4 /*yield*/, new DataPeps_1.DelegatedAccessAPI(r.targetSession).resolveAccessRequest(r.request.id)];
                    case 2:
                        (_b.sent()).resolve(r.targetIdentity.login);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.requests = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    return DelegatedAccessRequestsHandler;
}());
//# sourceMappingURL=usage.js.map