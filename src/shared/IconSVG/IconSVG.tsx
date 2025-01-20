import { memo } from "react";
import { classes } from "resources/lib/classNames/classes";
import cls from "./IconSVG.module.scss";

interface IIconSVGProps {
  className?: string;
  w?: number;
  h?: number;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const IconSVG = memo(({ className, w = 20, h = 20, Svg }: IIconSVGProps) => (
  <Svg width={w} height={h} className={classes(cls.IconSVG, {}, [className])} />
));
