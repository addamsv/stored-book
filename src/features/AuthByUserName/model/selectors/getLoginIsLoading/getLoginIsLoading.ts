import { IStateSchema } from "resources/store/StoreProvider";

export const getLoginIsLoading = (state: IStateSchema) => state?.loginForm?.isLoading || false;
