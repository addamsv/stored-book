import { combineReducers } from "@reduxjs/toolkit";
import { IBooksDetailsPageStateSchema } from "../types";
import { bookDetailsCommentsReducer } from "./bookDetailsCommentsSlice";
import { recommendationsReducer } from "./recommendationSlice";

export const bookDetailsPageReducer = combineReducers<IBooksDetailsPageStateSchema>({
  comments: bookDetailsCommentsReducer,
  recommendations: recommendationsReducer
});
