/**
 * Information about the Sync Variants
 */
class SyncVariant{
    /** 
     * @constructs SyncVariant
     * @summary Information about the Sync Variants
     * @param {int} variant_id - (required) Printful Variant ID that this Sync Variant is synced to
     * @param {[File]} files - (required) Array of attached printfiles / preview images
     * @param {string} retail_price - Retail price that this item is sold for
     * @param {[SyncVariantOption]} options - Array of additional options for the configured product/variant, See Examples: {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Options Link}
     * @param {string} external_id - Variant ID from the Ecommerce platform
     * @param {boolean} is_ignored - Indicates if this Sync Variant is ignored
     * @param {string} sku - SKU of this Sync Variant
     * */
    constructor(variant_id, files, retail_price, options, external_id,  is_ignored, sku){
        this.variant_id = variant_id;
        this.files = files;
        this.retail_price = retail_price || "99.99";
        this.options = options || []
        this.external_id = external_id || "";
        this.is_ignored = is_ignored || false;
        this.sku = sku || "";
    }
}

/**
 * Additional option for the configured product/variant
 * See Examples: {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Options Link}
 */
class SyncVariantOption{
    /**
     * @constructs SyncVariantOption
     * @param {string} id - Option id
     * @param {string|[string]} value - Option value
     */
    constructor(id,value){
        this.id = id;
        this.value = value;
    }
}

module.exports = {
    SyncVariant,
    SyncVariantOption
}