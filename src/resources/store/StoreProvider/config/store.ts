import { CombinedState, configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";

import { AXIOS } from "resources/lib/restApi/AXIOS";

// import { NavigateOptions, To } from "react-router";
import { scrollPointReducer } from "features/ScrollPoint";
import { RTK } from "resources/lib/restApi/RTK";
import { IStateSchema, IThunkExtra } from "./IStateSchema";
import { reducerManager } from "./reducerManager";

export function createReduxStore(
  initialState?: IStateSchema,

  asyncReducers?: ReducersMapObject<IStateSchema>,

  // navigate?: (to: To, options?: NavigateOptions) => void
) {
  const rootReducers: ReducersMapObject<IStateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    scrollPoint: scrollPointReducer,
    [RTK.reducerPath]: RTK.reducer
  };

  const rManager = reducerManager(rootReducers);

  const extraArgument: IThunkExtra = {
    axios: AXIOS,
    // navigate,
  };

  const store = configureStore({
    reducer: rManager.reduce as Reducer<CombinedState<IStateSchema>>,
    preloadedState: initialState,
    devTools: __IS_DEV__,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: { extraArgument }
    }).concat(RTK.middleware),

  });

  // @ts-ignore
  store.reducerManager = rManager;

  return store;
}

export type TypedDispatch = ReturnType<typeof createReduxStore>["dispatch"];
