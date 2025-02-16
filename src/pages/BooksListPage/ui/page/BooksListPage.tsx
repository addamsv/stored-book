/* eslint-disable max-len */
import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import { BookList, ListViewSwitcher } from "entities/Book";
import { EBookListView } from "entities/Book/model/types";
import { AsyncModule, ReducerListT } from "shared/AsyncModule/AsyncModule";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { Page } from "widgets/Page/Page";
import { Text } from "shared/Text/Text";
import { TextTheme } from "shared/Text";
import { ErrorWidget } from "widgets/Error";
import { useSearchParams } from "react-router-dom";
import { bookListPageActions, bookListPageReducer, getBooks } from "../../model/slices";
import cls from "./BooksListPage.module.scss";
import { fetchNextBookList } from "../../model/services";
import { getBooksListPageError, getBooksListPageIsStateInit, getBooksListPageListView, getBooksListPageLoading } from "../../model/selectors";
import { initBookListPage } from "../../model/services/initBookListPage";
import { BookListFilters } from "../filters/BookListFilters";

interface IBooksListPageProps {
  className?: string;
}

const reducers: ReducerListT = {
  bookListPage: bookListPageReducer
};

const BooksListPage = ({ className }: IBooksListPageProps) => {
  const { t } = useTranslation("book");

  const dispatch = useAppDispatch();

  // SELECTORS
  const bookArr = useSelector(getBooks.selectAll);
  const isLoading = useSelector(getBooksListPageLoading);
  const error = useSelector(getBooksListPageError);
  const listView = useSelector(getBooksListPageListView);
  const isStateInit = useSelector(getBooksListPageIsStateInit);
  const [searchParams, setSearchParams] = useSearchParams();

  const onNextChunk = useCallback(() => {
    dispatch(fetchNextBookList());
  }, [dispatch]);

  /** FOR INIT STATE ONLY */
  useEffect(() => {
    if (__PROJECT_TYPE__ !== "storybook") {
      dispatch(initBookListPage(searchParams));
    }
  }, [dispatch, isStateInit, searchParams]);

  return (
    <AsyncModule reducers={reducers} isRemoveAfterUnmount={false}>
      <Page
        onNextChunk={onNextChunk}
        className={classes(cls.BooksListPage, {}, [className])}
      >
        {error ? (
          <ErrorWidget text={error} />
        ) : (
          <>
            <BookListFilters />
            <BookList
              isLoading={isLoading}
              bookArr={bookArr}
              listView={listView}
            />
          </>
        )}
      </Page>
    </AsyncModule>
  );
};

export default memo(BooksListPage);
