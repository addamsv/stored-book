import { RoutePath } from "resources/config/routeConfig/routeConfig";
import { INavbarItem } from "./types/INavbarItem";

export const SidebarItemsList: INavbarItem[] = [
  {
    path: RoutePath.main,
    text: "Главная"
  },
  {
    path: RoutePath.articles,
    text: "Статьи",
    authOnly: true
  },
  // {
  //   path: RoutePath.about,
  //   text: "О проекте"
  // },
  // {
  //   path: RoutePath.auth,
  //   text: "Зарегистрироваться"
  // },
  {
    path: RoutePath.profile,
    text: "Профиль",
    authOnly: true
  }
];
