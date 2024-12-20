import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "resources/config/routeConfig/routeConfig";
import cls from "./BooksListPage.module.scss";

interface IBooksListPageProps {
  className?: string;
}

const BooksListPage = ({ className }: IBooksListPageProps) => {
  const { t } = useTranslation("book");

  return (
    <div className={classes(cls.BooksListPage, {}, [className])}>
      <h1>{t("Статьи")}</h1>
      <br />
      <br />
      <AppLink to={`${RoutePath.book_details}1`}>{t("Fahrenheit 451")}</AppLink>
      <br />
      <br />
      <AppLink to={`${RoutePath.book_details}2`}>{t("Book Title 2")}</AppLink>
    </div>
  );
};

export default memo(BooksListPage);
