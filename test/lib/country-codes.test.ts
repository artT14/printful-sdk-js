import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})

describe("CountryCodesAPI Tests", ()=>{
    /* getCountryList() */
    it("Retrieve state list that requires sales tax calculation", async ()=>{
        const {countryCodes, error} = await client.countryCodes.getCountryList();
        expect(error).toBeNull();
        expect(countryCodes).toBeDefined();
    })
})