import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// 0. GENERIC API SUPERCLASS
//------------------------------------------------------------------------------------------------------//
export default class GenericAPI{
    protected origin: string
    protected headers: Headers
    
    constructor(headers: Headers, origin: string) {
        this.headers = headers;
        this.origin = origin;
    }
}