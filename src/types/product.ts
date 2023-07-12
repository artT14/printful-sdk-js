export type SyncProduct = {
    external_id?: string,
    name: string,
    thumbnail: string,
    is_ignored?: boolean
}

export type OptionalSyncProduct = {
    external_id?: string,
    name?: string,
    thumbnail?: string,
    is_ignored?: boolean
}

export type ProductVariant = {
    variant_id?: number,
    product_id?: number,
    image?: string,
    name?: string
}

export type Status = "synced" | "unsynced" | "all"