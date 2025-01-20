import { IStateSchema } from "resources/store/StoreProvider";

export const getProfileIsReadOnly = (state: IStateSchema) => state?.profile?.isReadOnly;
