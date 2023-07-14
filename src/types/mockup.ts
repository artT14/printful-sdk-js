import type {MockupFile} from "../types/file"

export type MockupTask = {
	variant_ids?: Array<number>,
	format?: string,
	width?: number,
	product_options?: object,
	option_groups?: Array<string>,
	options?: Array<string>,
	files?: Array<MockupFile>,
	product_template_id?: number
}

export type Orientation = "horizontal" | "vertical" | ""