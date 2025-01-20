import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "resources/store/StoreProvider";
import { IComment } from "entities/Comment";
import { getCredentials } from "resources/lib/auth/getCredentials";

interface IFetchCommentsByBookIdProps {
  bookId: number | undefined;
}

interface ICustomReturnedData {
  isSuccess: boolean;
  message: string;
  data: IComment[];
}

export const fetchCommentsByBookId = createAsyncThunk<
  IComment[], IFetchCommentsByBookIdProps, IThunkConf<string>
>(
  "bookDetails/fetchCommentsByBookId",
  async ({ bookId }, thunkAPI) => {
    const { extra, dispatch, rejectWithValue, } = thunkAPI;

    if (!bookId) {
      return rejectWithValue("ошибка");
    }

    try {
      const response = await extra.axios.get<ICustomReturnedData>(
        `/comments/${bookId}`,
        {
          headers: { Authorization: `Bearer ${getCredentials()?.token || ""}` },
          params: {
            bookId,
            _expand: "user"
          }
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
