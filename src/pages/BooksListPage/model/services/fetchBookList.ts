import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "resources/store/StoreProvider";
import { EBookOfHashTagType, IBook } from "entities/Book";
import { getCredentials } from "resources/lib/auth/getCredentials";
import { userActions } from "entities/User";
import { addQueryParams } from "resources/lib/addQueryParams/addQueryParams";
import {
  getBooksListPageHashTag,
  getBooksListPageLimit, getBooksListPageNum, getBooksListPageOrder, getBooksListPageSearch, getBooksListPageSort
} from "../selectors";

interface IArguments {
  page?: number;
  shouldReplace?: boolean;
}

interface ICustomReturnedData {
  isSuccess: boolean;
  message: string;
  statusCode?: number;
  data: IBook[];
}

export const fetchBookList = createAsyncThunk<
  IBook[],
  IArguments, // void | IArguments,
  IThunkConf<string>
>(
  "bookListPage/fetchBookList",
  async (
    args, // : IArguments
    thunkAPI
  ) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkAPI;

    // const { page = 1 } = args;

    const page = getBooksListPageNum(getState());
    const limit = getBooksListPageLimit(getState());
    const sort = getBooksListPageSort(getState());
    const order = getBooksListPageOrder(getState());
    const searchQuery = getBooksListPageSearch(getState());
    const hashTag = getBooksListPageHashTag(getState());

    try {
      addQueryParams({ q: searchQuery, sort, order, hashTag });

      const response = await extra.axios.get<ICustomReturnedData>(
        "/books",
        {
          headers: { Authorization: `Bearer ${getCredentials()?.token || ""}` },
          params: {
            _limit: limit,
            _page: page,
            _sort: sort,
            _order: order,
            hashTag: hashTag === EBookOfHashTagType.ALL ? undefined : hashTag,
            q: searchQuery
          }
        }
      );

      if (!response.data) {
        return rejectWithValue("ошибка");
      }

      if (response.data.isSuccess === false) {
        if (response.data.statusCode === 401) {
          dispatch(userActions.logout());
        }

        return rejectWithValue(`${response.data.message}`);
      }

      // extra.navigate("/");

      return response.data.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        rejectWithValue(e.message);
      }
      return rejectWithValue("ошибка");
    }
  }
);
