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
var DataPeps = require("../../../src/DataPeps");
var chai_1 = require("chai");
var Long = require("long");
var DataPeps_1 = require("../../../src/DataPeps");
var ResourceContent = /** @class */ (function () {
    function ResourceContent(resource, content) {
        var textEncoder = new TextEncoder();
        this.plain = textEncoder.encode(content);
        this.encrypted = resource.encrypt(this.plain);
    }
    return ResourceContent;
}());
var Resource = /** @class */ (function () {
    function Resource(resource, content) {
        this.resource = resource;
        this.content = new ResourceContent(resource, content);
    }
    return Resource;
}());
function checkFetchedResource(resourceFetched, resourceExpected) {
    chai_1.expect(resourceFetched).to.not.be.null;
    chai_1.expect(resourceFetched.id).to.be.deep.equals(resourceExpected.resource.id);
    chai_1.expect(resourceFetched.payload).to.be.deep.equals(resourceExpected.resource.payload);
    var decryptedContent = resourceFetched.decrypt(resourceExpected.content.encrypted);
    chai_1.expect(decryptedContent).to.not.be.null;
    chai_1.expect(decryptedContent).to.be.deep.equals(resourceExpected.content.plain);
}
function checkResourceNotFoundError(err, resourceId, errorOccurred) {
    chai_1.expect(err).to.not.be.null;
    chai_1.expect(err).instanceof(DataPeps.Error);
    chai_1.expect(err.kind).equal(DataPeps.ServerError.ResourceNotFound);
    chai_1.expect(err.payload.id).to.be.deep.equals(resourceId);
    errorOccurred.isTrue = true;
}
function fetchAndCheckResource(session, resource) {
    return __awaiter(this, void 0, void 0, function () {
        var resourceFecthed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(session).get(resource.resource.id)];
                case 1:
                    resourceFecthed = _a.sent();
                    checkFetchedResource(resourceFecthed, resource);
                    return [2 /*return*/, Promise.resolve(resourceFecthed)];
            }
        });
    });
}
describe("resource.extendSharingGroup", function () {
    var alice, bob, charlie, dave;
    var aliceSession, bobSession, charlieSession, daveSession;
    var resourceA;
    var resourceB;
    var resourceC;
    var resourceD;
    var randomResourceId;
    var randomResourceIdLong;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var init, ctx, cCtx, dCtx, resourceADataPeps, resourceBDataPeps, resourceCDataPeps, resourceDDataPeps, low, high;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Context.init()];
                case 1:
                    init = _a.sent();
                    return [4 /*yield*/, Context.aliceBob(init)];
                case 2:
                    ctx = _a.sent();
                    alice = ctx.alice.identity;
                    aliceSession = ctx.alice.session;
                    bob = ctx.bob.identity;
                    bobSession = ctx.bob.session;
                    return [4 /*yield*/, Context.userAndSession(init, "charlie")];
                case 3:
                    cCtx = _a.sent();
                    charlie = cCtx.identity;
                    charlieSession = cCtx.session;
                    return [4 /*yield*/, Context.userAndSession(init, "dave")];
                case 4:
                    dCtx = _a.sent();
                    dave = dCtx.identity;
                    daveSession = dCtx.session;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test kind", { text: "payload A" }, [alice.login])];
                case 5:
                    resourceADataPeps = _a.sent();
                    resourceA = new Resource(resourceADataPeps, "Content A");
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test kind", { text: "payload B" }, [])];
                case 6:
                    resourceBDataPeps = _a.sent();
                    resourceB = new Resource(resourceBDataPeps, "Content B");
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test kind", { text: "payload C" }, [alice.login])];
                case 7:
                    resourceCDataPeps = _a.sent();
                    resourceC = new Resource(resourceCDataPeps, "Content C");
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).create("test kind", { text: "payload D" }, [alice.login])];
                case 8:
                    resourceDDataPeps = _a.sent();
                    resourceD = new Resource(resourceDDataPeps, "Content D");
                    randomResourceId = Math.floor(Math.random() * 0xffffffff);
                    low = Math.floor(Math.random() * 0xffffffff);
                    high = Math.floor(Math.random() * 0x7fffffff);
                    randomResourceIdLong = new Long(low, high, true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("An identity that is not a Resource A sharer cannot add an himself to the resource sharers", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, err_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorOccurred = { isTrue: false };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).get(resourceA.resource.id)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    checkResourceNotFoundError(err_1, resourceA.resource.id, errorOccurred);
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    errorOccurred.isTrue = false;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).extendSharingGroup(resourceA.resource.id, [bob.login])];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_2 = _a.sent();
                    checkResourceNotFoundError(err_2, resourceA.resource.id, errorOccurred);
                    return [3 /*break*/, 8];
                case 8:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [2 /*return*/];
            }
        });
    }); });
    it("An identity that is not a Resource A sharer cannot add an identity to the resource sharers", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, err_3, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorOccurred = { isTrue: false };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).get(resourceA.resource.id)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    checkResourceNotFoundError(err_3, resourceA.resource.id, errorOccurred);
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    errorOccurred.isTrue = false;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).extendSharingGroup(resourceA.resource.id, [charlie.login])];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_4 = _a.sent();
                    checkResourceNotFoundError(err_4, resourceA.resource.id, errorOccurred);
                    return [3 /*break*/, 8];
                case 8:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [2 /*return*/];
            }
        });
    }); });
    it("A sharer that is a Resource A sharer since the resource creation can add an identitiy to the resource sharers", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAndCheckResource(aliceSession, resourceA)];
                case 1:
                    _a.sent();
                    errorOccurred = { isTrue: false };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).get(resourceA.resource.id)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_5 = _a.sent();
                    checkResourceNotFoundError(err_5, resourceA.resource.id, errorOccurred);
                    return [3 /*break*/, 5];
                case 5:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).extendSharingGroup(resourceA.resource.id, [bob.login])];
                case 6:
                    _a.sent();
                    fetchAndCheckResource(bobSession, resourceA);
                    return [2 /*return*/];
            }
        });
    }); });
    it("An added sharer can add an identity to the sharing group of Resource A", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAndCheckResource(bobSession, resourceA)];
                case 1:
                    _a.sent();
                    errorOccurred = { isTrue: false };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(charlieSession).get(resourceA.resource.id)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_6 = _a.sent();
                    checkResourceNotFoundError(err_6, resourceA.resource.id, errorOccurred);
                    return [3 /*break*/, 5];
                case 5:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).extendSharingGroup(resourceA.resource.id, [charlie.login])];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(charlieSession, resourceA)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("If the creator of Resource B is not a sharer, he cannot add himself to sharers", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, err_7, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorOccurred = { isTrue: false };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resourceB.resource.id)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_7 = _a.sent();
                    checkResourceNotFoundError(err_7, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    errorOccurred.isTrue = false;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).extendSharingGroup(resourceB.resource.id, [alice.login])];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_8 = _a.sent();
                    checkResourceNotFoundError(err_8, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 8];
                case 8:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [2 /*return*/];
            }
        });
    }); });
    it("If the creator of Resource B is not a sharer, he cannot add another identity to sharers", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, err_9, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorOccurred = { isTrue: false };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(resourceB.resource.id)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_9 = _a.sent();
                    checkResourceNotFoundError(err_9, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    errorOccurred.isTrue = false;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).extendSharingGroup(resourceB.resource.id, [bob.login])];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_10 = _a.sent();
                    checkResourceNotFoundError(err_10, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 8];
                case 8:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [2 /*return*/];
            }
        });
    }); });
    it("An identity cannot add himself to the Resource B sharers, when the sharing group of the resource is empty", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, err_11, err_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorOccurred = { isTrue: false };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).get(resourceB.resource.id)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_11 = _a.sent();
                    checkResourceNotFoundError(err_11, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    errorOccurred.isTrue = false;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).extendSharingGroup(resourceB.resource.id, [bob.login])];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_12 = _a.sent();
                    checkResourceNotFoundError(err_12, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 8];
                case 8:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [2 /*return*/];
            }
        });
    }); });
    it("An identity cannot add another identity to the Resource B sharers, when the sharing group of the resource is empty", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, err_13, err_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorOccurred = { isTrue: false };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).get(resourceB.resource.id)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_13 = _a.sent();
                    checkResourceNotFoundError(err_13, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    errorOccurred.isTrue = false;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).extendSharingGroup(resourceB.resource.id, [charlie.login])];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_14 = _a.sent();
                    checkResourceNotFoundError(err_14, resourceB.resource.id, errorOccurred);
                    return [3 /*break*/, 8];
                case 8:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [2 /*return*/];
            }
        });
    }); });
    it("No error occurs when a sharer extends the sharing group of the resource C with the same user twice", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, err_15, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAndCheckResource(aliceSession, resourceC)];
                case 1:
                    _a.sent();
                    errorOccurred = { isTrue: false };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(bobSession).get(resourceC.resource.id)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_15 = _a.sent();
                    checkResourceNotFoundError(err_15, resourceC.resource.id, errorOccurred);
                    return [3 /*break*/, 5];
                case 5:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    i = 0;
                    _a.label = 6;
                case 6:
                    if (!(i < 2)) return [3 /*break*/, 10];
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).extendSharingGroup(resourceC.resource.id, [bob.login])];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(bobSession, resourceC)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 6];
                case 10: return [2 /*return*/];
            }
        });
    }); });
    it("No error occurs when a sharer extends the sharing group of the resource C with a repeated user", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, err_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAndCheckResource(aliceSession, resourceC)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(bobSession, resourceC)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).extendSharingGroup(resourceC.resource.id, [bob.login, bob.login])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(aliceSession, resourceC)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(bobSession, resourceC)];
                case 5:
                    _a.sent();
                    errorOccurred = { isTrue: false };
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(charlieSession).get(resourceC.resource.id)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    err_16 = _a.sent();
                    checkResourceNotFoundError(err_16, resourceC.resource.id, errorOccurred);
                    return [3 /*break*/, 9];
                case 9:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).extendSharingGroup(resourceC.resource.id, [charlie.login, charlie.login])];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(aliceSession, resourceC)];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(bobSession, resourceC)];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(charlieSession, resourceC)];
                case 13:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("No error occurs when a sharer extends the sharing group of the resource C with the same multiple users", function () { return __awaiter(_this, void 0, void 0, function () {
        var errorOccurred, err_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAndCheckResource(aliceSession, resourceC)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(bobSession, resourceC)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(charlieSession, resourceC)];
                case 3:
                    _a.sent();
                    errorOccurred = { isTrue: false };
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(daveSession).get(resourceC.resource.id)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_17 = _a.sent();
                    checkResourceNotFoundError(err_17, resourceC.resource.id, errorOccurred);
                    return [3 /*break*/, 7];
                case 7:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).extendSharingGroup(resourceC.resource.id, [bob.login, charlie.login, dave.login])];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(aliceSession, resourceC)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(bobSession, resourceC)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(charlieSession, resourceC)];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(daveSession, resourceC)];
                case 12:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("No error occurs when a sharer adds himself to the sharing group of the resource C", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAndCheckResource(aliceSession, resourceC)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).extendSharingGroup(resourceC.resource.id, [alice.login])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fetchAndCheckResource(aliceSession, resourceC)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("An identity cannot add himself to the sharers of an inexisting resource", function () { return __awaiter(_this, void 0, void 0, function () {
        var i, errorOccurred, err_18, randomResourceIdLong_1, i, errorOccurred, err_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 2)) return [3 /*break*/, 7];
                    errorOccurred = { isTrue: false };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(randomResourceId)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_18 = _a.sent();
                    randomResourceIdLong_1 = new Long(randomResourceId, 0, true);
                    checkResourceNotFoundError(err_18, randomResourceIdLong_1, errorOccurred);
                    return [3 /*break*/, 5];
                case 5:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 1];
                case 7:
                    i = 0;
                    _a.label = 8;
                case 8:
                    if (!(i < 2)) return [3 /*break*/, 14];
                    errorOccurred = { isTrue: false };
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(aliceSession).get(randomResourceIdLong)];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    err_19 = _a.sent();
                    checkResourceNotFoundError(err_19, randomResourceIdLong, errorOccurred);
                    return [3 /*break*/, 12];
                case 12:
                    chai_1.expect(errorOccurred.isTrue).to.be.true;
                    _a.label = 13;
                case 13:
                    i++;
                    return [3 /*break*/, 8];
                case 14: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=extendSharingGroup.js.map