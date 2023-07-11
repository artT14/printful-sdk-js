import fetch from 'cross-fetch';
import type { SyncProduct, OptionalSyncProduct } from './types/product'
import type { SyncVariant, OptionalSyncVariant } from './types/variant';
import type { NewOrder, OrderStatus } from './types/order';

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

//------------------------------------------------------------------------------------------------------//
// I. OAUTH API
//------------------------------------------------------------------------------------------------------//
    async getScopes(){
        const url = this.origin+"/oauth/scopes";
        const response = await fetch(url,{headers: this.headers});
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {scopes: [], error};
        }
        const {scopes} = await result;
        return {scopes, error: {}};
    }

//------------------------------------------------------------------------------------------------------//
// II. CATALOG API
//------------------------------------------------------------------------------------------------------//

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

//------------------------------------------------------------------------------------------------------//
// III. PRODUCTS API
//------------------------------------------------------------------------------------------------------//

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
            return {products: [], paging: {offset,limit}, error};
        }
        return {products, paging, error: {}}
    }

    /**
     * Creates a new Sync Product together with its Sync Variants. See Examples: {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Create-a-new-Sync-Product Link}
     * 
     * Params:
     * @param {SyncProduct} sync_product - Information about the SyncProduct
     * @param {Array<SyncVariant>} sync_variants - Information about the Sync Variants
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
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {sync_product, sync_variants, error}
     */
    async getSyncProduct(id: number | string){
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
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {sync_product, sync_variants, error}
     */
    async deleteSyncProduct(id: number | string){
        const url = this.origin+"/store/products/"+id;
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

    /**
     * Modifies an existing Sync Product with its Sync Variants.

        Please note that in the request body you only need to specify the fields that need to be changed. Furthermore, if you want to update existing sync variants, then in the sync variants array you must specify the IDs of all existing sync variants. All omitted existing sync variants will be deleted. All new sync variants without an ID will be created. See examples for more insights.
        {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Modify-a-Sync-Product See Examples}
        Rate limiting: Up to 10 requests per 60 seconds. A 60 seconds lockout is applied if request count is exceeded.
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * @param {OptionalSyncProduct} sync_product - Information about the SyncProduct
     * @param {Array<OptionalSyncVariant>} sync_variants - Information about the Sync Variants
     * 
     * @returns {promise} {product, error}
     */
    async modifySyncProduct(id: number | string, sync_product: OptionalSyncProduct, sync_variants: Array<OptionalSyncVariant>){
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

    /**
     * Get information about a single Sync Variant.

     * @param {int|string} id -  Sync Variant ID (integer) or External ID (if prefixed with `@`)
     *
     * @returns {promise} {variant, error}
     */
    async getSyncVariant(id: number | string){
        const url = this.origin+"/store/variants/"+id;
        const response = await fetch(url, {headers: this.headers});
        const data = await response.json();
        const {result: variant, code, error} = await data;
        if (code >= 400){
            return {variant: {}, error};
        }
        return {variant, error: {}};
    }

    /**
     * Deletes a single Sync Variant.
     * 
     * @param {int|string} id - Sync Variant ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {result, error}
     */
    async deleteSyncVariant(id: number | string){
        const url = this.origin+"/store/variants/"+id;
        const response = await fetch(url, {
            method: "DELETE",
            headers: this.headers
        });
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {result: [], error};
        }
        return {result, error: {}};
    }

    /**
     * Modifies an existing Sync Variant.
     *
     * Please note that in the request body you only need to specify the fields that need to be changed. See examples for more insights.
     * {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Modify-a-Sync-Variant See examples}
     * @param {int|string} id - Sync Variant ID (integer) or External ID (if prefixed with `@`)
     * @param {OptionalSyncVariant} sync_variant - Information about the Sync Variant
     *
     * @returns {promise} {variant, error}
     */
    async modifySyncVariant(id: number | string, sync_variant: OptionalSyncVariant){
        const url = this.origin+"/store/variants/"+id;
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(sync_variant),
            headers: this.headers
        });
        const data = await response.json();
        const {result: variant, code, error} = await data;
        if (code >= 400){
            return {variant: {}, error};
        }
        return {variant, error: {}};
    }

    /**
     * Creates a new Sync Variant for an existing Sync Product
     * {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Create-a-new-Sync-Variant See Examples}
     * 
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with `@`)
     * @param {SyncVariant} sync_variant - Information about the Sync Variant
     * 
     * @returns {promise} {variant, error}
     */
    async createSyncVariant(id: number | string, sync_variant: SyncVariant){
        const url = this.origin+"/store/products/"+{id}+"/variants";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(sync_variant),
            headers: this.headers
        });
        const data = await response.json();
        const {result: variant, code, error} = await data;
        if (code >= 400){
            return {variant: {}, error};
        }
        return {variant, error: {}};
    }

