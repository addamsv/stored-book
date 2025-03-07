import { classes } from "resources/lib/classNames/classes";

import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { INavbarItem } from "widgets/Navbar/model/types";

import { useTranslation } from "react-i18next";
import { HFlex } from "shared/Flex/HFlex";
import { getUserAuthData, userActions } from "entities/User";
import UserProfile from "resources/assets/icons/user-profile.svg";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { IMenuItem, Menu } from "shared/Menu/Menu";
import { ImageJpg } from "shared/ImageJpg/ImageJpg";
import { RoutePath } from "resources/router/routeConfig/routeConfig";
import { LoginModal } from "features/AuthByUserName";
import { useTheme } from "resources/store/ThemeProvider";
import { getNavbarItemsArr } from "../../model/selectors";
import cls from "./Navbar.module.scss";
import { NavbarItem } from "../NavbarItem/NavbarItem";

interface INavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: INavbarProps) => {
  const { t, i18n } = useTranslation();
  const changeLang = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  const { theme, toggleTheme } = useTheme();

  const [isAuthModalWinOpen, setAuthModalWin] = useState(false);

  const authData = useSelector(getUserAuthData);

  const navbarArr = useSelector(getNavbarItemsArr);

  const user = useSelector(getUserAuthData);

  // const nav = useNavigate();

  const dispatch = useAppDispatch();

  const onAuthModalClose = useCallback(() => {
    setAuthModalWin(false);
  }, []);
  const onAuthModalOpen = useCallback(() => {
    setAuthModalWin(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  // const onAddBook = useCallback(() => {
  //   nav(RoutePath.book_add);
  // }, [nav]);

  // const onProfileCLick = useCallback(() => {
  //   nav(`${RoutePath.profile}${user?.user.id}`);
  // }, [nav, user?.user.id]);

  // const onContactHandler = () => {
  //   window.location.href = `mailto:${__CONTACT_US_EMAIL__}`;
  // };

  const NavbarItemList = navbarArr.map((item: INavbarItem) => (
    <NavbarItem
      key={item.path}
      item={item}
    />
  ));

  const menuProfileList: IMenuItem[] = [
    { content: t("тема"), onClick: toggleTheme, id: 1 },
    { content: t("язык"), onClick: changeLang, id: 2 },
  ];

  if (authData) {
    menuProfileList.push(
      { content: t("Профиль"), href: `${RoutePath.profile}${user?.user.id}`, id: 3 }, //  onClick: onProfileCLick },
      { content: t("Выйти"), onClick: onLogout, id: 4 }
    );

    if (user?.user.roles?.includes("ROLE_ADMIN")) {
      menuProfileList.push(
        { content: t("добавить"), href: RoutePath.book_add, id: 5 } // , onClick: onAddBook }
      );
    }
  } else {
    menuProfileList.push(
      { content: t("войти"), onClick: onAuthModalOpen, id: 6 }
    );
  }

  if (authData) {
    return (
      <header className={classes(cls.Navbar, {}, [className])}>
        <HFlex Tag="nav" role="navigation" className={cls.links}>
          { NavbarItemList }
        </HFlex>

        {/* <HFlex justify="end"> */}
        <Menu
          className={cls.menuBtn}
          direction="bottomLeft"
          items={menuProfileList}
          trigger={user?.avatar
            ? <ImageJpg w={18} h={18} src={user?.avatar} className={cls.avatar} />
            : <UserProfile width={22} height={22} className={cls.loginSVG} />}
        />
        {/* </HFlex> */}
      </header>
    );
  }

  return (
    <header className={classes(cls.Navbar, {}, [className])}>
      <HFlex Tag="nav" role="navigation" className={cls.links}>
        { NavbarItemList }
      </HFlex>

      {/* <HFlex justify="end" gap="16"> */}
      <Menu
        className={cls.menuBtn}
        direction="bottomLeft"
        items={menuProfileList}
        trigger={<UserProfile width={22} height={22} className={cls.loginSVG} />}
      />

      {isAuthModalWinOpen && <LoginModal isOpen={isAuthModalWinOpen} onClose={onAuthModalClose} />}

      {/* <div onClick={onContactHandler} className={cls.contactUsLink}>{t("Контакты")}</div> */}
      {/* </HFlex> */}
    </header>
  );
});
