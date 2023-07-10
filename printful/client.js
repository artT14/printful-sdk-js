class PrintfulClient{
    origin = "https://api.printful.com"
    constructor(auth){
        this.auth = auth;
    }
    async products(){
        const response = await fetch(this.origin+"/products");
        const data = await response.json();
        if (data.code >= 400){
            return {products: [], error: data.error.message};
        }
        return {products: data.results, error: ""};
    }
}

export function createPrintfulClient(auth){
    return new PrintfulClient(auth);
}