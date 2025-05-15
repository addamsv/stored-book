import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { BookList, EBookOfHashTagType } from "entities/Book";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ErrorWidget } from "widgets/Error";
import cls from "./BooksList.module.scss";
import { getBooks } from "../../model/slices";
import {
  getBooksListPageError,
  getBooksListPageIsStateInit,
  getBooksListPageListView,
  getBooksListPageLoading
} from "../../model/selectors";

interface IBooksListProps {
  className?: string;
    onGenreChange: (genre: EBookOfHashTagType) => void;
    onSearchQueryChange: (query: string) => void;
}

export const BooksList = memo(({ className, onGenreChange, onSearchQueryChange }: IBooksListProps) => {
  const { t } = useTranslation();

  // SELECTORS
  const bookArr = useSelector(getBooks.selectAll);
  const isLoading = useSelector(getBooksListPageLoading);
  const error = useSelector(getBooksListPageError);
  const listView = useSelector(getBooksListPageListView);

  if (error) {
    return <ErrorWidget key="ErrorWidget" text={error} />;
  }

  return (
    <BookList
      key="BookList"
      isLoading={isLoading}
      bookArr={bookArr}
      listView={listView}
      onGenreChange={onGenreChange}
      onSearchQueryChange={onSearchQueryChange}
    />
  );
});
