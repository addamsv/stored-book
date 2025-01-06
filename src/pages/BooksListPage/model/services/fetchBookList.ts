import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "app/providers/StoreProvider";
import { IBook } from "entities/Book";
import { getCredentials } from "shared/lib/auth/getCredentials";
import { userActions } from "entities/User";
import { getBooksListPageLimit } from "../selectors";

interface IArguments {
  page: number | undefined;
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

    const { page = 1 } = args;

    const limit = getBooksListPageLimit(getState());

    try {
      const response = await extra.axios.get<ICustomReturnedData>(
        "/books",
        {
          headers: { Authorization: `Bearer ${getCredentials()?.token || ""}` },
          params: {
            _limit: limit,
            _page: page
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
