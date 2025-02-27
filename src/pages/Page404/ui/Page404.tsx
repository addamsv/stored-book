import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Page } from "widgets/Page/Page";
import { Card } from "shared/Card/Card";
import { VFlex } from "shared/Flex/VFlex";
import cls from "./Page404.module.scss";

interface Page404Props {
  className?: string;
}

export const Page404 = memo(({ className }: Page404Props) => {
  const { t } = useTranslation();

  return (
    <Page className={classes(cls.Page404, {}, [className])}>
      <Card className={cls.wrapper}>
        <VFlex gap="8">
          {t("404")}
        </VFlex>
      </Card>
    </Page>
  );
});
