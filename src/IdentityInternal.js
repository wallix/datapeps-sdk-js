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
var Tools_1 = require("./Tools");
var IdentitySerializer = /** @class */ (function () {
    function IdentitySerializer() {
    }
    IdentitySerializer.deserialize = function (t) {
        var x = proto_1.api.Identity.create(t);
        return __assign({}, x, { created: Tools_1.timestampToDate(t.created) });
    };
    return IdentitySerializer;
}());
exports.IdentitySerializer = IdentitySerializer;
/** Allows to specify whether the results should be sorted in ascending or descending order. */
var IdentitySortingOrder;
(function (IdentitySortingOrder) {
    IdentitySortingOrder[IdentitySortingOrder["DESC"] = 0] = "DESC";
    IdentitySortingOrder[IdentitySortingOrder["ASC"] = 1] = "ASC";
})(IdentitySortingOrder = exports.IdentitySortingOrder || (exports.IdentitySortingOrder = {}));
var IdentityRequestsUtils = /** @class */ (function () {
    function IdentityRequestsUtils() {
    }
    IdentityRequestsUtils.resolveSortingOrder = function (order) {
        var resolvedSortingOrder = proto_1.api.SortingOrder.ASC;
        if (order == null) {
            return resolvedSortingOrder;
        }
        if (order === IdentitySortingOrder.DESC) {
            resolvedSortingOrder = proto_1.api.SortingOrder.DESC;
        }
        else if (order != IdentitySortingOrder.ASC) {
            resolvedSortingOrder = order;
        }
        return resolvedSortingOrder;
    };
    return IdentityRequestsUtils;
}());
exports.IdentityRequestsUtils = IdentityRequestsUtils;
//# sourceMappingURL=IdentityInternal.js.map