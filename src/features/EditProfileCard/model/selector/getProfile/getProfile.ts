import { IStateSchema } from "resources/store/StoreProvider";

export const getProfile = (state: IStateSchema) => state?.profile?.data;
