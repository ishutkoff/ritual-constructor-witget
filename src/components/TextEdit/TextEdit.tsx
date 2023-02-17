import cls from './TextEdit.module.scss'
import { AppButton } from '../ui/AppButton/AppButton'
import { useAppStore } from '../../store'
import { CanvasObjectType } from '../../types/types'

interface TextEditProps {
	addTextHandler: () => void
}
const TextEdit = (props: TextEditProps) => {
	const addObjectToCanvas = useAppStore(state => state.addToOrderList)
	const { addTextHandler } = props
	return (
		<div className={cls.root}>
			<h2>Текст</h2>
			<AppButton
				onClick={() => {
					addObjectToCanvas({
						name: 'fontName', //TODO Тут нужно указать название шрифта
						type: CanvasObjectType.text,
					})
					addTextHandler()
				}}
				className={cls.textAddButton}
			>
				Добавить надпись
			</AppButton>
		</div>
	)
}

export default TextEdit
