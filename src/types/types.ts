export interface PaletteItem {
	id: number
	name: string
	category: number
	image: string
}

export interface CategoryItem {
	id: number
	name: string
}

export interface Monument {
	id?: number
	name: string
	image: string
}

export enum CanvasObjectType {
	img = 'img',
	text = 'text',
}

export interface CanvasObject {
	id?: number
	name: string
	type: CanvasObjectType
}
