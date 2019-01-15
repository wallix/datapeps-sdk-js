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
var Context = require("../../Context");
var chai_1 = require("chai");
var Utils_1 = require("../../Utils");
var DataPeps_1 = require("../../../src/DataPeps");
var IdentityAPI_1 = require("../../../src/IdentityAPI");
var utils_1 = require("./utils");
describe("identity.list", function () {
    var defaultLimit = 10;
    var n = 10;
    var kind;
    var ctx;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var init, admin, A, B;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Context.init()];
                case 1:
                    init = _a.sent();
                    kind = "list/" + init.seed;
                    return [4 /*yield*/, Context.admin()];
                case 2:
                    admin = _a.sent();
                    return [4 /*yield*/, Context.registerIdentities(init, n, { kind: kind, name: "alice" })];
                case 3:
                    A = _a.sent();
                    return [4 /*yield*/, Context.registerIdentities(init, n, { kind: kind, name: "bob" })];
                case 4:
                    B = _a.sent();
                    ctx = __assign({}, admin, { A: A, B: B });
                    return [2 /*return*/];
            }
        });
    }); });
    ///////////////////////////////////////////////
    // Test nominal cases
    ///////////////////////////////////////////////
    // Test forEach sortingField / sortingOrder
    function itWithSortingOptions(field, order) {
        var _this = this;
        return it("list users in an ordered way (" + IdentityAPI_1.IdentitySortingField[field] + ", " + IdentityAPI_1.IdentitySortingOrder[order] + ")", function () { return __awaiter(_this, void 0, void 0, function () {
            var expected, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = [];
                        expected.push.apply(expected, ctx.A.identities);
                        expected.push.apply(expected, ctx.B.identities);
                        return [4 /*yield*/, new IdentityAPI_1.IdentityAPI(ctx.adminSession).list({
                                offset: 0,
                                limit: n * 2,
                                kind: kind,
                                sortingField: field,
                                sortingOrder: order
                            })];
                    case 1:
                        result = _a.sent();
                        utils_1.expectIdentitiesListAreEquals(utils_1.sortIdentities(field, order, expected), result.identities);
                        chai_1.expect(expected.length).to.be.equal(result.totalIdentitiesCount);
                        return [2 /*return*/];
                }
            });
        }); });
    }
    // All sorting fields
    var sortingFields = Object.keys(IdentityAPI_1.IdentitySortingField)
        .map(function (key) { return Number(key); })
        .filter(function (key) { return !isNaN(key); });
    // All sorting orders
    var sortingOrders = Object.keys(IdentityAPI_1.IdentitySortingOrder)
        .map(function (key) { return Number(key); })
        .filter(function (key) { return !isNaN(key); });
    // Tests with sorting fields
    sortingFields.forEach(function (field) {
        return sortingOrders.forEach(function (order) { return itWithSortingOptions(field, order); });
    });
    // Test with prefix filtering
    function itWithPage(expectedF, options) {
        var _this = this;
        options = options == null ? {} : options;
        it("list page(limit=" + options.limit + ", offset=" + options.offset + ", expected=" + options.expectedIdentitiesLength + ") users with prefix search '" + options.search + "'", function () { return __awaiter(_this, void 0, void 0, function () {
            var expected, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = expectedF();
                        return [4 /*yield*/, new IdentityAPI_1.IdentityAPI(ctx.adminSession).list({
                                offset: options.offset,
                                limit: options.limit,
                                kind: kind,
                                search: options.search
                            })];
                    case 1:
                        result = _a.sent();
                        utils_1.expectContainsAllIdentities(result.identities, expected, false);
                        chai_1.expect(expected.length).to.be.equal(result.totalIdentitiesCount);
                        if (options.expectedIdentitiesLength != null) {
                            chai_1.expect(result.identities.length).to.equal(options.expectedIdentitiesLength);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    }
    function itWithPrefixSearch(name, expectedF) {
        var _this = this;
        it("list all users with prefix search '" + name + "'", function () { return __awaiter(_this, void 0, void 0, function () {
            var expected, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = expectedF();
                        return [4 /*yield*/, new IdentityAPI_1.IdentityAPI(ctx.adminSession).list({
                                offset: 0,
                                limit: Math.ceil(n * 2),
                                kind: kind,
                                search: name
                            })];
                    case 1:
                        result = _a.sent();
                        utils_1.expectContainsAllIdentities(expected, result.identities);
                        chai_1.expect(expected.length).to.be.equal(result.totalIdentitiesCount);
                        return [2 /*return*/];
                }
            });
        }); });
        function itWithPageInternal(options) {
            itWithPage(expectedF, __assign({}, options, { search: name }));
        }
        itWithPageInternal({
            limit: Math.ceil(n / 2),
            expectedIdentitiesLength: Math.ceil(n / 2)
        });
        // the default limit is assumed to be larger than Math.ceil(n/2); if it is not, the test fails
        itWithPageInternal({
            offset: Math.ceil(n / 2),
            expectedIdentitiesLength: defaultLimit - Math.ceil(n / 2)
        });
        itWithPageInternal({
            limit: Math.ceil(n / 4),
            offset: Math.ceil(n / 2),
            expectedIdentitiesLength: Math.ceil(n / 4)
        });
        itWithPageInternal({
            limit: n * 3,
            expectedIdentitiesLength: n
        });
        itWithPageInternal({
            limit: Math.ceil(n / 2),
            offset: n * 2,
            expectedIdentitiesLength: 0
        });
        itWithPageInternal({
            limit: Math.ceil(n * 2),
            expectedIdentitiesLength: n
        });
    }
    itWithPrefixSearch("alice", function () { return ctx.A.identities; });
    itWithPrefixSearch("bob", function () { return ctx.B.identities; });
    ///////////////////////////////////////////////
    // Error cases
    ///////////////////////////////////////////////
    Utils_1.itError("list users in an ordered way according to a column that does not exist", function () {
        return new IdentityAPI_1.IdentityAPI(ctx.adminSession).list({
            sortingField: -1,
            sortingOrder: IdentityAPI_1.IdentitySortingOrder.ASC
        });
    }, DataPeps_1.ServerError.RequestBadRequest);
    Utils_1.itError("list users in an ordered way according to an order that does not exist", function () {
        return new IdentityAPI_1.IdentityAPI(ctx.adminSession).list({
            sortingField: IdentityAPI_1.IdentitySortingField.CREATED,
            sortingOrder: -1
        });
    }, DataPeps_1.ServerError.RequestBadRequest);
    Utils_1.itError("list users in an ordered way according to a column and an order that both do not exist", function () {
        return new IdentityAPI_1.IdentityAPI(ctx.adminSession).list({
            sortingField: -1,
            sortingOrder: -1
        });
    }, DataPeps_1.ServerError.RequestBadRequest);
});
//# sourceMappingURL=list.js.map