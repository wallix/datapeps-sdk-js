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
var Resource_1 = require("./Resource");
var ChannelAPIImpl = /** @class */ (function () {
    function ChannelAPIImpl(session) {
        this.session = session;
    }
    ChannelAPIImpl.prototype.get = function (channelID) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, resource, r;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "GET", code: 200,
                            path: "/api/v4/channel/" + channelID.toString(),
                            response: proto_1.types.ChannelGetResponse.decode,
                        })];
                    case 1:
                        _a = _b.sent(), id = _a.id, resource = _a.resource;
                        return [4 /*yield*/, new Resource_1.ResourceImpl(this.session)._makeResourceFromResponse(resource, null, null)];
                    case 2:
                        r = _b.sent();
                        return [2 /*return*/, new ChannelResource(this.session, r, id)];
                }
            });
        });
    };
    ChannelAPIImpl.prototype.create = function (sharingGroup, options) {
        return __awaiter(this, void 0, void 0, function () {
            var type, payload, creator, encryptFunc, _a, body, keypair, id, resource;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options == null ? {} : options;
                        type = options.type == null ? proto_1.types.ResourceType.ANONYMOUS : options.type;
                        payload = {};
                        creator = this.session.getSessionPublicKey();
                        encryptFunc = this.session.encryption.encrypt(type);
                        return [4 /*yield*/, new Resource_1.ResourceImpl(this.session)._createBodyRequest(payload, sharingGroup, encryptFunc)];
                    case 1:
                        _a = _b.sent(), body = _a.body, keypair = _a.keypair;
                        return [4 /*yield*/, this.session.doProtoRequest({
                                method: "POST", code: 201,
                                path: "/api/v4/channels",
                                request: function () { return proto_1.types.ChannelPostRequest.encode(body).finish(); },
                                response: proto_1.types.ChannelPostResponse.decode
                            })];
                    case 2:
                        id = (_b.sent()).id;
                        resource = new Resource_1.Resource(null, "_internal_/channel", payload, keypair, creator);
                        return [2 /*return*/, new ChannelResource(this.session, resource, id)];
                }
            });
        });
    };
    return ChannelAPIImpl;
}());
exports.ChannelAPIImpl = ChannelAPIImpl;
var ChannelResource = /** @class */ (function () {
    function ChannelResource(session, resource, id) {
        this.session = session;
        this.resource = resource;
        this.id = id;
        this.creator = resource.creator;
    }
    ChannelResource.prototype.send = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.doProtoRequest({
                            method: "POST", code: 201,
                            path: "/api/v4/channel/" + this.id.toString() + "/messages",
                            request: function () { return proto_1.types.ChannelPostMessageRequest.encode({
                                content: _this.resource.encrypt(message)
                            }).finish(); }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChannelResource.prototype.listen = function (onMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.wsManager.listenChannelMessage(this.id, function (event) {
                            onMessage({
                                content: _this.resource.decrypt(event.payload.content),
                                from: null
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.session.wsManager.sendCommandSync(proto_1.command.RequestKind.ListenChannel, {
                                type: "RequestListenChannel",
                                value: proto_1.command.RequestListenChannel.create({
                                    id: this.id,
                                }),
                            })];
                }
            });
        });
    };
    return ChannelResource;
}());
//# sourceMappingURL=Channel.js.map