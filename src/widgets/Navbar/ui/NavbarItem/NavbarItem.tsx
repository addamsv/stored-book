import { useTranslation } from "react-i18next";
import { AppLink, AppLinkTheme } from "shared/AppLink/AppLink";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import { classes } from "resources/lib/classNames/classes";
import { INavbarItem } from "widgets/Navbar/model/types";
import cls from "./NavbarItem.module.scss";

interface INavbarItemProps {
  item: INavbarItem;
  isCollapsed?: boolean;
  isActive?: boolean;
  authOnly?: boolean;
}

export const NavbarItem = memo(({ item, isCollapsed, isActive = false, authOnly }: INavbarItemProps) => {
  const { t } = useTranslation();

  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink theme={AppLinkTheme.PRIMARY} className={classes(cls.NavbarItem, {}, [cls.appLink])} to={item.path}>
      {t(item.text)}
    </AppLink>
  );
});
