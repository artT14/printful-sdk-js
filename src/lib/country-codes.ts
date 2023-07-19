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
     * @returns {promise} {result, code, error}
     */
    async getCountryList(){
        const url = this.origin + "/countries";
        const response = await fetch(url);
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }
}