// silence is golden
import { IStateSchema } from "app/providers/StoreProvider";
import { EBookListView } from "entities/Book";

export const getBooksListPageLoading = (state: IStateSchema) => state.bookListPage?.isLoading || false;
export const getBooksListPageError = (state: IStateSchema) => state.bookListPage?.error;
export const getBooksListPageListView = (state: IStateSchema) => state.bookListPage?.listView || EBookListView.COMPACT;
