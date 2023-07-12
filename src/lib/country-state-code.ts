import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// IX. COUNTRY/STATE CODE API
//------------------------------------------------------------------------------------------------------//
export default class CountryStateCodeAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    async getCountryList(){}
}