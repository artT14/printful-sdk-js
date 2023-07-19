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

describe("CountryCodesAPI Tests", ()=>{
    /* getCountryList() */
    it("Retrieve state list that requires sales tax calculation", async ()=>{
        const {result, error, code} = await client.countryCodes.getCountryList();
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
    })
})