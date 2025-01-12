import { Counter } from "entities/Counter";
import React from "react";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page/Page";

const AboutPage = () => {
  const { t } = useTranslation("about");
  return (
    <Page>
      <h2 className="App-link">{t("о проекте")}</h2>
      <Counter />
    </Page>
  );
};

export default AboutPage;
