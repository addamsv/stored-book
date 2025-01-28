import { IStateSchema } from "resources/store/StoreProvider";
import { getLoginError } from "./getLoginError";

describe("getLoginError.test", () => {
  test("должно вернуть error", () => {
    const state: DeepPartial<IStateSchema> = {
      loginForm: {
        error: "ошибка"
      }
    };

    expect(getLoginError(state as IStateSchema)).toEqual("ошибка");
  });

  test("с пустым state", () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getLoginError(state as IStateSchema)).toEqual(undefined);
  });
});
