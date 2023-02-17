import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import {
	CanvasObject,
	CategoryItem,
	Monument,
	PaletteItem,
} from './types/types'

interface AppStore {
	currentMonument: Monument
	paletteList: PaletteItem[]
	categoriesList: CategoryItem[]
	monumentsList: Monument[]
	fetchMonumentsList: () => void
	fetchPaletteList: () => void
	fetchCategoriesList: () => void
	setCurrentMonument: (monument: Monument) => void
	addToOrderList: (object: CanvasObject) => void
	removeFromOrderList: (index: number) => void
	clearOrderList: () => void
	getFileB64: (url: string, callback: () => void) => void
	getPalettesByCategory: (categoryId: number) => PaletteItem[]
	orderList: CanvasObject[]
}
const useAppStore = create<AppStore>()(
	immer(
		devtools(
			(set, get) => ({
				paletteList: [],
				monumentsList: [],
				currentMonument: {
					name: '',
					image: '',
				},
				orderList: [],
				categoriesList: [],
				fetchPaletteList: async () => {
					const result = await fetch('http://localhost:3000/palette/')
					const json = await result.json()
					set({ paletteList: json })
				},
				fetchCategoriesList: async () => {
					const result = await fetch('http://localhost:3000/categories/')
					const json = await result.json()
					set({ categoriesList: json })
				},
				getPalettesByCategory: (categoryId: number) => {
					return get().paletteList.filter(
						paletteItem => paletteItem.category === categoryId
					)
				},
				fetchMonumentsList: async () => {
					const result = await fetch('http://localhost:3000/monuments/')
					const json = await result.json()
					set({ monumentsList: json })
					set({ currentMonument: json[0] })
				},
				setCurrentMonument: (monument: Monument) => {
					set({ currentMonument: monument })
				},
				addToOrderList: (object: CanvasObject) => {
					set(state => {
						state.orderList.push(object)
					})
				},
				removeFromOrderList: (index: number) => {
					set(state => {
						state.orderList.splice(index, 1)
					})
				},
				clearOrderList: () => {
					set(state => {
						state.orderList = []
					})
				},

				getFileB64: async (url: string, callback: (result: any) => void) => {
					var xhr = new XMLHttpRequest()
					xhr.onload = function () {
						var reader = new FileReader()
						reader.onloadend = function () {
							callback(reader.result)
						}
						reader.readAsDataURL(xhr.response)
					}
					xhr.open('GET', url)
					xhr.responseType = 'blob'
					xhr.send()

					// let response = await fetch('http://localhost:3000' + url)
					// let data = await response.blob()

					// let metadata = {
					// 	type: 'image/png',
					// }
					// let file = new File([data], 'test.png', metadata)

					// const reader = new FileReader()

					// return await reader.readAsBinaryString(file)
				},
			}),
			{
				name: 'app-storage',
			}
		)
	)
)

export { useAppStore }
