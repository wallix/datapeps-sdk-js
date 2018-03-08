"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////////////////////////////////
// Session
/////////////////////////////////////////////////
/** Allows to indicate which kind of access shoudl be used in a {@link SessionRequest}*/
var IdentityAccessKind;
(function (IdentityAccessKind) {
    IdentityAccessKind[IdentityAccessKind["READ"] = 0] = "READ";
    IdentityAccessKind[IdentityAccessKind["WRITE"] = 1] = "WRITE";
})(IdentityAccessKind = exports.IdentityAccessKind || (exports.IdentityAccessKind = {}));
/////////////////////////////////////////////////
// Resource
/////////////////////////////////////////////////
/**
 * The list the cryptographic schemes of a {@link Resource}
 */
var ResourceType;
(function (ResourceType) {
    ResourceType[ResourceType["ANONYMOUS"] = 0] = "ANONYMOUS";
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
//# sourceMappingURL=Interface.js.map