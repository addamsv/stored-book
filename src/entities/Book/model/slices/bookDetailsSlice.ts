import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook, IBookDetailsStateSchema } from "../types";
import { fetchBookById } from "../services/fetchById/fetchBookById";

const initialState: IBookDetailsStateSchema = {
  isLoading: false,
  error: undefined,
  data: undefined
};

export const bookDetailsSlice = createSlice({
  name: "bookDetails",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchBookById.fulfilled, (state, action: PayloadAction<IBook>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: bookDetailsActions } = bookDetailsSlice;
export const { reducer: bookDetailsReducer } = bookDetailsSlice;
