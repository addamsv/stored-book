import { IStateSchema } from "resources/store/StoreProvider";

export const getLoginUsername = (state: IStateSchema) => state?.loginForm?.username || "";
