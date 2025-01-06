// silence is golden
import { IStateSchema } from "app/providers/StoreProvider";
import { EBookListView } from "entities/Book";

export const getBooksListPageLoading = (state: IStateSchema) => state.bookListPage?.isLoading || false;
export const getBooksListPageError = (state: IStateSchema) => state.bookListPage?.error;
export const getBooksListPageListView = (state: IStateSchema) => state.bookListPage?.listView || EBookListView.COMPACT;
export const getBooksListPageNum = (state: IStateSchema) => state.bookListPage?.page || 1;
export const getBooksListPageLimit = (state: IStateSchema) => state.bookListPage?.limit || 9;
export const getBooksListPageHasMore = (state: IStateSchema) => state.bookListPage?.hasMore;
