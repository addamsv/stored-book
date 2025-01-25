import { Reducer } from "@reduxjs/toolkit";
import { IStoreManager } from "resources/store/StoreProvider";
import { IStateSchema, IStateSchemaKey } from "resources/store/StoreProvider/config/IStateSchema";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

export type ReducerListT = {
  [reducerKey in IStateSchemaKey]?: Reducer<NonNullable<IStateSchema[reducerKey]>>
}

type ReducerListNodeType = [IStateSchemaKey, Reducer];

interface AsyncModuleProps {
  // reducerKey: IStateSchemaKey;

  reducers: ReducerListT;

  isRemoveAfterUnmount?: boolean;
}

export const AsyncModule = ({
  children,
  // reducerKey,
  reducers,
  isRemoveAfterUnmount = true
}: PropsWithChildren<AsyncModuleProps>) => {
  const store = useStore() as IStoreManager;

  const dispatch = useDispatch();

  useEffect(() => {
    const alreadyMountedReducers = store.reducerManager.getReducerMap();

    Object
      .entries(reducers)
      .forEach(([reducerKey, reducer]) => {
        const isReducerExist = alreadyMountedReducers[reducerKey as IStateSchemaKey];

        if (!isReducerExist) {
          store.reducerManager.add(reducerKey as IStateSchemaKey, reducer);
          dispatch({ type: `@INIT REDUCER ${reducerKey} ${Boolean(isReducerExist)}` });
        }
      });

    return () => {
      if (isRemoveAfterUnmount) {
        Object
          .keys(reducers)
          .forEach((reducerKey) => {
            store.reducerManager.remove(reducerKey as IStateSchemaKey);
            dispatch({ type: `@REM REDUCER ${reducerKey}` });
          });
      }
    };

    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (<>{ children }</>);
};
