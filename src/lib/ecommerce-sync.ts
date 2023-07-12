import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// VIII. ECOMMERCE PLATFORM SYNC API
//------------------------------------------------------------------------------------------------------//
export default class EcommerceSyncAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    async getEcommProducts(){}

    async getEcommProduct(){}

    async deleteEcommProduct(){}

    async getEcommVariant(){}

    async modifyEcommVariant(){}

    async deleteEcommVariant(){}
}