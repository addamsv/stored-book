import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "resources/store/StoreProvider";

import { TypeSortOrder } from "resources/types";
import { EBookListSortField, EBookOfHashTagType } from "entities/Book";
import {
  getBooksListPageIsStateInit } from "../selectors";
import { bookListPageActions } from "../slices";
import { fetchBookList } from "./fetchBookList";

// interface IArguments {
//   page: number | undefined;
// }

export const initBookListPage = createAsyncThunk<
  void, // void | IReturnValue[]
  URLSearchParams, // void | IArguments,
  IThunkConf<string>
>(
  "bookListPage/fetchNextBookList",
  async (
    queryParams, // : IArguments
    thunkAPI
  ) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkAPI;

    const isStateInit = getBooksListPageIsStateInit(getState());

    if (!isStateInit) {
      const _order = queryParams.get("order") as TypeSortOrder;
      const _sort = queryParams.get("sort") as EBookListSortField;
      const _q = queryParams.get("q");
      const hashTag = queryParams.get("hashTag") as EBookOfHashTagType;

      if (_order) {
        dispatch(bookListPageActions.setOrder(_order));
      }

      if (_sort) {
        dispatch(bookListPageActions.setSort(_sort));
      }

      if (_q) {
        dispatch(bookListPageActions.setSearch(_q));
      }

      if (hashTag) {
        dispatch(bookListPageActions.setHashTag(hashTag));
      }

      dispatch(bookListPageActions.initState());
      dispatch(fetchBookList({ page: 1 }));
    }
  }
);
