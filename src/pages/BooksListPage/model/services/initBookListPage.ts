import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "app/providers/StoreProvider";

import {
  getBooksListPageIsStateInit } from "../selectors";
import { bookListPageActions } from "../slices";
import { fetchBookList } from "./fetchBookList";

interface IArguments {
  page: number | undefined;
}

export const initBookListPage = createAsyncThunk<
  void, // void | IReturnValue[]
  void, // void | IArguments,
  IThunkConf<string>
>(
  "bookListPage/fetchNextBookList",
  async (
    args, // : IArguments
    thunkAPI
  ) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkAPI;

    const isStateInit = getBooksListPageIsStateInit(getState());

    if (!isStateInit) {
      dispatch(bookListPageActions.initState());
      dispatch(fetchBookList({ page: 1 }));
    }
  }
);
