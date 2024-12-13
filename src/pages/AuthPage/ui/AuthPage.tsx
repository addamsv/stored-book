import React, { memo } from "react";
import { useTranslation } from "react-i18next";

const AuthPage = () => {
  const { t } = useTranslation("auth");

  return (
    <div>
      <h2 className="App-link">{t("страница регистрации")}</h2>
    </div>
  );
};

export default memo(AuthPage);
