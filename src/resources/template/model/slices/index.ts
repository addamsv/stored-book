// silence is golden

// import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IStateSchema } from "app/providers/StoreProvider";
// import { EBookListView, IBook } from "entities/Book";
// import { IBookListPageStateSchema } from "../types";

// const booksAdapter = createEntityAdapter<IBook>({
//   selectId: (book) => book.id
// });

// export const getBooks = booksAdapter.getSelectors<IStateSchema>(
//   (state) => state.bookListPage || booksAdapter.getInitialState()
// );

// export const bookListPageSlice = createSlice({
//   name: "bookListPageSlice",
//   initialState: booksAdapter.getInitialState<IBookListPageStateSchema>({
//     isLoading: false,
//     error: undefined,
//     listView: EBookListView.COMPACT,
//     ids: [
//       // "1", "2"
//     ],
//     entities: {
//       // 1: { id: "1", text: "Awesome" }, 2: { id: "2", text: "Whooooo-hoooo" }
//     }
//   }),
//   reducers: {
//     setView: (state, action: PayloadAction<EBookListView>) => {
//       state.listView = action.payload;
//     }
//   },

//   // extraReducers: (builder) => {
//   //   builder
//   //     .addCase(fetchCommentsByBookId.pending, (state) => {
//   //       state.error = undefined;
//   //       state.isLoading = true;
//   //     })
//   //     .addCase(fetchCommentsByBookId.fulfilled, (state, action: PayloadAction<IComment[]>) => {
//   //       state.isLoading = false;
//   //       commentsAdapter.setAll(state, action.payload);
//   //     })
//   //     .addCase(fetchCommentsByBookId.rejected, (state, action) => {
//   //       state.isLoading = false;
//   //       state.error = action.payload;
//   //     });
//   // }
// });

// export const {
//   actions: bookListPageActions,
//   reducer: bookListPageReducer
// } = bookListPageSlice;
