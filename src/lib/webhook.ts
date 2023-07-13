import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";
import type { WebhookConfig } from "../types/webhook";

//------------------------------------------------------------------------------------------------------//
// XI. WEBHOOK API
//------------------------------------------------------------------------------------------------------//
export default class WebhookAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    /**
     * Returns configured webhook URL and list of webhook event types enabled for the store
     * 
     * @returns {promise} {config, error}
     */
    async getWebhookConfig(){
        const url = this.origin+"/webhooks";
        const response = await fetch(url, {headers: this.headers});
        const data = await response.json();
        const {result: config, code, error} = await data;
        if (code >= 400){
            return {config: null, error};
        }
        return {config, error: null}
    }

    /**
     * Use this endpoint to enable a webhook URL for a store and select webhook event types that will be sent to this URL.
     * 
     * Note that only one webhook URL can be active for a store, so calling this method disables all existing webhook configuration.
     * 
     * Setting up the Stock updated webhook requires passing IDs for products that need to be monitored for changes. Stock update webhook will only include information for specified products. These product IDs need to be set up using the params property.
     * 
     * @param {WebhookConfig} newConfig - Webhook Configuration
     * 
     * @returns {promise} {config, error} 
     */
    async setWebhookConfig(newConfig: WebhookConfig){
        const url = this.origin+"/webhooks";
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(newConfig)
        });
        const data = await response.json();
        const {result: config, code, error} = await data;
        if (code >= 400){
            return {config: null, error};
        }
        return {config, error: null}
    }

    /**
     * Removes the webhook URL and all event types from the store.
     * 
     * @returns {promise} {config, error}
     */
    async disableWebhookSupport(){
        const url = this.origin+"/webhooks";
        const response = await fetch(url, {
            method: "DELETE",
            headers: this.headers
        });
        const data = await response.json();
        const {result: config, code, error} = await data;
        if (code >= 400){
            return {config: null, error};
        }
        return {config, error: null}
    }
}