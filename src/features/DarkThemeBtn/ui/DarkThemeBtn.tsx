import { classes } from "resources/lib/classNames/classes";
import { useTheme } from "resources/store/ThemeProvider";
import { Button, ButtonTheme } from "shared/Button/Button";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import cls from "./DarkThemeBtn.module.scss";

interface DarkThemeBtnProps {
  className?: string;
}

export const DarkThemeBtn = memo(({ className }: DarkThemeBtnProps) => {
  const { theme, toggleTheme } = useTheme();

  const { t } = useTranslation();

  return (
    <Button
      theme={ButtonTheme.ACCENT}
      className={classes(cls.DarkThemeBtn, {}, [className])}
      onClick={toggleTheme}
    >
      {t("тема")}
    </Button>
  );
});
