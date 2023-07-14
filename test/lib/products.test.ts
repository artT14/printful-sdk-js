import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { SYNC_PRODUCT, SYNC_PRODUCT_2, SYNC_VARIANTS, MODIFIED_SYNC_VARIANT } from "../data/products";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})

describe("ProductsAPI Tests", ()=>{
	// TODO: needs negative tests
	it("should return a list of Sync Product objects from your custom Printful store.", async ()=>{
		const {products, paging, error} = await client.products.getAllSyncProducts();
		expect(error).toBeNull();
		expect(products).toBeDefined();
		expect(paging.total).toBeDefined();
	});

	//TODO: needs negative tests
	it("should get information about a single Sync Product and its Sync Variants.", async ()=>{
        const {sync_product, sync_variants, error} = await client.products.getSyncProduct(314179759);
		expect(error).toBeNull();
		expect(sync_product).toBeDefined();
		expect(sync_variants).toBeDefined();
	});

	//TODO: needs negative tests
	it("should create a new Sync Product together with its Sync Variants", async ()=>{
		const {product, error} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		expect(error).toBeNull();
		expect(product).toBeDefined();
	});

	//TODO: needs negative tests
	it("should delete a Sync Product with all of its Sync Variants", async ()=>{
		const {product} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		const {result, error} = await client.products.deleteSyncProduct(product.id)
		expect(error).toBeNull();
		expect(result).toHaveLength(0);
	});

	//TODO: needs negative tests
	it("should modify an existing Sync Product with its Sync Variants.", async ()=>{
		const {product: {id}} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		const {product, error} = await client.products.modifySyncProduct(id, SYNC_PRODUCT_2, SYNC_VARIANTS);
		expect(error).toBeNull();
		expect(product).toBeDefined();
		expect(product.name).toBe(SYNC_PRODUCT_2.name);
	});

	//TODO: needs negative tests
	it("should get information about a single Sync Variant.", async ()=>{
		const {products} = await client.products.getAllSyncProducts();
        const {sync_variants} = await client.products.getSyncProduct(products[0].id);
		const {variant, error} = await client.products.getSyncVariant(sync_variants[0].id);
		expect(error).toBeNull();
		expect(variant).toBeDefined();
	});

	//TODO: needs negative tests
	it("should delete a single Sync Variant", async ()=>{
		const {product: {id}} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
        const {sync_variants} = await client.products.getSyncProduct(id);
		const {result, error} = await client.products.deleteSyncVariant(sync_variants[0].id);
		expect(error).toBeNull();
		expect(result).toHaveLength(0);
	})

	//TODO: needs negative tests
	it("should modify an existing Sync Variant.", async ()=>{
		const {product: {id}} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
        const {sync_variants} = await client.products.getSyncProduct(id);
		const {variant, error} = await client.products.modifySyncVariant(sync_variants[0].id, MODIFIED_SYNC_VARIANT);
		expect(error).toBeNull();
		expect(variant.variant_id).toBe(MODIFIED_SYNC_VARIANT.variant_id);
	})

	//TODO: needs negative tests
	it("should create a new Sync Variant for an existing Sync Product", async ()=>{
		const {product: {id}} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		const {variant, error} = await client.products.createSyncVariant(id, MODIFIED_SYNC_VARIANT);
        const {sync_variants} = await client.products.getSyncProduct(id);
		expect(error).toBeNull();
		expect(variant.variant_id).toBe(MODIFIED_SYNC_VARIANT.variant_id);
		expect(sync_variants).toHaveLength(SYNC_VARIANTS.length+1);
	})
})