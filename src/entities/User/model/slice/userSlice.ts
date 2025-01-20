import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCredentials } from "resources/lib/auth/getCredentials";
import { setCredentials } from "resources/lib/auth/setCredentials";
import { IUserData, IUserSchema } from "../types/IUserSchema";

const initialState: IUserSchema = {
  isAuthDataMounted: false
};

export const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    setAuthData: (state, action: PayloadAction<IUserData>) => {
      setCredentials(action.payload);
      state.authData = action.payload;
    },

    initAuthData: (state) => {
      state.authData = getCredentials();
      state.isAuthDataMounted = true;
    },

    logout: (state) => {
      setCredentials(undefined);
      state.authData = undefined;
    }
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
