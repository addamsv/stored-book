import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import cls from "./ArticlesDetailsPage.module.scss";

interface IArticlesDetailsPageProps {
  className?: string;
}

const ArticlesDetailsPage = ({ className }: IArticlesDetailsPageProps) => {
  const { t } = useTranslation("article");

  const { id } = useParams<{id: string}>();

  if (!id) {
    return (
      <div className={classes(cls.ArticlesDetailsPage, {}, [className])}>
        {t("ничего не найдено")}
      </div>
    );
  }

  return (
    <div className={classes(cls.ArticlesDetailsPage, {}, [className])}>
      <ArticleDetails articleId={Number(id)} />
    </div>
  );
};

export default memo(ArticlesDetailsPage);
