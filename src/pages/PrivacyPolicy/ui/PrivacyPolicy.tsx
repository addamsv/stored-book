import { Counter } from "entities/Counter";
import React from "react";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page/Page";

const PrivacyPolicy = () => {
  const { t } = useTranslation("privacyPolicy");
  return (
    <Page>
      <h2 className="App-link">{t("Privacy Policy")}</h2>
      <Counter />
    </Page>
  );
};

export default PrivacyPolicy;
