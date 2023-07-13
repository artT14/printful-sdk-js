import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";
import type { RawDateString } from "../types/date";

//------------------------------------------------------------------------------------------------------//
// XV. REPORTS API
//------------------------------------------------------------------------------------------------------//
export default class ReportsAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    /**
     * 
     * @param {RawDateString} date_from - Example: date_from=2022-08-01, The beginning of the period to get the statistics from (date in Y-m-d format).
     * @param {RawDateString} date_to - Example: date_to=2022-08-31, The end of the period to get the statistics from (date in Y-m-d format).
     * @param {string} currency - Example: currency=USD, The currency (3-letter code) to return the statistics in. You can also specify display_currency as the value to get the statistics in the account's display currency. The store currency will be used by default.
     * @param {string} report_types - Example: report_types=sales_and_costs,profit; A comma-separated list of report types to be retrieved.
     * 
     * @returns {promise} {store_statistics, error}
     */
    async getStats(date_from: RawDateString , date_to: RawDateString, currency: string = "", report_types: string){
        const params = new URLSearchParams({date_from, date_to, report_types});
        currency && params.append("currency", currency);
        const url = this.origin + "/reports/statistics?"+params.toString();
        const response = await fetch(url, {
            headers: this.headers,
        });
        const data = await response.json();
        const {result, code, error} = await data;
        if (code >= 400){
            return {store_statistics: [], error};
        }
        const {store_statistics} = await result;
        return {store_statistics, error: {}}
    }
}