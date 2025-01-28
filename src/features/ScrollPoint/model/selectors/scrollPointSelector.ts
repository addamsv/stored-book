import { createSelector } from "@reduxjs/toolkit";
import { IStateSchema } from "resources/store/StoreProvider";

// silence is golden
export const getScrollPoint = (state: IStateSchema) => state.scrollPoint.scroll;

export const getScrollPosByPath = createSelector(
  getScrollPoint, // получаем весь объект
  (state: IStateSchema, path: string) => path, // из объекта получаем путь
  (scroll, path) => scroll[path] || 0
);
