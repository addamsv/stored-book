import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { BookDetails } from "entities/Book";
import { useParams } from "react-router-dom";
import cls from "./BookDetailsPage.module.scss";

interface IBookDetailsPageProps {
  className?: string;
}

const BookDetailsPage = ({ className }: IBookDetailsPageProps) => {
  const { t } = useTranslation("book");

  const { id } = useParams<{id: string}>();

  if (!id) {
    return (
      <div className={classes(cls.BookDetailsPage, {}, [className])}>
        {t("ничего не найдено")}
      </div>
    );
  }

  return (
    <div className={classes(cls.BookDetailsPage, {}, [className])}>
      <BookDetails bookId={Number(id)} />
    </div>
  );
};

export default memo(BookDetailsPage);
