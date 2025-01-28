import { classes, Mods } from "resources/lib/classNames/classes";
import { CSSProperties, useMemo } from "react";
import cls from "./ImageJpg.module.scss";

interface ImageJpgProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}

export const ImageJpg = ({ className, src, alt, size }: ImageJpgProps) => {
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(() => ({
    width: size,
    height: "auto"
  }), [size]);

  return (
    <img src={src} style={styles} className={classes(cls.ImageJpg, {}, [className])} alt={alt} />
  );
};
