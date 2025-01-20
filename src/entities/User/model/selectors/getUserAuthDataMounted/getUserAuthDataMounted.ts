import { IStateSchema } from "resources/store/StoreProvider";

export const getUserAuthDataMounted = (state: IStateSchema) => state.user.isAuthDataMounted;
