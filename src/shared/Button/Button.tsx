import { ButtonHTMLAttributes, FC, memo, ReactNode } from "react";
import { classes, Mods } from "resources/lib/classNames/classes";
import cls from "./Button.module.scss";

export enum ButtonTheme {
  ACCENT = "accentTheme",
  ACCENT_OUTLINE = "accentThemeOutline",
  CLEAR = "clear",
  CLEAR_PAD = "clearPad",
  GRAY = "gray",
  GREEN = "green",
  RED = "red",
  GRAY_OUTLINE = "grayOutline",
  WHITE_OUTLINE = "whiteOutline"
}

export enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl"
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
}

export const Button = memo(({
  className,
  theme = ButtonTheme.ACCENT_OUTLINE,
  size = ButtonSize.M,
  disabled,
  children,
  ...otherProps
}: ButtonProps) => {
  const mods: Mods = {
    [cls[size]]: true,
    [cls[theme]]: true,
    [cls.disabled]: disabled,
  };

  return (
    <button
      type="button"
      className={classes(cls.Button, mods, [cls[theme], className])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
