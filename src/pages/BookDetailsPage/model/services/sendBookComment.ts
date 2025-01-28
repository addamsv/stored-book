import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "resources/store/StoreProvider";
import { IComment } from "entities/Comment";
import { getCredentials } from "resources/lib/auth/getCredentials";

import { getBookDetailsData } from "entities/Book/model/selectors";

// import { sendCommentFormActions } from "features/SendCommentForm/model/slices";
// import { getTextFromSendCommentForm } from "features/SendCommentForm/model/selectors";

import { fetchCommentsByBookId } from "./fetchCommentsByBookId";

interface ICustomReturnedData {
  isSuccess: boolean;
  message: string;
  data: IComment;
}

export const sendBookComment = createAsyncThunk<IComment, string, IThunkConf<string>>(
  "bookDetails/sendBookComment",
  async (text, thunkAPI) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkAPI;

    // const text = getTextFromSendCommentForm(getState());
    const bookDetails = getBookDetailsData(getState());

    if (!text || !bookDetails?.id) {
      return rejectWithValue("ошибка");
    }

    const body = { bookId: bookDetails?.id, text };

    console.log(body);

    try {
      const response = await extra.axios.post<ICustomReturnedData>(
        "/comments",
        body,
        { headers: { Authorization: `Bearer ${getCredentials()?.token || ""}` } }
      );

      if (!response.data) {
        return rejectWithValue("ошибка");
      }

      if (response.data.isSuccess === false) {
        return rejectWithValue(`${response.data.message}`);
      }

      // dispatch(sendCommentFormActions.setText(""));
      // лучше добавить в стэйт то, что вернулось или:
      dispatch(fetchCommentsByBookId({ bookId: Number(bookDetails.id) }));

      return response.data.data;
    } catch (e) {
      return rejectWithValue("ошибка");
    }
  }
);
