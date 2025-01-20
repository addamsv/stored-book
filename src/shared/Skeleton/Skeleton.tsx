import { classes } from "resources/lib/classNames/classes";
import { CSSProperties, memo } from "react";
import cls from "./Skeleton.module.scss";

interface ISkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

export const Skeleton = memo(({ className, height, width, border }: ISkeletonProps) => {
  const style: CSSProperties = { width, height, borderRadius: border };

  return <div className={classes(cls.Skeleton, {}, [className])} style={style} />;
});
