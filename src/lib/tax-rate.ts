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
     * @returns {promise} {taxList, error}
     */
    async getCountryTexList(){
        const url = this.origin + "/tax/countries";
        const response = await fetch(url);
        const data = await response.json();
        const {result: taxList, code, error} = await data;
        if (code >= 400){
            return {taxList: null, error};
        }
        return {taxList, error: null}
    }

    /**
     * Calculates sales tax rate for given address if required
     * 
     * @param {Recipient} recipient - Recipient address information
     * 
     * @returns {promise} {taxRate, error}
     */
    async calcTax(recipient: Recipient){
        const url = this.origin + "/tax/rates";
        const response = await fetch(url,{
            method: "POST",
            body: JSON.stringify({recipient})
        });
        const data = await response.json();
        const {result: taxRate, code, error} = await data;
        if (code >= 400){
            return {taxRate: null, error};
        }
        return {taxRate, error: null}
    }
}