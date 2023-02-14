import React, { DOMAttributes, FC } from "react";
import { PaletteItem } from "../../types/types";
import cls from "./PaletteListItem.module.scss";

interface PaletteListItemProps<T> extends DOMAttributes<T> {
  className?: string;
  item: PaletteItem;
}
const PaletteListItem: FC<PaletteListItemProps<any>> = (props) => {
  const { className, item, ...otherProps } = props;
  return (
    <div className={cls.root} {...otherProps}>
      <img src={"http://localhost:3000" + item.image} alt={item.name} />
    </div>
  );
};

export default PaletteListItem;
