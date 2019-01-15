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
var chai_1 = require("chai");
var DataPeps_1 = require("../../../src/DataPeps");
var Utils_1 = require("./Utils");
var Context_1 = require("../../Context");
var utils_1 = require("../identity/utils");
var Context_2 = require("./Context");
var Utils_2 = require("../../Utils");
describe("application.listIdentities", function () {
    var ctx;
    var devAppAPI;
    var defaultExpectedLimit = 10;
    var numberOfIdentitiesByPrefix = 5;
    var numberOfIdentities = numberOfIdentitiesByPrefix * 2;
    var loginPrefixA = "alice";
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var initCtx, devCtx, _a, A, B, _b, _c, _d, toto;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, Context_1.init()];
                case 1:
                    initCtx = _e.sent();
                    return [4 /*yield*/, Context_2.devWithAllConfigs(initCtx)];
                case 2:
                    devCtx = _e.sent();
                    _c = (_b = Promise).all;
                    return [4 /*yield*/, Context_2.registerIdentitiesForEachApps(initCtx, devCtx, Utils_1.configs, numberOfIdentities, {
                            name: loginPrefixA
                        })];
                case 3:
                    _d = [
                        _e.sent()
                    ];
                    return [4 /*yield*/, Context_2.registerIdentitiesForEachApps(initCtx, devCtx, Utils_1.configs, numberOfIdentities, {
                            name: "bob"
                        })];
                case 4: return [4 /*yield*/, _c.apply(_b, [_d.concat([
                            _e.sent()
                        ])])];
                case 5:
                    _a = _e.sent(), A = _a[0], B = _a[1];
                    return [4 /*yield*/, Context_1.userAndSession(initCtx, "toto")];
                case 6:
                    toto = _e.sent();
                    ctx = __assign({}, initCtx, devCtx, { A: A, B: B, toto: toto });
                    devAppAPI = new DataPeps_1.ApplicationAPI(devCtx.dev.session);
                    return [2 /*return*/];
            }
        });
    }); });
    ///////////////////////////////////////////////
    // Test nominal cases - forEach config
    ///////////////////////////////////////////////
    Utils_1.configs.forEach(function (_a, i) {
        var config = _a.config, secretKey = _a.secretKey;
        function itWithPage(expectedFn, options) {
            var _this = this;
            options = options == null ? {} : options;
            it("list application users, for app(" + DataPeps_1.ApplicationJWT.Algorithm[config.signAlgorithm] + "), page(limit=" + options.limit + ", offset=" + options.offset + ", loginPrefix=" + options.loginPrefix + ")", function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, identities, totalIdentitiesCount, expected;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, devAppAPI.listIdentities(ctx.apps[i].identity.login, options)];
                        case 1:
                            _a = _b.sent(), identities = _a.identities, totalIdentitiesCount = _a.totalIdentitiesCount;
                            expected = expectedFn();
                            utils_1.expectContainsAllIdentities(expected, identities.map(function (_a) {
                                var identity = _a.identity;
                                return identity;
                            }), false);
                            chai_1.expect(identities.length).to.equal(expectedResultSize(expected, options.offset, options.limit));
                            chai_1.expect(totalIdentitiesCount).to.equal(expected.length);
                            return [2 /*return*/];
                    }
                });
            }); });
            function expectedResultSize(expected, offset, limit) {
                offset = offset == null ? 0 : offset;
                limit = limit == null ? defaultExpectedLimit : limit;
                var size = expected.length - offset;
                return size > limit ? limit : size > 0 ? size : 0;
            }
        }
        function itWithPageTogglePrefix(options) {
            itWithPage(function () {
                var aUnionB = [];
                aUnionB.push.apply(aUnionB, ctx.A[i].identities.concat(ctx.B[i].identities));
                return aUnionB;
            }, options);
            itWithPage(function () { return ctx.A[i].identities; }, __assign({}, options, { loginPrefix: loginPrefixA }));
        }
        // List identities without page parameters
        itWithPageTogglePrefix();
        // List identities with an offset
        itWithPageTogglePrefix({ offset: Math.floor(numberOfIdentities / 2) });
        // List identities with a limit
        itWithPageTogglePrefix({ limit: Math.floor(numberOfIdentities / 2) });
        // List identities with offset and limit
        itWithPageTogglePrefix({
            offset: Math.floor(numberOfIdentities / 4),
            limit: Math.floor(numberOfIdentities / 4)
        });
        // List identities with an offset higher than number of identities
        itWithPageTogglePrefix({ offset: numberOfIdentities * 2 });
        itWithPageTogglePrefix({
            offset: numberOfIdentities * 2,
            limit: Math.floor(numberOfIdentities / 2)
        });
        // List identities with a limit higher than number of identities
        itWithPageTogglePrefix({ limit: numberOfIdentities * 2 });
        itWithPageTogglePrefix({
            offset: Math.floor(numberOfIdentities / 2),
            limit: Math.floor(numberOfIdentities * 2)
        });
        // List identities with a limit and an offset higher than number of identities
        itWithPageTogglePrefix({ limit: numberOfIdentities * 2, offset: numberOfIdentities * 2 });
    });
    ///////////////////////////////////////////////
    // Error cases
    ///////////////////////////////////////////////
    Utils_2.itError("cannot list an application that doesn't exists", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, devAppAPI.listIdentities("my.app.does.not.exists")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); }, DataPeps_1.ServerError.IdentityNotFound);
    Utils_2.itError("cannot list an application that is not owned", function () { return __awaiter(_this, void 0, void 0, function () {
        var api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = new DataPeps_1.ApplicationAPI(ctx.toto.session);
                    return [4 /*yield*/, api.listIdentities(ctx.app.identity.login)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, DataPeps_1.ServerError.IdentityCannotAssumeOwnership);
});
//# sourceMappingURL=listIdentities.js.map