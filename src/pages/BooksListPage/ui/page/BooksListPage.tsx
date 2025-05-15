/* eslint-disable max-len */
import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import { BookList, ListViewSwitcher } from "entities/Book";
import { EBookListView, EBookOfHashTagType } from "entities/Book/model/types";
import { AsyncModule, ReducerListT } from "shared/AsyncModule/AsyncModule";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { Page } from "widgets/Page/Page";
import { Text } from "shared/Text/Text";
import { TextTheme } from "shared/Text";
import { ErrorWidget } from "widgets/Error";
import { useSearchParams } from "react-router-dom";
import { BookBottomNavbar } from "widgets/BookBottomNavbar";
import { useDebounce } from "resources/hooks/useDebounce";
import { bookListPageActions, bookListPageReducer, getBooks } from "../../model/slices";
import cls from "./BooksListPage.module.scss";
import { fetchBookList, fetchNextBookList } from "../../model/services";
import { getBooksListPageError, getBooksListPageIsStateInit, getBooksListPageListView, getBooksListPageLoading } from "../../model/selectors";
import { initBookListPage } from "../../model/services/initBookListPage";
import { BookListFilters } from "../Filter/BookListFilters";
import { BooksList } from "../BooksList/BooksList";

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

  const fetch = useCallback(() => {
    dispatch(fetchBookList({ shouldReplace: true }));
  }, [dispatch]);

  const debouncedFetch = useDebounce(fetch, 500);

  const onGenreChange = useCallback((genre: EBookOfHashTagType) => {
    dispatch(bookListPageActions.setHashTag(genre));
    dispatch(bookListPageActions.setPage(1));
    fetch();
  }, [dispatch, fetch]);

  const onSearchQueryChange = useCallback((query: string) => {
    dispatch(bookListPageActions.setSearch(query));
    dispatch(bookListPageActions.setPage(1));
    debouncedFetch();
  }, [dispatch, debouncedFetch]);

  return (
    <AsyncModule reducers={reducers} isRemoveAfterUnmount={false}>
      <Page
        onNextChunk={onNextChunk}
        className={classes(cls.BooksListPage, {}, [className])}
      >
        <BookListFilters key="BookListFilters" onGenreChange={onGenreChange} onSearchQueryChange={onSearchQueryChange} />

        <BooksList onGenreChange={onGenreChange} onSearchQueryChange={onSearchQueryChange} />

        <BookBottomNavbar key="BookBottomNavbar" />

      </Page>
    </AsyncModule>
  );
};

export default memo(BooksListPage);
