"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var generic_1 = require("./generic");
var cross_fetch_1 = require("cross-fetch");
//------------------------------------------------------------------------------------------------------//
// V. ORDERS API
//------------------------------------------------------------------------------------------------------//
var OrdersAPI = /** @class */ (function (_super) {
    __extends(OrdersAPI, _super);
    function OrdersAPI(headers, origin) {
        return _super.call(this, headers, origin) || this;
    }
    /**
     * Returns list of order objects from your store
     *
     * QUERY PARAMS:
     * @param {string} status - Filter by order status
     * @param {int} offset -  Result set offset
     * @param {int} limit -  Number of items per page (max 100)
     *
     * @returns {promise} {orders, paging, error}
     */
    OrdersAPI.prototype.getOrders = function (offset, limit, status) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 20; }
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, code, orders, paging, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/orders" + "?offset=" + offset + "&limit=" + limit + "&status=" + status;
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url, {
                                headers: this.headers,
                            })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), code = _a.code, orders = _a.result, paging = _a.paging, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { orders: [], paging: { offset: offset, limit: limit }, error: error }];
                        }
                        return [2 /*return*/, { orders: orders, paging: paging, error: {} }];
                }
            });
        });
    };
    /**
     * Creates a new order and optionally submits it for fulfillment
     *
     * QUERY PARAMS:
     * @param {NewOrder} newOrder - information about new order
     * @param {boolean} confirm - Automatically submit the newly created order for fulfillment (skip the Draft phase)
     * @param {boolean} update_existing - Try to update existing order if an order with the specified external_id already exists
     *
     * @returns {promise} {order, error}
     */
    OrdersAPI.prototype.createOrder = function (newOrder, confirm, update_existing) {
        if (confirm === void 0) { confirm = false; }
        if (update_existing === void 0) { update_existing = false; }
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, code, order, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/orders" + "?confirm=" + confirm + "&update_existing=" + update_existing;
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url, {
                                method: "POST",
                                headers: this.headers,
                                body: JSON.stringify(newOrder)
                            })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), code = _a.code, order = _a.result, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { order: {}, error: error }];
                        }
                        return [2 /*return*/, { order: order, error: error }];
                }
            });
        });
    };
    OrdersAPI.prototype.getOrder = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    OrdersAPI.prototype.cancelOrder = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    OrdersAPI.prototype.updateOrder = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    OrdersAPI.prototype.confirmOrder = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    OrdersAPI.prototype.estimateOrderCost = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return OrdersAPI;
}(generic_1.default));
exports.default = OrdersAPI;
