import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page/Page";

const AuthPage = () => {
  const { t } = useTranslation("auth");

  return (
    <Page>
      <h2 className="App-link">{t("страница регистрации")}</h2>
    </Page>
  );
};

export default memo(AuthPage);
