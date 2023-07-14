import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { EXAMPLE_RECIPIENT } from "../data/tax-rate";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})

describe("TaxRateAPI Tests", ()=>{
    /* getCountryTaxList() */
    it("Retrieve state list that requires sales tax calculation", async ()=>{
        const {taxList, error} = await client.taxRate.getCountryTaxList();
        expect(error).toBeNull();
        expect(taxList).toBeDefined();
    })

    /* calcTax() */
    // TODO: Needs more Tests
    it("Calculates sales tax rate for given address if required", async ()=>{
        const {taxRate, error} = await client.taxRate.calcTax(EXAMPLE_RECIPIENT);
        expect(error).toBeNull();
        expect(taxRate).toBeDefined();
    })
})