import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "resources/store/StoreProvider";
import { getCredentials } from "resources/lib/auth/getCredentials";
import { IBook } from "../../types";

interface IFetchBookByIdProps {
  bookId: number;
}

interface ICustomReturnedData {
  isSuccess: boolean;
  message: string;
  data: IBook;
}

export const fetchBookById = createAsyncThunk<
  IBook, IFetchBookByIdProps, IThunkConf<string>
>(
  "bookDetails/fetchBookById",
  async ({ bookId }, thunkAPI) => {
    const { extra, dispatch, rejectWithValue, } = thunkAPI;

    try {
      const response = await extra.axios.get<ICustomReturnedData>(
        `/books/${bookId}`,
        { headers: { Authorization: `Bearer ${getCredentials()?.token || ""}` } }
      );

      if (!response.data) {
        return rejectWithValue("ошибка");
      }

      if (response.data.isSuccess === false) {
        return rejectWithValue(`${response.data.message}`);
      }

      // dispatch(profileActions.setProfileData(response.data.data));

      // extra.navigate("/");

      return response.data.data;
    } catch (e) {
      return rejectWithValue("ошибка");
    }
  }
);
