import axios, { AxiosStatic } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { IStateSchema } from "resources/store/StoreProvider";

import { ECountry } from "entities/Country";
import { ECurrency } from "entities/Currency";
import { updateProfile } from "./updateProfile";
import { EnumValidateProfileErrs } from "../../types/IEditProfileCardStateSchema";

jest.mock("axios");

const mockedAxios = jest.mocked(axios, true);

const data = {
  isSuccess: true,
  message: "success",
  data: {
    firstname: "John",
    lastname: "Dore",
    age: 22,
    country: ECountry.Armenia,
    city: "Erevan",
    address: "Mira, 1-23",
    currency: ECurrency.USD,
    image: "jhkjhkjh"
  }
};

const state: DeepPartial<IStateSchema> = {
  profile: {
    editedData: data.data
  }
};

describe("updateProfile.test", () => {
  let dispatch: Dispatch;

  let getState: () => IStateSchema;

  let api: jest.MockedFunctionDeep<AxiosStatic>;

  beforeEach(() => {
    dispatch = jest.fn();

    getState = jest.fn(() => state as IStateSchema);
    api = mockedAxios;
  });

  test("success", async () => {
    // When...

    mockedAxios.put.mockReturnValue(Promise.resolve({ data }));

    const asyncThunkAction = updateProfile({ profileId: 1 });

    const resultData = await asyncThunkAction(dispatch, getState, { axios: api });

    // Then
    expect(mockedAxios.put).toHaveBeenCalled();
    expect(resultData.meta.requestStatus).toBe("fulfilled");
    expect(resultData.payload).toEqual(data.data);
  });

  test("failed with USER NAME ERR", async () => {
    // When... до мока дело не дошло
    const asyncThunkAction = updateProfile({ profileId: 1 });

    const state: DeepPartial<IStateSchema> = {
      profile: {
        editedData: { ...data.data, firstname: "" }
      }
    };

    getState = jest.fn(() => state as IStateSchema);

    const resultData = await asyncThunkAction(dispatch, getState, { axios: api });

    // Then
    expect(resultData.meta.requestStatus).toBe("rejected");
    expect(resultData.payload).toEqual([EnumValidateProfileErrs.INCORRECT_USER_DATA]);
  });
});
