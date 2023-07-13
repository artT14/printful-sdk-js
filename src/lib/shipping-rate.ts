import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";
import type { ShippingInfo } from "../types/shipping";

//------------------------------------------------------------------------------------------------------//
// VII. SHIPPING RATE API
//------------------------------------------------------------------------------------------------------//
export default class ShippingRateAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    /**
     * Returns available shipping options and rates for the given list of products.
     * 
     * @param {ShippingInfo} shipping_info - Recipient location information
     */
    async calculateShipping(shipping_info: ShippingInfo){
        const url = this.origin+"/shipping/rates";
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(shipping_info)
        });
        const data = await response.json();
        const {code, result: shipping_options, error} = await data;
        if (code >= 400){
            return {shipping_options: null, error};
        }
        return {shipping_options, error: null};
    }
}