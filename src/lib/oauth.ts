import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// I. OAUTH API
//------------------------------------------------------------------------------------------------------//
export default class OAuthAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    /**
     * Returns a list of scopes associated with the token
     * 
     * @returns {promise} {scopes, error}
     */
    async getScopes(){
        const url = this.origin+"/oauth/scopes";
        const response = await fetch(url,{headers: this.headers});
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {scopes: null, error};
        }
        const {scopes} = await result;
        return {scopes, error: null};
    }
}