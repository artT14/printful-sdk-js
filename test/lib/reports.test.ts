import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { SYNC_PRODUCT, SYNC_PRODUCT_2, SYNC_VARIANTS, MODIFIED_SYNC_VARIANT } from "../data/products";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})

// Wait 50 mili before each test to prevent from getting blocked
beforeEach(async ()=>{
	await new Promise((r) => setTimeout(r, 50));
});

describe("ReportsAPI Tests", ()=>{
    /* getStats() */
    it("Returns statistics for specified report types.", async ()=>{
        const {store_statistics, error} = await client.reports.getStats("2023-07-01","2023-07-31", "sales_and_costs", "USD");
        expect(error).toBeNull();
        expect(store_statistics).toBeDefined();
    })
    it("Returns statistics for specified report types. INVALID report_types", async ()=>{
        const {store_statistics, error} = await client.reports.getStats("2023-07-01","2023-07-31", "sales_and_cxosts", "USD");
        expect(store_statistics).toBeNull();
        expect(error).toBeDefined();
    });
}) 