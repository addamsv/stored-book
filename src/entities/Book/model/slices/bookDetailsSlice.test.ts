import { bookDetailsReducer } from "./bookDetailsSlice";
import { IBook, IBookDetailsStateSchema } from "../types";
import { fetchBookById } from "../services/fetchById/fetchBookById";

describe("test Book Details Slice", () => {
  beforeEach(() => {});

  test("book details fetch pending", () => {
    const state: DeepPartial<IBookDetailsStateSchema> = {
      isLoading: false
    };

    expect(bookDetailsReducer(
      state as IBookDetailsStateSchema,
      fetchBookById.pending
    ))
      .toEqual({ isLoading: true });
  });

  test("book details fetch error", () => {
    const state: DeepPartial<IBookDetailsStateSchema> = { };

    expect(bookDetailsReducer(
      state as IBookDetailsStateSchema,
      fetchBookById.rejected
    ))
      .toEqual({ error: undefined, isLoading: false });
  });

  test("book details fetch fulfilled", () => {
    const data: IBook = {
      id: 1,
      owner: 1,
      link: "s",
      img: "i",
      views: 1,
      blocks: [],
    };

    const state: DeepPartial<IBookDetailsStateSchema> = {
      isLoading: true
    };

    expect(bookDetailsReducer(
      state as IBookDetailsStateSchema,
      fetchBookById.fulfilled(data, "", { bookId: 1 })
    ))
      .toEqual({
        isLoading: false,
        data
      });
  });
});
