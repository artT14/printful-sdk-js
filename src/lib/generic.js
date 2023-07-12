"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//------------------------------------------------------------------------------------------------------//
// 0. GENERIC API SUPERCLASS
//------------------------------------------------------------------------------------------------------//
var GenericAPI = /** @class */ (function () {
    function GenericAPI(headers, origin) {
        this.headers = headers;
        this.origin = origin;
    }
    return GenericAPI;
}());
exports.default = GenericAPI;
