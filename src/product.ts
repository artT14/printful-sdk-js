/**
 * Stores Information about the SyncProduct
 */
class SyncProduct{
    /** 
     * @constructs SyncProduct
     * @summary Information about the SyncProduct
     * @param {string} name - (required) Product name
     * @param {string} thumbnail - (required) (<= 250 characters) Thumbnail image URL. Although we do not limit thumbnail image size, we recommend to keep it reasonably small.
     * @param {string} external_id - Product ID from the Ecommerce platform
     * @param {boolean} is_ignored - Indicates if this Sync Product is ignored
    */
    constructor(name, thumbnail, external_id, is_ignored){
        this.name = name;
        this.thumbnail = thumbnail;
        this.external_id = external_id || "";
        this.is_ignored = is_ignored || "";
    }
}

module.exports = {
    SyncProduct
}