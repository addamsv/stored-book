import { ECountry } from "entities/Country";
import { ECurrency } from "entities/Currency";
import { IProfile } from "entities/Profile";
import { profileActions, profileReducer } from "./profileSlice";
import { updateProfile } from "../service/update/updateProfile";
import { EnumValidateProfileErrs, IProfileStateSchema } from "../types/IEditProfileCardStateSchema";

describe("profileSlice.test", () => {
  beforeEach(() => {
  });

  test("slice isReadOnly false -> true", () => {
    const state: DeepPartial<IProfileStateSchema> = { isReadOnly: false };

    expect(profileReducer(state as IProfileStateSchema, profileActions.setIsReadOnly(true)))
      .toEqual({ isReadOnly: true });
  });

  test("slice updateProfile", () => {
    const state: DeepPartial<IProfileStateSchema> = {
      editedData: {
        country: ECountry.Armenia
      },
    };

    expect(profileReducer(state as IProfileStateSchema, profileActions.updateProfile({
      country: ECountry.Belarus
    })))
      .toEqual({ editedData: { country: ECountry.Belarus } });
  });

  test("slice cancelProfile", () => {
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

    const state: DeepPartial<IProfileStateSchema> = { data };

    expect(profileReducer(
      state as IProfileStateSchema,
      profileActions.cancelProfile()
    ))
      .toEqual({ editedData: data, data, isReadOnly: true, validationError: undefined });
  });

  test("updateProfile.pending", () => {
    const state: DeepPartial<IProfileStateSchema> = {
      isLoading: false,
      validationError: [EnumValidateProfileErrs.SERVER_ERROR]
    };

    expect(profileReducer(
      state as IProfileStateSchema,
      updateProfile.pending
    ))
      .toEqual({ isLoading: true, validationError: undefined });
  });

  test("updateProfile.fulfilled", () => {
    const data: IProfile = {
      firstname: "John",
      lastname: "Dore",
      age: 22,
      country: ECountry.Armenia,
      city: "Erevan",
      address: "Mira, 1-23",
      currency: ECurrency.USD,
      image: "fakeUrl.us"
    };

    const state: DeepPartial<IProfileStateSchema> = {
      isLoading: true,
      validationError: [EnumValidateProfileErrs.SERVER_ERROR]
    };

    expect(profileReducer(
      state as IProfileStateSchema,
      updateProfile.fulfilled(data, "", { profileId: 1 })
    ))
      .toEqual({
        isLoading: false,
        validationError: undefined,
        data,
        editedData: data,
        isReadOnly: true
      });
  });
});
