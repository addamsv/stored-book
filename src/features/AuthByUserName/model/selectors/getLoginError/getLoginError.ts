import { IStateSchema } from "resources/store/StoreProvider";

export const getLoginError = (state: IStateSchema) => state?.loginForm?.error;
