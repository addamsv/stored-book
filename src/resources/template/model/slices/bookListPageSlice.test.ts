import { EBookListView, IBook } from "entities/Book";
// import { IBookListPageStateSchema } from "../types";
// import { bookListPageActions, bookListPageReducer } from ".";
// import { fetchBookList } from "../services";

describe("bookListPageSlice.test", () => {
  beforeEach(() => {});

  test("setView test", () => {
    // const state: IBookListPageStateSchema = {
    //   listView: EBookListView.COMPACT,
    //   ids: [],
    //   entities: {}
    // };

    // expect(
    //   bookListPageReducer(
    //     state,
    //     bookListPageActions.setView(EBookListView.STANDARD)
    //   )
    // )
    //   .toEqual({
    //     listView: EBookListView.STANDARD,
    //     ids: [],
    //     entities: {}
    //   });
  });

  test("empty state", () => {
    // expect(bookListPageReducer(undefined, bookListPageActions.setView(EBookListView.STANDARD)))
    //   .toEqual({
    //     entities: {},
    //     error: undefined,
    //     ids: [],
    //     isLoading: false,
    //     listView: EBookListView.STANDARD,
    //   });
  });

  test("fetch pending", () => {
    // const state: DeepPartial<IBookListPageStateSchema> = {
    //   isLoading: false
    // };

    // expect(bookListPageReducer(
    //     state as IBookListPageStateSchema,
    //     fetchBookList.pending
    // ))
    //   .toEqual({ isLoading: true });
  });

  test("fetch error", () => {
    // const state: DeepPartial<IBookListPageStateSchema> = { };

    // expect(bookListPageReducer(
    //     state as IBookListPageStateSchema,
    //     fetchBookList.rejected
    // ))
    //   .toEqual({ error: undefined, isLoading: false });
  });

  test("fetch fulfilled", () => {
    const data: IBook[] = [{
      id: 1,
      owner: 1,
      Title: "t",
      Author: ["s"],
      link: "s",
      img: "i",
      views: 1,
      PublicationDate: "c",
      Genres: [],
      blocks: [],
    }];

    // const state: DeepPartial<IBookListPageStateSchema> = {
    //   isLoading: true
    // };

    // expect(bookListPageReducer(
    //   state as IBookListPageStateSchema,
    //   fetchBookList.fulfilled(data, "") // { bookId: 1 }
    // ))
    //   .toEqual({
    //     isLoading: false,
    //     ids: [1],
    //     entities: { 1: data[0] }
    //   });
  });
});
