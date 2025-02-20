import { classes } from "resources/lib/classNames/classes";

import { memo } from "react";

import { INavbarItem } from "widgets/Navbar/model/types";
import { RoutePath } from "resources/router/routeConfig/routeConfig";
import { HFlex } from "shared/Flex/HFlex";
import { useTranslation } from "react-i18next";
import { IBookBottomNavbarItem } from "../../model/types";
import cls from "./BookBottomNavbar.module.scss";
import { NavbarItem } from "../NavbarItem/NavbarItem";

interface IBookBottomNavbarProps {
  className?: string;
}

const itemsArr: IBookBottomNavbarItem[] = [
  {
    path: RoutePath.dmca_report,
    text: "DMCA_Rep"
  },
  {
    path: RoutePath.disclaimer,
    text: "Disclaimer"
  },
  {
    path: RoutePath.privacy_policy,
    text: "Privacy Policy"
  },
  {
    path: RoutePath.terms_of_use,
    text: "Terms of Use"
  },
];

const NavbarItemList = itemsArr.map((item: INavbarItem) => (
  <NavbarItem
    key={item.path}
    item={item}
  />
));

export const BookBottomNavbar = memo(({ className }: IBookBottomNavbarProps) => {
  const { t } = useTranslation();

  // const onContactHandler = () => {
  //   window.location.href = `mailto:${__CONTACT_US_EMAIL__}`;
  // };

  return (
    <menu className={classes(cls.BookBottomNavbar, {}, [className])}>
      <HFlex className={cls.itemWrapper} justify="center">
        <div className={cls.warnings}>{t("warnings")}</div>
        {/* { NavbarItemList } */}
        {/* <div onClick={onContactHandler} className={cls.contactUsLink}>{t("Контакты")}</div> */}
      </HFlex>
    </menu>
  );
});
