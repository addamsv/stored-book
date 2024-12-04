import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "app/providers/StoreProvider";
import { getCredentials } from "shared/lib/auth/getCredentials";
import { IProfile } from "../../type/IProfile";
import { profileActions } from "../../slice/profileSlice";

interface IFetchProfileProps {
  profileId: number;
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
  async ({ profileId }, thunkAPI) => {
    const { extra, dispatch, rejectWithValue, } = thunkAPI;

    const response = await extra.axios.get<ICustomReturnedData>(
      `/profiles/${profileId}`,
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
