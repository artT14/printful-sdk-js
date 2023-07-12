import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// VI. FILE LIBRARY API
//------------------------------------------------------------------------------------------------------//
export default class FileLibraryAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    async addFile(){}

    async getFile(){}

    async getThreadColors(){}
}

