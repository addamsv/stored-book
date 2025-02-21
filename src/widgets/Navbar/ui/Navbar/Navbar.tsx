import { classes } from "resources/lib/classNames/classes";

import { memo } from "react";
import { useSelector } from "react-redux";

import { INavbarItem } from "widgets/Navbar/model/types";

import { useTranslation } from "react-i18next";
import { HFlex } from "shared/Flex/HFlex";
import { getNavbarItemsArr } from "../../model/selectors";
import cls from "./Navbar.module.scss";
import { NavbarItem } from "../NavbarItem/NavbarItem";

interface INavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: INavbarProps) => {
  const { t } = useTranslation();
  // const { t } = useTranslation();

  // const [isAuthModalWinOpen, setAuthModalWin] = useState(false);

  // const authData = useSelector(getUserAuthData);

  const navbarArr = useSelector(getNavbarItemsArr);

  // const user = useSelector(getUserAuthData);

  // const nav = useNavigate();

  // const dispatch = useAppDispatch();

  // const onAuthModalClose = useCallback(() => {
  //   setAuthModalWin(false);
  // }, []);

  // const onAuthModalOpen = useCallback(() => {
  //   setAuthModalWin(true);
  // }, []);

  // const onLogout = useCallback(() => {
  //   dispatch(userActions.logout());
  // }, [dispatch]);

  // const onAddBook = useCallback(() => {
  //   nav(RoutePath.book_add);
  // }, [nav]);

  // const onContactHandler = () => {
  //   window.location.href = `mailto:${__CONTACT_US_EMAIL__}`;
  // };

  const NavbarItemList = navbarArr.map((item: INavbarItem) => (
    <NavbarItem
      key={item.path}
      item={item}
    />
  ));

  // if (authData) {
  //   return (
  //     <menu className={classes(cls.Navbar, {}, [className])}>
  //       <nav className={cls.links}>
  //         <HFlex>
  //           { NavbarItemList }
  //         </HFlex>

  //         <HFlex justify="end" gap="16">
  //           {user?.user.roles?.includes("ROLE_ADMIN")
  //         && (
  //         <Button
  //           theme={ButtonTheme.GREEN}
  //           className={classes(cls.DarkThemeBtn, {}, [className])}
  //           onClick={onAddBook}
  //         >
  //           {t("добавить")}
  //         </Button>
  //         )}

  //           <Button
  //             theme={ButtonTheme.ACCENT_OUTLINE}
  //             className={classes(cls.DarkThemeBtn, {}, [className])}
  //             onClick={onLogout}
  //           >
  //             {t("Выйти")}
  //           </Button>
  //         </HFlex>

  //       </nav>
  //     </menu>
  //   );
  // }

  return (
    <menu className={classes(cls.Navbar, {}, [className])}>
      <HFlex Tag="nav" role="navigation" className={cls.links}>
        { NavbarItemList }

        {/* <Button
          data-testid="toggle-navbar-btn"
          className={classes(cls.sidebarBtn)}
          // theme={ButtonTheme.CLEAR_PAD}
          theme={ButtonTheme.ACCENT_OUTLINE}
          type="button"
          onClick={onAuthModalOpen}
        >
          <UserProfileSVG
            width={22}
            height={22}
            className={cls.loginSVG}
            // fill={theme === Theme.DARK ? "#fff" : "#000"}
          />

          {t("войти")}
        </Button> */}

        {/* {isAuthModalWinOpen && <LoginModal isOpen={isAuthModalWinOpen} onClose={onAuthModalClose} />} */}

        {/* <div onClick={onContactHandler} className={cls.contactUsLink}>{t("Контакты")}</div> */}

      </HFlex>
    </menu>
  );
});
