import { useTranslation } from "react-i18next";
import { classes } from "resources/lib/classNames/classes";
import { Button, ButtonTheme } from "shared/Button/Button";

import { memo } from "react";
import cls from "./ChangeLangBtn.module.scss";

interface ChangeLangBtnProps {
  className?: string;
}

export const ChangeLangBtn = memo(({ className }: ChangeLangBtnProps) => {
  const { t, i18n } = useTranslation();

  const changeLang = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <Button
      theme={ButtonTheme.ACCENT}
      className={classes(cls.DarkThemeBtn, {}, [className])}
      onClick={changeLang}
    >
      {t("язык")}
    </Button>
  );
});
