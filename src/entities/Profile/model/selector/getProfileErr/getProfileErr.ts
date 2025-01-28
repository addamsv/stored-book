import { IStateSchema } from "resources/store/StoreProvider";

export const getProfileErr = (state: IStateSchema) => state?.profile?.error;
