import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";
import type { ApprovalSheetChanges } from "../types/approval-sheet";

//------------------------------------------------------------------------------------------------------//
// XVI. APPROVAL SHEETS API
//------------------------------------------------------------------------------------------------------//
export default class ApprovalSheetsAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    /**
     * Retrieve a list of approval sheets confirming suggested changes to files of on hold orders.
     * 
     * @returns {promise} {sheets, error}
     */
    async getApprovalSheets(){
        const url = this.origin + "/approval-sheets";
        const response = await fetch(url, {
            headers: this.headers,
        });
        const data = await response.json();
        const {result: sheets, code, error} = await data;
        if (code >= 400){
            return {sheets: null, error};
        }
        return {sheets, error: null}
    }

    /**
     * Uses the confirm hash of an approval sheet to approve a design and remove the hold on an order
     * 
     * @param {string} confirm_hash - Example: confirm_hash=a14e51714be01f98487fcf5131727d31, The confirm hash for the approval sheet you would like to approve.
     * @param {string} status - Value: "approved"
     * 
     * @returns {promise} {message, error}
     */
    async approveDesign(confirm_hash: string, status: string){
        const params = new URLSearchParams({confirm_hash});
        const url = this.origin + "/approval-sheets?"+params.toString();
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                status
            })
        });
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {message: null, error};
        }
        const {message} = await result;
        return {message, error: null}
    }

    /**
     * 
     * @param {string} confirm_hash - Example: confirm_hash=a14e51714be01f98487fcf5131727d31, The confirm hash for the approval sheet you would like to approve.
     * @param {ApprovalSheetChanges} changes - Data to be submitted to Printful designers
     * @returns {promise} {result, error}
     */
    async changeApprovalSheet(confirm_hash: string, changes: ApprovalSheetChanges){
        const params = new URLSearchParams({confirm_hash});
        const url = this.origin + "/approval-sheets/changes?"+params.toString();
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(changes)
        });
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {result: null, error};
        }
        return {result, error: null}
    }
}