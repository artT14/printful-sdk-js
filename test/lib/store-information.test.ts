import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { EXAMPLE_PACKING_SLIP } from "../data/store-information";
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

describe("StoreInformationAPI Tests", ()=>{
    /* changePackingSlip() */
    // TODO: needs more tests
    // !NEEDS ACCOUNT LEVEL AUTHORIZATION
    // it("Modifies packing slip information of the currently authorized Printful store.", async ()=>{
    //     const {packing_slip, error} = await client.storeInformation.changePackingSlip(EXAMPLE_PACKING_SLIP);
    //     expect(error).toBeNull();
    //     expect(packing_slip).toBeDefined();
    // });

    /* getAllStoresInfo() */
    // TODO: needs more tests
    it("Get basic information about stores depending on the token access level", async ()=>{
        const {result, error, code} = await client.storeInformation.getAllStoresInfo();
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
    });

    /* getStoreInfo() */
    // TODO: needs more tests
    it("Get basic information about a store based on provided ID", async ()=>{
        const {result: stores} = await client.storeInformation.getAllStoresInfo();
		await new Promise((r) => setTimeout(r, 100));
        const {result, error, code} = await client.storeInformation.getStoreInfo(stores[0].id);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
    });
})