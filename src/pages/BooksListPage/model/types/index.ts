import { EntityState } from "@reduxjs/toolkit";
import { EBookListView, IBook } from "entities/Book";

// silence is golden
export interface IBookListPageStateSchema extends EntityState<IBook> {
  isLoading?: boolean;
  error?: string;

  listView: EBookListView;

  page: number;
  limit?: number;
  hasMore: boolean;
}
