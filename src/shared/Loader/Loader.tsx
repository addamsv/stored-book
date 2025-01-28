import { classes } from "resources/lib/classNames/classes";
import cls from "./Loader.module.scss";

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={classes(cls.Loader, {}, [className])}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
