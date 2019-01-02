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
var nacl = require("tweetnacl");
var chai_1 = require("chai");
var DataPeps_1 = require("../../../src/DataPeps");
describe("resource.scenario", function () {
    var ctx;
    // Create alice, bob and a group
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var init;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    init = Context.init();
                    return [4 /*yield*/, Context.aliceBobWithDeviceAndGroup(init)];
                case 1:
                    ctx = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var res;
    var content;
    var encrypted;
    it("alice creates a selfish resource", function () { return __awaiter(_this, void 0, void 0, function () {
        var payload, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = nacl.randomBytes(2048);
                    payload = { description: "This is a test resource" };
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).create("test/A", payload, [
                            ctx.alice.identity.login
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
    it("alice retrieves the resource and decrypt the encrypted content", function () { return __awaiter(_this, void 0, void 0, function () {
        var resource, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(res.id)];
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
    it("bob try to retrieve the resource", function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(res.id)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    chai_1.expect(err_1).instanceof(DataPeps.Error);
                    chai_1.expect(err_1.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound);
                    chai_1.expect(err_1.payload.id).to.be.deep.equals(res.id);
                    return [2 /*return*/];
                case 3: throw new Error("bob should not can retrieve this resource");
            }
        });
    }); });
    it("alice creates a resource, shared with alice and bob", function () { return __awaiter(_this, void 0, void 0, function () {
        var payload, resource, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = nacl.randomBytes(2048);
                    payload = { description: "This is a test resource" };
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).create("test/B", payload, [ctx.alice.identity.login, ctx.bob.identity.login])];
                case 1:
                    resource = _a.sent();
                    chai_1.expect(resource).to.be.not.null;
                    encrypted = resource.encrypt(content);
                    result = resource.decrypt(encrypted);
                    chai_1.expect(result).to.be.deep.equals(content);
                    chai_1.expect(resource.payload).to.be.deep.equal(payload);
                    res = resource;
                    return [2 /*return*/];
            }
        });
    }); });
    var resourceAlice;
    it("alice retrieves the shared resource and decrypts the encrypted content", function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(res.id)];
                case 1:
                    resourceAlice = _a.sent();
                    chai_1.expect(resourceAlice).to.be.not.null;
                    result = resourceAlice.decrypt(encrypted);
                    chai_1.expect(result).to.be.deep.equals(content);
                    chai_1.expect(resourceAlice.payload).to.be.deep.equals(res.payload);
                    return [2 /*return*/];
            }
        });
    }); });
    it("bob retrieves the shared resource and decrypts the encrypted content", function () { return __awaiter(_this, void 0, void 0, function () {
        var resource, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(res.id)];
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
    it("alice renews its keys", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.alice.session.renewKeys()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("after key renewal alice retrieves the shared resource and decrypts the encrypted content", function () { return __awaiter(_this, void 0, void 0, function () {
        var resource, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(res.id)];
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
    var resourceBob;
    it("after key renews bob retrieves the shared resource and decrypt the encrypted content", function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(res.id)];
                case 1:
                    resourceBob = _a.sent();
                    chai_1.expect(resourceBob).to.be.not.null;
                    result = resourceBob.decrypt(encrypted);
                    chai_1.expect(result).to.be.deep.equals(content);
                    chai_1.expect(resourceBob.payload).to.be.deep.equals(res.payload);
                    return [2 /*return*/];
            }
        });
    }); });
    var contentBob;
    var encryptedBob;
    it("bob encrypts a data with the alice resource", function () {
        contentBob = nacl.randomBytes(2048);
        encryptedBob = resourceBob.encrypt(contentBob);
        var result = resourceBob.decrypt(encryptedBob);
        chai_1.expect(result).to.be.deep.equals(contentBob);
    });
    it("alice decrypts the data encrypted by bob", function () {
        var result = resourceAlice.decrypt(encryptedBob);
        chai_1.expect(result).to.be.deep.equals(contentBob);
    });
    it("bob tries to delete the alice resource", function () { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).delete(res.id)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    chai_1.expect(err_2).instanceof(DataPeps.Error);
                    chai_1.expect(err_2.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound);
                    chai_1.expect(err_2.payload.id).to.be.deep.equals(res.id);
                    return [2 /*return*/];
                case 3: throw new Error("bob should not delete the alice resource");
            }
        });
    }); });
    it("bob deletes its copy of the alice resource", function () { return __awaiter(_this, void 0, void 0, function () {
        var resource, result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).unlink(res.id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(res.id)];
                case 2:
                    resource = _a.sent();
                    chai_1.expect(resource).to.be.not.null;
                    result = resource.decrypt(encrypted);
                    chai_1.expect(result).to.be.deep.equals(content);
                    chai_1.expect(resource.payload).to.be.deep.equals(res.payload);
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(res.id)];
                case 4: return [2 /*return*/, _a.sent()];
                case 5:
                    err_3 = _a.sent();
                    chai_1.expect(err_3).instanceof(DataPeps.Error);
                    chai_1.expect(err_3.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound);
                    chai_1.expect(err_3.payload.id).to.be.deep.equals(res.id);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    it("alice deletes its resource", function () { return __awaiter(_this, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).delete(res.id)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(res.id)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_4 = _a.sent();
                    chai_1.expect(err_4).instanceof(DataPeps.Error);
                    chai_1.expect(err_4.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound);
                    chai_1.expect(err_4.payload.id).to.be.deep.equals(res.id);
                    return [2 /*return*/];
                case 5: throw new Error("alice get the deleted resource");
            }
        });
    }); });
    it("alice creates a resource, shared with the group", function () { return __awaiter(_this, void 0, void 0, function () {
        var payload, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = nacl.randomBytes(2048);
                    payload = { description: "This is a test resource" };
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).create("test/C", payload, [
                            ctx.group.login
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
    it("alice along the group retrieves the resource and decrypts the encrypted content", function () { return __awaiter(_this, void 0, void 0, function () {
        var resource, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(res.id, {
                        assume: ctx.group.login
                    })];
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
    it("bob try to retrieves the resource without group", function () { return __awaiter(_this, void 0, void 0, function () {
        var err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(res.id)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    chai_1.expect(err_5).instanceof(DataPeps.Error);
                    chai_1.expect(err_5.kind).to.be.equals(DataPeps.ServerError.ResourceNotFound);
                    chai_1.expect(err_5.payload.id).to.be.deep.equals(res.id);
                    return [2 /*return*/];
                case 3: throw new Error("bob should not can retreive this resource");
            }
        });
    }); });
    it("bob along the group retrieves the shared resource and decrypts the encrypted content", function () { return __awaiter(_this, void 0, void 0, function () {
        var resource, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(res.id, {
                        assume: ctx.group.login
                    })];
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
    it("alice renews keys of the group", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(ctx.alice.session).renewKeys(ctx.group.login)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("after key renewal, alice along the group retrieves the resource and decrypts the encrypted content", function () { return __awaiter(_this, void 0, void 0, function () {
        var resource, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.alice.session).get(res.id, {
                        assume: ctx.group.login
                    })];
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
    it("after key renewal, bob along the group retrieves the shared resource and decrypts the encrypted content", function () { return __awaiter(_this, void 0, void 0, function () {
        var resource, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(res.id, {
                        assume: ctx.group.login
                    })];
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
    it("check error on decrypt fail", function () { return __awaiter(_this, void 0, void 0, function () {
        var resource, result, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, new DataPeps_1.ResourceAPI(ctx.bob.session).get(res.id, {
                            assume: ctx.group.login
                        })];
                case 1:
                    resource = _a.sent();
                    chai_1.expect(resource).to.be.not.null;
                    result = resource.decrypt(nacl.randomBytes(128));
                    return [3 /*break*/, 3];
                case 2:
                    err_6 = _a.sent();
                    chai_1.expect(err_6).instanceof(DataPeps.Error);
                    chai_1.expect(err_6.kind).to.be.equals(DataPeps.SDKError.DecryptFail);
                    return [2 /*return*/];
                case 3: throw new Error("illegal decrypt doesn't throw error");
            }
        });
    }); });
});
//# sourceMappingURL=scenario.js.map