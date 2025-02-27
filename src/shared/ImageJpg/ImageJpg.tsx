import { classes, Mods } from "resources/lib/classNames/classes";
import { CSSProperties, useMemo } from "react";
import cls from "./ImageJpg.module.scss";

interface ImageJpgProps {
  className?: string;
  src?: string;
  alt?: string;
  w?: number;
  h?: number;
}

export const ImageJpg = ({ className, src, alt, w, h }: ImageJpgProps) => {
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(() => ({
    width: w,
    height: h || "auto"
  }), [h, w]);

  return (
    <img src={src} style={styles} className={classes(cls.ImageJpg, {}, [className])} alt={alt} />
  );
};
