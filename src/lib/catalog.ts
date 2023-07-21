import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// II. CATALOG API
//------------------------------------------------------------------------------------------------------//
export default class CatalogAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    /** 
     * Returns list of Products available in the Printful
     * 
     * @param {string} category_id - A comma-separated list of Category IDs of the Products that are to be returned
     * 
     * @returns {promise} {result, code, error}
     * */
    async getAllProducts(category_id?: string){
        const params = new URLSearchParams({});
        category_id && params.append("category_id", String(category_id));
        const url = this.origin+"/products?" + params.toString();
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /** 
     * Returns information about a specific Variant and its Product
     * @param {int} id - Product ID.
     * 
     * @returns {promise} {result, code, error}
     * */
    async getVariant(id: number){
        const url = this.origin+"/products/variant/"+id;
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /** 
     * Returns information about a specific product and a list of variants for this product.
     * 
     * @param {int} id - Product ID.
     * 
     * @returns {promise} {result, code, error}
    */
    async getProduct(id: number){
        const url = this.origin+"/products/"+id;
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};

    }

    /** 
     * Returns information about the size guide for a specific product.
     * @param {int} id - Product ID.
     * @param {boolean} [metric=true] - set true to return sizes in cm as opposed to inches (optional)
     * 
     * @returns {promise} {result, code, error}
     * */
    async getSize(id: number, metric=false){
        const params = new URLSearchParams({unit: metric?"cm":"inches"});
        const url = this.origin+"/products/"+id+"/sizes?"+ params.toString();
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Returns list of Catalog Categories available in the Printful
     * 
     * @returns {promise} {result, code, error}
     */
    async getAllCategories(){
        const url = this.origin+"/categories/";
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /** 
     * Returns information about a specific category.
     * @param {int} id - Category ID
     * 
     * @returns {promise} {result, code, error}
     * */
    async getCategory(id: number){
        const url = this.origin+"/categories/"+id;
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};

    }
}