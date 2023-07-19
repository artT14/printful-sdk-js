import {PrintfulStoreClient, createPrintfulStoreClient} from "../src/client"
require('dotenv').config()

// Wait 100 mili before each test to prevent from getting blocked
beforeEach(async ()=>{
	await new Promise((r) => setTimeout(r, 100));
});

describe("Client",()=>{
    it("should instantiate an instance of PrintfulStoreClient",()=>{
        const client = createPrintfulStoreClient(process.env.TEST_AUTH);
        expect(client).toBeInstanceOf(PrintfulStoreClient);
    })
})