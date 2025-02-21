import { classes, Mods } from "resources/lib/classNames/classes";
import { ReactNode } from "react";
import cls from "./Flex.module.scss";

export type FlexJustify = "start" | "center" | "end" | "between" | "around";
export type FlexAlign = "start" | "center" | "end";
export type FlexDirection = "row" | "column";
export type FlexGap = "4" | "8" | "16" | "32" | "64" | "128";

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween,
  around: cls.justifyAround
};

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd
};

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn
};

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  16: cls.gap16,
  32: cls.gap32,
  64: cls.gap64,
  128: cls.gap128,
};

type TDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface IFlexProps extends TDivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
  Tag?: "div" | "nav" | "aside"
  | "main" | "footer" | "header" | "section"
  | "article" | "details" | "figcaption"
  | "figure" | "mark" | "summary" | "time";
}
export const Flex = ({ className,
  children,
  justify = "start",
  align = "center",
  direction = "row",
  gap,
  max,
  Tag = "div"
}: IFlexProps) => {
  const classesArr = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap]
  ];

  const mods: Mods = {
    [cls.max]: max
  };

  return (
    <Tag className={classes(cls.Flex, mods, classesArr)}>
      {children}
    </Tag>
  );
};
