import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// XIV. WAREHOUSE PRODUCTS API
//------------------------------------------------------------------------------------------------------//
export default class WarehouseProductsAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    /**
     * Returns a list of warehouse products from your store
     * 
     * @param {string} query - Filter by partial or full product name
     * @param {number} offset - Number of items per page (max 100)
     * @param {number} limit - Result set offset
     * 
     * @returns {promise} {result, paging, code, error}
     */
    async getAllWarehouseProducts(query?: string, offset?: number, limit?: number){
        const params = new URLSearchParams({});
        query && params.append("query", query);
        offset && params.append("offset", String(offset));
        limit && params.append("limit", String(limit))
        const url = this.origin + "/warehouse/products?" + params.toString();
        const response = await fetch(url, {
            headers: this.headers,
        });
        const data = await response.json();
        const {result, paging, code, error} = await data;
        return code >= 400 ? {result: null, paging: {offset,limit}, code, error} : {result, paging, code, error: null};
    }

    /**
     * Returns warehouse product data by ID
     * 
     * @param {int|string} id - Product ID
     * 
     * @returns {promise} {result, code, error}
     */
    async getWarehouseProduct(id: number | string){
        const url = this.origin + "/warehouse/products/" + id;
        const response = await fetch(url, {
            headers: this.headers,
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }
}