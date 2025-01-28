import { IStateSchema } from "resources/store/StoreProvider";
import { ECountry } from "entities/Country";
import { ECurrency } from "entities/Currency";
import { getProfileEdited } from "./getProfileEdited";

describe("getProfileEdited.test", () => {
  test("должно вернуть profile form state", () => {
    const editedData = {
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
        editedData
      }
    };

    expect(getProfileEdited(state as IStateSchema)).toEqual(editedData);
  });

  // test("должно вернуть error", () => {
  //   const state: DeepPartial<IStateSchema> = {
  //     profile: {
  //       error: "ошибка"
  //     }
  //   };

  //   expect(getProfileEdited(state as IStateSchema)).toEqual("ошибка");
  // });

  test("с пустым state", () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getProfileEdited(state as IStateSchema)).toEqual(undefined);
  });
});
