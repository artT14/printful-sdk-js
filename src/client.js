"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrintfulAcountClient = exports.PrintfulAcountClient = void 0;
var oauth_1 = require("./lib/oauth");
var catalog_1 = require("./lib/catalog");
var products_1 = require("./lib/products");
var product_templates_1 = require("./lib/product-templates");
var orders_1 = require("./lib/orders");
var file_library_1 = require("./lib/file-library");
var shipping_rate_1 = require("./lib/shipping-rate");
var ecommerce_sync_1 = require("./lib/ecommerce-sync");
var country_state_code_1 = require("./lib/country-state-code");
var tax_rate_1 = require("./lib/tax-rate");
var webhook_1 = require("./lib/webhook");
var store_information_1 = require("./lib/store-information");
var mockup_generator_1 = require("./lib/mockup-generator");
var warehouse_products_1 = require("./lib/warehouse-products");
var reports_1 = require("./lib/reports");
var approval_sheets_1 = require("./lib/approval-sheets");
var PrintfulAcountClient = /** @class */ (function () {
    function PrintfulAcountClient(auth) {
        this.origin = "https://api.printful.com";
        this.headers = { Authorization: "Bearer " + (auth || "") };
        this.oauth = new oauth_1.default(this.headers, this.origin);
        this.catalog = new catalog_1.default(this.headers, this.origin);
        this.products = new products_1.default(this.headers, this.origin);
        this.productTemplates = new product_templates_1.default(this.headers, this.origin);
        this.orders = new orders_1.default(this.headers, this.origin);
        this.fileLibrary = new file_library_1.default(this.headers, this.origin);
        this.shippingRate = new shipping_rate_1.default(this.headers, this.origin);
        this.ecommerceSync = new ecommerce_sync_1.default(this.headers, this.origin);
        this.countryStateCode = new country_state_code_1.default(this.headers, this.origin);
        this.taxRate = new tax_rate_1.default(this.headers, this.origin);
        this.webhook = new webhook_1.default(this.headers, this.origin);
        this.storeInformation = new store_information_1.default(this.headers, this.origin);
        this.mockupGenerator = new mockup_generator_1.default(this.headers, this.origin);
        this.warehouseProducts = new warehouse_products_1.default(this.headers, this.origin);
        this.reports = new reports_1.default(this.headers, this.origin);
        this.approvalSheets = new approval_sheets_1.default(this.headers, this.origin);
    }
    return PrintfulAcountClient;
}());
exports.PrintfulAcountClient = PrintfulAcountClient;
function createPrintfulAcountClient(auth) {
    return new PrintfulAcountClient(auth);
}
exports.createPrintfulAcountClient = createPrintfulAcountClient;
