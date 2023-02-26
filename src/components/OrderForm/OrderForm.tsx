import react, { useState } from "react";
import cls from "./OrderForm.module.scss";
import { classNames } from "../../libs/classNames";
// @ts-ignore
import InputMask from "react-input-mask";
import { SendFields } from "../../types/types";
// @ts-ignore
import { ReactComponent as CalcIcon } from "./../../assets/icons/calc.svg";
import { useAppStore } from "../../store";
interface OrderFormProps {
  className?: string;
  getImage: () => string | undefined;
  disabled?: boolean;
}
export const OrderForm = (props: OrderFormProps) => {
  const { className, disabled, getImage } = props;
  const baseUrl = useAppStore((state) => state.baseUrl);
  const shopId = useAppStore((state) => state.shopId);
  const [visibility, setVisibility] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData();
    let image = getImage();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("shopId", shopId);
    if (image) formData.append("document", image);
    fetch(`${baseUrl}/send-data/constructor/`, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        setSuccess(true);
        setName("");
        setPhone("");
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    e.preventDefault();
  };

  const numberHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };
  const phoneHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPhone(e.target.value);
  };

  return (
    <>
      {success && (
        <span className={cls.successMessage}>
          Ваша заявка успешно отправлена
        </span>
      )}

      <button
        className={classNames(
          cls.orderToggleBtn,
          { [cls["hide"]]: visibility },
          []
        )}
        disabled={disabled}
        onClick={() => setVisibility(true)}
      >
        <CalcIcon />
        Получить рассчёт
      </button>
      <div
        className={classNames(
          cls.orderModal,
          { [cls["open"]]: visibility },
          []
        )}
      >
        <form onSubmit={submitHandler}>
          <input
            onChange={numberHandler}
            value={name}
            type="text"
            placeholder="Имя"
          />
          <InputMask
            onChange={phoneHandler}
            value={phone}
            // value={phone}
            placeholder="Номер телефона"
            mask="+7(999) 999 99 99"
            maskChar=" "
          >
            {(inputProps: react.InputHTMLAttributes<HTMLInputElement>) => (
              <input {...inputProps} type="tel" />
            )}
          </InputMask>
          <button disabled={!name || !phone} type="submit">
            Отправить заявку
          </button>
        </form>
      </div>
    </>
  );
};
