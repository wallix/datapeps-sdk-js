"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var proto_1 = require("./proto");
var IdentityX = /** @class */ (function () {
    function IdentityX() {
    }
    IdentityX.fromapi = function (t) {
        var x = proto_1.api.Identity.create(t);
        return __assign({}, x, { created: new Date(t.created * 1000) });
    };
    IdentityX.toapi = function (i) {
        return __assign({}, i, { created: null });
    };
    return IdentityX;
}());
exports.IdentityX = IdentityX;
//# sourceMappingURL=IdentityInternal.js.map