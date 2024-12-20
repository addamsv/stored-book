import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISendCommentFormStateSchema } from "../types";

const initialState: ISendCommentFormStateSchema = {
  text: "",
  error: "",
  // isLoading: false
};

export const sendCommentFormSlice = createSlice({
  name: "sendCommentForm",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(sendCommentFormByUsername.pending, (state, action) => {
  //       state.error = undefined;
  //       state.isLoading = true;
  //     })
  //     .addCase(sendCommentFormByUsername.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //     })
  //     .addCase(sendCommentFormByUsername.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     });
  // }
});

export const { actions: sendCommentFormActions } = sendCommentFormSlice;
export const { reducer: sendCommentFormReducer } = sendCommentFormSlice;
