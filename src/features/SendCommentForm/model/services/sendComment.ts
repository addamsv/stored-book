// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { IThunkConf } from "app/providers/StoreProvider";
// import { IComment } from "entities/Comment";
// import { getCredentials } from "shared/lib/auth/getCredentials";
// import { getBookDetailsData } from "entities/Book/model/selectors";
// import { fetchCommentsByBookId } from "pages/BookDetailsPage/model/services";
// import { getTextFromSendCommentForm } from "../selectors";
// import { sendCommentFormActions } from "../slices";

// interface ICustomReturnedData {
//   isSuccess: boolean;
//   message: string;
//   data: IComment;
// }

// export const sendComment = createAsyncThunk<
//   IComment, void, IThunkConf<string>
// >(
//   "sendCommentForm/sendComment",
//   async (_, thunkAPI) => {
//     const { extra, dispatch, rejectWithValue, getState } = thunkAPI;

//     const text = getTextFromSendCommentForm(getState());
//     const bookDetails = getBookDetailsData(getState());

//     if (!text || !bookDetails?.id) {
//       return rejectWithValue("ошибка");
//     }

//     const body = { bookId: bookDetails?.id, text };

//     console.log(body);

//     try {
//       const response = await extra.axios.post<ICustomReturnedData>(
//         "/comments",
//         body,
//         { headers: { Authorization: `Bearer ${getCredentials()?.token || ""}` } }
//       );

//       if (!response.data) {
//         return rejectWithValue("ошибка");
//       }

//       if (response.data.isSuccess === false) {
//         return rejectWithValue(`${response.data.message}`);
//       }

//       dispatch(sendCommentFormActions.setText(""));
//       // лучше добавить в стэйт то, что вернулось или:
//       dispatch(fetchCommentsByBookId({ bookId: Number(bookDetails.id) }));

//       // extra.navigate("/");

//       return response.data.data;
//     } catch (e) {
//       return rejectWithValue("ошибка");
//     }
//   }
// );
