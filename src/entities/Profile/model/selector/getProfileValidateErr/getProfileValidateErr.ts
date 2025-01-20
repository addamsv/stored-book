import { IStateSchema } from "resources/store/StoreProvider";

export const getProfileValidateErr = (state: IStateSchema) => state?.profile?.validationError;
