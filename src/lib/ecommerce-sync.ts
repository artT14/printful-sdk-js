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
     * @returns {promise} {result, paging, code, error}
     */
    async getAllEcommProducts(offset?: number, limit?: number, status?: Status, search?: string){
        const params = new URLSearchParams({});
        offset && params.append("offset", String(offset));
        limit && params.append("limit", String(limit));
        status && params.append("status", status);
        search && params.append("search", search);
        const url = this.origin + "/sync/products?" + params.toString();
        const response = await fetch(url, {headers:this.headers});
        const data = await response.json();
        const {result, paging, code, error} = await data;
        return code >= 400 ? {result: null, paging: {offset,limit}, code, error} : {result, paging, code, error: null};
    }

    /**
     * Get information about a single Sync Product and its Sync Variants
     * 
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {result, code, error}
     */
    async getEcommProduct(id: number | string){
        const url = this.origin+"/sync/products/"+id;
        const response = await fetch(url, {headers:this.headers});
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Deletes a Sync Product with all of its Sync Variants
     * 
     * @param id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {result, code, error}
     */
    async deleteEcommProduct(id: number | string){
        const url = this.origin+"/sync/products/"+id;
        const response = await fetch(url, {
            method: "DELETE",
            headers:this.headers
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Get information about a single Sync Variant
     * 
     * @param {int|string} id - Sync Variant ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {result, code, error}
     */
    async getEcommVariant(id: number | string){
        const url = this.origin+"/sync/variant/"+id;
        const response = await fetch(url, {headers: this.headers});
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Modifies an existing Sync Variant.
     * 
     * Please note that in the request body you only need to specify the fields that need to be changed. See examples for more insights.
     * 
     * @param {int|string} id - Sync Variant ID (integer) or External ID (if prefixed with `@`)
     * @param {OptionalSyncVariant} sync_variant_info - Information about the Sync Variant
     * 
     * @returns {promise} {result, code, error}
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
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Deletes configuraton information (variant_id, print files and options) and disables automatic order importing for this Sync Variant.
     * 
     * @param {int|string} id - Sync Variant ID (integer) or External ID (if prefixed with `@`)
     *
     * @returns {promise} {result, code, error}
     */
    async deleteEcommVariant(id: number | string){
        const url = this.origin+"/sync/variant/"+id;
        const response = await fetch(url, {
            method: "DELETE",
            headers: this.headers
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }
}