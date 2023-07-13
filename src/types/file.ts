export type File = {
    type?: string,
    url: string,
    options?: Array<FileOption>,
    filename?: string,
    visible?: boolean,
    position?: FilePosition
}

export type MockupFile = {
	placement?: string,
	image_url?: string,
	position?: FilePosition,
    options?: Array<FileOption>
}
export type FileOption = {
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

