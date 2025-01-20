import { classes, Mods } from "resources/lib/classNames/classes";
import { memo } from "react";
import cls from "./Text.module.scss";
import { TextTheme, TextAlign, TextSize } from ".";

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
      {title && <div className={cls.title}>{title}</div>}
      {text && <div className={cls.text}>{text}</div>}
    </div>
  );
});
