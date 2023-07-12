import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// XVI. APPROVAL SHEETS API
//------------------------------------------------------------------------------------------------------//
export default class ApprovalSheetsAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    async getApprovalSheets(){}

    async approveDesign(){}

    async changeApprovalSheet(){}
}