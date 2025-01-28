import { classes, Mods } from "resources/lib/classNames/classes";
import { InputHTMLAttributes, memo } from "react";
import cls from "./Input.module.scss";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readonly">

export enum InputTheme {
  PRIMARY = "primary",
  // INVERTED = "inverted",
  LIGHT = "light",
  // ERROR = "error",
}

interface IInputProps extends HTMLInputProps{
  className?: string;
  value?: string | number;
  theme?: InputTheme;
  onChange?: (val: string) => void;
  readonly?: boolean;
}

export const Input = memo(({
  className,
  value,
  onChange,
  type = "text",
  placeholder,
  readonly,
  theme = InputTheme.PRIMARY,
  ...otherProps
}: IInputProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const mods: Mods = {
    [cls[theme]]: true,
    [cls.readOnly]: readonly,
  };

  return (
    <div className={classes(cls.Input, mods, [])}>
      {placeholder && (
        <div className={cls.placeholder}>
          {placeholder}
        </div>
      )}
      <input
        type={type}
        value={value}
        readOnly={readonly}
        onChange={onChangeHandler}
        className={classes(cls.inputEntity, mods, [className])}
        {...otherProps}
      />
    </div>
  );
});
