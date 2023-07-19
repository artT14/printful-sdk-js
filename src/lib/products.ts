import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";
import type { SyncProduct, OptionalSyncProduct } from '../types/product'
import type { SyncVariant, OptionalSyncVariant } from '../types/variant';

//------------------------------------------------------------------------------------------------------//
// III. PRODUCTS API
//------------------------------------------------------------------------------------------------------//
export default class ProductsAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

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
     * @returns {promise} {result, paging, code, error}
     */
    async getAllSyncProducts(offset?: number, limit?: number, category_id?: string){
        const params = new URLSearchParams({});
        offset && params.append("offset", String(offset));
        limit && params.append("limit", String(limit));
        category_id && params.append("category_id", category_id);
        const url = this.origin+"/store/products?" + params.toString();
        const response = await fetch(url, {headers:this.headers});
        const data = await response.json();
        const {result, paging, code, error} = await data;
        return code >= 400 ? {result: null, paging: {offset,limit}, code, error} : {result, paging, code, error: null};
    }

    /**
     * Creates a new Sync Product together with its Sync Variants. See Examples: {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Create-a-new-Sync-Product Link}
     * 
     * Params:
     * @param {SyncProduct} sync_product - Information about the SyncProduct
     * @param {Array<SyncVariant>} sync_variants - Information about the Sync Variants
     * 
     * @returns {promise} {result, code, error}
     */
    async createSyncProduct(sync_product: SyncProduct, sync_variants: Array<SyncVariant>){
        const url = this.origin+"/store/products";
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({sync_product, sync_variants})
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Get information about a single Sync Product and its Sync Variants.
     * 
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {result, code, error}
     */
    async getSyncProduct(id: number | string){
        const url = this.origin+"/store/products/"+id;
        const response = await fetch(url, {headers:this.headers});
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Deletes a Sync Product with all of its Sync Variants
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {result, code, error}
     */
    async deleteSyncProduct(id: number | string){
        const url = this.origin+"/store/products/"+id;
        const response = await fetch(url, {
            method: "DELETE",
            headers:this.headers
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Modifies an existing Sync Product with its Sync Variants.

        Please note that in the request body you only need to specify the fields that need to be changed. Furthermore, if you want to update existing sync variants, then in the sync variants array you must specify the IDs of all existing sync variants. All omitted existing sync variants will be deleted. All new sync variants without an ID will be created. See examples for more insights.
        {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Modify-a-Sync-Product See Examples}
        Rate limiting: Up to 10 requests per 60 seconds. A 60 seconds lockout is applied if request count is exceeded.
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * @param {OptionalSyncProduct} sync_product - Information about the SyncProduct
     * @param {Array<OptionalSyncVariant>} sync_variants - Information about the Sync Variants
     * 
     * @returns {promise} {result, code, error}
     */
    async modifySyncProduct(id: number | string, sync_product?: OptionalSyncProduct, sync_variants?: Array<OptionalSyncVariant>){
        const url = this.origin+"/store/products/"+id;
        const response = await fetch(url, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify({sync_product, sync_variants})
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Get information about a single Sync Variant.

     * @param {int|string} id -  Sync Variant ID (integer) or External ID (if prefixed with `@`)
     *
     * @returns {promise} {result, code, error}
     */
    async getSyncVariant(id: number | string){
        const url = this.origin+"/store/variants/"+id;
        const response = await fetch(url, {headers: this.headers});
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }
    
    /**
     * Deletes a single Sync Variant.
     * 
     * @param {int|string} id - Sync Variant ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {result, code, error}
     */
    async deleteSyncVariant(id: number | string){
        const url = this.origin+"/store/variants/"+id;
        const response = await fetch(url, {
            method: "DELETE",
            headers: this.headers
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Modifies an existing Sync Variant.
     *
     * Please note that in the request body you only need to specify the fields that need to be changed. See examples for more insights.
     * {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Modify-a-Sync-Variant See examples}
     * @param {int|string} id - Sync Variant ID (integer) or External ID (if prefixed with `@`)
     * @param {OptionalSyncVariant} sync_variant - Information about the Sync Variant
     *
     * @returns {promise} {result, code, error}
     */
    async modifySyncVariant(id: number | string, sync_variant: OptionalSyncVariant){
        const url = this.origin+"/store/variants/"+id;
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(sync_variant),
            headers: this.headers
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Creates a new Sync Variant for an existing Sync Product
     * {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Create-a-new-Sync-Variant See Examples}
     * 
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * @param {SyncVariant} sync_variant - Information about the Sync Variant
     * 
     * @returns {promise} {result, code, error}
     */
    async createSyncVariant(id: number | string, sync_variant: SyncVariant){
        const url = this.origin+"/store/products/"+id+"/variants";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(sync_variant),
            headers: this.headers
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }
}