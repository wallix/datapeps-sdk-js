"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Long = require("long");
var Tools_1 = require("./Tools");
var ID;
(function (ID) {
    function compare(a, b) {
        if (Long.isLong(a))
            return a.compare(b);
        return new Long(a).compare(b);
    }
    ID.compare = compare;
    function clip(id, data) {
        if (data instanceof Uint8Array) {
            var encapsulated = new Uint8Array(8 + data.length);
            var lid = Long.fromValue(id);
            var high = lid.getHighBitsUnsigned();
            encapsulated[0] = (high >>> 24) & 0xff;
            encapsulated[1] = (high >>> 16) & 0xff;
            encapsulated[2] = (high >>> 8) & 0xff;
            encapsulated[3] = high & 0xff;
            var low = lid.getLowBitsUnsigned();
            encapsulated[4] = (low >>> 24) & 0xff;
            encapsulated[5] = (low >>> 16) & 0xff;
            encapsulated[6] = (low >>> 8) & 0xff;
            encapsulated[7] = low & 0xff;
            encapsulated.set(data, 8);
            return encapsulated;
        }
        return id.toString() + "." + data;
    }
    ID.clip = clip;
    function unclip(data) {
        if (data instanceof Uint8Array) {
            var high = (data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3];
            var low = (data[4] << 24) + (data[5] << 16) + (data[6] << 8) + data[7];
            return { id: new Long(low, high, true), data: data.slice(8) };
        }
        var i = data.indexOf(".");
        var strId = data.slice(0, i);
        var id = Long.fromString(strId, true);
        return { id: id, data: data.slice(i + 1) };
    }
    ID.unclip = unclip;
    /**
     * Returns the date from a DataPeps ID
     * @param id The id from which the date is extracted
     * @return(s) The date of the creation of this id
     */
    ID.dateFromID = function (id) {
        var l;
        if (id instanceof Long) {
            l = id;
        }
        else {
            l = Long.fromNumber(id, true);
        }
        return Tools_1.timestampToDate(l.getHighBitsUnsigned());
    };
})(ID = exports.ID || (exports.ID = {}));
//# sourceMappingURL=ID.js.map