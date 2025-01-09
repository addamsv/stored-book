import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStateSchema } from "app/providers/StoreProvider";
import { EBookListView, IBook } from "entities/Book";
import { LIST_VIEW_LOCAL_STORAGE_KEY } from "resources/application";
import { IBookListPageStateSchema } from "../types";
import { fetchBookList } from "../services";

const booksAdapter = createEntityAdapter<IBook>({
  selectId: (book) => book.id
});

export const getBooks = booksAdapter.getSelectors<IStateSchema>(
  (state) => state.bookListPage || booksAdapter.getInitialState()
);

export const bookListPageSlice = createSlice({
  name: "bookListPageSlice",
  initialState: booksAdapter.getInitialState<IBookListPageStateSchema>({
    isLoading: false,
    error: undefined,
    listView: EBookListView.COMPACT,
    page: 1,
    hasMore: true,
    ids: [
      // "1", "2"
    ],
    entities: {
      // 1: { id: "1", text: "Awesome" }, 2: { id: "2", text: "Whooooo-hoooo" }
    },
    _isStateInit: false
  }),
  reducers: {
    setView: (state, action: PayloadAction<EBookListView>) => {
      state.listView = action.payload;
      localStorage.setItem(LIST_VIEW_LOCAL_STORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    initState: (state) => {
      const listView = localStorage.getItem(LIST_VIEW_LOCAL_STORAGE_KEY) as EBookListView;
      state.listView = listView;
      state.limit = listView === EBookListView.STANDARD ? 4 : 9;
      state._isStateInit = true;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBookList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchBookList.fulfilled, (state, action: PayloadAction<IBook[]>) => {
        state.isLoading = false;
        // booksAdapter.setAll(state, action.payload);
        booksAdapter.addMany(state, action.payload);

        const hasMoreElements = action.payload.length > 0;

        state.hasMore = hasMoreElements;
      })
      .addCase(fetchBookList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const {
  actions: bookListPageActions,
  reducer: bookListPageReducer
} = bookListPageSlice;
