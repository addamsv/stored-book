import { IStateSchema } from "resources/store/StoreProvider";

export const getCounter = (state: IStateSchema) => state.counter;
