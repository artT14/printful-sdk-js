import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
require('dotenv').config()

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})

describe("OAuthAPI Tests", ()=>{
	it("should return all scopes given a token", async ()=>{
		const {scopes, error} = await client.oauth.getScopes()
		expect(error).toBeNull();
		expect(scopes).toBeDefined();
	})
})