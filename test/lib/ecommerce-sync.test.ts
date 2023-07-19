import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { SYNC_PRODUCT, SYNC_VARIANTS, MODIFIED_SYNC_VARIANT } from "../data/products";
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

describe("EcommerceSyncAPI Tests", ()=>{
	/* getAllEcommProducts() */
	// TODO: needs more tests, negative ones
	it("Returns list of Sync Product objects from your store.", async ()=>{
		const {result, error, code} = await client.ecommerceSync.getAllEcommProducts();
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});

	/* getEcommProduct() */
	it("Get information about a single Sync Product and its Sync Variants", async ()=>{
		const {result: products} = await client.ecommerceSync.getAllEcommProducts();
		await new Promise((r) => setTimeout(r, 100));
		const {result, error, code} = await client.ecommerceSync.getEcommProduct(products[0].id);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});

	/* deleteEcommProduct() */
	it("Deletes a Sync Product with all of its Sync Variants", async ()=>{
		const {result: productToDelete} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		await new Promise((r) => setTimeout(r, 100));
		const {result, error, code} = await client.ecommerceSync.deleteEcommProduct(productToDelete.id);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});

	/* getEcommVariant() */
	it("Get information about a single Sync Variant", async ()=>{
		const {result: products} = await client.ecommerceSync.getAllEcommProducts();
		await new Promise((r) => setTimeout(r, 100));
        const {result: {sync_variants}} = await client.ecommerceSync.getEcommProduct(products[0].id);
		await new Promise((r) => setTimeout(r, 100));
		const {result, error, code} = await client.ecommerceSync.getEcommVariant(sync_variants[0].id);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});

	/* modifyEcommVariant() */
	it("Modifies an existing Sync Variant.", async ()=>{
		const {result: product} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		await new Promise((r) => setTimeout(r, 100));
        const {result: {sync_variants}} = await client.ecommerceSync.getEcommProduct(product.id);
		await new Promise((r) => setTimeout(r, 100));
		const {result, error, code} = await client.ecommerceSync.modifyEcommVariant(sync_variants[0].id, MODIFIED_SYNC_VARIANT);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
		expect(result.sync_variant.variant_id).toBe(MODIFIED_SYNC_VARIANT.variant_id);
	})

	/* deleteEcommVariant() */
	it("Deletes configuraton information (variant_id, print files and options) and disables automatic order importing for this Sync Variant", async ()=>{
		const {result: {id}} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		await new Promise((r) => setTimeout(r, 100));
        const {result: {sync_variants}} = await client.ecommerceSync.getEcommProduct(id);
		await new Promise((r) => setTimeout(r, 100));
        const {result, error, code} = await client.ecommerceSync.deleteEcommVariant(sync_variants[0].id);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	})
})