"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataPeps = require("../src/DataPeps");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
var APIHost = process.env.PEPSCRYPTO_HOST;
if (APIHost == null) {
    throw new Error("Missing PEPSCRYPTO_HOST");
}
APIHost = "https://" + APIHost;
var sdk = DataPeps;
exports.sdk = sdk;
sdk.configure(APIHost);
exports.admin = {
    login: "administrator",
    name: "Administrator created for Test from TS",
    admin: true,
    active: true,
    kind: "pepsswarm/0",
    created: new Date(),
    payload: {
        firstname: "Quentin",
        lastname: "Bourgerie"
    }
};
exports.adminSecret = "Azertyuiop33";
function init() {
    return sdk.register(exports.admin, exports.adminSecret).catch(function (err) {
        if (err instanceof DataPeps.Error) {
            if (err.kind == DataPeps.ServerError.IdentityAlreadyExists) {
                return;
            }
        }
        throw err;
    });
}
exports.init = init;
function adminLogin() {
    return DataPeps.Session.login(exports.admin.login, exports.adminSecret);
}
exports.adminLogin = adminLogin;
if (global["btoa"] === undefined) {
    global["btoa"] = require("btoa");
}
if (global["atob"] === undefined) {
    global["atob"] = require("atob");
}
if (global["TextEncoder"] === undefined) {
    global["TextEncoder"] = require("text-encoding").TextEncoder;
}
if (global["TextDecoder"] === undefined) {
    global["TextDecoder"] = require("text-encoding").TextDecoder;
}
if (global["XMLHttpRequest"] === undefined) {
    global["XMLHttpRequest"] = require("xhr2");
}
if (global["WebSocket"] === undefined) {
    global["WebSocket"] = require("ws");
}
//# sourceMappingURL=Config.js.map