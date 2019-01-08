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
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var DataPeps = require("../src/DataPeps");
var DataPeps_1 = require("../src/DataPeps");
function itError(description, action, kind, payload) {
    var _this = this;
    return it(description + " expect error(" + kind + ")", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, expectError(action(), kind, payload != null ? payload() : null)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); });
}
exports.itError = itError;
function expectError(action, kind, payload) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, action];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    chai_1.expect(e_1).to.not.be.null;
                    chai_1.expect(e_1).instanceof(DataPeps.Error);
                    chai_1.expect(e_1.kind).equal(kind);
                    if (payload != null) {
                        chai_1.expect(payload).to.deep.equals(__assign({}, e_1.payload));
                    }
                    return [2 /*return*/];
                case 3: throw new Error("action should throw a DataPepsError(" + kind + ")");
            }
        });
    });
}
exports.expectError = expectError;
var ResourceContent = /** @class */ (function () {
    function ResourceContent(resource, content) {
        var textEncoder = new TextEncoder();
        this.plain = textEncoder.encode(content);
        this.encrypted = resource.encrypt(this.plain);
    }
    return ResourceContent;
}());
exports.ResourceContent = ResourceContent;
var Resource = /** @class */ (function () {
    function Resource(resource, content) {
        this.resource = resource;
        this.content = new ResourceContent(resource, content);
    }
    return Resource;
}());
exports.Resource = Resource;
// FUNCTIONS
function sleep(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
function wait(ms, predicate) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(ms > 0 && !predicate())) return [3 /*break*/, 2];
                    ms -= 10;
                    return [4 /*yield*/, sleep(10)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/, ms > 0];
            }
        });
    });
}
exports.wait = wait;
// CHECKING FUNCTIONS
function checkFetchedResource(resourceFetched, resourceExpected) {
    chai_1.expect(resourceFetched).to.not.be.null;
    chai_1.expect(resourceFetched.id).to.be.deep.equals(resourceExpected.resource.id);
    chai_1.expect(resourceFetched.payload).to.be.deep.equals(resourceExpected.resource.payload);
    var decryptedContent = resourceFetched.decrypt(resourceExpected.content.encrypted);
    chai_1.expect(decryptedContent).to.not.be.null;
    chai_1.expect(decryptedContent).to.be.deep.equals(resourceExpected.content.plain);
}
exports.checkFetchedResource = checkFetchedResource;
// deprecated
function checkError(err, errorOccurred, internalCheck) {
    chai_1.expect(err).to.not.be.null;
    chai_1.expect(err).instanceof(DataPeps.Error);
    internalCheck();
    errorOccurred.isTrue = true;
}
// deprecated
function checkResourceNotFoundError(err, resourceId, errorOccurred) {
    checkError(err, errorOccurred, function () {
        chai_1.expect(err.kind).equal(DataPeps.ServerError.ResourceNotFound);
        chai_1.expect(err.payload.id).to.be.deep.equals(resourceId);
    });
}
exports.checkResourceNotFoundError = checkResourceNotFoundError;
// deprec
function checkIdentityNotFoundError(err, errorOccurred) {
    checkError(err, errorOccurred, function () {
        chai_1.expect(err.kind).equal(DataPeps.ServerError.IdentityNotFound);
    });
}
exports.checkIdentityNotFoundError = checkIdentityNotFoundError;
function checkPayloadApplicationInvalidTokenError(err, errorOccurred) {
    checkError(err, errorOccurred, function () {
        chai_1.expect(err.kind).equal(DataPeps.ServerError.ApplicationInvalidToken);
    });
}
exports.checkPayloadApplicationInvalidTokenError = checkPayloadApplicationInvalidTokenError;
// FETCHING FUNCTIONS
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
exports.fetchAndCheckResource = fetchAndCheckResource;
//# sourceMappingURL=Utils.js.map