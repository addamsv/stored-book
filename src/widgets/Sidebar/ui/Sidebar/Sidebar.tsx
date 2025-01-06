import { classes } from "shared/lib/classNames/classes";
import { memo, useState } from "react";
import { DarkThemeBtn } from "features/DarkThemeBtn";

import { ChangeLangBtn } from "features/ChangeLangBtn";

import SettingsSVG from "shared/assets/icons/settings.svg";
// import SettingsLogo from "shared/assets/images/settings-dark.png";

import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const [t] = useTranslation();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

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
        <SettingsSVG width={22} height={22} className={cls.svgIcon} />
        {/* <img
          alt={t("логотип настроек")}
          className={cls.buttonImage}
          src={SettingsLogo}
          width={20}
          height={20}
        /> */}
      </Button>

      <div className={classes(cls.sidebarContent, { [cls.clear]: collapsed }, [cls.sidebarContentAnimation])}>
        <DarkThemeBtn className={cls.sidebarSpacing} />
        <ChangeLangBtn className={cls.sidebarSpacing} />
      </div>
    </aside>
  );
});
