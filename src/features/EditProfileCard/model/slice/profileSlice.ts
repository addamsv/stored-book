import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IProfile, IProfileStateSchema } from "../type/IProfile";
import { IProfile } from "entities/Profile";
import { fetchProfile } from "../service/fetch/fetchProfile";
import { updateProfile } from "../service/update/updateProfile";
import { IProfileStateSchema } from "../types/IEditProfileCardStateSchema";

const initialState: IProfileStateSchema = {
  isReadOnly: true,
  isLoading: false,
  error: undefined,
  data: undefined,
  editedData: undefined
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setIsReadOnly: (state, action: PayloadAction<boolean>) => {
      state.isReadOnly = action.payload;
    },

    updateProfile: (state, action: PayloadAction<IProfile>) => {
      state.editedData = {
        ...state.editedData,
        ...action.payload
      };
    },

    cancelProfile: (state) => {
      state.isReadOnly = true;
      state.editedData = { ...state.data };
      state.validationError = undefined;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<IProfile>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.editedData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateProfile.pending, (state) => {
        // state.error = undefined;
        state.validationError = undefined;
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<IProfile>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.editedData = action.payload;
        state.isReadOnly = true;
        state.validationError = undefined;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;

        state.validationError = action.payload;
        // state.error = action.payload;
      });
  }
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
