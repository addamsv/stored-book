import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import cls from "./ArticlesPage.module.scss";

interface IArticlesPageProps {
  className?: string;
}

const ArticlesPage = ({ className }: IArticlesPageProps) => {
  const { t } = useTranslation("article");

  return (
    <div className={classes(cls.ArticlesPage, {}, [className])}>
      <h1>{t("Статьи")}</h1>
    </div>
  );
};

export default memo(ArticlesPage);
