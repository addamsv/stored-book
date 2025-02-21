import { IStateSchema } from "resources/store/StoreProvider";
import { ECountry } from "entities/Country";
import { ECurrency } from "entities/Currency";
import { getProfileIsLoading } from "./getProfileIsLoading";

describe("getProfileIsLoading.test", () => {
  test("должно вернуть true", () => {
    const state: DeepPartial<IStateSchema> = {
      profile: {
        isLoading: true
      }
    };

    expect(getProfileIsLoading(state as IStateSchema)).toEqual(true);
  });

  test("с пустым state", () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getProfileIsLoading(state as IStateSchema)).toEqual(undefined);
  });
});
