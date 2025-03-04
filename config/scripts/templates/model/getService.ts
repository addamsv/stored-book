import { capitalizeFirstLetter } from "../../capitalizeFirstLetter";
import { TLayer } from "../../create";

export const getService = (layer: TLayer, name: string) => {
  const capName = capitalizeFirstLetter(name);

  return `import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "resources/store/StoreProvider";
import { IBook } from "entities/Book";
import { getCredentials } from "resources/lib/auth/getCredentials";
import { userActions } from "entities/User";

interface IArguments {
}

interface ICustomReturnedData {
  isSuccess: boolean;
  message: string;
  statusCode?: number;
  data: IBook[];
}

export const fetchRecommendations = createAsyncThunk<
  IBook[],
  void, // void | IArguments,
  IThunkConf<string>
>(
  "bookDetails/fetchRecommendations",
  async (
    args, // : IArguments
    thunkAPI
  ) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkAPI;

    // const { page = 1 } = args;

    try {
      const response = await extra.axios.get<ICustomReturnedData>(
        "/books",
        {
          headers: { Authorization: "Bearer " + getCredentials()?.token || "" },
          params: {
            _limit: 4
          }
        }
      );

      if (!response.data) {
        return rejectWithValue("ошибка");
      }

      if (response.data.isSuccess === false) {
        if (response.data.statusCode === 401) {
          dispatch(userActions.logout());
        }

        return rejectWithValue(response.data.message);
      }

      // extra.navigate("/");

      return response.data.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        rejectWithValue(e.message);
      }
      return rejectWithValue("ошибка");
    }
  }
);
`;
};
