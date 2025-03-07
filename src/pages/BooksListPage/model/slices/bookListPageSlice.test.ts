import { EBookListView, IBook } from "entities/Book";
import { EBookListSortField, EBookOfHashTagType } from "entities/Book/model/types";
import { IBookListPageStateSchema } from "../types";
import { bookListPageActions, bookListPageReducer } from ".";
import { fetchBookList } from "../services";

describe("bookListPageSlice.test", () => {
  beforeEach(() => {});

  test("setView test", () => {
    const state: IBookListPageStateSchema = {
      listView: EBookListView.COMPACT,
      ids: [],
      entities: {},
      page: 1,
      limit: 10,
      order: "asc",
      sort: EBookListSortField.CREATED_AT,
      hashTag: EBookOfHashTagType.ALL,
      search: "",
      hasMore: true,
      _isStateInit: true
    };

    expect(
      bookListPageReducer(
        state,
        bookListPageActions.setView(EBookListView.STANDARD)
      )
    )
      .toEqual({
        listView: EBookListView.STANDARD,
        ids: [],
        entities: {},
        page: 1,
        limit: 10,
        order: "asc",
        sort: EBookListSortField.CREATED_AT,
        hashTag: EBookOfHashTagType.ALL,
        search: "",
        hasMore: true,
        _isStateInit: true
      });
  });

  test("empty state", () => {
    expect(bookListPageReducer(undefined, bookListPageActions.setView(EBookListView.STANDARD)))
      .toEqual({
        listView: EBookListView.STANDARD,
        ids: [],
        entities: {},
        page: 1,
        limit: 10,
        order: "desc",
        sort: EBookListSortField.CREATED_AT,
        hashTag: EBookOfHashTagType.ALL,
        search: "",
        hasMore: true,
        _isStateInit: false,
        isLoading: false,
        error: undefined
      });
  });

  test("fetch pending", () => {
    const state: DeepPartial<IBookListPageStateSchema> = {
      isLoading: false,
    };

    expect(bookListPageReducer(
        state as IBookListPageStateSchema,
        fetchBookList.pending
    ))
      .toEqual({ isLoading: true });
  });

  test("fetch error", () => {
    const state: DeepPartial<IBookListPageStateSchema> = { };

    expect(bookListPageReducer(
        state as IBookListPageStateSchema,
        fetchBookList.rejected
    ))
      .toEqual({ error: undefined, isLoading: false });
  });

  test("fetch fulfilled", () => {
    const data: IBook[] = [{
      id: 1,
      owner: 1,
      // title: "t",
      // subTitle: "s",
      link: "s",
      img: "i",
      views: 1,
      // createdAt: "c",
      // hashTagType: [],
      blocks: [],
    }];

    const state: DeepPartial<IBookListPageStateSchema> = {
      isLoading: true,
      hasMore: true,
      ids: [],
      entities: {},
    };

    expect(bookListPageReducer(
      state as IBookListPageStateSchema,
      fetchBookList.fulfilled(data, "", { page: 1 })
    ))
      .toEqual({
        isLoading: false,
        hasMore: false,
        ids: [1],
        entities: { 1: data[0] }
      });
  });
});
