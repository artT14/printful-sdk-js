import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { SYNC_PRODUCT, SYNC_PRODUCT_2, SYNC_VARIANTS, MODIFIED_SYNC_VARIANT } from "../data/products";
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

describe("ProductsAPI Tests", ()=>{
	/* getAllSyncProducts() */
	// TODO: needs negative tests
	it("should return a list of Sync Product objects from your custom Printful store.", async ()=>{
		const {result, error, code} = await client.products.getAllSyncProducts();
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});

	/* getSyncProduct() */
	//TODO: needs negative tests
	it("should get information about a single Sync Product and its Sync Variants.", async ()=>{
        const {result, error, code} = await client.products.getSyncProduct(314179759);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});

	/* createSyncProduct() */
	//TODO: needs negative tests
	it("should create a new Sync Product together with its Sync Variants", async ()=>{
		const {result, error, code} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});

	/* createSyncProduct() */
	//TODO: needs negative tests
	it("should delete a Sync Product with all of its Sync Variants", async ()=>{
		const {result: product} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		await new Promise((r) => setTimeout(r, 100));
		const {result, error, code} = await client.products.deleteSyncProduct(product.id)
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});

	/* modifySyncProduct() */
	//TODO: needs negative tests
	it("should modify an existing Sync Product with its Sync Variants.", async ()=>{
		const {result: {id}} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		await new Promise((r) => setTimeout(r, 100));
		const {result, error, code} = await client.products.modifySyncProduct(id, SYNC_PRODUCT_2, SYNC_VARIANTS);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
		expect(result.name).toBe(SYNC_PRODUCT_2.name);
	});

	/* getSyncVariant() */
	//TODO: needs negative tests
	it("should get information about a single Sync Variant.", async ()=>{
		const {result: products} = await client.products.getAllSyncProducts();
		await new Promise((r) => setTimeout(r, 100));
        const {result: {sync_variants}} = await client.products.getSyncProduct(products[0].id);
		await new Promise((r) => setTimeout(r, 100));
		const {result, error, code} = await client.products.getSyncVariant(sync_variants[0].id);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});

	/* deleteSyncVariant() */
	//TODO: needs negative tests
	it("should delete a single Sync Variant", async ()=>{
		const {result: {id}} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		await new Promise((r) => setTimeout(r, 100));
        const {result: {sync_variants}} = await client.products.getSyncProduct(id);
		await new Promise((r) => setTimeout(r, 100));
		const {result, error, code} = await client.products.deleteSyncVariant(sync_variants[0].id);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	})

	/* modifySyncVariant() */
	//TODO: needs negative tests
	it("should modify an existing Sync Variant.", async ()=>{
		const {result: {id}} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		await new Promise((r) => setTimeout(r, 100));
        const {result: {sync_variants}} = await client.products.getSyncProduct(id);
		await new Promise((r) => setTimeout(r, 100));
		const {result, error, code} = await client.products.modifySyncVariant(sync_variants[0].id, MODIFIED_SYNC_VARIANT);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
		expect(result.variant_id).toBe(MODIFIED_SYNC_VARIANT.variant_id);
	})

	/* createSyncVariant() */
	//TODO: needs negative tests
	it("should create a new Sync Variant for an existing Sync Product", async ()=>{
		const {result: product} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		await new Promise((r) => setTimeout(r, 100));
		const {result, error, code} = await client.products.createSyncVariant(product.id, MODIFIED_SYNC_VARIANT);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
		expect(result.variant_id).toBe(MODIFIED_SYNC_VARIANT.variant_id);
		await new Promise((r) => setTimeout(r, 100));
        const {result: {sync_variants}} = await client.products.getSyncProduct(product.id);
		expect(sync_variants).toHaveLength(SYNC_VARIANTS.length+1);
	})
})