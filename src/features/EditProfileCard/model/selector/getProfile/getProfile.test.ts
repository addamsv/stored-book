import { IStateSchema } from "resources/store/StoreProvider";
import { ECountry } from "entities/Country";
import { ECurrency } from "entities/Currency";
import { getProfile } from "./getProfile";

describe("getProfile.test", () => {
  test("должно вернуть profile", () => {
    const data = {
      firstname: "John",
      lastname: "Dore",
      age: 22,
      country: ECountry.Armenia,
      city: "Erevan",
      address: "Mira, 1-23",
      currency: ECurrency.USD,
      image: "fakeUrl.us"
    };

    const state: DeepPartial<IStateSchema> = {
      profile: {
        data
      }
    };

    expect(getProfile(state as IStateSchema)).toEqual(data);
  });

  // test("должно вернуть error", () => {
  //   const state: DeepPartial<IStateSchema> = {
  //     profile: {
  //       error: "ошибка"
  //     }
  //   };

  //   expect(getProfile(state as IStateSchema)).toEqual("ошибка");
  // });

  test("с пустым state", () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getProfile(state as IStateSchema)).toEqual(undefined);
  });
});
