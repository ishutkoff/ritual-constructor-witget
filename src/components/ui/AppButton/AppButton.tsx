import { ButtonHTMLAttributes, FC } from "react";
import cls from "./AppButton.module.scss";
import { classNames } from "../../../libs/classNames";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}
export const AppButton: FC<AppButtonProps> = (props) => {
  const { className, children, ...otherProps } = props;
  return (
    <button
      className={classNames(cls.AppButton, {}, [className ? className : ""])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
