import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { EXAMPLE_SHIPPING_INFO, FAULTY_SHIPPING_INFO } from "../data/shipping-rate";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})

// Wait 50 mili before each test to prevent from getting blocked
beforeEach(async ()=>{
	await new Promise((r) => setTimeout(r, 50));
});

describe("ShippingRateAPI Tests", ()=>{
	/* calculateShipping() */
	it("Returns available shipping options", async ()=>{
		const {shipping_options, error} = await client.shippingRate.calculateShipping(EXAMPLE_SHIPPING_INFO);
		expect(error).toBeNull();
		expect(shipping_options).toBeDefined();
	});
	it("Fails to return available shipping options, based on faulty info", async ()=>{
		const {shipping_options, error} = await client.shippingRate.calculateShipping(FAULTY_SHIPPING_INFO);
		expect(shipping_options).toBeNull();
		expect(error).toBeDefined();
	});
})