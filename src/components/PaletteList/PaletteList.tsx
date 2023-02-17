import React, { useState } from 'react'
import cls from './PaletteList.module.scss'
import { useAppStore } from '../../store'
import { classNames } from '../../libs/classNames'
import { CanvasObjectType } from '../../types/types'
import PaletteListItem from '../PaletteListItem/PaletteListItem'

interface PaletteListProps {
	selectImage: (url: string) => void
}

const PaletteList = (props: PaletteListProps) => {
	const { selectImage } = props
	const categoriesList = useAppStore(state => state.categoriesList)
	const getPalettesByCategory = useAppStore(
		state => state.getPalettesByCategory
	)
	const addObjectToCanvas = useAppStore(state => state.addToOrderList)
	const [currentCategory, setCurrentCategory] = useState(0)
	const selectCategory = (categoryId: number) => {
		if (currentCategory === categoryId) {
			setCurrentCategory(0)
		} else {
			setCurrentCategory(categoryId)
		}
	}

	return (
		<div className={cls.root}>
			<h2>Палитра изображений</h2>
			{categoriesList.map(category => (
				<div
					className={classNames(
						'',
						{ [cls.selectedCategory]: currentCategory === category.id },
						[]
					)}
					key={category.id}
				>
					<div
						className={cls.categoryTitle}
						onClick={() => selectCategory(category.id)}
					>
						{' '}
						{category.name}
					</div>

					<div className={classNames(cls.paletteWrapper, {}, [])}>
						{getPalettesByCategory(category.id).map(item => (
							<PaletteListItem
								onClick={() => {
									addObjectToCanvas({
										id: item.id,
										name: item.name,
										type: CanvasObjectType.img,
									})
									selectImage('http://localhost:3000' + item.image)
								}}
								item={item}
								key={item.id}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
export default PaletteList
