import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// VII. SHIPPING RATE API
//------------------------------------------------------------------------------------------------------//
export default class ShippingRateAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    async calculateShipping(){}
}