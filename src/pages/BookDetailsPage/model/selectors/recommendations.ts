import { IStateSchema } from "resources/store/StoreProvider";

export const getBooksRecommendationsIsLoading = (state: IStateSchema) => {
  return state.bookDetailsPage?.recommendations?.isLoading;
};

export const getBooksRecommendationsError = (state: IStateSchema) => state.bookDetailsPage?.recommendations?.error;
