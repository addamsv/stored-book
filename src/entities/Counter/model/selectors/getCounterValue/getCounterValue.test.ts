import { IStateSchema } from "resources/store/StoreProvider";

import { getCounterValue } from "./getCounterValue";

describe("getCounterValue Selector test", () => {
  test("should return simple value", () => {
    const state: DeepPartial<IStateSchema> = {
      counter: { value: 10 }
    };

    expect(getCounterValue(state as IStateSchema)).toEqual(10);
  });
});
