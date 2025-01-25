import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStateSchema } from "resources/store/StoreProvider";
import { IComment } from "entities/Comment";
import { IBook } from "entities/Book";
import { fetchCommentsByBookId } from "../services";
import { IRecommendationsStateSchema } from "../types/IRecommendationsStateSchema";
import { fetchRecommendations } from "../services/fetchRecommendations";

const recommendationsAdapter = createEntityAdapter<IBook>({
  selectId: (bookDetails) => bookDetails.id
});

// selectors:
export const getRecommendations = recommendationsAdapter.getSelectors<IStateSchema>(
  (state) => state.bookDetailsPage?.recommendations || recommendationsAdapter.getInitialState()
);

export const recommendationSlice = createSlice({
  name: "recommendationSlice",
  initialState: recommendationsAdapter.getInitialState<IRecommendationsStateSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {}
  }),
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: recommendationsActions } = recommendationSlice;
export const { reducer: recommendationsReducer } = recommendationSlice;
