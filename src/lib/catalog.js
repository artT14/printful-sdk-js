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
// II. CATALOG API
//------------------------------------------------------------------------------------------------------//
var CatalogAPI = /** @class */ (function (_super) {
    __extends(CatalogAPI, _super);
    function CatalogAPI(headers, origin) {
        return _super.call(this, headers, origin) || this;
    }
    /**
     * Returns list of Products available in the Printful
     *
     * @returns {promise} {products, error}
     * */
    CatalogAPI.prototype.getAllProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, result, code, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/products";
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), result = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { products: [], error: error }];
                        }
                        return [2 /*return*/, { products: result, error: {} }];
                }
            });
        });
    };
    /**
     * Returns information about a specific product and a list of variants for this product.
     *
     * @param {int} id - Product ID.
     *
     * @returns {promise} {product, variants, error}
    */
    CatalogAPI.prototype.getProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, result, code, error, _b, product, variants;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.origin + "/products/" + id;
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url)];
                    case 1:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _c.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _c.sent(), result = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { product: {}, variants: [], error: error }];
                        }
                        return [4 /*yield*/, result];
                    case 4:
                        _b = _c.sent(), product = _b.product, variants = _b.variants;
                        return [2 /*return*/, { product: product, variants: variants, error: {} }];
                }
            });
        });
    };
    /**
     * Returns information about a specific Variant and its Product
     * @param {int} id - Product ID.
     *
     * @returns {promise} {product, variant, error}
     * */
    CatalogAPI.prototype.getVariant = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, result, code, error, _b, product, variant;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.origin + "/products/variant/" + id;
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url)];
                    case 1:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _c.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _c.sent(), result = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { product: {}, variant: {}, error: error }];
                        }
                        return [4 /*yield*/, result];
                    case 4:
                        _b = _c.sent(), product = _b.product, variant = _b.variant;
                        return [2 /*return*/, { product: product, variant: variant, error: {} }];
                }
            });
        });
    };
    /**
     * Returns information about the size guide for a specific product.
     * @param {int} id - Product ID.
     * @param {boolean} [metric=true] - set true to return sizes in cm as opposed to inches (optional)
     *
     * @returns {promise} {product_id, available_sizes, size_tables, error}
     * */
    CatalogAPI.prototype.getSize = function (id, metric) {
        if (metric === void 0) { metric = false; }
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, result, code, error, _b, product_id, available_sizes, size_tables;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.origin + "/products/" + id + "/sizes?unit=" + (metric ? "cm" : "inches");
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url)];
                    case 1:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _c.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _c.sent(), result = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { product_id: -1, available_sizes: [], size_tables: [], error: error }];
                        }
                        return [4 /*yield*/, result];
                    case 4:
                        _b = _c.sent(), product_id = _b.product_id, available_sizes = _b.available_sizes, size_tables = _b.size_tables;
                        return [2 /*return*/, { product_id: product_id, available_sizes: available_sizes, size_tables: size_tables, error: {} }];
                }
            });
        });
    };
    /**
     * Returns list of Catalog Categories available in the Printful
     *
     * @returns {promise}
     */
    CatalogAPI.prototype.getAllCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, result, code, error, categories;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/categories/";
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), result = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { categories: [], error: error }];
                        }
                        return [4 /*yield*/, result];
                    case 4:
                        categories = (_b.sent()).categories;
                        // console.log(category);
                        return [2 /*return*/, { categories: categories, error: {} }];
                }
            });
        });
    };
    /**
     * Returns information about a specific category.
     * @param {int} id - Category ID
     *
     * @returns {promise} {category, error}
     * */
    CatalogAPI.prototype.getCategory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, result, code, error, category;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/categories/" + id;
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), result = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { category: {}, error: error }];
                        }
                        return [4 /*yield*/, result];
                    case 4:
                        category = (_b.sent()).category;
                        // console.log(category);
                        return [2 /*return*/, { category: category, error: {} }];
                }
            });
        });
    };
    return CatalogAPI;
}(generic_1.default));
exports.default = CatalogAPI;
