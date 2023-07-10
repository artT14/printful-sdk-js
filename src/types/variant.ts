import type { File } from "./file"

export type SyncVariant = {
    external_id?: string,
    variant_id: number,
    retail_price?: string,
    is_ignored?: boolean,
    sku?: string,
    files: [File],
    options: [SyncVariantOption]
}

export type OptionalSyncVariant = {
    external_id?: string,
    variant_id?: number,
    retail_price?: string,
    is_ignored?: boolean,
    sku?: string,
    files?: [File],
    options?: [SyncVariantOption]
}

export type SyncVariantOption = {
    id: string,
    value: string
}