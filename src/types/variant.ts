import type { File } from "./file"

export type SyncVariant = {
    external_id?: string,
    variant_id: number,
    retail_price?: string,
    is_ignored?: boolean,
    sku?: string,
    files: Array<File>,
    options?: Array<SyncVariantOption>
}

export type OptionalSyncVariant = {
    external_id?: string,
    variant_id?: number,
    retail_price?: string,
    is_ignored?: boolean,
    sku?: string,
    files?: Array<File>,
    options?: Array<SyncVariantOption>
}

export type SyncVariantOption = {
    id: string,
    value: string | Array<string>
}