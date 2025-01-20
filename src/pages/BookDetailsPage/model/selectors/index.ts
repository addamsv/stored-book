import { IStateSchema } from "resources/store/StoreProvider";

export const getBooksCommentsIsLoading = (state: IStateSchema) => state.bookDetailsComments?.isLoading;
export const getBooksCommentsError = (state: IStateSchema) => state.bookDetailsComments?.error;
