import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// XI. WEBHOOK API
//------------------------------------------------------------------------------------------------------//
export default class WebhookAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    async getWebhookConfig(){}

    async setWebhookConfig(){}

    async disableWebhookSupport(){}
}