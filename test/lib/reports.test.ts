import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
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

describe("ReportsAPI Tests", ()=>{
    /* getStats() */
    it("Returns statistics for specified report types.", async ()=>{
        const {result, error, code} = await client.reports.getStats("2023-07-01","2023-07-31", "sales_and_costs", "USD");
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
    })
    it("Returns statistics for specified report types. INVALID report_types", async ()=>{
        const {result, error, code} = await client.reports.getStats("2023-07-01","2023-07-31", "sales_and_cxosts", "USD");
		expect(result).toBeNull();
		expect(error).toBeDefined();
		expect(code).toBeGreaterThanOrEqual(400);
    });
}) 