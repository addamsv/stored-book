import axios, { AxiosStatic } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { IStateSchema } from "resources/store/StoreProvider";

import { fetchNextBookList } from "./fetchNextBookList";
import { fetchBookList } from "./fetchBookList";

jest.mock("./fetchBookList");
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

describe("FetchNextBookList.test", () => {
  let dispatch: Dispatch;

  let getState: () => IStateSchema;

  let api: jest.MockedFunctionDeep<AxiosStatic>;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn(() => state as IStateSchema);
    api = mockedAxios;
  });

  test("test onSuccess FetchNextBookList: send req, change page num...", async () => {
    // When...

    // mockedAxios.get.mockReturnValue(Promise.resolve({ data }));

    const asyncThunkAction = fetchNextBookList();

    const resultData = await asyncThunkAction(dispatch, getState, { axios: api });

    // Then
    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(resultData.meta.requestStatus).toBe("fulfilled");
    expect(fetchBookList).toBeCalledWith({ page: 3 });
  });

  test("test FetchNextBookList: hasMore: false", async () => {
    // When...
    const state: DeepPartial<IStateSchema> = {
      bookListPage: {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        page: 2,
        limit: 5,
        hasMore: false,
      }
    };

    getState = jest.fn(() => state as IStateSchema);

    // mockedAxios.get.mockReturnValue(Promise.resolve({ data }));

    const asyncThunkAction = fetchNextBookList();

    const resultData = await asyncThunkAction(dispatch, getState, { axios: api });

    // Then
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(fetchBookList).not.toHaveBeenCalled();
  });
  test("test FetchNextBookList: isLoading: true", async () => {
    // When...
    const state: DeepPartial<IStateSchema> = {
      bookListPage: {
        isLoading: true,
        error: undefined,
        ids: [],
        entities: {},
        page: 2,
        limit: 5,
        hasMore: true,
      }
    };

    getState = jest.fn(() => state as IStateSchema);

    // mockedAxios.get.mockReturnValue(Promise.resolve({ data }));

    const asyncThunkAction = fetchNextBookList();

    const resultData = await asyncThunkAction(dispatch, getState, { axios: api });

    // Then
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(fetchBookList).not.toHaveBeenCalled();
  });
});
