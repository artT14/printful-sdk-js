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
// III. PRODUCTS API
//------------------------------------------------------------------------------------------------------//
var ProductsAPI = /** @class */ (function (_super) {
    __extends(ProductsAPI, _super);
    function ProductsAPI(headers, origin) {
        return _super.call(this, headers, origin) || this;
    }
    /**
     * Returns a list of Sync Product objects from your custom Printful store.
     *
     * Params:
     * @param {int} [offset=0] - Offset for Paging
     * @param {int} [limit=20] - Limit items for Paging
     * ----------------------------------------------------------------
     * Optional Params:
     * @param {string} [category_id] - (Optional) A comma-separated list of Category IDs of the Products that are to be returned
     *
     * @returns {promise} {products, paging, error}
     */
    ProductsAPI.prototype.getAllSyncProducts = function (offset, limit, category_id) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 20; }
        if (category_id === void 0) { category_id = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, products, paging, code, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/store/products?" + "offset=" + offset + "&limit=" + limit + (category_id ? "&category_id=" + category_id : "");
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url, { headers: this.headers })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), products = _a.result, paging = _a.paging, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { products: [], paging: { offset: offset, limit: limit }, error: error }];
                        }
                        return [2 /*return*/, { products: products, paging: paging, error: {} }];
                }
            });
        });
    };
    /**
     * Get information about a single Sync Product and its Sync Variants.
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     *
     * @returns {promise} {sync_product, sync_variants, error}
     */
    ProductsAPI.prototype.getSyncProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, result, code, error, _b, sync_product, sync_variants;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.origin + "/store/products/" + id;
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url, { headers: this.headers })];
                    case 1:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _c.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _c.sent(), result = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { sync_product: {}, sync_variants: [], error: error }];
                        }
                        return [4 /*yield*/, result];
                    case 4:
                        _b = _c.sent(), sync_product = _b.sync_product, sync_variants = _b.sync_variants;
                        // console.log(sync_product, sync_variants);
                        return [2 /*return*/, { sync_product: sync_product, sync_variants: sync_variants, error: {} }];
                }
            });
        });
    };
    /**
     * Creates a new Sync Product together with its Sync Variants. See Examples: {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Create-a-new-Sync-Product Link}
     *
     * Params:
     * @param {SyncProduct} sync_product - Information about the SyncProduct
     * @param {Array<SyncVariant>} sync_variants - Information about the Sync Variants
     *
     * @returns {promise} {product, error}
     */
    ProductsAPI.prototype.createSyncProduct = function (sync_product, sync_variants) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, product, code, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/store/products";
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url, {
                                method: "POST",
                                headers: this.headers,
                                body: JSON.stringify({ sync_product: sync_product, sync_variants: sync_variants })
                            })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), product = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { product: {}, error: error }];
                        }
                        return [2 /*return*/, { product: product, error: {} }];
                }
            });
        });
    };
    /**
     * Deletes a Sync Product with all of its Sync Variants
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     *
     * @returns {promise} {sync_product, sync_variants, error}
     */
    ProductsAPI.prototype.deleteSyncProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, result, code, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/store/products/" + id;
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url, {
                                method: "DELETE",
                                headers: this.headers
                            })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), result = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { result: [], error: error }];
                        }
                        return [2 /*return*/, { result: result, error: {} }];
                }
            });
        });
    };
    /**
     * Modifies an existing Sync Product with its Sync Variants.

        Please note that in the request body you only need to specify the fields that need to be changed. Furthermore, if you want to update existing sync variants, then in the sync variants array you must specify the IDs of all existing sync variants. All omitted existing sync variants will be deleted. All new sync variants without an ID will be created. See examples for more insights.
        {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Modify-a-Sync-Product See Examples}
        Rate limiting: Up to 10 requests per 60 seconds. A 60 seconds lockout is applied if request count is exceeded.
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * @param {OptionalSyncProduct} sync_product - Information about the SyncProduct
     * @param {Array<OptionalSyncVariant>} sync_variants - Information about the Sync Variants
     *
     * @returns {promise} {product, error}
     */
    ProductsAPI.prototype.modifySyncProduct = function (id, sync_product, sync_variants) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, product, code, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/store/products/" + id;
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url, {
                                method: "PUT",
                                headers: this.headers,
                                body: JSON.stringify({ sync_product: sync_product, sync_variants: sync_variants })
                            })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), product = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { product: {}, error: error }];
                        }
                        return [2 /*return*/, { product: product, error: {} }];
                }
            });
        });
    };
    /**
     * Get information about a single Sync Variant.

     * @param {int|string} id -  Sync Variant ID (integer) or External ID (if prefixed with `@`)
     *
     * @returns {promise} {variant, error}
     */
    ProductsAPI.prototype.getSyncVariant = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, variant, code, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/store/variants/" + id;
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url, { headers: this.headers })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), variant = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { variant: {}, error: error }];
                        }
                        return [2 /*return*/, { variant: variant, error: {} }];
                }
            });
        });
    };
    /**
     * Deletes a single Sync Variant.
     *
     * @param {int|string} id - Sync Variant ID (integer) or External ID (if prefixed with `@`)
     *
     * @returns {promise} {result, error}
     */
    ProductsAPI.prototype.deleteSyncVariant = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, result, code, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/store/variants/" + id;
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url, {
                                method: "DELETE",
                                headers: this.headers
                            })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), result = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { result: [], error: error }];
                        }
                        return [2 /*return*/, { result: result, error: {} }];
                }
            });
        });
    };
    /**
     * Modifies an existing Sync Variant.
     *
     * Please note that in the request body you only need to specify the fields that need to be changed. See examples for more insights.
     * {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Modify-a-Sync-Variant See examples}
     * @param {int|string} id - Sync Variant ID (integer) or External ID (if prefixed with `@`)
     * @param {OptionalSyncVariant} sync_variant - Information about the Sync Variant
     *
     * @returns {promise} {variant, error}
     */
    ProductsAPI.prototype.modifySyncVariant = function (id, sync_variant) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, variant, code, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/store/variants/" + id;
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url, {
                                method: "PUT",
                                body: JSON.stringify(sync_variant),
                                headers: this.headers
                            })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), variant = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { variant: {}, error: error }];
                        }
                        return [2 /*return*/, { variant: variant, error: {} }];
                }
            });
        });
    };
    /**
     * Creates a new Sync Variant for an existing Sync Product
     * {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Create-a-new-Sync-Variant See Examples}
     *
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * @param {SyncVariant} sync_variant - Information about the Sync Variant
     *
     * @returns {promise} {variant, error}
     */
    ProductsAPI.prototype.createSyncVariant = function (id, sync_variant) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, variant, code, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/store/products/" + { id: id } + "/variants";
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url, {
                                method: "POST",
                                body: JSON.stringify(sync_variant),
                                headers: this.headers
                            })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), variant = _a.result, code = _a.code, error = _a.error;
                        if (code >= 400) {
                            return [2 /*return*/, { variant: {}, error: error }];
                        }
                        return [2 /*return*/, { variant: variant, error: {} }];
                }
            });
        });
    };
    return ProductsAPI;
}(generic_1.default));
exports.default = ProductsAPI;
