import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { EXAMPLE_ORDER } from "../data/orders";
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

describe("OrdersAPI Tests", ()=>{
    /* getAllOrders() */
    // TODO: needs negative tests 
    it("Returns list of order objects from your store", async ()=>{
        const {orders, paging, error} = await client.orders.getAllOrders();
        expect(error).toBeNull();
        expect(orders).toBeDefined();
        expect(paging).toBeDefined();
    });

    /* createOrder() */
    // !!!PLEASE NOTE!!!: We leave this method to be tested manually since it might charge your account unnecessarily
    it("Creates a new order and optionally submits it for fulfillment", async ()=>{
        // const {order, error} = await client.orders.createOrder(...);
        expect(true).toBe(true);
    });

    /* getOrder() */
    // TODO: needs negative tests
    it("", async ()=>{
        const {orders} = await client.orders.getAllOrders(0,1);
        if (orders.length === 0) return;
        const {order, error} = await client.orders.getOrder(orders[0].id);
        expect(error).toBeNull();
        expect(order).toBeDefined();
    });

    /* cancelOrder() */
    // !!!PLEASE NOTE!!!: We leave this method to be tested manually since it is connected to transactions
    it("Cancels pending order or draft. Charged amount is returned to the store owner's credit card.", async ()=>{
        // const {order, error} = await client.orders.cancelOrder(...);
        expect(true).toBe(true);
    });

    /* updateOrder()*/
    // !!!PLEASE NOTE!!!: We leave this method to be tested manually since it is connected to transactions
    it("Updates unsubmitted order and optionally submits it for the fulfillment.", async ()=>{
        // const {order, error} = await client.orders.updateOrder(...);
        expect(true).toBe(true);
    });

    /* confirmOrder()*/
    // !!!PLEASE NOTE!!!: We leave this method to be tested manually since it is connected to transactions
    it("Approves for fulfillment an order that was saved as a draft. Store owner's credit card is charged when the order is submitted for fulfillment.", async ()=>{
        // const {order, error} = await client.orders.confirmOrder(...);
        expect(true).toBe(true);
    });

    /* estimateOrderCost() */
    // TODO: needs negative tests
    it("Calculates the estimated order costs", async ()=>{
        const {costs, retail_costs, error} = await client.orders.estimateOrderCost(EXAMPLE_ORDER);
        expect(error).toBeNull();
        expect(costs).toBeDefined();
        expect(retail_costs).toBeDefined();
    })
})