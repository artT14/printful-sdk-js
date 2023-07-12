import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";
import type { NewOrder, OrderStatus } from '../types/order';

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
    async createOrder(newOrder: NewOrder, confirm=false, update_existing=false){
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

    async getOrder(){}

    async cancelOrder(){}

    async updateOrder(){}

    async confirmOrder(){}

    async estimateOrderCost(){}

}