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
var nacl = require("tweetnacl");
var Long = require("long");
var proto_1 = require("./proto");
var Kval = /** @class */ (function () {
    function Kval(session) {
        this.session = session;
    }
    Kval.prototype.put = function (namespace, key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = {
                            namespace: namespace,
                            key: key,
                            value: value,
                            created: new Date().getTime()
                        };
                        this.sign(r);
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "PUT",
                                code: 201,
                                path: "/api/v4/kval/" + namespace,
                                request: function () { return proto_1.api.KvalPutRequest.encode(r).finish(); }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Kval.prototype.get = function (namespace, key) {
        return __awaiter(this, void 0, void 0, function () {
            var response, pk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "POST",
                            code: 200,
                            path: "/api/v4/kval/" + namespace,
                            request: function () { return proto_1.api.KvalGetRequest.encode({ key: key }).finish(); },
                            response: proto_1.api.KvalGetResponse.decode
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, this.verify(response)];
                    case 2:
                        pk = _a.sent();
                        return [2 /*return*/, { value: response.value, pk: pk }];
                }
            });
        });
    };
    Kval.prototype.sign = function (r) {
        var msg = Kval.messageToSign(r);
        r.signature = this.session.sign(msg);
    };
    Kval.prototype.verify = function (r) {
        return __awaiter(this, void 0, void 0, function () {
            var pkID, pk, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pkID = r.signedBy;
                        return [4 /*yield*/, this.session.getPublicKey(pkID)];
                    case 1:
                        pk = _a.sent();
                        msg = Kval.messageToSign(r);
                        nacl.sign.detached.verify(msg, r.signature, pk.sign);
                        return [2 /*return*/, pkID];
                }
            });
        });
    };
    Kval.messageToSign = function (_) {
        var ns = new TextEncoder().encode(_.namespace);
        var b = new Uint8Array(_.key.byteLength + _.value.byteLength + ns.byteLength + 8);
        var offset = 0;
        b.set(_.key, offset);
        offset += _.key.byteLength;
        b.set(_.value, offset);
        offset += _.value.byteLength;
        b.set(ns, offset);
        offset += ns.byteLength;
        var created = Long.fromValue(_.created);
        var high = created.getHighBits();
        b[offset++] = (high >>> 24) & 0xff;
        b[offset++] = (high >>> 16) & 0xff;
        b[offset++] = (high >>> 8) & 0xff;
        b[offset++] = high & 0xff;
        var low = created.getLowBits();
        b[offset++] = (low >>> 24) & 0xff;
        b[offset++] = (low >>> 16) & 0xff;
        b[offset++] = (low >>> 8) & 0xff;
        b[offset++] = low & 0xff;
        return b;
    };
    return Kval;
}());
exports.Kval = Kval;
var KvalDelegates = /** @class */ (function () {
    function KvalDelegates(kval) {
        this.kval = kval;
    }
    KvalDelegates.prototype.put = function (login, application, delegates) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.kval.put(KvalDelegates.NS, KvalDelegates.key(login, application), new TextEncoder().encode(delegates.join(",")))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KvalDelegates.prototype.get = function (login, application) {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.kval.get(KvalDelegates.NS, KvalDelegates.key(login, application))];
                    case 1:
                        r = _a.sent();
                        return [2 /*return*/, new TextDecoder().decode(r.value).split(",")];
                }
            });
        });
    };
    KvalDelegates.key = function (login, application) {
        return new TextEncoder().encode(login + "/" + application);
    };
    KvalDelegates.NS = "delegates";
    return KvalDelegates;
}());
exports.KvalDelegates = KvalDelegates;
//# sourceMappingURL=Kval.js.map