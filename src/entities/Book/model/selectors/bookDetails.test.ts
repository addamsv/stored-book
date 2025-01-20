import { IStateSchema } from "resources/store/StoreProvider";
import { getBookDetailsData, getBookDetailsError, getBookDetailsIsLoading } from ".";

describe("test getBookDetails SELECTORS", () => {
  test("должно вернуть bookDetails", () => {
    const data = {
      id: 1,
      title: "Title"
    };

    const state: DeepPartial<IStateSchema> = {
      bookDetails: { data }
    };

    expect(getBookDetailsData(state as IStateSchema)).toEqual(data);
  });

  test("test getBookDetailsData с пустым state должно вернуть undefined", () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getBookDetailsData(state as IStateSchema)).toEqual(undefined);
  });

  test("getBookDetailsError должно вернуть ошибка", () => {
    const state: DeepPartial<IStateSchema> = {
      bookDetails: {
        error: "ошибка"
      }
    };

    expect(getBookDetailsError(state as IStateSchema)).toEqual("ошибка");
  });

  test("getBookDetailsError с пустым state должно вернуть undefined", () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getBookDetailsError(state as IStateSchema)).toEqual(undefined);
  });

  test("getBookDetailsIsLoading должно вернуть isLoading", () => {
    const state: DeepPartial<IStateSchema> = {
      bookDetails: {
        isLoading: true
      }
    };

    expect(getBookDetailsIsLoading(state as IStateSchema)).toEqual(true);
  });

  test("getBookDetailsIsLoading с пустым state should return false", () => {
    const state: DeepPartial<IStateSchema> = { };

    expect(getBookDetailsIsLoading(state as IStateSchema)).toEqual(false);
  });
});
