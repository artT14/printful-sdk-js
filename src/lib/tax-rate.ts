import fetch from 'cross-fetch';
import type { Recipient } from '../types/recipient';

//------------------------------------------------------------------------------------------------------//
// X. TAX RATE API
//------------------------------------------------------------------------------------------------------//
export default class TaxRateAPI{
    protected origin: string;
    constructor(origin: string){
        this.origin = origin;
    }

    /**
     * Retrieve state list that requires sales tax calculation
     * 
     * @returns {promise} {result, code, error}
     */
    async getCountryTaxList(){
        const url = this.origin + "/tax/countries";
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Calculates sales tax rate for given address if required
     * 
     * @param {Recipient} recipient - Recipient address information
     * 
     * @returns {promise} {result, code, error}
     */
    async calcTax(recipient: Recipient){
        const url = this.origin + "/tax/rates";
        const response = await fetch(url,{
            method: "POST",
            body: JSON.stringify({recipient})
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }
}