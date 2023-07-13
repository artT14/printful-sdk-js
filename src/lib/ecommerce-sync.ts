import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";
import type { Status } from "../types/product";
import type { OptionalSyncVariant} from '../types/variant';

//------------------------------------------------------------------------------------------------------//
// VIII. ECOMMERCE PLATFORM SYNC API
//------------------------------------------------------------------------------------------------------//
export default class EcommerceSyncAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    /**
     * Returns list of Sync Product objects from your store.
     * 
     * QUERY PARAMS (OPTIONAL):
     * @param {int} offset - Result set offset
     * @param {int} limit - Number of items per page (max 100)
     * @param {string} status - Filter by item status (synced/unsynced/all). If only some of the variants are synced,the product is returned by both unsynced and synced filters
     * @param {string} search - Product search needle
     * 
     * @returns {promise} {products, paging, error} 
     */
    async getAllEcommProducts(offset: number = 0, limit: number = 20, status: Status = "all", search: string = ""){
        const url = this.origin + "/sync/products?" + "offset=" + offset + "&limit=" + limit + "&status=" + status + (search ? "&search=" + search : "");
        const response = await fetch(url, {headers:this.headers});
        const data = await response.json();
        const {result: products, paging, code, error} = await data;
        if (code >= 400){
            return {products: null, paging: {offset, limit}, error};
        }
        return {products, paging, error: null}
    }

    /**
     * Get information about a single Sync Product and its Sync Variants
     * 
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {sync_product, sync_variants, error}  
     */
    async getEcommProduct(id: number | string){
        const url = this.origin+"/sync/products/"+id;
        const response = await fetch(url, {headers:this.headers});
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {sync_product: null, sync_variants: null, error};
        }
        const {sync_product, sync_variants} = await result;
        return {sync_product, sync_variants, error: null};
    }

    /**
     * Deletes a Sync Product with all of its Sync Variants
     * 
     * @param id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {result, error}
     */
    async deleteEcommProduct(id: number | string){
        const url = this.origin+"/sync/products/"+id;
        const response = await fetch(url, {
            method: "DELETE",
            headers:this.headers
        });
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {result: null, error};
        }
        return {result, error: null};
    }

    /**
     * Get information about a single Sync Variant
     * 
     * @param {int|string} id - Sync Variant ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {sync_variant, sync_product, error}
     */
    async getEcommVariant(id: number | string){
        const url = this.origin+"/sync/variant/"+id;
        const response = await fetch(url, {headers: this.headers});
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {sync_variant: null, sync_product: null, error};
        }
        const {sync_variant, sync_product} = await result;
        return {sync_variant, sync_product, error: null};
    }

    /**
     * Modifies an existing Sync Variant.
     * 
     * Please note that in the request body you only need to specify the fields that need to be changed. See examples for more insights.
     * 
     * @param {int|string} id - Sync Variant ID (integer) or External ID (if prefixed with `@`)
     * @param {OptionalSyncVariant} sync_variant_info - Information about the Sync Variant
     * 
     * @returns {promise} return {sync_variant, sync_product, error}
    */
    async modifyEcommVariant(id: number | string, sync_variant_info: OptionalSyncVariant){
        const url = this.origin+"/sync/variant/"+id;
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(sync_variant_info),
            headers: this.headers
        });
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {sync_variant: null, sync_product: null, error};
        }
        const {sync_variant, sync_product} = await result;
        return {sync_variant, sync_product, error: null};
    }

    /**
     * Deletes configuraton information (variant_id, print files and options) and disables automatic order importing for this Sync Variant.
     * 
     * @param {int|string} id - Sync Variant ID (integer) or External ID (if prefixed with `@`)
     *
     * @returns {promise} return {sync_variant, sync_product, error}
     */
    async deleteEcommVariant(id: number | string){
        const url = this.origin+"/sync/variant/"+id;
        const response = await fetch(url, {
            method: "DELETE",
            headers: this.headers
        });
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {sync_variant: null, sync_product: null, error};
        }
        const {sync_variant, sync_product} = await result;
        return {sync_variant, sync_product, error: null};
    }
}