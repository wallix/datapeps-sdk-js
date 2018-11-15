import * as DataPeps from "../../src/DataPeps";
import * as Long from "long";

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

export function randomID(): DataPeps.ID {
  return new Long(Math.random() * 0xffffffff, Math.random() * 0xffffffff, true);
}
