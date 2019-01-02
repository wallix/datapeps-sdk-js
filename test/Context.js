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
var DataPeps = require("../src/DataPeps");
var Config = require("./Config");
var nacl = require("tweetnacl");
var DataPeps_1 = require("../src/DataPeps");
function init() {
    var seed = Math.floor(Math.random() * 99999);
    return { seed: seed };
}
exports.init = init;
function admin() {
    return __awaiter(this, void 0, void 0, function () {
        var admin, adminSecret, e_1, adminSession;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    admin = Config.admin;
                    adminSecret = new TextEncoder().encode(Config.adminSecret);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, DataPeps.register(admin, adminSecret)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    if (!(e_1 instanceof DataPeps.Error &&
                        e_1.kind == DataPeps.ServerError.IdentityAlreadyExists)) {
                        throw e_1;
                    }
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, DataPeps.Session.login(admin.login, adminSecret)];
                case 5:
                    adminSession = _a.sent();
                    return [2 /*return*/, { admin: admin, adminSecret: adminSecret, adminSession: adminSession }];
            }
        });
    });
}
exports.admin = admin;
function user(init, name) {
    return __awaiter(this, void 0, void 0, function () {
        var secret, identity;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    secret = nacl.randomBytes(128);
                    identity = {
                        login: name + "." + init.seed,
                        name: name + " martin",
                        kind: "pepsswarm/0",
                        payload: new TextEncoder().encode(JSON.stringify({
                            firstname: name,
                            lastname: "typescript",
                            description: name + " is a test identity from typescript integration test"
                        }))
                    };
                    return [4 /*yield*/, DataPeps.register(identity, secret)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, {
                            identity: __assign({}, identity, { created: new Date(), admin: false, active: true }),
                            secret: secret
                        }];
            }
        });
    });
}
exports.user = user;
function userAndSession(init, name) {
    return __awaiter(this, void 0, void 0, function () {
        var ctx, session;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user(init, name)];
                case 1:
                    ctx = _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(ctx.identity.login, ctx.secret)];
                case 2:
                    session = _a.sent();
                    return [2 /*return*/, __assign({}, ctx, { session: session })];
            }
        });
    });
}
exports.userAndSession = userAndSession;
function aliceBob(init) {
    return __awaiter(this, void 0, void 0, function () {
        var alice, bob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userAndSession(init, "alice")];
                case 1:
                    alice = _a.sent();
                    return [4 /*yield*/, userAndSession(init, "bob")];
                case 2:
                    bob = _a.sent();
                    return [2 /*return*/, { alice: alice, bob: bob }];
            }
        });
    });
}
exports.aliceBob = aliceBob;
function createDevice(user) {
    return __awaiter(this, void 0, void 0, function () {
        var device, secret, session;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    device = {
                        login: "device." + user.identity.login,
                        name: "Phone of " + user.identity.name,
                        kind: "test/device",
                        payload: null
                    };
                    secret = nacl.randomBytes(1024);
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(user.session).create(device, { secret: secret })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, DataPeps.Session.login(device.login, secret)];
                case 2:
                    session = _a.sent();
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(user.session).extendSharingGroup(user.identity.login, [
                            device.login
                        ])];
                case 3:
                    _a.sent();
                    return [2 /*return*/, {
                            secret: secret,
                            identity: __assign({}, device, { created: new Date(), admin: false, active: true }),
                            session: session
                        }];
            }
        });
    });
}
function aliceBobWithDeviceAndGroup(init) {
    return __awaiter(this, void 0, void 0, function () {
        var abCtx, groupFields, aliceDevice, bobDevice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, aliceBob(init)];
                case 1:
                    abCtx = _a.sent();
                    groupFields = {
                        login: "aliceBob." + init.seed,
                        name: "Alice&Bob's",
                        kind: "test/group",
                        payload: new TextEncoder().encode(JSON.stringify({
                            description: "A group shared by alice & bob"
                        }))
                    };
                    return [4 /*yield*/, new DataPeps_1.IdentityAPI(abCtx.alice.session).create(groupFields, {
                            sharingGroup: [abCtx.alice.identity.login, abCtx.bob.identity.login]
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, createDevice(abCtx.alice)];
                case 3:
                    aliceDevice = _a.sent();
                    return [4 /*yield*/, createDevice(abCtx.bob)];
                case 4:
                    bobDevice = _a.sent();
                    return [2 /*return*/, __assign({}, abCtx, { aliceDevice: aliceDevice,
                            bobDevice: bobDevice, group: __assign({}, groupFields, { created: new Date(), admin: false, active: true }) })];
            }
        });
    });
}
exports.aliceBobWithDeviceAndGroup = aliceBobWithDeviceAndGroup;
/**
 * Create a context with a developer that owns n application
 * @param init
 * @param n
 */
function dev(init, n) {
    if (n === void 0) { n = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var dev, apps;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userAndSession(init, "dev")];
                case 1:
                    dev = _a.sent();
                    return [4 /*yield*/, Promise.all(new Array(n)
                            .fill(null)
                            .map(function (_, i) { return ({
                            login: "app" + i + "." + init.seed,
                            name: "A killer app",
                            kind: "pepsswarm/3",
                            payload: new TextEncoder().encode(JSON.stringify({
                                description: "app allows you to do awesome stuff and respect your privacy"
                            }))
                        }); })
                            .map(function (app) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, new DataPeps_1.IdentityAPI(dev.session).create(app, {
                                            sharingGroup: [dev.identity.login]
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/, __assign({}, app, { created: new Date(), admin: false, active: true })];
                                }
                            });
                        }); }))];
                case 2:
                    apps = _a.sent();
                    return [2 /*return*/, {
                            dev: dev,
                            app: apps[0],
                            apps: apps
                        }];
            }
        });
    });
}
exports.dev = dev;
//# sourceMappingURL=Context.js.map