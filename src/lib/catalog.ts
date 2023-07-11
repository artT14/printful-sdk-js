import GenericAPI from "./generic";
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// II. CATALOG API
//------------------------------------------------------------------------------------------------------//
export default class Catalog extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    /** 
     * Returns list of Products available in the Printful
     * 
     * @returns {promise} {products, error}
     * */
    async getAllProducts(){
        const url = this.origin+"/products";
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {products: [], error};
        }
        return {products: result, error: {}};
    }

    /** 
     * Returns information about a specific product and a list of variants for this product.
     * 
     * @param {int} id - Product ID.
     * 
     * @returns {promise} {product, variants, error}
    */
    async getProduct(id: number){
        const url = this.origin+"/products/"+id;
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {product: {}, variants:[], error};
        }
        const {product, variants} = await result;
        return {product, variants, error: {}};
    }

    /** 
     * Returns information about a specific Variant and its Product
     * @param {int} id - Product ID.
     * 
     * @returns {promise} {product, variant, error}
     * */
    async getVariant(id: number){
        const url = this.origin+"/products/variant/"+id;
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {product: {}, variant:{}, error};
        }
        const {product, variant} = await result;
        return {product, variant, error: {}};
    }

    /** 
     * Returns information about the size guide for a specific product.
     * @param {int} id - Product ID.
     * @param {boolean} [metric=true] - set true to return sizes in cm as opposed to inches (optional)
     * 
     * @returns {promise} {product_id, available_sizes, size_tables, error}
     * */
    async getSize(id: number,metric=false){
        const url = this.origin+"/products/"+id+"/sizes?unit="+(metric?"cm":"inches");
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {product_id: -1, available_sizes:[], size_tables:[], error};
        }
        const {product_id, available_sizes, size_tables} = await result;
        return {product_id, available_sizes, size_tables, error: {}};
    }

    /**
     * Returns list of Catalog Categories available in the Printful
     * 
     * @returns {promise}
     */
    async getAllCategories(){
        const url = this.origin+"/categories/";
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {categories: [], error};
        }
        const {categories} = await result;
        // console.log(category);
        return {categories, error: {}};
    }

    /** 
     * Returns information about a specific category.
     * @param {int} id - Category ID
     * 
     * @returns {promise} {category, error}
     * */
    async getCategory(id: number){
        const url = this.origin+"/categories/"+id;
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {category: {}, error};
        }
        const {category} = await result;
        // console.log(category);
        return {category, error: {}};
    }
}