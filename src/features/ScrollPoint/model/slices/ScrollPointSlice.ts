import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IScrollPointStateSchema } from "../../types";

const initialState: IScrollPointStateSchema = {
  scroll: {}
};

export const scrollPointSlice = createSlice({
  name: "scrollPoint",
  initialState,
  reducers: {
    setScrollPos: (state, action: PayloadAction<{ path: string, pos: number }>) => {
      const { path, pos } = action.payload;
      state.scroll[path] = pos;
    }
  },

  // extraReducers: (builder) => {s
  //   builder
  //     .addCase(fetchCommentsByBookId.pending, (state) => {
  //       state.error = undefined;
  //       state.isLoading = true;
  //     })
  //     .addCase(fetchCommentsByBookId.fulfilled, (state, action: PayloadAction<IComment[]>) => {
  //       state.isLoading = false;
  //       commentsAdapter.setAll(state, action.payload);
  //     })
  //     .addCase(fetchCommentsByBookId.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     });
  // }
});

export const {
  actions: scrollPointActions,
  reducer: scrollPointReducer
} = scrollPointSlice;
