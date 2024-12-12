// import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { IStateSchema, StoreProvider } from "app/providers/StoreProvider";
import { articleDetailsReducer } from "entities/Article/model/slices/articleDetailsSlice";
import { profileReducer } from "entities/Profile";
import { loginReducer } from "features/AuthByUserName/model/slice/loginSlice";
import { ReducerListT } from "shared/lib/AsyncModule/AsyncModule";

// const defaultReducer: DeepPartial<ReducersMapObject<IStateSchema>> = {
const defaultReducer: ReducerListT = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer
};

export const StoreDecorator = (
  state: DeepPartial<IStateSchema>,
  asyncReducers?: ReducerListT // DeepPartial<ReducersMapObject<IStateSchema>>
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultReducer, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
