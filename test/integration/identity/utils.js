"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var DataPeps_1 = require("../../../src/DataPeps");
function expectContainsAllIdentities(expected, result, both) {
    if (both === void 0) { both = true; }
    if (both) {
        chai_1.expect(result.length, "identities list hasn't the same length").to.be.equals(expected.length);
    }
    expected.forEach(function (e) {
        chai_1.expect(result.find(function (r) { return r.login === e.login; }), "cannot find '" + e.login + "' in result").to.be.not.null;
    });
}
exports.expectContainsAllIdentities = expectContainsAllIdentities;
function expectIdentitiesListAreEquals(expected, result) {
    chai_1.expect(result.length, "identities list hasn't the same length").to.be.equals(expected.length);
    expected.forEach(function (e, i) {
        var r = result[i];
        chai_1.expect(e.login, "expected[" + i + "](" + e.login + ") != result[" + i + "](" + r.login).to.be.deep.equal(r.login);
    });
}
exports.expectIdentitiesListAreEquals = expectIdentitiesListAreEquals;
function sortIdentities(sortingField, sortingOrder, identities) {
    return identities.sort(compareIdentity(sortingField, sortingOrder));
}
exports.sortIdentities = sortIdentities;
function compareIdentity(sortingField, sortingOrder) {
    return function (a, b) {
        var afield, bfield;
        switch (sortingField) {
            case DataPeps_1.IdentitySortingField.CREATED:
                afield = a.created;
                bfield = b.created;
                break;
            case DataPeps_1.IdentitySortingField.KIND:
                afield = a.created;
                bfield = b.created;
                break;
            case DataPeps_1.IdentitySortingField.LOGIN:
                afield = a.created;
                bfield = b.created;
                break;
            default:
                throw new Error("sortingField not found");
        }
        switch (sortingOrder) {
            case DataPeps_1.IdentitySortingOrder.ASC:
                return afield < bfield ? -1 : afield > bfield ? 1 : 0;
            case DataPeps_1.IdentitySortingOrder.DESC:
                return afield < bfield ? 1 : afield > bfield ? -1 : 0;
        }
    };
}
//# sourceMappingURL=utils.js.map