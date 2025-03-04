import { classes } from "resources/lib/classNames/classes";
import { memo, useCallback, useState } from "react";
import { DarkThemeBtn } from "features/DarkThemeBtn";
import { ChangeLangBtn } from "features/ChangeLangBtn";
import SettingsSVG from "resources/assets/icons/settings.svg";
// import SettingsLogo from "resources/assets/images/settings-dark.png";
import UserProfileSVG from "resources/assets/icons/user-profile.svg";
import { Button, ButtonSize, ButtonTheme } from "shared/Button/Button";
import { useTranslation } from "react-i18next";
import { IconSVG } from "shared/IconSVG/IconSVG";
import { LoginModal } from "features/AuthByUserName";
import { getUserAuthData, userActions } from "entities/User";
import { useSelector } from "react-redux";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "resources/router/routeConfig/routeConfig";
import { VFlex } from "shared/Flex/VFlex";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const [isAuthModalWinOpen, setAuthModalWin] = useState(false);

  const authData = useSelector(getUserAuthData);

  const user = useSelector(getUserAuthData);

  const nav = useNavigate();

  const dispatch = useAppDispatch();

  const [t] = useTranslation();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };
  const onAuthModalOpen = useCallback(() => {
    setAuthModalWin(true);
  }, []);
  const onAuthModalClose = useCallback(() => {
    setAuthModalWin(false);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const onAddBook = useCallback(() => {
    nav(RoutePath.book_add);
  }, [nav]);

  const onProfileCLick = useCallback(() => {
    nav(`${RoutePath.profile}${user?.user.id}`);
  }, [nav, user?.user.id]);

  if (authData) {
    return (
      <aside
        data-testid="sidebar"
        className={classes(cls.Sidebar, { [cls.collapsed]: collapsed }, [
          className
        ])}
      >
        <Button
          data-testid="toggle-sidebar-btn"
          className={classes(cls.sidebarBtn)}
          size={ButtonSize.M}
          theme={ButtonTheme.CLEAR}
          type="button"
          onClick={onToggle}
        >
          {/* <SettingsSVG width={22} height={22} /> */}
          <IconSVG className={cls.svgIcon} w={32} h={32} Svg={UserProfileSVG} />
          {/* <img
          alt={t("логотип настроек")}
          className={cls.buttonImage}
          src={SettingsLogo}
          width={20}
          height={20}
        /> */}
        </Button>

        <VFlex
          gap="16"
          className={classes(cls.sidebarContent, { [cls.clear]: collapsed }, [cls.sidebarContentAnimation])}
        >
          <DarkThemeBtn className={cls.sidebarSpacing} />

          <ChangeLangBtn className={cls.sidebarSpacing} />

          {user?.user.roles?.includes("ROLE_ADMIN") && (
            <Button
              theme={ButtonTheme.GREEN}
              className={classes(cls.DarkThemeBtn, {}, [className])}
              onClick={onAddBook}
            >
                {t("добавить")}
            </Button>
          )}

          {/* {user?.user && ( */}
          <Button
            theme={ButtonTheme.GREEN}
            className={classes(cls.DarkThemeBtn, {}, [className])}
            onClick={onProfileCLick}
          >
            {t("Профиль")}
          </Button>
          {/* )} */}

          <Button
            theme={ButtonTheme.RED}
            className={classes(cls.DarkThemeBtn, {}, [className])}
            onClick={onLogout}
          >
            {t("Выйти")}
          </Button>
        </VFlex>
      </aside>
    );
  }

  return (
    <aside
      data-testid="sidebar"
      className={classes(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className
      ])}
    >
      <Button
        data-testid="toggle-sidebar-btn"
        className={classes(cls.sidebarBtn)}
        size={ButtonSize.M}
        theme={ButtonTheme.CLEAR}
        type="button"
        onClick={onToggle}
      >
        {/* <SettingsSVG width={22} height={22} /> */}
        <IconSVG className={cls.svgIcon} w={32} h={32} Svg={UserProfileSVG} />
        {/* <img
          alt={t("логотип настроек")}
          className={cls.buttonImage}
          src={SettingsLogo}
          width={20}
          height={20}
        /> */}
      </Button>

      <VFlex
        gap="16"
        className={classes(cls.sidebarContent, { [cls.clear]: collapsed }, [cls.sidebarContentAnimation])}
      >
        <DarkThemeBtn className={cls.sidebarSpacing} />

        <ChangeLangBtn className={cls.sidebarSpacing} />

        <Button
          data-testid="toggle-navbar-btn"
          className={classes(cls.sidebarBtn)}
          // theme={ButtonTheme.CLEAR_PAD}
          theme={ButtonTheme.GREEN}
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

      </VFlex>
    </aside>
  );
});
