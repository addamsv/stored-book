import { classes } from "resources/lib/classNames/classes";
import { HTMLAttributes, memo } from "react";
import cls from "./Card.module.scss";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode
}

export const Card = memo(({ className, children, ...props }: ICardProps) => {
  return (
    <div className={classes(cls.Card, {}, [className])} {...props}>
      {children}
    </div>
  );
});
