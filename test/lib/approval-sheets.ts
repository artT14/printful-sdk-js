import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})

describe("ApprovalSheetsAPI Tests", async () =>{
    /* getApprovalSheets() */
    it("Retrieve a list of approval sheets confirming suggested changes to files of on hold orders.", async ()=>{
        const {sheets, error} = await client.approvalSheets.getApprovalSheets();
        expect(error).toBeNull();
        expect(sheets).toBeDefined();
    });

    /* approveDesign() */
    // !NOTE: Needs to be tested manually, we don't have the ability to test without Printful sending off a request to approve design 
    // !(i.e. No Readily Available Data to Carry a Unit Test)
    // it("Uses the confirm hash of an approval sheet to approve a design and remove the hold on an order", async()=>{
    //     expect(true).toBeTruthy();
    // });

    /* changeApprovalSheet() */
    // !NOTE: Needs to be tested manually, we don't have the ability to test without Printful sending off a request to approve design 
    // !(i.e. No Readily Available Data to Carry a Unit Test)
    // it("Uses the confirm hash of an approval sheet to approve a design and remove the hold on an order", async()=>{
    //     expect(true).toBeTruthy();
    // })
})