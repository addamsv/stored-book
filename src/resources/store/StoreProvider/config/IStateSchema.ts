import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { IBookDetailsStateSchema } from "entities/Book";
import { ICounterSchema } from "entities/Counter";
import { IUserSchema } from "entities/User";
import { ILoginSchema } from "features/AuthByUserName";
import { ISendCommentFormStateSchema } from "features/SendCommentForm";
import {
  IBooksDetailsCommentsStateSchema,
  IBooksDetailsPageStateSchema,
  IRecommendationsStateSchema
} from "pages/BookDetailsPage";
import { IBookListPageStateSchema } from "pages/BooksListPage";
import { IScrollPointStateSchema } from "features/ScrollPoint";
import { RTK } from "resources/lib/restApi/RTK";
import { IProfileStateSchema } from "features/EditProfileCard";

// import { NavigateOptions, To } from "react-router";

export interface IStateSchema {
  counter: ICounterSchema;
  user: IUserSchema;
  scrollPoint: IScrollPointStateSchema;

  [RTK.reducerPath]: ReturnType<typeof RTK.reducer>

  // Async
  loginForm?: ILoginSchema;
  profile?: IProfileStateSchema;
  bookDetails?: IBookDetailsStateSchema;
  bookDetailsPage?: IBooksDetailsPageStateSchema;
  // bookDetailsComments?: IBooksDetailsCommentsStateSchema;
  // bookDetailsRecommendations?: IRecommendationsStateSchema;
  sendCommentForm?: ISendCommentFormStateSchema;
  bookListPage?: IBookListPageStateSchema;
}

export type IStateSchemaKey = keyof IStateSchema;

export interface IReducerManager {
  getReducerMap: () => ReducersMapObject<IStateSchema>;

  reduce: (state: IStateSchema, action: AnyAction) => CombinedState<IStateSchema>;

  add: (key: IStateSchemaKey, reducer: Reducer) => void;

  remove: (key: IStateSchemaKey) => void;
}

export interface IStoreManager extends EnhancedStore<IStateSchema> {
  reducerManager: IReducerManager;
}

export interface IThunkExtra {
  axios: AxiosInstance,
  // navigate?: (to: To, options?: NavigateOptions) => void
}

export interface IThunkConf<T> {
  rejectValue: T;
  extra: IThunkExtra;
  state: IStateSchema;
}
