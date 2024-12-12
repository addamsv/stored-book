import { IStateSchema } from "app/providers/StoreProvider";
import { getArticleDetailsData,
  getArticleDetailsIsLoading,
  getArticleDetailsError } from ".";

describe("test getArticleDetails SELECTORS", () => {
  test("должно вернуть articleDetails", () => {
    const data = {
      id: "1",
      title: "Title"
    };

    const state: DeepPartial<IStateSchema> = {
      articleDetails: { data }
    };

    expect(getArticleDetailsData(state as IStateSchema)).toEqual(data);
  });

  test("test getArticleDetailsData с пустым state должно вернуть undefined", () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getArticleDetailsData(state as IStateSchema)).toEqual(undefined);
  });

  test("getArticleDetailsError должно вернуть ошибка", () => {
    const state: DeepPartial<IStateSchema> = {
      articleDetails: {
        error: "ошибка"
      }
    };

    expect(getArticleDetailsError(state as IStateSchema)).toEqual("ошибка");
  });

  test("getArticleDetailsError с пустым state должно вернуть undefined", () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getArticleDetailsError(state as IStateSchema)).toEqual(undefined);
  });

  test("getArticleDetailsIsLoading должно вернуть isLoading", () => {
    const state: DeepPartial<IStateSchema> = {
      articleDetails: {
        isLoading: true
      }
    };

    expect(getArticleDetailsIsLoading(state as IStateSchema)).toEqual(true);
  });

  test("getArticleDetailsIsLoading с пустым state should return false", () => {
    const state: DeepPartial<IStateSchema> = { };

    expect(getArticleDetailsIsLoading(state as IStateSchema)).toEqual(false);
  });
});
