import { IStateSchema } from "resources/store/StoreProvider";
import { EBookListView } from "entities/Book";
// import { getBooksListPageLoading, getBooksListPageError, getBooksListPageListView } from ".";

describe("test getBooksListPage SELECTORS", () => {
  test("должно вернуть getBooksListPageListView", () => {
    const state: DeepPartial<IStateSchema> = {
      bookListPage: {
        listView: EBookListView.COMPACT
      }
    };

    // expect(getBooksListPageListView(state as IStateSchema)).toEqual(EBookListView.COMPACT);
  });

  test("test getBooksListPageListView с пустым state должно вернуть COMPACT", () => {
    const state: DeepPartial<IStateSchema> = {};

    // expect(getBooksListPageListView(state as IStateSchema)).toEqual(EBookListView.COMPACT);
  });

  test("getBooksListPageError должно вернуть ошибка", () => {
    const state: DeepPartial<IStateSchema> = {
      bookListPage: {
        error: "ошибка"
      }
    };

    // expect(getBooksListPageError(state as IStateSchema)).toEqual("ошибка");
  });

  test("getBooksListPageError с пустым state должно вернуть undefined", () => {
    const state: DeepPartial<IStateSchema> = {};

    // expect(getBooksListPageError(state as IStateSchema)).toEqual(undefined);
  });

  test("getBooksListPageLoading должно вернуть isLoading -> true", () => {
    const state: DeepPartial<IStateSchema> = {
      bookListPage: {
        isLoading: true
      }
    };

    // expect(getBooksListPageLoading(state as IStateSchema)).toEqual(true);
  });

  test("getBooksListPageLoading с пустым state должно вернуть false", () => {
    const state: DeepPartial<IStateSchema> = { };

    // expect(getBooksListPageLoading(state as IStateSchema)).toEqual(false);
  });
});
