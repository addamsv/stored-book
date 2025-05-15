import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "resources/store/StoreProvider";
import { getCredentials } from "resources/lib/auth/getCredentials";
// import { EnumValidateProfileErrs, IProfile } from "../../type/IProfile";
import { IProfile } from "entities/Profile";
import { getProfileEdited } from "../../selector/getProfileEdited/getProfileEdited";
import { validateProfile } from "../validate/validateProfile";
import { EnumValidateProfileErrs } from "../../types/IEditProfileCardStateSchema";

interface IFetchProfileProps {
  profileId: number;
}

interface ICustomReturnedData {
  isSuccess: boolean;
  message: string;
  data: IProfile;
}

export const updateProfile = createAsyncThunk<
  IProfile, IFetchProfileProps, IThunkConf<EnumValidateProfileErrs[]>
>(
  "profile/updateProfile",
  async ({ profileId }, thunkAPI) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkAPI;

    const editedData = getProfileEdited(getState());

    const errs = validateProfile(editedData);

    if (errs.length) {
      return rejectWithValue(errs);
    }
    try {
      const response = await extra.axios.put<ICustomReturnedData>(
        `/profiles/${profileId}`,
        editedData,
        { headers: { Authorization: `Bearer ${getCredentials()?.token || ""}` } }
      );

      if (!response.data) {
        return rejectWithValue([EnumValidateProfileErrs.NO_DATA]);
      }

      if (response.data.isSuccess === false) {
        return rejectWithValue([EnumValidateProfileErrs.SERVER_ERROR]); // `${response.data.message}`;
      }

      // dispatch(profileActions.setProfileData(response.data.data));

      // extra.navigate("/");

      return response.data.data;
    } catch (e) {
      return rejectWithValue([EnumValidateProfileErrs.SERVER_ERROR]);
    }
  }
);
