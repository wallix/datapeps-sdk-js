"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var proto_1 = require("./proto");
exports.ServerKind = proto_1.errors.PepsErrorKind;
var SDKKind;
(function (SDKKind) {
    SDKKind[SDKKind["BadStatusCode"] = -1] = "BadStatusCode";
    SDKKind[SDKKind["BadResponse"] = -2] = "BadResponse";
    SDKKind[SDKKind["NetworkException"] = -3] = "NetworkException";
    SDKKind[SDKKind["SDKInternalError"] = -4] = "SDKInternalError";
    SDKKind[SDKKind["SDKEncryptionDecryptFail"] = -5] = "SDKEncryptionDecryptFail";
    SDKKind[SDKKind["IdentitySignChainInvalid"] = -6] = "IdentitySignChainInvalid";
    SDKKind[SDKKind["ProtocolError"] = -7] = "ProtocolError";
    SDKKind[SDKKind["SDKDecryptFail"] = -8] = "SDKDecryptFail";
    SDKKind[SDKKind["InvalidServerChain"] = -10] = "InvalidServerChain";
})(SDKKind = exports.SDKKind || (exports.SDKKind = {}));
/**
 * The Error class for the DataPeps SDK.
 * Most of methods of the sdk return a {@link Promise<A>} that on success `resolve(A)` or, if rejected, a structured Error.
 */
var Error = /** @class */ (function () {
    function Error(properties) {
        // console.log("error", properties)
        // var err = new global.Error();
        // console.log("stack", err.stack)
        this.name = "DataPepsError";
        var kname = proto_1.errors.PepsErrorKind[properties.kind];
        if (kname == null) {
            kname = SDKKind[properties.kind];
        }
        this.message = "DataPepsError(" + kname + ")";
        this.kind = properties.kind;
        this.payload = properties.payload;
        this.code = properties.code;
    }
    return Error;
}());
exports.Error = Error;
//# sourceMappingURL=Error.js.map