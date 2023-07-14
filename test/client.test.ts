import {PrintfulStoreClient, createPrintfulStoreClient} from "../src/client"
require('dotenv').config()

describe("Client",()=>{
    it("should instantiate an instance of PrintfulStoreClient",()=>{
        const client = createPrintfulStoreClient(process.env.TEST_AUTH);
        expect(client).toBeInstanceOf(PrintfulStoreClient);
    })
})