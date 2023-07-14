export type ShippingInfo = {
    recipient: ShippingRecipient,
    items: Array<ShippingItem>,
    currency: string,
    locale: string
}

export type ShippingRecipient = {
    address1: string,
    city: string,
    country_code: string,
    state_code: string,
    zip: string,
    phone: string
}

export type ShippingItem = {
    variant_id?: number | string,
    external_variant_id?: string,
    warehouse_product_variant_id?: string,
    quantity: number,
    value?: string
}