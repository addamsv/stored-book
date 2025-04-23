import { IStateSchema } from "resources/store/StoreProvider";

export const getProfileEdited = (state: IStateSchema) => state?.profile?.editedData;
