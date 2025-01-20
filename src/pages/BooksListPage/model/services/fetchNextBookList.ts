import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "resources/store/StoreProvider";
import { IBook } from "entities/Book";

import {
  getBooksListPageError,
  getBooksListPageHasMore,
  getBooksListPageLimit,
  getBooksListPageLoading,
  getBooksListPageNum } from "../selectors";
import { bookListPageActions } from "../slices";
import { fetchBookList } from "./fetchBookList";

interface IArguments {
  page: number | undefined;
}

interface ICustomReturnedData {
  isSuccess: boolean;
  message: string;
  statusCode?: number;
  data: IBook[];
}

export const fetchNextBookList = createAsyncThunk<
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

    const limit = getBooksListPageLimit(getState());

    const hasMore = getBooksListPageHasMore(getState());

    const page = getBooksListPageNum(getState());

    const isLoading = getBooksListPageLoading(getState());

    const error = getBooksListPageError(getState());

    if (hasMore && !isLoading && !error) {
      dispatch(bookListPageActions.setPage(page + 1));
      dispatch(fetchBookList({
        page: page + 1
      }));
    }
    // try {
    //   const response = await extra.axios.get<ICustomReturnedData>(
    //     "/books",
    //     {
    //       headers: { Authorization: `Bearer ${getCredentials()?.token || ""}` },
    //       params: {
    //         _limit: limit,
    //         _page: page
    //       }
    //     }
    //   );

    //   if (!response.data) {
    //     return rejectWithValue("ошибка");
    //   }

    //   if (response.data.isSuccess === false) {
    //     if (response.data.statusCode === 401) {
    //       dispatch(userActions.logout());
    //     }

    //     return rejectWithValue(`${response.data.message}`);
    //   }

    //   // extra.navigate("/");

    //   return response.data.data;
    // } catch (e: unknown) {
    //   if (e instanceof Error) {
    //     rejectWithValue(e.message);
    //   }
    //   return rejectWithValue("ошибка");
    // }
  }
);
