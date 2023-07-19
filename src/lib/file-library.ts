import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";
import type { File } from "../types/file";

//------------------------------------------------------------------------------------------------------//
// VI. FILE LIBRARY API
//------------------------------------------------------------------------------------------------------//
export default class FileLibraryAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    /**
     * Adds a new File to the library by providing URL of the file.

        If a file with identical URL already exists, then the original file is returned. If a file does not exist, a new file is created.
     * 
     * @param {File} fileData - Information about file being added
     * 
     * @returns {promise} {result, code, error}
     */
    async addFile(fileData: File){
        const url = this.origin+"/files";
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(fileData)
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Returns information about the given file.
     * 
     * @param {int|string} id - File ID.
     * 
     * @returns {promise} {result, code, error}
     */
    async getFile(id: number | string){
        const url = this.origin+"/files/"+id;
        const response = await fetch(url, {
            headers: this.headers,
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }

    /**
     * Returns colors in hexadecimal format.
     * 
     *  Returned thread colors are matched as closely as possible to provided image colors.
     * 
     * @param {string} file_url - URL to file
     * 
     * @returns {promise} {result, code, error}
     */
    async getThreadColors(file_url: string){
        const url = this.origin+"/files/thread-colors";
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({file_url})
        });
        const data = await response.json();
        const {result, code, error} = await data;
        return code >= 400 ? {result: null, code, error} : {result, code, error: null};
    }
}

