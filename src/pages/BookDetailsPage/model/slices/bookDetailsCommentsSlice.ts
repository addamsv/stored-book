import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStateSchema } from "resources/store/StoreProvider";
import { IComment } from "entities/Comment";
import { IBooksDetailsCommentsStateSchema } from "../types/IBooksDetailsCommentsStateSchema";
import { fetchCommentsByBookId } from "../services";

const commentsAdapter = createEntityAdapter<IComment>({
  selectId: (comment) => comment.id
});

export const getBooksComments = commentsAdapter.getSelectors<IStateSchema>(
  (state) => state.bookDetailsPage?.comments || commentsAdapter.getInitialState()
);

export const bookDetailsCommentsSlice = createSlice({
  name: "bookDetailsCommentsSlice",
  initialState: commentsAdapter.getInitialState<IBooksDetailsCommentsStateSchema>({
    isLoading: false,
    error: undefined,
    ids: [
      // "1", "2"
    ],
    entities: {
      // 1: {
      //   id: "1",
      //   text: "Awesome comment",
      //   owner: { id: 1, name: "john", image: "http://localhost:3000/images/img2.png" }
      // },
      // 2: {
      //   id: "2",
      //   text: "Whooooo-hoooo",
      //   owner: { id: 1, name: "fedia", image: "http://localhost:3000/images/img3.jpg" }
      // }
    }
  }),
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByBookId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchCommentsByBookId.fulfilled, (state, action: PayloadAction<IComment[]>) => {
        state.isLoading = false;
        commentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCommentsByBookId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: bookDetailsCommentsActions } = bookDetailsCommentsSlice;
export const { reducer: bookDetailsCommentsReducer } = bookDetailsCommentsSlice;
