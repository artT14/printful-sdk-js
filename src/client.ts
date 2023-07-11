import fetch from 'cross-fetch';
import type { SyncProduct, OptionalSyncProduct } from './types/product'
import type { SyncVariant, OptionalSyncVariant } from './types/variant';

export class PrintfulAcountClient{
    origin = "https://api.printful.com"
    protected auth: string | undefined;
    protected headers: {
        Authorization: string
    }
    constructor(auth: string | undefined){
        this.auth = auth;
        this.headers = {Authorization: "Bearer " + this.auth};
    }

    /** 
     * Returns list of Products available in the Printful
     * 
     * @returns {promise} {products, error}
     * */
    async getProducts(){
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
    async getCategories(){
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
     * @returns {promise} {products, paging, error}
     */
    async getSyncProducts(offset=0, limit=20, category_id=""){
        const url = this.origin+"/store/products?"+"offset="+offset+"&limit="+limit+(category_id ? "&category_id="+category_id : "");
        const response = await fetch(url, {headers:this.headers});
        const data = await response.json();
        const {result: products, paging, code, error} = await data;
        if (code >= 400){
            return {products: [], paging: {}, error};
        }
        return {products, paging, error: {}}
    }

    /**
     * Creates a new Sync Product together with its Sync Variants. See Examples: {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Create-a-new-Sync-Product Link}
     * 
     * Params:
     * @param {SyncProduct} sync_product - Information about the SyncProduct
     * @param {[SyncVariant]} sync_variants - Information about the Sync Variants
     * 
     * @returns {promise} {product, error}
     */
    async createSyncProduct(sync_product: SyncProduct, sync_variants: Array<SyncVariant>){
        const url = this.origin+"/store/products";
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({sync_product, sync_variants})
        });
        const data = await response.json();
        const {result: product, code, error} = await data;
        if (code >= 400){
            return {product: {}, error};
        }
        return {product, error: {}};
    }

    /**
     * Get information about a single Sync Product and its Sync Variants.
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with @)
     * 
     * @returns {promise} {sync_product, sync_variants, error}
     */
    async getSyncProduct(id: number){
        const url = this.origin+"/store/products/"+id;
        const response = await fetch(url, {headers:this.headers});
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {sync_product: {}, sync_variants: [], error};
        }
        const {sync_product, sync_variants} = await result;
        // console.log(sync_product, sync_variants);
        return {sync_product, sync_variants, error: {}};
    }

    /**
     * Deletes a Sync Product with all of its Sync Variants
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with @)
     * 
     * @returns {promise} {sync_product, sync_variants, error}
     */
    async deleteSyncProduct(id: number){
        const url = this.origin+"/store/products/"+id;
        const response = await fetch(url, {
            method: "DELETE",
            headers:this.headers
        });
        const data = await response.json();
        console.log(data);
        const {result, code, error} = await data;
        if (code >= 400){
            return {sync_product: {}, sync_variants: [], error};
        }
        const {sync_product, sync_variants} = await result;
        // console.log(sync_product, sync_variants);
        return {sync_product, sync_variants, error: {}};
    }

    async modifySyncProduct(id: number, sync_product: OptionalSyncProduct, sync_variants: Array<OptionalSyncVariant>){
        const url = this.origin+"/store/products/"+id;
        const response = await fetch(url, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify({sync_product, sync_variants})
        });
        const data = await response.json();
        const {result: product, code, error} = await data;
        if (code >= 400){
            return {product: {}, error};
        }
        return {product, error: {}};
    }

    test(){
        console.log("Printful Client works!");
    }
}

export function createPrintfulAcountClient(auth: string | undefined){
    return new PrintfulAcountClient(auth);
}