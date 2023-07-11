import GenericAPI from "./generic";
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// I. OAUTH API
//------------------------------------------------------------------------------------------------------//
export default class OAuthAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

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
}