import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { BookDetails } from "entities/Book";
import { useParams } from "react-router-dom";
import { AsyncModule, ReducerListT } from "shared/AsyncModule/AsyncModule";
import { Page } from "widgets/Page/Page";
import { BookBottomNavbar } from "widgets/BookBottomNavbar";
import { BookRecommendationsList } from "features/BookRecommendationsList";
import cls from "./BookDetailsPage.module.scss";
import { bookDetailsPageReducer } from "../../model/slices";
import { BookDetailsHeader } from "../BookDetailsHeader/BookDetailsHeader";
import { BookDetailsComments } from "../BookDetailsComments/BookDetailsComments";

interface IBookDetailsPageProps {
  className?: string;
}

const reducerList: ReducerListT = {
  bookDetailsPage: bookDetailsPageReducer
};

const BookDetailsPage = ({ className }: IBookDetailsPageProps) => {
  const { t } = useTranslation("book");

  const { id } = useParams<{id: string}>();

  if (!id) {
    return (
      <Page className={classes(cls.BookDetailsPage, {}, [className])}>
        {t("ничего не найдено")}
      </Page>
    );
  }

  return (
    <AsyncModule reducers={reducerList} isRemoveAfterUnmount>
      <Page className={classes(cls.BookDetailsPage, {}, [className])}>
        <BookDetailsHeader />

        <BookDetails bookId={Number(id)} />

        <BookRecommendationsList />

        <BookDetailsComments bookId={Number(id)} />

        <BookBottomNavbar />
      </Page>
    </AsyncModule>
  );
};

export default memo(BookDetailsPage);
