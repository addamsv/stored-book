import { IStateSchema } from "resources/store/StoreProvider";
import { getCounter } from "./getCounter";

describe("getCounter Selector test", () => {
  test("expect to return counter value", () => {
    const state: DeepPartial<IStateSchema> = {
      counter: { value: 10 }
    };

    expect(getCounter(state as IStateSchema)).toEqual({ value: 10 });
  });
});
