import { useAppStore } from './store'
import { useEffect, useState } from 'react'
import './assets/index.scss'
import PaletteList from './components/PaletteList/PaletteList'
import TextEdit from './components/TextEdit/TextEdit'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { fabric } from 'fabric'
import MonumentsList from './components/MonumentsList/MonumentsList'
import { addBackground, addImage, addText } from './fabricActions'
import TopPanel from './components/TopPanel/TopPanel'
import { OrderList } from './components/OrderList/OrderList'

function App() {
	const fetchPaletteList = useAppStore(state => state.fetchPaletteList)
	const fetchCategoriesList = useAppStore(state => state.fetchCategoriesList)
	const fetchMonumentsList = useAppStore(state => state.fetchMonumentsList)
	const currentMonument = useAppStore(state => state.currentMonument)
	const clearOrderList = useAppStore(state => state.clearOrderList)
	const orderList = useAppStore(state => state.orderList)
	const removeFromOrderList = useAppStore(state => state.removeFromOrderList)
	const getFileB64 = useAppStore(state => state.getFileB64)

	const { selectedObjects, editor, onReady } = useFabricJSEditor()

	const selectImage = (url: string) => {
		getFileB64(
			url,
			// @ts-ignore
			function (myBase64) {
				addImage(editor, myBase64)
			}
		)
	}
	const addTextHandler = () => {
		addText(editor)
	}

	const printCanvas = () => {
		let printWin = window.open('', '', '')
		let dataUrl = editor?.canvas.toDataURL()
		printWin?.document.write('<img src="' + dataUrl + '">')
		// printWin?.focus()
		setTimeout(() => {
			printWin?.document.execCommand('print')
			printWin?.close()
		}, 500)
	}

	const removeHandler = (index?: number) => {
		// @ts-ignore
		if (index) editor?.canvas.setActiveObject(editor?.canvas.item(index))
		let activeObject = editor?.canvas.getActiveObjects()
		let objects = editor?.canvas.getObjects() || []
		if (!activeObject) return
		if (confirm('Вы точно хотите удалить объект?')) {
			removeFromOrderList(index ? index : objects.indexOf(activeObject[0]))
			editor?.canvas.discardActiveObject()
			editor?.canvas.remove(...activeObject)
		}
	}

	const removeAllHandler = () => {
		let objects = editor?.canvas.getObjects() || []
		if (confirm('Вы точно хотите удалить все объекты?')) {
			clearOrderList()
			objects.forEach((el, index) => {
				editor?.canvas.remove(el)
			})
		}
	}

	function saveImage() {
		if (!editor) return
		let a = document.createElement('a')
		document.body.appendChild(a)
		a.href = editor.canvas.toDataURL({
			format: 'png',
			quality: 0.8,
		})
		a.download = 'canvas.png'
		a.click()
		a.remove()
	}

	useEffect(() => {
		fetchPaletteList()
		fetchCategoriesList()
		fetchMonumentsList()

		let canvasDize: number = 400
		if (window.matchMedia('(min-width: 600px)')) {
			canvasDize = 400
		}

		editor?.canvas.setHeight(canvasDize)
		editor?.canvas.setWidth(canvasDize)
	}, [])

	useEffect(() => {
		getFileB64(
			'http://localhost:3000' + currentMonument.image,
			// @ts-ignore
			function (myBase64) {
				addBackground(editor, myBase64)
			}
		)
	}, [currentMonument])

	return (
		<div className='App'>
			<div className='b-constructor'>
				<div className='b-constructor__left-sidebar'>
					<TextEdit addTextHandler={addTextHandler} />
					<MonumentsList />
					<PaletteList selectImage={selectImage} />
				</div>
				<div className='b-constructor__work-space'>
					<TopPanel
						removeHandler={removeHandler}
						removeAllHandler={removeAllHandler}
						isActiveObjects={
							selectedObjects && selectedObjects.length > 0 ? true : false
						}
						isObjects={true} //TODO Тут захардкодил пока что
					/>
					<FabricJSCanvas className='' onReady={onReady} />
				</div>
				<div className='b-constructor__right-sidebar'>
					<div className='b-constructor__right-sidebar-wrapper'>
						<OrderList removeHandler={removeHandler} />
						<button
							className='b-constructor__download-btn'
							onClick={saveImage}
							disabled={orderList.length === 0}
						>
							<svg
								width='800px'
								height='800px'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M13 4H8.8C7.11984 4 6.27976 4 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4 6.27976 4 7.11984 4 8.8V15.2C4 16.8802 4 17.7202 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.27976 20 7.11984 20 8.8 20H15.2C16.8802 20 17.7202 20 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C20 17.7202 20 16.8802 20 15.2V11'
									stroke='#fff'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
								<path
									d='M4 16L8.29289 11.7071C8.68342 11.3166 9.31658 11.3166 9.70711 11.7071L13 15M13 15L15.7929 12.2071C16.1834 11.8166 16.8166 11.8166 17.2071 12.2071L20 15M13 15L15.25 17.25'
									stroke='#fff'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
								<path
									d='M18 3V8M18 8L16 6M18 8L20 6'
									stroke='#fff'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</svg>
							Скачать
						</button>
						<button
							className='b-constructor__print-btn'
							onClick={() => printCanvas()}
							disabled={orderList.length === 0}
						>
							<svg
								width='800px'
								height='800px'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
							>
								<path
									stroke='#fff'
									stroke-linejoin='round'
									stroke-width='2'
									d='M8 17H5a1 1 0 01-1-1v-5a2 2 0 012-2h12a2 2 0 012 2v5a1 1 0 01-1 1h-3M8 4h8v5H8V4zm0 11h8v4H8v-4z'
								/>
								<circle cx='7' cy='12' r='1' fill='#fff' />
							</svg>
							На печать
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
