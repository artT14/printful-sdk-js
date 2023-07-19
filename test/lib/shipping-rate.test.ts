import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { EXAMPLE_SHIPPING_INFO, FAULTY_SHIPPING_INFO } from "../data/shipping-rate";
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

describe("ShippingRateAPI Tests", ()=>{
	/* calculateShipping() */
	it("Returns available shipping options", async ()=>{
		const {result, error, code} = await client.shippingRate.calculateShipping(EXAMPLE_SHIPPING_INFO);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});
	it("Fails to return available shipping options, based on faulty info", async ()=>{
		const {result, error, code} = await client.shippingRate.calculateShipping(FAULTY_SHIPPING_INFO);
		expect(result).toBeNull();
		expect(error).toBeDefined();
		expect(code).toBeGreaterThanOrEqual(400);
	});
})