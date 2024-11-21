import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { IStateSchema, StoreProvider } from "app/providers/StoreProvider";
import { loginReducer } from "features/AuthByUserName/model/slice/loginSlice";

const defaultReducer: DeepPartial<ReducersMapObject<IStateSchema>> = {
  loginForm: loginReducer
};
export const StoreDecorator = (
  state: DeepPartial<IStateSchema>,
  asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultReducer, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
