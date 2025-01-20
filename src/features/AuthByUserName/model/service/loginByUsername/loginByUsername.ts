import { createAsyncThunk } from "@reduxjs/toolkit";
import { userActions } from "entities/User";
import { encodeBase64 } from "resources/lib/encode/encode";
import { IThunkConf } from "resources/store/StoreProvider";
import { IUserData } from "entities/User/model/types/IUserSchema";

interface ILoginByUsernameProps {
  username: string;
  password: string;
}

interface ICustomReturnedData {
  isSuccess: boolean;
  message: string;
  data: IUserData;
}

export const loginByUsername = createAsyncThunk<
  IUserData, ILoginByUsernameProps, IThunkConf<string>
>(
  "login/loginByUsername",
  async ({ username, password }, thunkAPI) => {
    const { extra, dispatch, rejectWithValue, } = thunkAPI;

    const response = await extra.axios.post<ICustomReturnedData>(
      "/users/login",
      {},
      { headers: { Authorization: `Basic ${encodeBase64(`${username}:${password}`)}` } }
    );

    if (!response.data) {
      return rejectWithValue("ошибка");
    }

    if (response.data.isSuccess === false) {
      return rejectWithValue(`${response.data.message}`);
    }

    dispatch(userActions.setAuthData(response.data.data));

    // extra?.navigate?.("/");

    return response.data.data;
  }
);
