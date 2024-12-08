import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import cls from "./ArticlesDetailsPage.module.scss";

interface IArticlesDetailsPageProps {
  className?: string;
}

const ArticlesDetailsPage = ({ className }: IArticlesDetailsPageProps) => {
  const { t } = useTranslation("article");

  return (
    <div className={classes(cls.ArticlesDetailsPage, {}, [className])}>
      <h1>{t("Детали Статьи")}</h1>
    </div>
  );
};

export default memo(ArticlesDetailsPage);
