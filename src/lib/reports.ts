import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// XV. REPORTS API
//------------------------------------------------------------------------------------------------------//
export default class ReportsAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    async getStats(){}
}