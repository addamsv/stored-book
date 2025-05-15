import { IStateSchema } from "resources/store/StoreProvider";
import { getProfileValidateErr } from "./getProfileValidateErr";
import { EnumValidateProfileErrs } from "../../types/IEditProfileCardStateSchema";

describe("getProfileValidateErr.test", () => {
  test("должно вернуть profile", () => {
    const validationError = [
      EnumValidateProfileErrs.CLIENT_ERROR,
      EnumValidateProfileErrs.SERVER_ERROR,
      EnumValidateProfileErrs.INCORRECT_AGE,
      EnumValidateProfileErrs.INCORRECT_COUNTRY,
      EnumValidateProfileErrs.INCORRECT_USER_DATA,
      EnumValidateProfileErrs.NO_DATA,
    ];
    const state: DeepPartial<IStateSchema> = {
      profile: {
        validationError
      }
    };

    expect(getProfileValidateErr(state as IStateSchema)).toEqual(validationError);
  });

  test("с пустым state", () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getProfileValidateErr(state as IStateSchema)).toEqual(undefined);
  });
});
