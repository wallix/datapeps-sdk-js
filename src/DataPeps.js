"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Long = require("long");
var protobufjs = require("protobufjs");
var HTTP = require("./HTTP");
var Application_1 = require("./Application");
var Error_1 = require("./Error");
exports.Error = Error_1.Error;
exports.ServerError = Error_1.ServerKind;
exports.SDKError = Error_1.SDKKind;
protobufjs.util.Long = Long;
protobufjs.configure();
/**
 * Configure the endpoint of the SDK.
 * @param APIUrl The url of the DataPeps service.
 */
function configure(APIUrl, WSUrl) {
    HTTP.configure(APIUrl);
}
exports.configure = configure;
/**
 * Gets the DataPeps login from the application identity login.
 * @param appLogin The application identity login (must not be null)
 * @param appID The application ID (must not be null)
 * @returns The DataPeps login of the application identity.
 */
function getLogin(appLogin, appID) {
    return Application_1.getLogin(appLogin, appID);
}
exports.getLogin = getLogin;
__export(require("./Register"));
__export(require("./ID"));
__export(require("./Session"));
__export(require("./DelegatedAccess"));
__export(require("./IdentityAPI"));
__export(require("./ResourceAPI"));
__export(require("./AdminAPI"));
__export(require("./ApplicationAPI"));
__export(require("./ApplicationJWT"));
__export(require("./Tenant"));
var Tools_1 = require("./Tools");
exports.Uint8Converter = Tools_1.Uint8Converter;
//# sourceMappingURL=DataPeps.js.map