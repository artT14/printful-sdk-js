import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
});

// Wait 100 mili before each test to prevent from getting blocked
beforeEach(async ()=>{
	await new Promise((r) => setTimeout(r, 100));
});

describe("CatalogAPI", ()=>{
	/* getAllProducts() */
	it("should return list of Products available in the Printful", async ()=>{
		const {result, error, code} = await client.catalog.getAllProducts();
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});

	/* getProduct() */
	// TODO: need negative tests
	it("should return information about a specific product and a list of variants for this product.", async()=>{
        const {result, error, code} = await client.catalog.getProduct(71);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});

	/* getVariant() */
	// TODO: need negative tests
	it("should return information about a specific Variant and its Product", async ()=>{
        const {result, error, code} = await client.catalog.getVariant(4018);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});

	/* getSize() */
	// TODO: need negative tests
	it("should return information about the size guide for a specific product.", async ()=>{
        const {result, error, code} = await client.catalog.getSize(71);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	})

	/* getAllCategories() */
	it("should return list of Catalog Categories available in the Printful", async ()=>{
		const {result, error, code} = await client.catalog.getAllCategories();
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	})

	/* getCategory() */
	//TODO: need negative tests
	it("should return information about a specific category", async ()=>{
		const {result, error, code} = await client.catalog.getCategory(24);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	})
})