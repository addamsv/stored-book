import axios, { AxiosStatic } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { IStateSchema } from "resources/store/StoreProvider";

import { initBookListPage } from "./initBookListPage";
import { fetchBookList } from "./fetchBookList";

jest.mock("./initBookListPage");
jest.mock("axios");

const mockedAxios = jest.mocked(axios, true);

// const data = {
//   isSuccess: true,
//   message: "success",
//   data: [{
//     ids: [],
//     entities: {},
//     error: undefined,
//     isLoading: false,
//     page: 2,
//     hasMore: true,
//     limit: 5
//   }]
// };

const state: DeepPartial<IStateSchema> = {
  bookListPage: {
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    page: 2,
    limit: 5,
    hasMore: true,
  }
};

describe("initBookListPage.test", () => {
  let dispatch: Dispatch;

  let getState: () => IStateSchema;

  let api: jest.MockedFunctionDeep<AxiosStatic>;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn(() => state as IStateSchema);
    api = mockedAxios;
  });

  test("test onSuccess initBookListPage: send req, change page num...", async () => {
    // // When...

    // // mockedAxios.get.mockReturnValue(Promise.resolve({ data }));

    // const asyncThunkAction = initBookListPage();

    // const resultData = await asyncThunkAction(dispatch, getState, { axios: api });

    // // Then
    // expect(dispatch).toHaveBeenCalledTimes(4);
    // expect(resultData.meta.requestStatus).toBe("fulfilled");
    // expect(fetchBookList).toBeCalledWith({ page: 3 });
  });

  test("test initBookListPage: hasMore: false", async () => {
    // When...
    // const state: DeepPartial<IStateSchema> = {
    //   bookListPage: {
    //     isLoading: false,
    //     error: undefined,
    //     ids: [],
    //     entities: {},
    //     page: 2,
    //     limit: 5,
    //     hasMore: false,
    //   }
    // };

    // getState = jest.fn(() => state as IStateSchema);

    // // mockedAxios.get.mockReturnValue(Promise.resolve({ data }));

    // const asyncThunkAction = initBookListPage();

    // const resultData = await asyncThunkAction(dispatch, getState, { axios: api });

    // // Then
    // expect(dispatch).toHaveBeenCalledTimes(2);
    // expect(fetchBookList).not.toHaveBeenCalled();
  });
  // test("test initBookListPage: isLoading: true", async () => {
  //   // When...
  //   const state: DeepPartial<IStateSchema> = {
  //     bookListPage: {
  //       isLoading: true,
  //       error: undefined,
  //       ids: [],
  //       entities: {},
  //       page: 2,
  //       limit: 5,
  //       hasMore: true,
  //     }
  //   };

  //   getState = jest.fn(() => state as IStateSchema);

  //   // mockedAxios.get.mockReturnValue(Promise.resolve({ data }));

  //   const asyncThunkAction = initBookListPage();

  //   const resultData = await asyncThunkAction(dispatch, getState, { axios: api });

  //   // Then
  //   expect(dispatch).toHaveBeenCalledTimes(2);
  //   expect(fetchBookList).not.toHaveBeenCalled();
  // });
});
