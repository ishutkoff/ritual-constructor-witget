import cls from './TopPanel.module.scss'
import { AppButton } from '../ui/AppButton/AppButton'
// @ts-ignore //TODO Костыль с типизацией. Нужно поправить
import { ReactComponent as RefreshIcon } from "./../../assets/icons/refresh.svg";
// @ts-ignore //TODO Костыль с типизацией. Нужно поправить
import { ReactComponent as DeleteIcon } from "./../../assets/icons/delete.svg";
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
				<DeleteIcon/> <span>Удалить выбранное</span>
			</AppButton>
			<AppButton
				disabled={orderList.length === 0}
				onClick={() => removeAllHandler()}
				className={cls.clearAllBtn}
			>
				<RefreshIcon/> <span>Сброс</span>
			</AppButton>
		</div>
	)
}

export default TopPanel
