import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";
import type { Order, OrderStatus } from '../types/order';

//------------------------------------------------------------------------------------------------------//
// V. ORDERS API
//------------------------------------------------------------------------------------------------------//
export default class OrdersAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    /**
     * Returns list of order objects from your store
     * 
     * QUERY PARAMS:
     * @param {string} status - Filter by order status
     * @param {int} offset -  Result set offset
     * @param {int} limit -  Number of items per page (max 100)
     * 
     * @returns {promise} {orders, paging, error}
     */
    async getOrders(offset=0, limit=20, status: OrderStatus){
        const url = this.origin+"/orders"+"?offset="+offset+"&limit="+limit+"&status="+status;
        const response = await fetch(url, {
            headers: this.headers,
        });
        const data = await response.json();
        const {code, result: orders, paging, error} = await data;
        if (code >= 400){
            return {orders: [], paging: {offset, limit}, error};
        }
        return {orders, paging, error: {}};
    }

    /**
     * Creates a new order and optionally submits it for fulfillment
     * 
     * QUERY PARAMS:
     * @param {NewOrder} newOrder - information about new order
     * @param {boolean} confirm - Automatically submit the newly created order for fulfillment (skip the Draft phase)
     * @param {boolean} update_existing - Try to update existing order if an order with the specified external_id already exists
     * 
     * @returns {promise} {order, error}
     */
    async createOrder(newOrder: Order, confirm=false, update_existing=false){
        const url = this.origin+"/orders"+"?confirm="+confirm+"&update_existing="+update_existing;
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(newOrder)
        });
        const data = await response.json();
        const {code, result: order, error} = await data;
        if (code >= 400){
            return {order: {}, error};
        }
        return {order, error};
    }

    /**
     * Returns order data by ID or External ID.
     * 
     * @param {int|string} id - Order ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {order, error}
     */
    async getOrder(id: number|string){
        const url = this.origin+"/orders/"+id;
        const response = await fetch(url, {
            headers: this.headers,
        });
        const data = await response.json();
        const {code, result: order, error} = await data;
        if (code >= 400){
            return {order: {}, error};
        }
        return {order, error};
    }

    /**
     * Cancels pending order or draft. Charged amount is returned to the store owner's credit card.
     * 
     * @param {int|string} id - Order ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {order, error}
     */
    async cancelOrder(id: number|string){
        const url = this.origin+"/orders/"+id;
        const response = await fetch(url, {
            method: "DELETE",
            headers: this.headers,
        });
        const data = await response.json();
        const {code, result: order, error} = await data;
        if (code >= 400){
            return {order: {}, error};
        }
        return {order, error};
    }

    /**
     * Updates unsubmitted order and optionally submits it for the fulfillment.

        Note that you need to post only the fields that need to be changed, not all required fields.

        If items array is given in the update data, the items will be:

        a) updated, if the update data contains the item id or external_id parameter that alreay exists

        b) deleted, if the request doesn't contain the item with previously existing id

        c) created as new if the id is not given or does not already exist
     * 
     * @param {int|string} id - Order ID (integer) or External ID (if prefixed with `@`)
     * @param {Order} orderData - Update information about the order
     * @param {boolean} confirm - Automatically submit the newly created order for fulfillment (skip the Draft phase)
     * 
     * @returns {promise} {order, error}
     */
    async updateOrder(id: number|string, orderData: Order, confirm=false){
        const url = this.origin+"/orders/"+id+"?confirm="+confirm;
        const response = await fetch(url, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(orderData)
        });
        const data = await response.json();
        const {code, result: order, error} = await data;
        if (code >= 400){
            return {order: {}, error};
        }
        return {order, error};
    }

    /**
     * Approves for fulfillment an order that was saved as a draft. Store owner's credit card is charged when the order is submitted for fulfillment.
     * 
     * @param {int|string} id - Order ID (integer) or External ID (if prefixed with `@`)
     * 
     * @returns {promise} {order, error}
     */
    async confirmOrder(id: number|string){
        const url = this.origin+"/orders/"+id+"/confirm";
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
        });
        const data = await response.json();
        const {code, result: order, error} = await data;
        if (code >= 400){
            return {order: {}, error};
        }
        return {order, error};
    }

    /**
     * Calculates the estimated order costs including item costs, print costs (back prints, inside labels etc.), shipping and taxes
     * 
     * @param {Order} orderData - Information on order for which estimate will be returned
     * 
     * @returns {promise} {costs, retail_costs, error}
     */
    async estimateOrderCost(orderData: Order){
        const url = this.origin+"/orders/estimate-costs";
        const response = await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(orderData)
        });
        const data = await response.json();
        const {code, result, error} = await data;
        if (code >= 400){
            return {costs: {}, retail_costs: {}, error};
        }
        const {costs, retail_costs} = result;
        return {costs, retail_costs, error};
    }
}