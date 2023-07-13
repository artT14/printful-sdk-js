import fetch from 'cross-fetch';

//------------------------------------------------------------------------------------------------------//
// IX. COUNTRY/STATE CODE API
//------------------------------------------------------------------------------------------------------//
export default class CountryCodesAPI{
    protected origin: string;
    constructor(origin: string){
        this.origin = origin;
    }

    /**
     * Retrieve state list that requires sales tax calculation
     * 
     * @returns {promise} {countryCodes, error}
     */
    async getCountryList(){
        const url = this.origin + "/countries";
        const response = await fetch(url);
        const data = await response.json();
        const {result: countryCodes, code, error} = await data;
        if (code >= 400){
            return {countryCodes: null, error};
        }
        return {countryCodes, error: null}
    }
}