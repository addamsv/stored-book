import { classes, Mods } from "resources/lib/classNames/classes";
import { memo } from "react";
import { TextTheme, TextAlign, TextSize } from ".";
import cls from "./Text.module.scss";

type THeaderTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface ITextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  textAlign?: TextAlign;
  textSize?: TextSize;
}

export const Text = memo(({
  className,
  text,
  title,
  theme = TextTheme.PRIMARY,
  textAlign = TextAlign.CENTER,
  textSize = TextSize.M
}: ITextProps) => {
  const headerMapping: Record<TextSize, THeaderTag> = {
    [TextSize.XXS]: "h6",
    [TextSize.XS]: "h5",
    [TextSize.S]: "h4",
    [TextSize.M]: "h3",
    [TextSize.L]: "h2",
    [TextSize.XL]: "h1",
  };

  const Header = headerMapping[textSize];

  const mods: Mods = {
    [cls[theme]]: true,
    [cls[textAlign]]: true,
    [cls[textSize]]: true,
  };

  if (title && text) {
    return (
      <section className={classes("", mods, [className])}>
        <Header className={cls.title}>{title}</Header>

        <p className={cls.text}>{text}</p>
      </section>
    );
  }

  if (!title && text) {
    return <p className={classes(cls.text, mods, [className])}>{text}</p>;
  }

  if (!text && title) {
    return <Header className={classes(cls.title, mods, [className])}>{title}</Header>;
  }

  return null;
});
