"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionInternal_1 = require("./SessionInternal");
var Tools_1 = require("./Tools");
var GraphQL = /** @class */ (function () {
    function GraphQL(session) {
        this.api = SessionInternal_1.SessionState.create(session);
    }
    GraphQL.prototype.getHeaders = function (body) {
        return this.api.client.getAuthHeaders({
            method: "POST",
            body: Tools_1.Uint8Converter.fromString(body),
            path: "/any",
            expectedCode: 666
        });
    };
    return GraphQL;
}());
exports.GraphQL = GraphQL;
//# sourceMappingURL=GraphQL.js.map