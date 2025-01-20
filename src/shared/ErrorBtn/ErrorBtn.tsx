import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/Button/Button";

export const ErrorBtn = () => {
  const [isErr, setErr] = useState(false);
  const { t } = useTranslation("temp");

  const trigErr = () => {
    setErr(true);
  };

  useEffect(() => {
    if (isErr) {
      throw new Error();
    }
  }, [isErr]);

  return (<Button theme={ButtonTheme.RED} onClick={trigErr}>{t("ошибка")}</Button>);
};
