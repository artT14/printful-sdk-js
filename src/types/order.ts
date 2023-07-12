import type { File } from "./file"
import type { ProductVariant } from "./product"

export type Order = {
    external_id?: string,                   // Order ID from the external system
    shipping?: string,                      // Shipping method. Defaults to 'STANDARD'
    recipient: OrderRecipient,              // Information about the address
    items: Array<OrderItem>,                // Array of items in the order
    retail_costs?: OrderRetailCosts,        // Retail costs that are to be displayed on the packing slip for international shipments. Retail costs are used only if every item in order contains the retail_price attribute.
    gift?: OrderGift,                       // Optional gift message for the packing slip
    packing_slip?: OrderPackingSlip         // Custom packing slip for this order.
}

export type OrderRecipient = {
    name?: string,
    company?: string,
    address1?: string,
    address2?: string,
    city?: string,
    state_code?: string,
    state_name?: string,
    country_code?: string,
    country_name?: string,
    zip?: string,
    phone?: string,
    email?: string,
    tax_number?: string                     // TAX number (optional, but in case of Brazil country this field becomes required and will be used as CPF/CNPJ number)
                                            // CPF format is 000.000.000-00 (14 characters);
                                            // CNPJ format is 00.000.000/0000-00 (18 characters).
}

export type OrderItem = {
    id?: number,                            // Line item ID
    external_id?: string,                   // Line item ID from the external system
    variant_id?: number,                    // Variant ID of the item ordered. **See Catalog API**
    sync_variant_id?: number,               // Sync variant ID of the item ordered. 
    external_variant_id?: string,           // External variant ID of the item ordered.
    warehouse_product_variant_id?: number,  // Warehousing product variant ID of the item ordered. See Warehouse Products API
    product_template_id?: number,           // The ID of a Product Template to generate the printfiles from. The variant_id field must be passed as well. Can't be combined with following fields: sync_variant_id, external_variant_id, warehouse_product_variant_id, files, options, external_product_id
    external_product_id?: string,           // The External Product ID associated with a Product Template to generate the printfiles from. The variant_id field must be passed as well. Can't be combined with following fields: sync_variant_id, external_variant_id, warehouse_product_variant_id, files, options, product_template_id.
    quantity?: number,                      // Number of items ordered (Limited to 1000 for one item)
    price?: string,                         // Printful price of the item
    retail_price?: string,                  // Original retail price of the item to be displayed on the packing slip
    name?: string,                          // Display name of the item. If not given, a name from the Printful system will be displayed on the packing slip
    product?: ProductVariant,               // Short information about the Printful Product and Variant
    files?: Array<File>,                    // Array of attached printfiles / preview images
    options?: Array<ItemOption>,            // Array of additional options for this product
    sku?: string,                           // Product identifier (SKU) from the external system
    discountinued?: boolean,                // Whether the item belongs to discontinued product i.e. it's permanently unavailable
    out_of_stock?: boolean                  // Whether the item is out of stock i.e. temporarily unavailable
}

export type OrderRetailCosts = {
    currency?: string,                      // 3 letter currency code
    subtotal?: string | null,               // Total cost of all items
    discount?: string | null,               // Discount sum
    shipping?: string | null,               // Shipping costs
    tax?: string | null                     // Sum of taxes (not included in the item price)
}

export type OrderGift = {
    subject?: string,                       // Gift message title
    message?: string,                       // Gift message text
}

export type OrderPackingSlip = {
    email: string,                          // Customer service email
    phone?: string,                         // Customer service phone
    message?: string,                       // Custom packing slip message
    logo_url?: string,                      // URL address to a sticker we will put on a package
    store_name?: string,                    // Store name override for the return address
    custom_order_id?: string                // Your own Order ID that will be printed instead of Printful's Order ID
}

export type ItemOption = {
    id?: string,
    value?: string
}

export type OrderStatus = "draft"
    | "pending"
    | "failed"
    | "canceled"
    | "inprocess"
    | "onhold"
    | "partial"
    | "fulfilled"
    | "archived"