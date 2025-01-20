import { IStateSchema } from "resources/store/StoreProvider";

export const getBookDetailsData = (state: IStateSchema) => state.bookDetails?.data;
export const getBookDetailsIsLoading = (state: IStateSchema) => state.bookDetails?.isLoading || false;
export const getBookDetailsError = (state: IStateSchema) => state.bookDetails?.error;
