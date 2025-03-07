// silence is golden
import { IStateSchema } from "resources/store/StoreProvider";
import { EBookListView, EBookListSortField, EBookOfHashTagType } from "entities/Book";

export const getBooksListPageLoading = (state: IStateSchema) => state.bookListPage?.isLoading || false;
export const getBooksListPageError = (state: IStateSchema) => state.bookListPage?.error;
export const getBooksListPageListView = (state: IStateSchema) => state.bookListPage?.listView || EBookListView.STANDARD;
export const getBooksListPageNum = (state: IStateSchema) => state.bookListPage?.page || 1;
export const getBooksListPageLimit = (state: IStateSchema) => state.bookListPage?.limit || 9;
export const getBooksListPageHasMore = (state: IStateSchema) => state.bookListPage?.hasMore;
export const getBooksListPageIsStateInit = (state: IStateSchema) => state.bookListPage?._isStateInit;

export const getBooksListPageOrder = (state: IStateSchema) => state.bookListPage?.order ?? "desc";
export const getBooksListPageSort = (state: IStateSchema) => state.bookListPage?.sort ?? EBookListSortField.CREATED_AT;
export const getBooksListPageSearch = (state: IStateSchema) => state.bookListPage?.search ?? "";
export const getBooksListPageHashTag = (state: IStateSchema) => state.bookListPage?.hashTag ?? EBookOfHashTagType.ALL;
