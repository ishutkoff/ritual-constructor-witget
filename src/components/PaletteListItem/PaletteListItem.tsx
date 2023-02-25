import React, { DOMAttributes, FC } from "react";
import { PaletteItem } from "../../types/types";
import cls from "./PaletteListItem.module.scss";
import { useAppStore } from "../../store";

interface PaletteListItemProps<T> extends DOMAttributes<T> {
  className?: string;
  item: PaletteItem;
}
const PaletteListItem: FC<PaletteListItemProps<any>> = (props) => {
  const { className, item, ...otherProps } = props;
  const baseUrl = useAppStore((state) => state.baseUrl);
  return (
    <div className={cls.root} {...otherProps}>
      `
      <img src={`${baseUrl}/files/${item.image}`} alt={item.title} />
    </div>
  );
};

export default PaletteListItem;
