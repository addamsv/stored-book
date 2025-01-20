import React, { memo } from "react";
import Logo from "resources/assets/icons/logo.svg";
import { useTheme } from "resources/store/ThemeProvider";
import { useTranslation } from "react-i18next";
import { Counter } from "entities/Counter";
import { Page } from "widgets/Page/Page";
import { ErrorBtn } from "shared/ErrorBtn/ErrorBtn";

const MainPage = () => {
  const { theme } = useTheme();

  const [t] = useTranslation("main");

  return (
    <Page>
      <h2 className="App-link">{t("главная страница")}</h2>
      <Logo width="300px" fill="#61DAFB" transform="scale(0.20 0.20)" />
      <Counter />
    </Page>
  );
};

export default memo(MainPage);
