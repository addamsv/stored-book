import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { IArticleDetailsStateSchema } from "entities/Article";
import { ICounterSchema } from "entities/Counter";
import { IProfileStateSchema } from "entities/Profile";
import { IUserSchema } from "entities/User";
import { ILoginSchema } from "features/AuthByUserName";
// import { NavigateOptions, To } from "react-router";

export interface IStateSchema {
  counter: ICounterSchema;
  user: IUserSchema;

  // Async
  loginForm?: ILoginSchema;
  profile?: IProfileStateSchema;
  articleDetails?: IArticleDetailsStateSchema;
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
