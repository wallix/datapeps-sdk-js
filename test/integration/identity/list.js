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
describe("identity.list", function () {
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
                    return [4 /*yield*/, Context.identities(init, n, { kind: kind, name: "alice" })];
                case 3:
                    A = _a.sent();
                    return [4 /*yield*/, Context.identities(init, n, { kind: kind, name: "bob" })];
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
                        expectIdentitiesListAreEquals(sortIdentities(field, order, expected), result.identities);
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
    sortingFields.forEach(function (field) {
        return sortingOrders.forEach(function (order) { return itWithSortingOptions(field, order); });
    });
    // Test with prefix filtering
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
                        expectContainsAllIdentities(expected, result.identities);
                        chai_1.expect(expected.length).to.be.equal(result.totalIdentitiesCount);
                        return [2 /*return*/];
                }
            });
        }); });
        function itWithPage(limit, offset) {
            var _this = this;
            it("list page(" + offset + ", " + limit + ") users with prefix search '" + name + "'", function () { return __awaiter(_this, void 0, void 0, function () {
                var expected, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expected = expectedF();
                            return [4 /*yield*/, new IdentityAPI_1.IdentityAPI(ctx.adminSession).list({
                                    offset: offset,
                                    limit: limit,
                                    kind: kind,
                                    search: name
                                })];
                        case 1:
                            result = _a.sent();
                            expectContainsAllIdentities(result.identities, expected, false);
                            chai_1.expect(expected.length).to.be.equal(result.totalIdentitiesCount);
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        itWithPage(Math.ceil(n / 2), 0);
        itWithPage(0, Math.ceil(n / 2));
        itWithPage(Math.ceil(n / 4), Math.ceil(n / 2));
        itWithPage(n * 3, 0);
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
    ///////////////////////////////////////////////
    // Tools
    ///////////////////////////////////////////////
    function expectContainsAllIdentities(expected, result, both) {
        if (both === void 0) { both = true; }
        if (both) {
            chai_1.expect(result.length, "identities list hasn't the same length").to.be.equals(expected.length);
        }
        expected.forEach(function (e) {
            chai_1.expect(result.find(function (r) { return r.login === e.login; }), "cannot find '" + e.login + "' in result").to.be.not.null;
        });
    }
    function expectIdentitiesListAreEquals(expected, result) {
        chai_1.expect(result.length, "identities list hasn't the same length").to.be.equals(expected.length);
        expected.forEach(function (e, i) {
            var r = result[i];
            chai_1.expect(e.login, "expected[" + i + "](" + e.login + ") != result[" + i + "](" + r.login).to.be.deep.equal(r.login);
        });
    }
    function sortIdentities(sortingField, sortingOrder, identities) {
        return identities.sort(compareIdentity(sortingField, sortingOrder));
    }
    function compareIdentity(sortingField, sortingOrder) {
        return function (a, b) {
            var afield, bfield;
            switch (sortingField) {
                case IdentityAPI_1.IdentitySortingField.CREATED:
                    afield = a.created;
                    bfield = b.created;
                    break;
                case IdentityAPI_1.IdentitySortingField.KIND:
                    afield = a.created;
                    bfield = b.created;
                    break;
                case IdentityAPI_1.IdentitySortingField.LOGIN:
                    afield = a.created;
                    bfield = b.created;
                    break;
                default:
                    throw new Error("sortingField not found");
            }
            switch (sortingOrder) {
                case IdentityAPI_1.IdentitySortingOrder.ASC:
                    return afield < bfield ? -1 : afield > bfield ? 1 : 0;
                case IdentityAPI_1.IdentitySortingOrder.DESC:
                    return afield < bfield ? 1 : afield > bfield ? -1 : 0;
            }
        };
    }
});
//# sourceMappingURL=list.js.map