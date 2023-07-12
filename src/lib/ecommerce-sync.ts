import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";
import type { Status } from "../types/product";

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
            return {products: [], paging: {offset, limit}, error};
        }
        return {products, paging, error: {}}
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
            return {sync_product: {}, sync_variants: [], error};
        }
        const {sync_product, sync_variants} = await result;
        return {sync_product, sync_variants, error: {}};
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
            return {result: [], error};
        }
        return {result, error: {}};
    }

    async getEcommVariant(){}

    async modifyEcommVariant(){}

    async deleteEcommVariant(){}
}