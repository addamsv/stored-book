import { IStateSchema } from "resources/store/StoreProvider";

export const getLoginPassword = (state: IStateSchema) => state?.loginForm?.password || "";
