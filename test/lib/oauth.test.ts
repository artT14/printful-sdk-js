import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
require('dotenv').config()

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})


// Wait 100 mili before each test to prevent from getting blocked
beforeEach(async ()=>{
	await new Promise((r) => setTimeout(r, 100));
});

describe("OAuthAPI Tests", ()=>{
	/* getScopes() */
	it("should return all scopes given a token", async ()=>{
		const {result, error, code} = await client.oauth.getScopes()
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	})
})