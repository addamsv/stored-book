import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStateSchema } from "resources/store/StoreProvider";
import { EBookListView, IBook, EBookListSortField, EBookOfHashTagType } from "entities/Book";
import { LIST_VIEW_LOCAL_STORAGE_KEY } from "resources/application";
import { TypeSortOrder } from "resources/types";
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
    limit: 10,
    hasMore: true,
    order: "desc",
    sort: EBookListSortField.CREATED_AT,
    search: "",
    hashTag: EBookOfHashTagType.ALL,

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
      state.limit = listView === EBookListView.STANDARD ? 40 : 20;
      state._isStateInit = true;
    },

    // ORDER PARAMS
    setOrder: (state, action: PayloadAction<TypeSortOrder>) => {
      state.order = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action: PayloadAction<EBookListSortField>) => {
      state.sort = action.payload;
    },
    setHashTag: (state, action: PayloadAction<EBookOfHashTagType>) => {
      state.hashTag = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBookList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta && action.meta.arg.shouldReplace) {
          booksAdapter.removeAll(state);
        }
      })
      .addCase(fetchBookList.fulfilled, (state, action) => { // action: PayloadAction<IBook[]>
        state.isLoading = false;

        if (action.meta && action.meta.arg.shouldReplace) {
          booksAdapter.setAll(state, action.payload);
        } else {
          booksAdapter.addMany(state, action.payload);
        }

        const hasMoreElements = action.payload.length >= state.limit;

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
