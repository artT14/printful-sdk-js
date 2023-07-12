import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// X. TAX RATE API
//------------------------------------------------------------------------------------------------------//
export default class TaxRateAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    async getCountryTexList(){}

    async calcTax(){}
}