import { classes } from "resources/lib/classNames/classes";
import GitSVG from "resources/assets/icons/git.svg";
// import YouTubeSVG from "resources/assets/icons/youtube.svg";
// import WiFiSVG from "resources/assets/icons/wifi.svg";
import LinkSVG from "resources/assets/icons/link.svg";
// import InstagramSVG from "resources/assets/icons/instagram.svg";
// import FacebookSVG from "resources/assets/icons/facebook.svg";
import { memo } from "react";
import { AppLink } from "shared/AppLink/AppLink";
import { HFlex } from "shared/Flex/HFlex";
import cls from "./Footer.module.scss";

interface FooterProps {
  className?: string;
}

export const Footer = memo(({ className }: FooterProps) => {
  return (
    <footer className={classes(cls.Footer, {}, [className])}>
      <HFlex justify="end" max className={cls.footerWrapper}>
        {/* <img src={GitLogoLight} alt="" width={15} /> */}

        <div className={cls.iconWrapper}>
          <AppLink target="blank" to="https://github.com/addamsv"><GitSVG className={cls.icons} /></AppLink>
        </div>

        {/* <div className={cls.iconWrapper}><YouTubeSVG className={cls.icons} /></div>

        <div className={cls.iconWrapper}><WiFiSVG className={cls.icons} /></div> */}

        <div className={cls.iconWrapper}>
          <AppLink target="blank" to="https://www.linkedin.com/in/addamsv"><LinkSVG className={cls.icons} /></AppLink>
        </div>

        {/* <div className={cls.iconWrapper}><InstagramSVG className={cls.icons} /></div>

        <div className={cls.iconWrapper}><FacebookSVG className={cls.icons} /></div> */}
      </HFlex>
    </footer>
  );
});
