import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "app/providers/StoreProvider";
import { IBook } from "entities/Book";
import { getCredentials } from "shared/lib/auth/getCredentials";

interface IArguments {
  // id: number | undefined;
}

interface ICustomReturnedData {
  isSuccess: boolean;
  message: string;
  data: IBook[];
}

export const fetchBookList = createAsyncThunk<
  IBook[],
  void, // void | IArguments,
  IThunkConf<string>
>(
  "bookListPage/fetchBookList",
  async (
    _, // { id } IArguments
    thunkAPI
  ) => {
    const { extra, dispatch, rejectWithValue, } = thunkAPI;

    try {
      const response = await extra.axios.get<ICustomReturnedData>(
        "/books",
        {
          headers: { Authorization: `Bearer ${getCredentials()?.token || ""}` },
          // params: {
          //   bookId,
          //   _expand: "user"
          // }
        }
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
