import fetch from 'cross-fetch';

//------------------------------------------------------------------------------------------------------//
// IX. COUNTRY/STATE CODE API
//------------------------------------------------------------------------------------------------------//
export default class CountryCodesAPI{
    protected origin: string;
    constructor(origin: string){
        this.origin = origin;
    }

    async getCountryList(){
        const url = this.origin + "/countries";
        const response = await fetch(url);
        const data = await response.json();
        const {result: countryCodes, code, error} = await data;
        if (code >= 400){
            return {countryCodes: [], error};
        }
        return {countryCodes, error: {}}
    }
}