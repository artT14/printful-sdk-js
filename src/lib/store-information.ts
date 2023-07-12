import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// XII. STORE INFORMATION API
//------------------------------------------------------------------------------------------------------//
export default class StoreInformationAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}
    
    async changePackingSlip(){}

    async getStoresInfo(){}

    async getStoreInfo(){}
}