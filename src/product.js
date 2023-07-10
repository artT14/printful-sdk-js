/**
 * Stores Information about the SyncProduct
 */
class SyncProduct{
    /** 
     * @constructs SyncProduct
     * @summary Information about the SyncProduct
     * @param {string} name - (required) Product name
     * @param {string} external_id - Product ID from the Ecommerce platform
     * @param {string} thumbnail - (<= 250 characters) Thumbnail image URL. Although we do not limit thumbnail image size, we recommend to keep it reasonably small.
     * @param {boolean} is_ignored - Indicates if this Sync Product is ignored
    */
    constructor(name,external_id,thumbnail,is_ignored){
        this.name = name;
        this.external_id = external_id || "";
        this.thumbnail = thumbnail || "";
        this.is_ignored = is_ignored || "";
    }
}

module.exports = {
    SyncProduct
}