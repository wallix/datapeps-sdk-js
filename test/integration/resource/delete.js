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
var nacl = require("tweetnacl");
var chai_1 = require("chai");
var Long = require("long");
var Utils = require("../../Utils");
var DataPeps_1 = require("../../../src/DataPeps");
describe("resource.delete", function () {
    var seed = Math.floor(Math.random() * 99999);
    var ctx;
    var aliceChildSecret = nacl.randomBytes(128);
    var aliceChild;
    var resourceA, resourceB;
    var resourceC, resourceD;
    var randomResourceId;
    var randomResourceIdLong;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var init, resourceADataPeps, resourceBDataPeps, resourceCDataPeps, resourceDDataPeps, low, high;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Context.init()];
                case 1:
                    init = _a.sent();
                    return [4 /*yield*/, Context.aliceBobWithDeviceAndGroup(init)];
                case 2:
                    ctx = _a.sent();
                    return [4 /*yield*/, Context.userAndSession(init, "aliceChild")];
                case 3:
                    aliceChild = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).create("test kind", { text: "payload A" }, [
                            aliceChild.identity.login,
                            ctx.alice.identity.login,
                            ctx.bob.identity.login
                        ])];
                case 4:
                    resourceADataPeps = _a.sent();
                    resourceA = new Utils.Resource(resourceADataPeps, "Content A");
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).create("test kind", { text: "payload B" }, [aliceChild.identity.login, ctx.alice.identity.login])];
                case 5:
                    resourceBDataPeps = _a.sent();
                    resourceB = new Utils.Resource(resourceBDataPeps, "Content B");
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).create("test kind", { text: "payload C" }, [aliceChild.identity.login, ctx.alice.identity.login])];
                case 6:
                    resourceCDataPeps = _a.sent();
                    resourceC = new Utils.Resource(resourceADataPeps, "Content C");
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).create("test kind", { text: "payload D" }, [
                            aliceChild.identity.login,
                            ctx.alice.identity.login,
                            ctx.bob.identity.login
                        ])];
                case 7:
                    resourceDDataPeps = _a.sent();
                    resourceD = new Utils.Resource(resourceDDataPeps, "Content D");
                    // random resourceId generation
                    randomResourceId = Math.floor(Math.random() * 0xffffffff);
                    low = Math.floor(Math.random() * 0xffffffff);
                    high = Math.floor(Math.random() * 0x7fffffff);
                    randomResourceIdLong = new Long(low, high, true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("A sharer cannot hard delete the resource A", function () { return __awaiter(_this, void 0, void 0, function () {
        var resourceAlice, errorOccurred, err_1, resourceBob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(resourceA.resource.id)];
                case 1:
                    resourceAlice = _a.sent();
                    Utils.checkFetchedResource(resourceAlice, resourceA);
                    errorOccurred = { isTrue: false };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    // Alice hard deletes the resourceA (IMPOSSIBLE because she IS NOT its creator)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).delete(resourceA.resource.id)];
                case 3:
                    // Alice hard deletes the resourceA (IMPOSSIBLE because she IS NOT its creator)
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    Utils.checkResourceNotFoundError(err_1, resourceA.resource.id, errorOccurred);
                    return [3 /*break*/, 5];
                case 5:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(resourceA.resource.id)];
                case 6:
                    resourceBob = _a.sent();
                    Utils.checkFetchedResource(resourceBob, resourceA);
                    return [2 /*return*/];
            }
        });
    }); });
    it("A sharer of the resource owner cannot hard-delete the resource A", function () { return __awaiter(_this, void 0, void 0, function () {
        var resourceBob, errorOccurred, err_2, resourceAlice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(resourceA.resource.id)];
                case 1:
                    resourceBob = _a.sent();
                    Utils.checkFetchedResource(resourceBob, resourceA);
                    errorOccurred = { isTrue: false };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    // Bob hard deletes the resourceA (IMPOSSIBLE because he IS NOT its creator)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).delete(resourceA.resource.id)];
                case 3:
                    // Bob hard deletes the resourceA (IMPOSSIBLE because he IS NOT its creator)
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    Utils.checkResourceNotFoundError(err_2, resourceA.resource.id, errorOccurred);
                    return [3 /*break*/, 5];
                case 5:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(resourceA.resource.id)];
                case 6:
                    resourceAlice = _a.sent();
                    Utils.checkFetchedResource(resourceAlice, resourceA);
                    return [2 /*return*/];
            }
        });
    }); });
    it("After failing to hard-delete the resource A, the sharer can still access it", function () { return __awaiter(_this, void 0, void 0, function () {
        var resourceBob, errorOccurred, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(resourceA.resource.id)];
                case 1:
                    resourceBob = _a.sent();
                    Utils.checkFetchedResource(resourceBob, resourceA);
                    errorOccurred = { isTrue: false };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    // Bob hard deletes the resourceA (IMPOSSIBLE because he IS NOT its creator)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).delete(resourceA.resource.id)];
                case 3:
                    // Bob hard deletes the resourceA (IMPOSSIBLE because he IS NOT its creator)
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_3 = _a.sent();
                    Utils.checkResourceNotFoundError(err_3, resourceA.resource.id, errorOccurred);
                    return [3 /*break*/, 5];
                case 5:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(resourceA.resource.id)];
                case 6:
                    // Bob gets the resourceA (he is in its sharing group)
                    // (resourceA does still exist because Bob could not hard delete it)
                    resourceBob = _a.sent();
                    Utils.checkFetchedResource(resourceBob, resourceA);
                    return [2 /*return*/];
            }
        });
    }); });
    it("A sharer can soft delete the resource A", function () { return __awaiter(_this, void 0, void 0, function () {
        var resourceAlice, errorOccurred, err_4, resourceBob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(resourceA.resource.id)];
                case 1:
                    resourceAlice = _a.sent();
                    Utils.checkFetchedResource(resourceAlice, resourceA);
                    // Alice soft deletes the resourceA (she is in its sharing group)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).unlink(resourceA.resource.id)];
                case 2:
                    // Alice soft deletes the resourceA (she is in its sharing group)
                    _a.sent();
                    errorOccurred = { isTrue: false };
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    // Alice gets the resourceA (IMPOSSIBLE because she is NO MORE in its sharing group)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(resourceA.resource.id)];
                case 4:
                    // Alice gets the resourceA (IMPOSSIBLE because she is NO MORE in its sharing group)
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_4 = _a.sent();
                    Utils.checkResourceNotFoundError(err_4, resourceA.resource.id, errorOccurred);
                    return [3 /*break*/, 6];
                case 6:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(resourceA.resource.id)];
                case 7:
                    resourceBob = _a.sent();
                    Utils.checkFetchedResource(resourceBob, resourceA);
                    return [2 /*return*/];
            }
        });
    }); });
    it("The owner can hard delete the resource A", function () { return __awaiter(_this, void 0, void 0, function () {
        var resourceAliceChild, errorOccurred, resource, err_5, resource, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).get(resourceA.resource.id)];
                case 1:
                    resourceAliceChild = _a.sent();
                    Utils.checkFetchedResource(resourceAliceChild, resourceA);
                    // AliceChild hard deletes the resourceA (he is in its creator)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).delete(resourceA.resource.id)];
                case 2:
                    // AliceChild hard deletes the resourceA (he is in its creator)
                    _a.sent();
                    errorOccurred = { isTrue: false };
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).get(resourceA.resource.id)];
                case 4:
                    resource = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_5 = _a.sent();
                    Utils.checkResourceNotFoundError(err_5, resourceA.resource.id, errorOccurred);
                    return [3 /*break*/, 6];
                case 6:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    errorOccurred.isTrue = false;
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(resourceA.resource.id)];
                case 8:
                    resource = _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    err_6 = _a.sent();
                    Utils.checkResourceNotFoundError(err_6, resourceA.resource.id, errorOccurred);
                    return [3 /*break*/, 10];
                case 10:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [2 /*return*/];
            }
        });
    }); });
    it("An identity cannot soft-delete the resource B, that was not shared with it", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, resourceBob, err_7, err_8, resourceAliceChild;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorOccurred = { isTrue: false };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(resourceB.resource.id)];
                case 2:
                    resourceBob = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_7 = _a.sent();
                    Utils.checkResourceNotFoundError(err_7, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    errorOccurred.isTrue = false;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    // Bob soft deletes the resourceB (IMPOSSIBLE because he IS NOT in its sharing group)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).unlink(resourceB.resource.id)];
                case 6:
                    // Bob soft deletes the resourceB (IMPOSSIBLE because he IS NOT in its sharing group)
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_8 = _a.sent();
                    Utils.checkResourceNotFoundError(err_8, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 8];
                case 8:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).get(resourceB.resource.id)];
                case 9:
                    resourceAliceChild = _a.sent();
                    Utils.checkFetchedResource(resourceAliceChild, resourceB);
                    return [2 /*return*/];
            }
        });
    }); });
    it("An identity cannot hard-delete the resource B, that was not shared with it", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, resourceBob, err_9, err_10, resourceAliceChild;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorOccurred = { isTrue: false };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(resourceB.resource.id)];
                case 2:
                    resourceBob = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_9 = _a.sent();
                    Utils.checkResourceNotFoundError(err_9, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    errorOccurred.isTrue = false;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    // Bob hard deletes the resourceB (IMPOSSIBLE because he IS NOT its creator)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).delete(resourceB.resource.id)];
                case 6:
                    // Bob hard deletes the resourceB (IMPOSSIBLE because he IS NOT its creator)
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_10 = _a.sent();
                    Utils.checkResourceNotFoundError(err_10, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 8];
                case 8:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).get(resourceB.resource.id)];
                case 9:
                    resourceAliceChild = _a.sent();
                    Utils.checkFetchedResource(resourceAliceChild, resourceB);
                    return [2 /*return*/];
            }
        });
    }); });
    it("When the owner soft deletes the resource B, the sharing group can still access it", function () { return __awaiter(_this, void 0, void 0, function () {
        var resourceAliceChild, errorOccurred, resource, err_11, resourceAlice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).get(resourceB.resource.id)];
                case 1:
                    resourceAliceChild = _a.sent();
                    Utils.checkFetchedResource(resourceAliceChild, resourceB);
                    // AliceChild soft deletes the resourceB (he is in its sharing group)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).unlink(resourceB.resource.id)];
                case 2:
                    // AliceChild soft deletes the resourceB (he is in its sharing group)
                    _a.sent();
                    errorOccurred = { isTrue: false };
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).get(resourceB.resource.id)];
                case 4:
                    resource = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_11 = _a.sent();
                    Utils.checkResourceNotFoundError(err_11, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 6];
                case 6:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(resourceB.resource.id)];
                case 7:
                    resourceAlice = _a.sent();
                    Utils.checkFetchedResource(resourceAlice, resourceB);
                    return [2 /*return*/];
            }
        });
    }); });
    it("The owner can hard-delete the resource B, without being in the resource's sharing group", function () { return __awaiter(_this, void 0, void 0, function () {
        var resourceAlice, errorOccurred, resource, err_12, resource, err_13, resource, err_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(resourceB.resource.id)];
                case 1:
                    resourceAlice = _a.sent();
                    Utils.checkFetchedResource(resourceAlice, resourceB);
                    errorOccurred = { isTrue: false };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).get(resourceB.resource.id)];
                case 3:
                    resource = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_12 = _a.sent();
                    Utils.checkResourceNotFoundError(err_12, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 5];
                case 5:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    // AliceChild hard deletes the resourceB (he is its creator)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).delete(resourceB.resource.id)];
                case 6:
                    // AliceChild hard deletes the resourceB (he is its creator)
                    _a.sent();
                    errorOccurred.isTrue = false;
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).get(resourceB.resource.id)];
                case 8:
                    resource = _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    err_13 = _a.sent();
                    Utils.checkResourceNotFoundError(err_13, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 10];
                case 10:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    errorOccurred.isTrue = false;
                    _a.label = 11;
                case 11:
                    _a.trys.push([11, 13, , 14]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(resourceB.resource.id)];
                case 12:
                    resource = _a.sent();
                    return [3 /*break*/, 14];
                case 13:
                    err_14 = _a.sent();
                    Utils.checkResourceNotFoundError(err_14, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 14];
                case 14:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [2 /*return*/];
            }
        });
    }); });
    it("The owner can soft-delete the resource D after renewing the key", function () { return __awaiter(_this, void 0, void 0, function () {
        var resourceAliceChild, errorOccurred, resource, err_15, resourceAlice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // AliceChild renews its keys
                return [4 /*yield*/, aliceChild.session.renewKeys()];
                case 1:
                    // AliceChild renews its keys
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).get(resourceD.resource.id)];
                case 2:
                    resourceAliceChild = _a.sent();
                    Utils.checkFetchedResource(resourceAliceChild, resourceD);
                    // AliceChild soft deletes the resourceD (he is in its sharing group)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).unlink(resourceD.resource.id)];
                case 3:
                    // AliceChild soft deletes the resourceD (he is in its sharing group)
                    _a.sent();
                    errorOccurred = { isTrue: false };
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).get(resourceD.resource.id)];
                case 5:
                    resource = _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_15 = _a.sent();
                    Utils.checkResourceNotFoundError(err_15, resourceD.resource.id, errorOccurred);
                    return [3 /*break*/, 7];
                case 7:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(resourceD.resource.id)];
                case 8:
                    resourceAlice = _a.sent();
                    Utils.checkFetchedResource(resourceAlice, resourceD);
                    return [2 /*return*/];
            }
        });
    }); });
    it("A sharer can soft-delete the resource D after renewing the key", function () { return __awaiter(_this, void 0, void 0, function () {
        var resourceAlice, errorOccurred, resource, err_16, resourceBob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Alice renews its keys
                return [4 /*yield*/, ctx.alice.session.renewKeys()];
                case 1:
                    // Alice renews its keys
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(resourceD.resource.id)];
                case 2:
                    resourceAlice = _a.sent();
                    Utils.checkFetchedResource(resourceAlice, resourceD);
                    // Alice soft deletes the resourceD (she is in its sharing group)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).unlink(resourceD.resource.id)];
                case 3:
                    // Alice soft deletes the resourceD (she is in its sharing group)
                    _a.sent();
                    errorOccurred = { isTrue: false };
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(resourceD.resource.id)];
                case 5:
                    resource = _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_16 = _a.sent();
                    Utils.checkResourceNotFoundError(err_16, resourceD.resource.id, errorOccurred);
                    return [3 /*break*/, 7];
                case 7:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(resourceD.resource.id)];
                case 8:
                    resourceBob = _a.sent();
                    Utils.checkFetchedResource(resourceBob, resourceD);
                    return [2 /*return*/];
            }
        });
    }); });
    it("The owner can hard-delete the resource D after renewing the key", function () { return __awaiter(_this, void 0, void 0, function () {
        var resourceBob, errorOccurred, resourceBob_1, err_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(resourceD.resource.id)];
                case 1:
                    resourceBob = _a.sent();
                    Utils.checkFetchedResource(resourceBob, resourceD);
                    // AliceChild renews its keys
                    return [4 /*yield*/, aliceChild.session.renewKeys()];
                case 2:
                    // AliceChild renews its keys
                    _a.sent();
                    // AliceChild hard deletes the resourceD (he is its creator)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceChild.session).delete(resourceD.resource.id)];
                case 3:
                    // AliceChild hard deletes the resourceD (he is its creator)
                    _a.sent();
                    errorOccurred = { isTrue: false };
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(resourceD.resource.id)];
                case 5:
                    resourceBob_1 = _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_17 = _a.sent();
                    Utils.checkResourceNotFoundError(err_17, resourceD.resource.id, errorOccurred);
                    return [3 /*break*/, 7];
                case 7:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [2 /*return*/];
            }
        });
    }); });
    it("The server returns ResourceNotFound error, when a user tries to delete an inexistant resource", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, i, err_18, randomResourceIdLong_1, i, err_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorOccurred = { isTrue: false };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 2)) return [3 /*break*/, 7];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    // Alice gets a resource (IMPOSSIBLE because it DOES NOT exist)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(randomResourceId)];
                case 3:
                    // Alice gets a resource (IMPOSSIBLE because it DOES NOT exist)
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_18 = _a.sent();
                    randomResourceIdLong_1 = new Long(randomResourceId, 0, true);
                    Utils.checkResourceNotFoundError(err_18, randomResourceIdLong_1, errorOccurred);
                    return [3 /*break*/, 5];
                case 5:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    errorOccurred.isTrue = false;
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 1];
                case 7:
                    // same test for the type long
                    errorOccurred.isTrue = false;
                    i = 0;
                    _a.label = 8;
                case 8:
                    if (!(i < 2)) return [3 /*break*/, 14];
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    // Alice gets a resource (IMPOSSIBLE because it DOES NOT exist)
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(randomResourceIdLong)];
                case 10:
                    // Alice gets a resource (IMPOSSIBLE because it DOES NOT exist)
                    _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    err_19 = _a.sent();
                    Utils.checkResourceNotFoundError(err_19, randomResourceIdLong, errorOccurred);
                    return [3 /*break*/, 12];
                case 12:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    errorOccurred.isTrue = false;
                    _a.label = 13;
                case 13:
                    i++;
                    return [3 /*break*/, 8];
                case 14: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=delete.js.map