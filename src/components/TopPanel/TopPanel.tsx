import cls from './TopPanel.module.scss'
import { AppButton } from '../ui/AppButton/AppButton'
import { useAppStore } from '../../store'

interface TopPanelProps {
	removeHandler: () => void
	removeAllHandler: () => void
	isActiveObjects: boolean
	isObjects: boolean
}
const TopPanel = (props: TopPanelProps) => {
	const { removeHandler, removeAllHandler, isObjects, isActiveObjects } = props
	const orderList = useAppStore(state => state.orderList)
	return (
		<div className={cls.root}>
			<AppButton
				disabled={!isActiveObjects}
				onClick={() => removeHandler()}
				className={cls.removeBtn}
			>
				Удалить выбранный элемент
			</AppButton>
			<AppButton
				disabled={orderList.length === 0}
				onClick={() => removeAllHandler()}
				className={cls.clearAllBtn}
			>
				Очистить всё
			</AppButton>
		</div>
	)
}

export default TopPanel
