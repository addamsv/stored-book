import { ECountry } from "entities/Country";
import { ECurrency } from "entities/Currency";
import { validateProfile } from "./validateProfile";
import { EnumValidateProfileErrs } from "../../types/IEditProfileCardStateSchema";

const data = {
  firstname: "John",
  lastname: "Dore",
  age: 22,
  country: ECountry.Armenia,
  city: "Erevan",
  address: "Mira, 1-23",
  currency: ECurrency.USD,
  image: "jhkjhkjh"
};

describe("validate.test", () => {
  test("success", async () => {
    // When...
    const validErrs = validateProfile(data);

    expect(validErrs).toEqual([]);
  });

  test("failed with No Currency...", async () => {
    // When...
    const validErrs = validateProfile({ ...data, currency: undefined });

    expect(validErrs).toEqual([EnumValidateProfileErrs.INCORRECT_CURRENCY]);
  });

  test("failed with ALL...", async () => {
    // When...
    const validErrs = validateProfile({});

    expect(validErrs).toEqual([
      EnumValidateProfileErrs.INCORRECT_USER_DATA,
      EnumValidateProfileErrs.INCORRECT_AGE,
      EnumValidateProfileErrs.INCORRECT_COUNTRY,
      EnumValidateProfileErrs.INCORRECT_CURRENCY
      // EnumValidateProfileErrs.CLIENT_ERROR,
      // EnumValidateProfileErrs.NO_DATA,
      // EnumValidateProfileErrs.SERVER_ERROR,
    ]);
  });
});
