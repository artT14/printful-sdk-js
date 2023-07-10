const axios = require('axios')

class PrintfulAcountClient{
    origin = "https://api.printful.com"
    constructor(auth){
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
        const response = await axios.get(url);
        const data = await response.data;
        if (data.code >= 400){
            return {products: [], error: data.error.message};
        }
        return {products: data.results, error: ""};
    }

    /** 
     * Returns information about a specific product and a list of variants for this product.
     * 
     * @param {int} id - Product ID.
     * 
     * @returns {promise} {product, variants, error}
    */
    async getProduct(id){
        const url = this.origin+"/products"+id;
        const response = await axios.get(url)
        const data = await response.data;
        if (data.code >= 400){
            return {product: {}, variants:[], error: data.error.message};
        }
        const {product, variants} = data.result;
        // console.log(product,variants);
        return {product, variants, error: ""};
    }

    /** 
     * Returns information about a specific Variant and its Product
     * @param {int} id - Product ID.
     * 
     * @returns {promise} {product, variant, error}
     * */
    async getVariant(id){
        const url = this.origin+"/products/variant/"+id;
        const response = await axios.get(url)
        const data = await response.data;
        if (data.code >= 400){
            return {product: {}, variant:{}, error: data.error.message};
        }
        const {product, variant} = data.result;
        // console.log(product,variant);
        return {product, variant, error: ""};
    }
    
    /** 
     * Returns information about the size guide for a specific product.
     * @param {int} id - Product ID.
     * @param {boolean} [metric=true] - set true to return sizes in cm as opposed to inches (optional)
     * 
     * @returns {promise} {product_id, available_sizes, size_tables, error}
     * */
    async getSize(id,metric=false){
        const url = this.origin+"/products/"+id+"/sizes?unit="+(metric?"cm":"inches");
        const response = await axios.get(url);
        const data = await response.data;
        if (data.code >= 400){
            return {product_id: -1, available_sizes:[], size_tables:[], error: data.error.message};
        }
        const {product_id, available_sizes, size_tables} = await data.result;
        console.log(product_id, available_sizes, size_tables);
        return {product_id, available_sizes, size_tables, error: ""};
    }

    /** 
     * Returns information about a specific category.
     * @param {int} id - Category ID
     * 
     * @returns {promise} {category, error}
     * */
    async getCategory(id){
        const url = this.origin+"/categories/"+id;
        const response = await axios.get(url);
        const data = await response.data;
        if (data.code >= 400){
            return {category: {}, error: data.error.message};
        }
        const {category} = await data.result;
        // console.log(category);
        return {category, error: ""};
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
    async getSyncProducts(offset=0, limit=20, category_id){
        const url = this.origin+"/store/products?"+"offset="+offset+"&limit="+limit+(category_id ? "&category_id="+category_id : "");
        const response = await axios.get(url, {headers:this.headers});
        const data = await response.data;
        if (data.code >= 400){
            return {products: [], paging: {}, error: data.error.message};
        }
        const {result: products, paging} = await data;
        // console.log(products);
        return {products, paging, error: ""}
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
    async createSyncProduct(sync_product, sync_variants){
        const url = this.origin+"/store/products";
        const response = await axios.post(
            url,
            { sync_product, sync_variants },
            { headers: this.headers }
        );
        const data = await response.data;
        if (data.code >= 400){
            return {product: {}, error: data.error.message};
        }
        const {result: product} = await data;
        // console.log(product);
        return {product, error: ""};
    }

    /**
     * Get information about a single Sync Product and its Sync Variants.
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with @)
     * 
     * @returns {promise} {sync_product, sync_variants, error}
     */
    async getSyncProduct(id){
        const url = this.origin+"/store/products/"+id;
        const response = await axios.get(url,{ headers: this.headers });
        const data = await response.data;
        if (data.code >= 400){
            return {sync_product: {}, sync_variants: [], error: data.error.message};
        }
        const {sync_product, sync_variants} = await data.result;
        // console.log(sync_product, sync_variants);
        return {sync_product, sync_variants, error: ""};
    }

    test(){
        console.log("Printful Client works!");
    }
}

function createPrintfulAcountClient(auth){
    return new PrintfulAcountClient(auth);
}

module.exports = {
    createPrintfulAcountClient
}