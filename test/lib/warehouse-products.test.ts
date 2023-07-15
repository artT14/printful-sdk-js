import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { EXAMPLE_RECIPIENT } from "../data/tax-rate";
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

describe("WarehouseProductsAPI Tests", ()=>{
    /* getAllWarehouseProducts() */
    // TODO: needs more tests
    it("Returns a list of warehouse products from your store", async ()=>{
        const {products, error} = await client.warehouseProducts.getAllWarehouseProducts();
        expect(error).toBeNull();
        expect(products).toBeDefined();
    })

    /* getWarehouseProduct() */
    it("Returns warehouse product data by ID", async ()=>{
        const {products} = await client.warehouseProducts.getAllWarehouseProducts();
        if(!products.length) return; // no warehouse products exist in system
        const {product, error} = await client.warehouseProducts.getWarehouseProduct(products[0].id);
        expect(error).toBeNull();
        expect(product).toBeDefined();
    })
})