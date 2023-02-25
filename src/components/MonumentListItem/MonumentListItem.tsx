import React, { DOMAttributes, FC } from "react";
import { Monument } from "../../types/types";
import cls from "./MonumentListItem.module.scss";
import { useAppStore } from "../../store";
import { classNames } from "../../libs/classNames";

interface MonumentListItemProps<T> extends DOMAttributes<T> {
  className?: string;
  item: Monument;
}
const MonumentListItem: FC<MonumentListItemProps<any>> = (props) => {
  const currentMonument = useAppStore((state) => state.currentMonument);
  const { className, item, ...otherProps } = props;
  const baseUrl = useAppStore((state) => state.baseUrl);
  return (
    <div
      {...otherProps}
      className={classNames(
        cls.root,
        { [cls.selected]: currentMonument._id === item._id },
        []
      )}
    >
      <img src={`${baseUrl}/files/${item.image}`} alt={item.title} />
    </div>
  );
};

export default MonumentListItem;
