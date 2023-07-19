import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// IV. PRODUCT TEMPLATES API
//------------------------------------------------------------------------------------------------------//
export default class ProductTemplatesAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    /**
     * Returns a list of templates.
     * 
     * Query Params:
     * @param {int} offset - Result set offset
     * @param {int} limit - Number of items per page (max 100)
     * 
     * @returns {promise} {result, paging, code, error}
     */
    async getAllTemplates(offset?: number, limit?: number){
        const params = new URLSearchParams({});
        offset && params.append("offset", String(offset));
        limit && params.append("limit", String(limit));
        const url = this.origin+"/product-templates?"+params.toString();
        const response = await fetch(url, {headers: this.headers});
        const data = await response.json();
        const {result, paging, code, error} = await data;
        return code >= 400 ? {result: null, paging: {offset,limit}, code, error} : {result, paging, code, error: null};
        
    }

    /**
     * Get information about a single product template
     * 
     * @param {int|string} id - Template ID (integer) or External Product ID (if prefixed with `@`)
     * 
     * @returns {promise} {result, code, error}
     */
    async getTemplate(id:number|string){
        const url = this.origin+"/product-templates/"+id;
        const response = await fetch(url, {headers: this.headers});
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Delete product template by ID or External Product ID
     * 
     * @param {int|string} id  - Template ID (integer) or External Product ID (if prefixed with `@`)
     * 
     * @returns {promise} {result, code, error}
     */
    async deleteTemplate(id:number|string){
        const url = this.origin+"/product-templates/"+id;
        const response = await fetch(url, {
            method: "DELETE",
            headers: this.headers,
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }
}