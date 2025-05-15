import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "resources/store/StoreProvider";
import { getCredentials } from "resources/lib/auth/getCredentials";
import { IProfile } from "entities/Profile";

interface IFetchProfileProps {
  userId: number;
}

interface ICustomReturnedData {
  isSuccess: boolean;
  message: string;
  data: IProfile;
}

export const fetchProfile = createAsyncThunk<
  IProfile, IFetchProfileProps, IThunkConf<string>
>(
  "profile/fetchProfile",
  async ({ userId }, thunkAPI) => {
    const { extra, dispatch, rejectWithValue, } = thunkAPI;

    const response = await extra.axios.get<ICustomReturnedData>(
      `/profiles/${userId}`,
      { headers: { Authorization: `Bearer ${getCredentials()?.token || ""}` } }
    );

    if (!response.data) {
      return rejectWithValue("ошибка");
    }

    if (response.data.isSuccess === false) {
      return rejectWithValue(`${response.data.message}`);
    }

    // dispatch(profileActions.setProfileData(response.data.data));

    // extra.navigate("/");

    return response.data.data;
  }
);
