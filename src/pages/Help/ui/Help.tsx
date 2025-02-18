import { Counter } from "entities/Counter";
import React from "react";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page/Page";

const Disclaimer = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <h2 className="App-link">{t("Помощь")}</h2>
      <Counter />
    </Page>
  );
};

export default Disclaimer;
