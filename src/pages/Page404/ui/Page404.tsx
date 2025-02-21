import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Page } from "widgets/Page/Page";
import cls from "./Page404.module.scss";

interface Page404Props {
  className?: string;
}

export const Page404 = memo(({ className }: Page404Props) => {
  const { t } = useTranslation();

  return (<Page className={classes(cls.Page404, {}, [className])}>{t("404")}</Page>);
});
