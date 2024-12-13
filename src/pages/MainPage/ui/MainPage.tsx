import React, { memo } from "react";
import Logo from "shared/assets/icons/logo.svg";
import { useTheme } from "app/providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { Counter } from "entities/Counter";

const MainPage = () => {
  const { theme } = useTheme();

  const [t] = useTranslation("main");

  return (
    <div>
      <h2 className="App-link">{t("главная страница")}</h2>
      <Logo width="300px" fill="#61DAFB" transform="scale(0.20 0.20)" />
      <Counter />
    </div>
  );
};

export default memo(MainPage);
