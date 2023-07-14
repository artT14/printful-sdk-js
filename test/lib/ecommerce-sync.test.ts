import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { SYNC_PRODUCT, SYNC_VARIANTS, MODIFIED_SYNC_VARIANT } from "../data/products";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})

describe("EcommerceSyncAPI Tests", ()=>{
	/* getAllEcommProducts() */
	// TODO: needs more tests, negative ones
	it("Returns list of Sync Product objects from your store.", async ()=>{
		const {products, paging, error} = await client.ecommerceSync.getAllEcommProducts();
		expect(error).toBeNull();
		expect(products).toBeDefined();
		expect(paging).toBeDefined();
	});

	/* getEcommProduct() */
	it("Get information about a single Sync Product and its Sync Variants", async ()=>{
		const {products} = await client.ecommerceSync.getAllEcommProducts();
		const {sync_product, sync_variants, error} = await client.ecommerceSync.getEcommProduct(products[0].id);
		expect(error).toBeNull();
		expect(sync_product).toBeDefined();
		expect(sync_variants).toBeDefined();
	});

	/* deleteEcommProduct() */
	it("Deletes a Sync Product with all of its Sync Variants", async ()=>{
		const {product: productToDelete} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
		const {result, error} = await client.ecommerceSync.deleteEcommProduct(productToDelete.id);
		expect(error).toBeNull();
		expect(result).toBeDefined();
	});

	/* getEcommVariant() */
	it("Get information about a single Sync Variant", async ()=>{
		const {products} = await client.ecommerceSync.getAllEcommProducts();
        const {sync_variants} = await client.ecommerceSync.getEcommProduct(products[0].id);
		const {sync_variant, sync_product, error} = await client.ecommerceSync.getEcommVariant(sync_variants[0].id);
		expect(error).toBeNull();
		expect(sync_variant).toBeDefined();
		expect(sync_product).toBeDefined();
	});

	/* modifyEcommVariant() */
	it("Modifies an existing Sync Variant.", async ()=>{
		const {product: {id}} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
        const {sync_variants} = await client.ecommerceSync.getEcommProduct(id);
		const {sync_variant, sync_product, error} = await client.ecommerceSync.modifyEcommVariant(sync_variants[0].id, MODIFIED_SYNC_VARIANT);
		expect(error).toBeNull();
		expect(sync_product).toBeDefined();
		expect(sync_variant).toBeDefined();
		expect(sync_variant.variant_id).toBe(MODIFIED_SYNC_VARIANT.variant_id);
	})

	/* deleteEcommVariant() */
	it("Deletes configuraton information (variant_id, print files and options) and disables automatic order importing for this Sync Variant", async ()=>{
		const {product: {id}} = await client.products.createSyncProduct(SYNC_PRODUCT, SYNC_VARIANTS);
        const {sync_variants} = await client.ecommerceSync.getEcommProduct(id);
        const {sync_variant, sync_product, error} = await client.ecommerceSync.deleteEcommVariant(sync_variants[0].id);
		expect(error).toBeNull();
		expect(sync_product).toBeDefined();
		expect(sync_variant).toBeDefined();
	})
})