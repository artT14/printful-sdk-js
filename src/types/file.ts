export type File = {
    type?: string,
    url: string,
    options?: Array<FileOptions>,
    filename?: string,
    visible?: boolean,
    position?: FilePosition
}

export type FileOptions = {
    id: string,
    value: string
}

export type FilePosition = {
    area_width?: number | null,
    area_height?: number | null,
    width?: number,
    height?: number,
    top?: number,
    left?: number,
    limit_to_print_area?: boolean
}