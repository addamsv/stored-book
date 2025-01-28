import { EntityState } from "@reduxjs/toolkit";
import { IBook } from "entities/Book";

export interface IRecommendationsStateSchema extends EntityState<IBook> {
  isLoading?: boolean;

  error?: string;

  // data: IComment[];
  // ids: string[];
  // entities: Dictionary<any, any>;
}