//------------------------------------------------------------------------------------------------------//
// IV. PRODUCT TEMPLATES API
//------------------------------------------------------------------------------------------------------//

    /**
     * Returns a list of templates.
     * 
     * Query Params:
     * @param {int} offset - Result set offset
     * @param {int} limit - Number of items per page (max 100)
     * 
     * @returns {promise} {templates,paging,error}
     */
    async getProductTemplates(offset=0,limit=20){
        const url = this.origin+"/product-templates"+"?offset="+offset+"&limit="+limit;
        const response = await fetch(url, {headers: this.headers});
        const data = await response.json();
        const {code, result, paging, error} = await data;
        if (code >= 400){
            return {templates: [], paging: {offset, limit}, error};
        }
        const {items: templates} = await result;
        return {templates,paging,error:{}};
        
    }

    /**
     * Get information about a single product template
     * 
     * @param {int|string} id - Template ID (integer) or External Product ID (if prefixed with `@`)
     * 
     * @returns {promise} {template,error}
     */
    async getProductTemplate(id:number|string){
        const url = this.origin+"/product-templates/"+id;
        const response = await fetch(url, {headers: this.headers});
        const data = await response.json();
        const {code, result, error} = await data;
        if (code >= 400){
            return {template: {}, error};
        }
        return {template: result, error: {}};
    }

    /**
     * Delete product template by ID or External Product ID
     * 
     * @param {int|string} id  - Template ID (integer) or External Product ID (if prefixed with `@`)
     * 
     * @returns {promise} {success, error}
     */
    async deleteProductTemplate(id:number|string){
        const url = this.origin+"/product-templates/"+id;
        const response = await fetch(url, {
            method: "DELETE",
            headers: this.headers,
        });
        const data = await response.json();
        const {code, result, error} = await data;
        if (code >= 400){
            return {success: false, error};
        }
        const {success} = await result;
        return {success, error: {}};
    }
//------------------------------------------------------------------------------------------------------//
// V. ORDERS API
//------------------------------------------------------------------------------------------------------//

    /**
     * Returns list of order objects from your store
     * 
     * @param {string} status - Filter by order status
     * @param {int} offset -  Result set offset
     * @param {int} limit -  Number of items per page (max 100)
     * 
     * @returns {promise} {orders, paging, error}
     */
    async getOrders(offset=0, limit=20, status: OrderStatus){
        const url = this.origin+"/orders"+"?offset="+offset+"&limit="+limit+"&status="+status;
        const response = await fetch(url, {
            headers: this.headers,
        });
        const data = await response.json();
        const {code, result: orders, paging, error} = await data;
        if (code >= 400){
            return {orders: [], paging: {offset, limit}, error};
        }
        return {orders, paging, error: {}};
    }

    async createOrder(newOrder: NewOrder, confirm=false, update_existing=false){
        const url = this.origin+"/orders"+"?confirm="+confirm+"&update_existing="+update_existing;
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(newOrder)
        });
        const data = await response.json();
        const {code, result: order, error} = await data;
        if (code >= 400){
            return {order: {}, error};
        }
        return {order, error};
    }

//------------------------------------------------------------------------------------------------------//
// VI. FILE LIBRARY API
//------------------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------------------//
// VII. SHIPPING RATE API
//------------------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------------------//
// VIII. ECOMMERCE PLATFORM SYNC API
//------------------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------------------//
// IX. COUNTRY/STATE CODE API
//------------------------------------------------------------------------------------------------------//



//------------------------------------------------------------------------------------------------------//
// X. TAX RATE API
//------------------------------------------------------------------------------------------------------//



//------------------------------------------------------------------------------------------------------//
// XI. WEBHOOK API
//------------------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------------------//
// XII. STORE INFORMATION API
//------------------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------------------//
// XIII. MOCKUP GENERATOR API
//------------------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------------------//
// XIV. WAREHOUSE PRODUCTS API
//------------------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------------------//
// XV. REPORTS API
//------------------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------------------//
// XVI. APPROVAL SHEETS API
//------------------------------------------------------------------------------------------------------//



}

export function createPrintfulAcountClient(auth: string | undefined){
    return new PrintfulAcountClient(auth);
}