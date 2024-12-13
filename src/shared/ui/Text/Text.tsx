import { classes, Mods } from "shared/lib/classNames/classes";
import { memo } from "react";
import cls from "./Text.module.scss";

export enum TextTheme {
  PRIMARY = "primary",
  INVERTED = "inverted",
  LIGHT = "light",
  ERROR = "error",
}

export enum TextAlign {
  CENTER = "center",
  RIGHT = "right",
  LEFT = "left",
}

export enum TextSize {
  XS = "extraSmall",
  S = "small",
  M = "middle",
  L = "large",
  XL = "extraLarge",
}

interface ITextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  textAlign?: TextAlign;
  textSize?: TextSize;
}

export const Text = memo(({
  className, text, title, theme = TextTheme.PRIMARY, textAlign = TextAlign.CENTER, textSize = TextSize.M
}: ITextProps) => {
  const mods: Mods = {
    [cls[theme]]: true,
    [cls[textAlign]]: true,
    [cls[textSize]]: true,
  };

  return (
    <div className={classes(cls.Text, mods, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});
