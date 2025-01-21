import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useMemo } from "react";
import { EBookListSortField, EBookListView, EBookOfHashTagType, ListViewSwitcher } from "entities/Book";
import { bookListPageActions } from "pages/BooksListPage/model/slices";
import { useSelector } from "react-redux";
import {
  getBooksListPageHashTag,
  getBooksListPageListView, getBooksListPageOrder, getBooksListPageSearch, getBooksListPageSort
} from "pages/BooksListPage/model/selectors";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { Select } from "shared/Select/Select";
import { Card } from "shared/Card/Card";
import { Input } from "shared/Input/Input";
import { TypeSortOrder } from "resources/types";
import { fetchBookList } from "pages/BooksListPage/model/services";
import { useDebounce } from "resources/hooks/useDebounce";
import { ITabItem, Tabs } from "shared/Tabs/Tabs";
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
  const hashTag = useSelector(getBooksListPageHashTag);

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

  const onHashTagChange = useCallback((tab: ITabItem) => {
    dispatch(bookListPageActions.setHashTag(tab.value as EBookOfHashTagType));
    dispatch(bookListPageActions.setPage(1));
    debouncedFetch();
  }, [dispatch, debouncedFetch]);

  const tabs = useMemo<ITabItem[]>(() => [
    { value: EBookOfHashTagType.ALL, content: t("Все") },
    { value: EBookOfHashTagType.IT, content: t("Айти") },
    { value: EBookOfHashTagType.SCIFI, content: t("Сайфай") },
    { value: EBookOfHashTagType.POETRY, content: t("Поэзия") },
    { value: EBookOfHashTagType.POLITICS, content: t("Политика") },
    { value: EBookOfHashTagType.ECONOMICS, content: t("Экономика") },
    { value: EBookOfHashTagType.SCIENCE, content: t("Наука") },
    { value: EBookOfHashTagType.ADVENTURE, content: t("Приключения") }
  ], [t]);

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
      <Card>
        <Tabs tabs={tabs} activeValue={hashTag} onClickHandler={onHashTagChange} />
      </Card>
    </div>
  );
});
