import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";
import type { OrderPackingSlip as PackingSlip } from "../types/order"

//------------------------------------------------------------------------------------------------------//
// XII. STORE INFORMATION API
//------------------------------------------------------------------------------------------------------//
export default class StoreInformationAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}
    
    /**
     * Modifies packing slip information of the currently authorized Printful store.
     * 
     * @return {promise} {}
     */
    async changePackingSlip(new_packing_slip: PackingSlip){
        const url = this.origin+"/store/packing-slip";
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(new_packing_slip)
        });
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {packing_slip: {}, error};
        }
        const {packing_slip} = await result;
        return {packing_slip, error: {}}
    }

    /**
     * Get basic information about a store based on provided ID
     * 
     * @param {number} offset - Offset for query
     * @param {number} limit  - Limit for query
     * 
     * @returns {promise} {stores, paging, error}
     */
    async getStoresInfo(offset: number = 0,limit: number = 20){
        const url = this.origin+"/stores"+"?offset="+offset+"&limit="+limit;
        const response = await fetch(url, {
            headers: this.headers,
        });
        const data = await response.json();
        const {result: stores, paging, code, error} = await data;
        if (code >= 400){
            return {stores: [], paging: {offset, limit}, error};
        }
        return {stores, paging, error: {}}
    }

    /**
     * Get basic information about a store based on provided ID
     * 
     * @param {int} id - Store ID
     * 
     * @returns {promise} {store, error} 
     */
    async getStoreInfo(id: number){
        const url = this.origin+"/stores/"+id;
        const response = await fetch(url, {
            headers: this.headers,
        });
        const data = await response.json();
        const {result: store, code, error} = await data;
        if (code >= 400){
            return {store: {}, error};
        }
        return {store, error: {}}
    }
}