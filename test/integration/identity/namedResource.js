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
var Long = require("long");
var Utils = require("../../Utils");
var Utils_1 = require("../../Utils");
var DataPeps = require("../../../src/DataPeps");
var DataPeps_1 = require("../../../src/DataPeps");
describe("identity.namedResource", function () {
    var resourceA, resourceB, resourceC;
    var resourceName = "nameOfMyResource";
    var ctx;
    var randomIdentity;
    var fakeId;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var init, resourceADataPeps, resourceBDataPeps, random, resourceCDataPeps;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Context.init()];
                case 1:
                    init = _a.sent();
                    return [4 /*yield*/, Context.aliceBobWithDeviceAndGroup(init)];
                case 2:
                    ctx = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).create("test kind", { text: "payload A" }, [ctx.alice.identity.login])];
                case 3:
                    resourceADataPeps = _a.sent();
                    resourceA = new Utils.Resource(resourceADataPeps, "Content A");
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).create("test kind", { text: "payload B" }, [ctx.alice.identity.login])];
                case 4:
                    resourceBDataPeps = _a.sent();
                    resourceB = new Utils.Resource(resourceBDataPeps, "Content B");
                    random = Math.floor(Math.random() * 0xffffffff);
                    randomIdentity = String(random);
                    fakeId = new Long(1, 0, true);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).create("test kind", { text: "payload C" }, [ctx.alice.identity.login])];
                case 5:
                    resourceCDataPeps = _a.sent();
                    resourceC = new Utils.Resource(resourceCDataPeps, "Content C");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Creation and access to a named resource", function () { return __awaiter(_this, void 0, void 0, function () {
        var namedResourceA;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // creation of the named resource (Alice, resourceName, resourceA)
                return [4 /*yield*/, new DataPeps_1.IdentityAPI(ctx.alice.session).setNamedResource(ctx.alice.identity.login, resourceName, resourceA.resource.id)];
                case 1:
                    // creation of the named resource (Alice, resourceName, resourceA)
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(ctx.alice.session).getNamedResource(ctx.alice.identity.login, resourceName)];
                case 2:
                    namedResourceA = _a.sent();
                    // verification that the obtained resource is the same as the original
                    Utils.checkFetchedResource(namedResourceA, resourceA);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Get a named resource when created by an identity in the sharing graph", function () { return __awaiter(_this, void 0, void 0, function () {
        var namedResourceA1, namedResourceA2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // AliceDevice creates a named resoure  (Alice, resourceName, resourceA)
                return [4 /*yield*/, new DataPeps_1.IdentityAPI(ctx.aliceDevice.session).setNamedResource(ctx.alice.identity.login, resourceName, resourceA.resource.id)];
                case 1:
                    // AliceDevice creates a named resoure  (Alice, resourceName, resourceA)
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(ctx.aliceDevice.session).getNamedResource(ctx.alice.identity.login, resourceName)];
                case 2:
                    namedResourceA1 = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(ctx.alice.session).getNamedResource(ctx.alice.identity.login, resourceName)];
                case 3:
                    namedResourceA2 = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Overwrite a named resource", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Alice creates the named resource (Alice, resourceName, resourceB) she overwrites (Alice, resourceName, resourceA)
                return [4 /*yield*/, new DataPeps_1.IdentityAPI(ctx.alice.session).setNamedResource(ctx.alice.identity.login, resourceName, resourceB.resource.id)];
                case 1:
                    // Alice creates the named resource (Alice, resourceName, resourceB) she overwrites (Alice, resourceName, resourceA)
                    _a.sent();
                    // Alice creates the named resource (Alice, resourceName, resourceA) she overwrites (Alice, resourceName, resourceB)
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(ctx.alice.session).setNamedResource(ctx.alice.identity.login, resourceName, resourceA.resource.id)];
                case 2:
                    // Alice creates the named resource (Alice, resourceName, resourceA) she overwrites (Alice, resourceName, resourceB)
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    Utils_1.itError("Put a named resource with a login that cannot be assumed", function () {
        return new DataPeps_1.IdentityAPI(ctx.alice.session).setNamedResource(ctx.bob.identity.login, resourceName, resourceA.resource.id);
    }, DataPeps.ServerError.IdentityCannotAssumeOwnership);
    Utils_1.itError("Put a named resource with a login that does not exists", function () {
        // Bob tries to creat the named resource (randomId, resourceName, resourceB) but he is not allowed to assume Alice identity
        return new DataPeps_1.IdentityAPI(ctx.bob.session).setNamedResource(randomIdentity, resourceName, resourceB.resource.id);
    }, DataPeps.ServerError.IdentityNotFound);
    it("Get a resource that has been removed", function () { return __awaiter(_this, void 0, void 0, function () {
        var resourceToDelete, idNotExisting;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(resourceB.resource.id)];
                case 1:
                    resourceToDelete = _a.sent();
                    idNotExisting = resourceToDelete.id;
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).delete(idNotExisting)];
                case 2:
                    _a.sent();
                    // checking that resource B has really been deleted
                    return [4 /*yield*/, Utils.expectError(new DataPeps_1.ResourceAPI(ctx.alice.session).get(idNotExisting), DataPeps.ServerError.ResourceNotFound)];
                case 3:
                    // checking that resource B has really been deleted
                    _a.sent();
                    // Alice tries to create of the named resource (Alice, resourceName, idNotExisting) with a resource id that does not exist (from deleted resourceB)
                    return [4 /*yield*/, Utils.expectError(new DataPeps_1.IdentityAPI(ctx.alice.session).setNamedResource(ctx.alice.identity.login, resourceName, idNotExisting), DataPeps.ServerError.ResourceNotFound)];
                case 4:
                    // Alice tries to create of the named resource (Alice, resourceName, idNotExisting) with a resource id that does not exist (from deleted resourceB)
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    Utils_1.itError("Get a named resource with a name that has not been associated", function () {
        // Alice tries to get the named resource (alice,resourceName+"difference") that does not exist
        return new DataPeps_1.IdentityAPI(ctx.alice.session).getNamedResource(ctx.alice.identity.login, resourceName + "difference");
    }, DataPeps.ServerError.NamedResourceNotFound, function () { return ({
        login: ctx.alice.identity.login,
        name: resourceName + "difference"
    }); });
    Utils_1.itError("Get a named resource with an identity that cannot be assumed", function () {
        // Bob tries to get the named resource (alice,resourceName) but he cannot assume Alice identity
        return new DataPeps_1.IdentityAPI(ctx.bob.session).getNamedResource(ctx.alice.identity.login, resourceName);
    }, DataPeps.ServerError.IdentityCannotAssumeOwnership);
    Utils_1.itError("Put a named resource with a resource ID that does not exists", function () {
        // Alice tries to create the named resource (Alice, resourceName, fakeId) with a resource id that does not exist: 1
        return new DataPeps_1.IdentityAPI(ctx.alice.session).setNamedResource(ctx.alice.identity.login, resourceName, fakeId);
    }, DataPeps.ServerError.ResourceNotFound, function () { return ({
        id: fakeId
    }); });
    Utils_1.itError("Get a named resource with a identity that does not exists", function () {
        // Alice tries to get the named resource (Alice, resourceName, fakeId) with a resource id that does not exist: 1
        return new DataPeps_1.IdentityAPI(ctx.alice.session).getNamedResource(randomIdentity, resourceName);
    }, DataPeps.ServerError.IdentityNotFound);
    Utils_1.itError("Get a named resource that could exist but does not", function () {
        // Bob tries to get the named resource (Bob,resourceName) that does not exist
        return new DataPeps_1.IdentityAPI(ctx.bob.session).getNamedResource(ctx.bob.identity.login, resourceName);
    }, DataPeps.ServerError.NamedResourceNotFound, function () { return ({
        login: ctx.bob.identity.login,
        name: resourceName
    }); });
    it("Overwrite a named resource", function () { return __awaiter(_this, void 0, void 0, function () {
        var namedResource;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Alice overwrites the named resource (Alice, resourceName, resourceA) with (Alice, resourceName, resourceC)
                return [4 /*yield*/, new DataPeps_1.IdentityAPI(ctx.alice.session).setNamedResource(ctx.alice.identity.login, resourceName, resourceC.resource.id)];
                case 1:
                    // Alice overwrites the named resource (Alice, resourceName, resourceA) with (Alice, resourceName, resourceC)
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(ctx.alice.session).getNamedResource(ctx.alice.identity.login, resourceName)];
                case 2:
                    namedResource = _a.sent();
                    // verification that the obtained resource is the same as the original
                    Utils.checkFetchedResource(namedResource, resourceC);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=namedResource.js.map