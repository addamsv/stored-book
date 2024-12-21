import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";
import { RoutePath } from "resources/config/routeConfig/routeConfig";
import { INavbarItem } from "../types";

export const getNavbarItemsArr = createSelector(
  getUserAuthData,
  (data) => {
    const itemsArr: INavbarItem[] = [
      {
        path: RoutePath.main,
        text: "Главная"
      },
      // {
      //   path: RoutePath.about,
      //   text: "О проекте"
      // },
      // {
      //   path: RoutePath.auth,
      //   text: "Зарегистрироваться"
      // },
    ];

    if (data?.user) {
      itemsArr.push(
        {
          path: RoutePath.books,
          text: "Книги",
          authOnly: true
        },
        {
          path: RoutePath.profile + data.user.id,
          text: "Профиль",
          authOnly: true
        }
      );
    }

    return itemsArr;
  }
);
