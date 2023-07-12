import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// XIV. WAREHOUSE PRODUCTS API
//------------------------------------------------------------------------------------------------------//
export default class WarehouseProductsAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    async getWarehouseProducts(){}

    async getWarehouseProduct(){}
}