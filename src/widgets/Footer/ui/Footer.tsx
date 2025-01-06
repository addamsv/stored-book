import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import GitSVG from "shared/assets/icons/git.svg";
import YouTubeSVG from "shared/assets/icons/youtube.svg";
import WiFiSVG from "shared/assets/icons/wifi.svg";
import LinkSVG from "shared/assets/icons/link.svg";
import InstagramSVG from "shared/assets/icons/instagram.svg";
import FacebookSVG from "shared/assets/icons/facebook.svg";
import { memo } from "react";
import cls from "./Footer.module.scss";

interface FooterProps {
  className?: string;
}

export const Footer = memo(({ className }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <footer className={classes(cls.Footer, {}, [className])}>
      {/* <img src={GitLogoLight} alt="" width={15} /> */}

      <div className={cls.iconWrapper}><GitSVG className={cls.icons} /></div>
      <div className={cls.iconWrapper}><YouTubeSVG className={cls.icons} /></div>
      <div className={cls.iconWrapper}><WiFiSVG className={cls.icons} /></div>
      <div className={cls.iconWrapper}><LinkSVG className={cls.icons} /></div>
      <div className={cls.iconWrapper}><InstagramSVG className={cls.icons} /></div>
      <div className={cls.iconWrapper}><FacebookSVG className={cls.icons} /></div>
    </footer>
  );
});
