import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})

describe("CatalogAPI", ()=>{
	it("should return list of Products available in the Printful", async ()=>{
		const {products, error} = await client.catalog.getAllProducts();
		expect(error).toBeNull();
		expect(products).toBeDefined();
	});

	it("should return information about a specific product and a list of variants for this product.g", async()=>{
        const {product, variants, error} = await client.catalog.getProduct(71);
		expect(error).toBeNull();
		expect(product).toBeDefined();
		expect(variants).toBeDefined();
	});

	it("should return information about a specific Variant and its Product", async ()=>{
        const {product, variant, error} = await client.catalog.getVariant(4018);
		expect(error).toBeNull();
		expect(product).toBeDefined();
		expect(variant).toBeDefined();
	});

	it("should return information about the size guide for a specific product.", async ()=>{
        const {product_id, available_sizes, size_tables, error} = await client.catalog.getSize(71);
		expect(error).toBeNull();
		expect(product_id).toBe(71);
		expect(available_sizes).toBeDefined();
		expect(size_tables).toBeDefined();
	})

	it("should return list of Catalog Categories available in the Printful", async ()=>{
		const {categories, error} = await client.catalog.getAllCategories();
		expect(error).toBeNull();
		expect(categories).toBeDefined();
	})

	it("should return information about a specific category", async ()=>{
		const {category, error} = await client.catalog.getCategory(24);
		expect(error).toBeNull();
		expect(category).toBeDefined();
	})
})