import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { EXAMPLE_PACKING_SLIP } from "../data/store-information";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})

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
        const {stores, error} = await client.storeInformation.getAllStoresInfo();
        expect(error).toBeNull();
        expect(stores).toBeDefined();
    });

    /* getStoreInfo() */
    // TODO: needs more tests
    it("Get basic information about a store based on provided ID", async ()=>{
        const {stores} = await client.storeInformation.getAllStoresInfo();
        const {store, error} = await client.storeInformation.getStoreInfo(stores[0].id);
        expect(error).toBeNull();
        expect(store).toBeDefined();
    });
})