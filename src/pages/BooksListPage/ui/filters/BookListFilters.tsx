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
import { Card } from "shared/Card/Card";
import { Input } from "shared/Input/Input";
import { TypeSortOrder } from "resources/types";
import { fetchBookList } from "pages/BooksListPage/model/services";
import { useDebounce } from "resources/hooks/useDebounce";
import { HashTagTabs } from "features/HashTagTabs";
import LensIcon from "resources/assets/icons/lens.svg";
import { IconSVG } from "shared/IconSVG/IconSVG";
import { HFlex } from "shared/Flex/HFlex";
import cls from "./BookListFilters.module.scss";
import { Sort } from "./Sort/Sort";

interface IBookListFiltersProps {
  className?: string;
  onGenreChange: (genre: EBookOfHashTagType) => void;
}

export const BookListFilters = memo(({ className, onGenreChange }: IBookListFiltersProps) => {
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

  const onHashTagChange = useCallback((tabVal: EBookOfHashTagType) => {
    dispatch(bookListPageActions.setHashTag(tabVal));
    dispatch(bookListPageActions.setPage(1));
    debouncedFetch();
  }, [dispatch, debouncedFetch]);

  return (
    <div className={classes(cls.BookListFilters, {}, [className])}>
      <HFlex justify="around">
        <Sort
          order={order}
          sort={sort}
          onOrderChange={onOrderChange}
          onSortChange={onSortChange}
          className={cls.sortFilter}
        />
        <ListViewSwitcher
          className={cls.switcher}
          listView={listView}
          onViewIconClickHandler={onChangeViewHandler}
        />
      </HFlex>

      <HFlex>
        <IconSVG Svg={LensIcon} />
        <Input className={cls.searchInput} value={searchQuery} onChange={onSearchQueryChange} />
      </HFlex>

      <HashTagTabs activeHashTag={hashTag} onTagChange={onGenreChange} />
    </div>
  );
});
