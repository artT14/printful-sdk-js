/**
 * Information about the Sync Variants
 */
class SyncVariant{
    /** 
     * @constructs SyncVariant
     * @summary Information about the Sync Variants
     * @param {number} variant_id - (required) (must be int) Printful Variant ID that this Sync Variant is synced to
     * @param {[File]} files - (required) Array of attached printfiles / preview images
     * @param {string} external_id - Variant ID from the Ecommerce platform
     * @param {string} retail_price - Retail price that this item is sold for
     * @param {boolean} is_ignored - Indicates if this Sync Variant is ignored
     * @param {string} sku - SKU of this Sync Variant
     * @param {[SyncVariantOption]} options - Array of additional options for the configured product/variant, See Examples: {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Options}
     * */
    constructor(variant_id, files, external_id, retail_price, is_ignored, sku, options){
        this.variant_id = variant_id;
        this.files = files;
        this.external_id = external_id || "";
        this.retail_price = retail_price || "99.99";
        this.is_ignored = is_ignored || false;
        this.sku = sku || "";
        this.options = options || []
    }
}

/**
 * Additional option for the configured product/variant
 * See Examples: {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Options}
 */
class SyncVariantOption{
    /**
     * @constructs SyncVariantOption
     * @param {string} id - Option id
     * @param {string} value - Option value
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