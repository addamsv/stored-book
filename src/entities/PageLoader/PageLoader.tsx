import { classes } from "resources/lib/classNames/classes";
import { Loader } from "shared/Loader/Loader";
import cls from "./PageLoader.module.scss";

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <div className={classes(cls.PageLoader, {}, [className])}>
    <Loader />
  </div>
);
