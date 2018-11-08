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
