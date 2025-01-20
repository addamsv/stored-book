import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { EBookListSortField, EBookListView, ListViewSwitcher } from "entities/Book";
import { bookListPageActions } from "pages/BooksListPage/model/slices";
import { useSelector } from "react-redux";
import {
  getBooksListPageListView, getBooksListPageOrder, getBooksListPageSearch, getBooksListPageSort
} from "pages/BooksListPage/model/selectors";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { Select } from "shared/Select/Select";
import { Card } from "shared/Card/Card";
import { Input } from "shared/Input/Input";
import { TypeSortOrder } from "resources/types";
import { fetchBookList } from "pages/BooksListPage/model/services";
import { useDebounce } from "resources/hooks/useDebounce";
import cls from "./BookListFilters.module.scss";
import { Sort } from "./Sort/Sort";

interface IBookListFiltersProps {
  className?: string;
}

export const BookListFilters = memo(({ className }: IBookListFiltersProps) => {
  const { t } = useTranslation();

  const listView = useSelector(getBooksListPageListView);

  const sort = useSelector(getBooksListPageSort);
  const order = useSelector(getBooksListPageOrder);
  const searchQuery = useSelector(getBooksListPageSearch);

  const dispatch = useAppDispatch();

  const fetch = useCallback(() => {
    dispatch(fetchBookList({ shouldReplace: true }));
  }, [dispatch]);

  const debouncedFetch = useDebounce(fetch, 500);

  const onChangeViewHandler = useCallback((newListView: EBookListView) => {
    dispatch(bookListPageActions.setView(newListView));
  }, [dispatch]);

  const onSortChange = useCallback((sort: EBookListSortField) => {
    dispatch(bookListPageActions.setSort(sort));
    dispatch(bookListPageActions.setPage(1));
    fetch();
  }, [dispatch, fetch]);

  const onOrderChange = useCallback((order: TypeSortOrder) => {
    dispatch(bookListPageActions.setOrder(order));
    dispatch(bookListPageActions.setPage(1));
    fetch();
  }, [dispatch, fetch]);

  const onSearchQueryChange = useCallback((query: string) => {
    dispatch(bookListPageActions.setSearch(query));
    dispatch(bookListPageActions.setPage(1));
    debouncedFetch();
  }, [dispatch, debouncedFetch]);

  return (
    <div className={classes(cls.BookListFilters, {}, [className])}>
      <Card>
        <div className={cls.filterWrapper}>
          <Sort order={order} sort={sort} onOrderChange={onOrderChange} onSortChange={onSortChange} />
          <ListViewSwitcher listView={listView} onViewIconClickHandler={onChangeViewHandler} />
        </div>
      </Card>
      <Card>
        <Input className={cls.searchInput} value={searchQuery} onChange={onSearchQueryChange} />
      </Card>
    </div>
  );
});
