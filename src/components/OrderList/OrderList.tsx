import { FC } from "react";
import { classNames } from "../../libs/classNames";
import { useAppStore } from "../../store";
import { CanvasObjectType } from "../../types/types";
import cls from "./OrderList.module.scss";

interface OrderListProps {
  className?: string;
  removeHandler: (index?: number) => void;
}
export const OrderList: FC<OrderListProps> = (props) => {
  const objectList = useAppStore((state) => state.orderList);
  const currentMonument = useAppStore((state) => state.currentMonument);
  const { className, removeHandler, ...otherProps } = props;
  return (
    <div
      className={classNames(cls.root, {}, [className ? className : ""])}
      {...otherProps}
    >
      <h2>Вы выбрали:</h2>
      <ol className={cls.orderList}>
        <li className={cls.orderList__item}>Стелла: {currentMonument.title}</li>
        {objectList.map((object, index) => (
          <li className={cls.orderList__item} key={object.title + index}>
            {object.type === CanvasObjectType.img
              ? "Эскиз - "
              : "Надпись (Шрифт) - "}
            {object.title}
            <a href="#" onClick={() => removeHandler(index)}>
              x
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};
