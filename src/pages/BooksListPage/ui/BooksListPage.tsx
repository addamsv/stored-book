import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import cls from "./BooksListPage.module.scss";

interface IBooksListPageProps {
  className?: string;
}

const BooksListPage = ({ className }: IBooksListPageProps) => {
  const { t } = useTranslation("book");

  return (
    <div className={classes(cls.BooksListPage, {}, [className])}>
      <h1>{t("Статьи")}</h1>
    </div>
  );
};

export default memo(BooksListPage);
