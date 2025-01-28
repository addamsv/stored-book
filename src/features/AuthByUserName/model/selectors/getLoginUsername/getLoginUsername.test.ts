import { IStateSchema } from "resources/store/StoreProvider";
import { getLoginUsername } from "./getLoginUsername";

describe("getLoginUsername.test", () => {
  test("вернёт сост-е () -> true", () => {
    const state: DeepPartial<IStateSchema> = {
      loginForm: {
        username: "AWESOME-USER"
      }
    };

    expect(getLoginUsername(state as IStateSchema)).toEqual("AWESOME-USER");
  });

  test("с пустым state: () -> \"\"", () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getLoginUsername(state as IStateSchema)).toEqual("");
  });
});
