export type File = {
    type?: string,
    url: string,
    options?: Array<FileOptions>,
    filename?: string,
    visible?: boolean
}

export type FileOptions = {
    id: string,
    value: string
}