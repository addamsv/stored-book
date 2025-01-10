// import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { IStateSchema, StoreProvider } from "app/providers/StoreProvider";
import { bookDetailsReducer } from "entities/Book/model/slices/bookDetailsSlice";
import { profileReducer } from "entities/Profile";
import { loginReducer } from "features/AuthByUserName/model/slice/loginSlice";
import { sendCommentFormReducer } from "features/SendCommentForm/model/slices";
import { bookDetailsCommentsReducer } from "pages/BookDetailsPage/model/slices";
import { ReducerListT } from "shared/ui/AsyncModule/AsyncModule";

// const defaultReducer: DeepPartial<ReducersMapObject<IStateSchema>> = {
const defaultReducer: ReducerListT = {
  loginForm: loginReducer,
  profile: profileReducer,
  bookDetails: bookDetailsReducer,
  sendCommentForm: sendCommentFormReducer,
  bookDetailsComments: bookDetailsCommentsReducer
};

export const StoreDecorator = (
  state: DeepPartial<IStateSchema>,
  asyncReducers?: ReducerListT // DeepPartial<ReducersMapObject<IStateSchema>>
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultReducer, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
