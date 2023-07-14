// TODO: Requires an Account Client as opposed to store client

// import {PrintfulAccountClient, PrintfulAccountClient} from "../../src/client";
// require('dotenv').config()


// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

// let client: PrintfulAccountClient;

// beforeAll(()=>{
//     client = PrintfulAccountClient(process.env.TEST_AUTH);
// })

// describe("ProductTemplatesAPI Tests",()=>{
//     it("should return a list of templates", async ()=>{
//         const {templates, paging, error} = await client.productTemplates.getAllTemplates();
//         expect(error).toBeNull();
//         expect(templates).toBeDefined();
//         expect(paging).toBeDefined();
//     })
// })