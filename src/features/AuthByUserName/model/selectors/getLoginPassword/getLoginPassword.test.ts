import { IStateSchema } from "resources/store/StoreProvider";
import { getLoginPassword } from "./getLoginPassword";

describe("getLoginPassword.test", () => {
  test("вернёт сост-е () -> true", () => {
    const state: DeepPartial<IStateSchema> = {
      loginForm: {
        password: "SUPER-ROBUST-PASSWORD"
      }
    };

    expect(getLoginPassword(state as IStateSchema)).toEqual("SUPER-ROBUST-PASSWORD");
  });

  test("с пустым state: () -> \"\"", () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getLoginPassword(state as IStateSchema)).toEqual("");
  });
});
