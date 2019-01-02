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
var DataPeps_1 = require("../../../src/DataPeps");
var Context_1 = require("../../Context");
exports.HSKey = new TextEncoder().encode("aVerySecretKey");
exports.RSKey = new TextEncoder().encode("\n-----BEGIN PUBLIC KEY----- \nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy2kQaxIDLw6vXEmSyDIU\nW2+7zumTbO9KE2o5/afE55lUyTV8lY+kVZDoRToP6yfiUKYC9t3fFBui50rBdtXJ\nd8TgD7ecw9tdoLiQ8usELOIV1Il+e0NUOocypPRYuI26RzOBQ98ULtqXWRPvW7G3\nXhvwhB7FY31LXSRtbTA2ZOXhl64ZfWYBqWwsFMQ0wmWxnnF60J+NDESR1dWKHrzB\n0gaJAk341Mm0Golftan/R3Bd4uJ3u48gDr2uOzpSZB3m9VbK3sn1/1a2V/1mL20y\n/799hgxtB04Wz+cjm1O6gRuau7q7qxNRkvWL+hoXBXWUv2/WrBcglDr0f9tsvnh4\nfwIDAQAB\n-----END PUBLIC KEY-----");
exports.RSSecretKey = new TextEncoder().encode("-----BEGIN RSA PRIVATE KEY----- \nMIIEpQIBAAKCAQEAy2kQaxIDLw6vXEmSyDIUW2+7zumTbO9KE2o5/afE55lUyTV8\nlY+kVZDoRToP6yfiUKYC9t3fFBui50rBdtXJd8TgD7ecw9tdoLiQ8usELOIV1Il+\ne0NUOocypPRYuI26RzOBQ98ULtqXWRPvW7G3XhvwhB7FY31LXSRtbTA2ZOXhl64Z\nfWYBqWwsFMQ0wmWxnnF60J+NDESR1dWKHrzB0gaJAk341Mm0Golftan/R3Bd4uJ3\nu48gDr2uOzpSZB3m9VbK3sn1/1a2V/1mL20y/799hgxtB04Wz+cjm1O6gRuau7q7\nqxNRkvWL+hoXBXWUv2/WrBcglDr0f9tsvnh4fwIDAQABAoIBAQChrWnSYOfM8HQr\n+4LCwyNxJhd2OCvpCy2qzuU3G7GjkDlXEL9stVaeeGZWF/dtJy94gOucQvA8MFdE\nViP+C6FuJDsf4wakmmkKBYmYu3p/HljRrVOuL+7z8mArwtf+IRCt5V9ajiahszdX\nI0Q+crxX/gcnTLoCASX0665aelbRzIX1tNoM0a1RNA3/uzm2Nk+2inaZxiOR4NWP\nfQgRzWKRQcuNEioRj6Y+5YwujpBwXHrIicKYk5ov44PkUXRClhUHOY9p32t/sQ5n\n1tRQ/Tv0TUQ/IGJTGbocm6Ual6H/JFR/ndNfFywAmXLG4wVYW5A/hG3PeyM1nzUT\n/uQMPuMZAoGBAPw5/BP2IsUHZMrgNI/+Si49H6e/PwvlFwuzKPV+zKSJj1pq7Nlp\n9G9jd6mkRNKVJbzyDz0WxsUQ+ckzteBddQ/+Py3I6ynFn4yGk6YKa21FV0NU3CLi\ncORpAFVNMdhLUu5YpZ50cEWhbBU4nXbZuJTRO2NZJh83d9+lfiAYsXYzAoGBAM50\nHb0AjGDaa62i5Rlp9gusjzSiQcwS+3VB7qXmY8ANYwiZIV3VH/Ce7ieSeugL5wk9\nlik/6/8SynJcVut2aHtLQTJgEeRJQxzHyhVXwsxtyhOmoHSWhBdqOFVjZMgQ8X/t\nEIxytrWCQZpBn3pd6R5xrvd+jsL0YGKv/fLR8bCFAoGBAOv3U11ZaC3sPN+P4ZzU\nyZF4naTRxqnaKTVI54jEl69XAkYUwoCkH4oWBF0w0TIxVpzt2FPOeybiOs2BEyZU\nSLAtq+2pilgKCrntLTSpitcvh/P17/yy2+rUUPt8vKUd0vgo9sjHJkH+Qp+X17jY\n91ZCaM0JGiEaQ4t3yAc/EscBAoGAWFZi6x4y8rZC4LcUpD0spG4fkHvk/3cX1WJy\nxNXB1MllmKY9GrM4yXKXoKMSp/t/zfpmKBxL1IarzScpofK2XhsjOHTW8wFOECCE\nnYFBvsszbhkcCwbkWkh+9jpjQx/M1doP/KiQ+TVU8LYnkOph9z7ZiNjEKTL7kv6P\nALlIWykCgYEAxG42A1NZ5Mmu7Ekj/SYvqNzec9xcBfvmZvSZXnAxbHq39nCZL5rx\nZkNcAoPqjKeZPWJCMxGSXIp/oJlddzWStrN1DmdzisHHDMyIT0mNkLWeg5tvMKw2\noE8BxQLoYZ2SOqZN2GINoxlk9CcjYkAX7P6DxxS51dW+s6D+KZlbYAU=\n-----END RSA PRIVATE KEY-----");
exports.ESKey = new TextEncoder().encode("-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEQ4/x3bCZotGA3n+5CxFmuNZnzB7L\nZUd9C885FDhZN8+oRavvPrWSiGKv72hMKsfL9wVpEygSzZWXqZW+H/w7Jw==\n-----END PUBLIC KEY-----\n");
exports.ESSecretKey = new TextEncoder().encode("-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIPb0cw03iNESoTNmdGXxh/DUnuhGb7MIrJZl16dIGsojoAoGCCqGSM49\nAwEHoUQDQgAEQ4/x3bCZotGA3n+5CxFmuNZnzB7LZUd9C885FDhZN8+oRavvPrWS\niGKv72hMKsfL9wVpEygSzZWXqZW+H/w7Jw==\n-----END EC PRIVATE KEY-----");
var hsBadSecretKey = "badbadnotgood";
var rsaBadSecretKey = "-----BEGIN RSA PRIVATE KEY-----\nMIICWgIBAAKBgEQEKWAXTGo7N2Qqi6xgJt62WgvxlnCRBstz+A28eFjrEJiICrOR\nFT72ntoeQNM6QzB994+4iAu6bgR3Fq+EJgWhgcjpjnGZGkmehVacqdKgjSclFyHN\n0XMnRauwp6UVlqX7nh6w6QXLUsVRRNkGtYlpAoUudFMrzIZjhsN4xIMxAgMBAAEC\ngYAmnmJLwA7QRn0l745Mum93hvxLyclMctvzyw3t5rRCcH2EzcGdwWPZ0zfQytqt\n1Gfv8aYNwY3lct4ixOdpktPvSqy4dlcoC91ihDI3SzpTr+mInWxf0sBGsZHjd/94\n0SuEPlLz9EsAuGRLZ1MWcQGXZgm/SRklsWo/LWHoLYVqPQJBAIZUick15MOzREbr\ntdwg5vBi1prcT9xU9nblX4r7Icvk4kOFCzzfAvSdzgkkKBJsg2qUHsb5Hp0r/+Ve\n0earX7sCQQCBnz+5dnshzGIvui+loYlpAdZ5VxgKIO3cYaqO0QgPt4wo7ipcZprN\nJqIuwkhsc9b8zoAION9wEyTMA0qsZuwDAkAQdxJAgIOe3T1UOBYdekb0VhkZ+EEt\nr5haMHlKjsewt0hooEklV+yD0Ufs5Oqof3aIPMmc9/Ihr7/4/GtcC8t7AkAtrCMU\nAj9YpV9jWcM4JTb5nQApORrrVrb5FCC4ucaRYycrtN+QN0cMSjSTLTm/nQF/inNq\ncj+oidZJXE+Pd6RpAkBJERT8s8Oqd+bMNJfoq491U9oWm8OAkGyQJg8+hPNDd1+O\nTueuJ5lmKkvL4rj2g0FAT494kVQX8ehzdpsK/BHi\n-----END RSA PRIVATE KEY-----";
var ecdsaBadSecretKey = "-----BEGIN EC PRIVATE KEY-----\nMHQCAQEEIDzzdyNssoQ8INJVzkF2iUSCX2tKKW4VdxRWx3iqwD2joAcGBSuBBAAK\noUQDQgAE8AAAdm47cDORi5tu2ozSPqtsKOJR9Zy/GIPmTl35MlDaGQciYTKKSfa5\n+D7iGI4DYI/vxYsLEKjxpWLajz7XCw==\n-----END EC PRIVATE KEY-----";
function getBadAlgoKey(algo) {
    switch (algo) {
        case DataPeps_1.ApplicationJWT.Algorithm.HS256:
        case DataPeps_1.ApplicationJWT.Algorithm.HS384:
        case DataPeps_1.ApplicationJWT.Algorithm.HS512:
            return hsBadSecretKey;
        case DataPeps_1.ApplicationJWT.Algorithm.RS256:
        case DataPeps_1.ApplicationJWT.Algorithm.RS384:
        case DataPeps_1.ApplicationJWT.Algorithm.RS512:
            return rsaBadSecretKey;
        case DataPeps_1.ApplicationJWT.Algorithm.ES256:
        case DataPeps_1.ApplicationJWT.Algorithm.ES384:
        case DataPeps_1.ApplicationJWT.Algorithm.ES512:
            return ecdsaBadSecretKey;
        default:
            throw "unknown ApplicationJWTAlgorithm: " + algo;
    }
}
exports.getBadAlgoKey = getBadAlgoKey;
function getKey(algo, secret) {
    switch (algo) {
        case DataPeps_1.ApplicationJWT.Algorithm.HS256:
        case DataPeps_1.ApplicationJWT.Algorithm.HS384:
        case DataPeps_1.ApplicationJWT.Algorithm.HS512:
            return exports.HSKey;
        case DataPeps_1.ApplicationJWT.Algorithm.RS256:
        case DataPeps_1.ApplicationJWT.Algorithm.RS384:
        case DataPeps_1.ApplicationJWT.Algorithm.RS512:
            return secret ? exports.RSSecretKey : exports.RSKey;
        case DataPeps_1.ApplicationJWT.Algorithm.ES256:
        case DataPeps_1.ApplicationJWT.Algorithm.ES384:
        case DataPeps_1.ApplicationJWT.Algorithm.ES512:
            return secret ? exports.ESSecretKey : exports.ESKey;
        default:
            throw "unknown ApplicationJWTAlgorithm: " + algo;
    }
}
exports.configs = Object.keys(DataPeps_1.ApplicationJWT.Algorithm)
    .filter(function (key) { return !isNaN(Number(key)); })
    .map(function (key) {
    var signAlgorithm = Number(key);
    return {
        secretKey: getKey(signAlgorithm, true),
        config: {
            key: getKey(signAlgorithm, false),
            signAlgorithm: signAlgorithm,
            claimForLogin: "login"
        }
    };
});
/**
 * Create a devCtx with n applications that are configured with all different
 * JWT configs + 1 application that is not configured.
 */
function devWithAllConfigs(init) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var devCtx, api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Context_1.dev(init, exports.configs.length + 1)];
                case 1:
                    devCtx = _a.sent();
                    api = new DataPeps_1.ApplicationAPI(devCtx.dev.session);
                    return [4 /*yield*/, Promise.all(devCtx.apps.slice(0, exports.configs.length).map(function (app, i) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, api.putConfig(app.login, {
                                            jwt: exports.configs[i].config
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, devCtx];
            }
        });
    });
}
exports.devWithAllConfigs = devWithAllConfigs;
//# sourceMappingURL=Utils.js.map