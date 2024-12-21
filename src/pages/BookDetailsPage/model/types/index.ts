import { EntityState } from "@reduxjs/toolkit";
import { IComment } from "entities/Comment";

export interface IBooksDetailsCommentsStateSchema extends EntityState<IComment> {
  isLoading?: boolean;

  error?: string;

  // data: IComment[];
  // ids: string[];
  // entities: Dictionary<any, any>;
}
