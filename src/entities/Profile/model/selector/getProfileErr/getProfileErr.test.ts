import { IStateSchema } from "resources/store/StoreProvider";
import { ECountry } from "entities/Country";
import { ECurrency } from "entities/Currency";
import { getProfileErr } from "./getProfileErr";

describe("getProfileErr.test", () => {
  test("должно вернуть error", () => {
    const state: DeepPartial<IStateSchema> = {
      profile: {
        error: "ошибка"
      }
    };

    expect(getProfileErr(state as IStateSchema)).toEqual("ошибка");
  });

  test("с пустым state", () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getProfileErr(state as IStateSchema)).toEqual(undefined);
  });
});
