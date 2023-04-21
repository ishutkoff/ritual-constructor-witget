import cls from "./TextEdit.module.scss";
import { AppButton } from "../ui/AppButton/AppButton";
import { useAppStore } from "../../store";
import { CanvasObjectType } from "../../types/types";

interface TextEditProps {
  addTextHandler: () => void;
}
const TextEdit = (props: TextEditProps) => {
  const addObjectToCanvas = useAppStore((state) => state.addToOrderList);
  const currentFont = useAppStore((state) => state.currentFont);
  const fontsList = useAppStore((state) => state.fontsList);
  const setCurrentFont = useAppStore((state) => state.setCurrentFont);
  const { addTextHandler } = props;

  const fontSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setCurrentFont(e.target.value);
  };

  return (
    <div className={cls.root}>
      <h2>Текст</h2>
      <select
        className={cls.fontSelect}
        onChange={fontSelectHandler}
        value={currentFont}
      >
        {fontsList.map((font: string) => (
          <option value={font}>{font}</option>
        ))}
      </select>
      <AppButton
        onClick={() => {
          addObjectToCanvas({
            title: currentFont,
            type: CanvasObjectType.text,
          });
          addTextHandler();
        }}
        className={cls.textAddButton}
      >
        Добавить надпись
      </AppButton>
    </div>
  );
};

export default TextEdit;
