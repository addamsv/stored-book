import { EntityState } from "@reduxjs/toolkit";
import { EBookListView, IBook } from "entities/Book";
import { EBookListSortField } from "entities/Book/model/types";
import { TypeSortOrder } from "resources/types";

// silence is golden
export interface IBookListPageStateSchema extends EntityState<IBook> {
  isLoading?: boolean;
  error?: string;

  // pagination
  page: number;
  limit: number;
  hasMore: boolean;

  listView: EBookListView;
  order: TypeSortOrder;
  sort: EBookListSortField;
  search: string;

  _isStateInit: boolean;
}
