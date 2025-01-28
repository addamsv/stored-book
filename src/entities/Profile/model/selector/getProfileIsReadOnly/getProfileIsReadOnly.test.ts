import { IStateSchema } from "resources/store/StoreProvider";
import { getProfileIsReadOnly } from "./getProfileIsReadOnly";

describe("getProfileIsReadOnly.test", () => {
  test("должно вернуть true", () => {
    const state: DeepPartial<IStateSchema> = {
      profile: {
        isReadOnly: true
      }
    };

    expect(getProfileIsReadOnly(state as IStateSchema)).toEqual(true);
  });

  test("с пустым state", () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getProfileIsReadOnly(state as IStateSchema)).toEqual(undefined);
  });
});
