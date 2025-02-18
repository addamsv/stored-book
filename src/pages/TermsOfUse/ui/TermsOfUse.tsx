import { Counter } from "entities/Counter";
import React from "react";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page/Page";

const TermsOfUse = () => {
  const { t } = useTranslation("termsOfUse");
  return (
    <Page>
      <h2 className="App-link">{t("Terms Of Use")}</h2>
      <Counter />
    </Page>
  );
};

export default TermsOfUse;
