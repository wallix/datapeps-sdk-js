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
Object.defineProperty(exports, "__esModule", { value: true });
var proto_1 = require("./proto");
var AdminImpl = /** @class */ (function () {
    function AdminImpl(session) {
        this.session = session;
    }
    AdminImpl.prototype.setAdmin = function (login, admin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "POST", code: 200,
                            path: "/api/v4/identity/" + encodeURIComponent(login) + "/promote",
                            request: function () { return proto_1.types.IdentityPromoteRequest.encode({
                                admin: admin
                            }).finish(); }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AdminImpl.prototype.setActive = function (login, active) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "POST", code: 200,
                            path: "/api/v4/identity/" + encodeURI(login) + "/active",
                            request: function () { return proto_1.types.IdentityToggleActiveStatusRequest.encode({
                                login: login, active: active,
                            }).finish(); }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AdminImpl.prototype.overwriteKeys = function (login, secret) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.Identity.editSharingGraph(login, { overwriteKeys: { secret: secret } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminImpl.prototype.listRegisterTokens = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var links;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "GET", code: 200,
                            path: "/api/v4/register/links",
                            params: options,
                            response: proto_1.types.LinksGetResponse.decode
                        })];
                    case 1:
                        links = (_a.sent()).links;
                        return [2 /*return*/, links];
                }
            });
        });
    };
    return AdminImpl;
}());
exports.AdminImpl = AdminImpl;
//# sourceMappingURL=Admin.js.map