const axios = require('axios')

class PrintfulAcountClient{
    origin = "https://api.printful.com"
    constructor(auth){
        this.auth = auth;
        this.headers = {Authorization: "Bearer " + this.auth};
    }

    /** Returns list of Products available in the Printful */
    async products(){
        const response = await axios.get(this.origin+"/products");
        const data = await response.data;
        if (data.code >= 400){
            return {products: [], error: data.error.message};
        }
        return {products: data.results, error: ""};
    }

    /** 
     * Returns information about a specific product and a list of variants for this product.
     * @param {number} id - Product ID.
    */
    async product(id){
        const response = await axios.get(this.origin+"/products"+id)
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
     * @param {number} id - Product ID.
     * */
    async variant(id){
        const response = await axios.get(this.origin+"/products/variant/"+id)
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
     * @param {number} id - Product ID.
     * @param {boolean} [metric=true] - set true to return sizes in cm as opposed to inches (optional)
     * */
    async size(id,metric=false){
        const response = await axios.get(this.origin+"/products/"+id+"/sizes?unit="+(metric?"cm":"inches"))
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
     * @param {number} id - Category ID
     * */
    async category(id){
        const response = await axios.get(this.origin+"/categories/"+id);
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
     * @param {string} [category_id] - (Optional) A comma-separated list of Category IDs of the Products that are to be returned 
     * ----------------------------------------------------------------
     * @todo Implement Paging
     */
    async syncProducts(category_id){
        const response = await axios.get(
            this.origin+"/store/products"+(category_id ? "?category_id="+category_id : ""),
            {headers:this.headers}
        );
        const data = await response.data;
        if (data.code >= 400){
            return {products: [], error: data.error.message};
        }
        const products = await data.result;
        return {products, error: ""}
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