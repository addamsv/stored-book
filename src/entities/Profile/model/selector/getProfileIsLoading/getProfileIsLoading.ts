import { IStateSchema } from "resources/store/StoreProvider";

export const getProfileIsLoading = (state: IStateSchema) => state?.profile?.isLoading;
