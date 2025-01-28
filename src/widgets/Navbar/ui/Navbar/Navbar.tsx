import { classes } from "resources/lib/classNames/classes";

import { useTranslation } from "react-i18next";

import { memo, useCallback, useState } from "react";
import { Button, ButtonTheme } from "shared/Button/Button";
import { LoginModal } from "features/AuthByUserName";
import { useDispatch, useSelector } from "react-redux";
import UserProfileSVG from "resources/assets/icons/user-profile.svg";

import { getUserAuthData, userActions } from "entities/User";
import { INavbarItem } from "widgets/Navbar/model/types";
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

          <Button
            theme={ButtonTheme.ACCENT_OUTLINE}
            className={classes(cls.DarkThemeBtn, {}, [className])}
            onClick={onLogout}
          >
            {t("Выйти")}
          </Button>

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
          theme={ButtonTheme.CLEAR_PAD}
          type="button"
          onClick={onAuthModalOpen}
        >
          <UserProfileSVG
            width={22}
            height={22}
            className={cls.loginSVG}
            // fill={theme === Theme.DARK ? "#fff" : "#000"}
          />
        </Button>

        {isAuthModalWinOpen && <LoginModal isOpen={isAuthModalWinOpen} onClose={onAuthModalClose} />}

      </nav>
    </menu>
  );
});
