import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { EXAMPLE_WEBHOOK_CONFIG } from "../data/webhoook";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})

// Wait 100 mili before each test to prevent from getting blocked
beforeEach(async ()=>{
	await new Promise((r) => setTimeout(r, 100));
});

describe("WebhookAPI Tests", ()=>{
    /* getWebhookConfig() */
    it("Returns configured webhook URL and list of webhook event types enabled for the store", async ()=>{
        const {result, error, code} = await client.webhook.getWebhookConfig();
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
    })

    /* setWebhookConfig() */
    // TODO: needs more tests
    it("Use this endpoint to enable a webhook URL for a store and select webhook event types that will be sent to this URL.", async ()=>{
        const {result, error, code} = await client.webhook.setWebhookConfig(EXAMPLE_WEBHOOK_CONFIG);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
    })

    /* disableWebhookSupport() */
    it("Removes the webhook URL and all event types from the store.", async ()=>{
        const {} = await client.webhook.setWebhookConfig(EXAMPLE_WEBHOOK_CONFIG);
		await new Promise((r) => setTimeout(r, 100));
        const {result, error, code} = await client.webhook.disableWebhookSupport();
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
    })
})