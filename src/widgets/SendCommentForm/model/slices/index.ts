import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISendCommentFormStateSchema } from "../types";

const initialState: ISendCommentFormStateSchema = {
  text: "",
  error: ""
};

export const sendCommentFormSlice = createSlice({
  name: "sendCommentForm",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    }
  }
});

export const { actions: sendCommentFormActions } = sendCommentFormSlice;
export const { reducer: sendCommentFormReducer } = sendCommentFormSlice;
