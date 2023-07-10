export type File = {
    type?: string,
    url: string,
    options?: [FileOptions],
    filename?: string,
    visible?: boolean
}

export type FileOptions = {
    id: string,
    value: string
}