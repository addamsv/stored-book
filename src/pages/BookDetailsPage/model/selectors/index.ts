import { IStateSchema } from "resources/store/StoreProvider";

export const getBooksCommentsIsLoading = (state: IStateSchema) => state.bookDetailsPage?.comments?.isLoading;
export const getBooksCommentsError = (state: IStateSchema) => state.bookDetailsPage?.comments?.error;
