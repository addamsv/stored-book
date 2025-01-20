import axios, { AxiosStatic } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { IStateSchema } from "resources/store/StoreProvider";
import { userActions } from "entities/User";
import { loginByUsername } from "./loginByUsername";

jest.mock("axios");

const mockedAxios = jest.mocked(axios, true);

describe("loginByUsername.test", () => {
  let dispatch: Dispatch;

  let getState: () => IStateSchema;

  let api: jest.MockedFunctionDeep<AxiosStatic>;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
    api = mockedAxios;
  });

  test("loginByUsername POST", async () => {
    // When...

    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        data: {
          isSuccess: true,
          message: "success",
          data: {
            user: {
              id: 1,
              name: "john",
              roles: "ADMIN",
              enabled: true
            },
            token: "kjhkj.kjjhkjhuysadx.pppoiysx"
          }
        }
      })
    );

    const asyncThunkAction = loginByUsername({ username: "john", password: "whoo-hoo" });

    const resultData = await asyncThunkAction(dispatch, getState, { axios: api });

    // Then
    expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData({
      user: {
        id: 1,
        name: "john",
        roles: "ADMIN",
        enabled: true
      },
      token: "kjhkj.kjjhkjhuysadx.pppoiysx"
    }));
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(resultData.meta.requestStatus).toBe("fulfilled");
  });

  test("loginByUsernameFail 403", async () => {
    // When...

    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        status: 403
      })
    );

    const asyncThunkAction = loginByUsername({ username: "john", password: "whoo-hoo" });

    const resultData = await asyncThunkAction(dispatch, getState, { axios: api });

    // Then
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(resultData.meta.requestStatus).toBe("rejected");
  });
});
