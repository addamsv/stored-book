import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticle } from "../types";
import { IArticleDetailsStateSchema } from "../types/state";
import { fetchArticleById } from "../services/fetchById/fetchArticleById";

const initialState: IArticleDetailsStateSchema = {
  isLoading: false,
  error: undefined,
  data: undefined
};

export const articleDetailsSlice = createSlice({
  name: "articleDetails",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<IArticle>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;
