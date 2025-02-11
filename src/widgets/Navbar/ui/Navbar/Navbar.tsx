import { classes } from "resources/lib/classNames/classes";

import { useTranslation } from "react-i18next";

import { memo, useCallback, useState } from "react";
import { Button, ButtonTheme } from "shared/Button/Button";
import { LoginModal } from "features/AuthByUserName";
import { useDispatch, useSelector } from "react-redux";
import UserProfileSVG from "resources/assets/icons/user-profile.svg";

import { getUserAuthData, userActions } from "entities/User";
import { INavbarItem } from "widgets/Navbar/model/types";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "resources/router/routeConfig/routeConfig";
import { getNavbarItemsArr } from "../../model/selectors";
import cls from "./Navbar.module.scss";
import { NavbarItem } from "../NavbarItem/NavbarItem";

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isAuthModalWinOpen, setAuthModalWin] = useState(false);

  const authData = useSelector(getUserAuthData);
  const navbarArr = useSelector(getNavbarItemsArr);
  const user = useSelector(getUserAuthData);

  const nav = useNavigate();

  const dispatch = useDispatch();

  const onAuthModalClose = useCallback(() => {
    setAuthModalWin(false);
  }, []);

  const onAuthModalOpen = useCallback(() => {
    setAuthModalWin(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const onAddBook = useCallback(() => {
    nav(RoutePath.book_add);
  }, [nav]);

  const NavbarItemList = navbarArr.map((item: INavbarItem) => (
    <NavbarItem
      key={item.path}
      item={item}
    />
  ));

  if (authData) {
    return (
      <menu className={classes(cls.Navbar, {}, [className])}>
        <nav className={cls.links}>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            { NavbarItemList }
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px" }}>
            {user?.user.roles?.includes("ROLE_ADMIN")
          && (
          <Button
            theme={ButtonTheme.ACCENT_OUTLINE}
            className={classes(cls.DarkThemeBtn, {}, [className])}
            onClick={onAddBook}
          >
            {t("добавить")}
          </Button>
          )}

            <Button
              theme={ButtonTheme.ACCENT_OUTLINE}
              className={classes(cls.DarkThemeBtn, {}, [className])}
              onClick={onLogout}
            >
              {t("Выйти")}
            </Button>
          </div>

        </nav>
      </menu>
    );
  }

  return (
    <menu className={classes(cls.Navbar, {}, [className])}>
      <nav className={cls.links}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          { NavbarItemList }
        </div>

        <Button
          data-testid="toggle-navbar-btn"
          className={classes(cls.sidebarBtn)}
          // theme={ButtonTheme.CLEAR_PAD}
          theme={ButtonTheme.ACCENT_OUTLINE}
          type="button"
          onClick={onAuthModalOpen}
        >
          {/* <UserProfileSVG
            width={22}
            height={22}
            className={cls.loginSVG}
            // fill={theme === Theme.DARK ? "#fff" : "#000"}
          /> */}

          {t("войти")}
        </Button>

        {isAuthModalWinOpen && <LoginModal isOpen={isAuthModalWinOpen} onClose={onAuthModalClose} />}

      </nav>
    </menu>
  );
});
