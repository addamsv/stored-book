import { IStateSchema } from "resources/store/StoreProvider";

export const getUserAuthData = (state: IStateSchema) => state.user.authData;
