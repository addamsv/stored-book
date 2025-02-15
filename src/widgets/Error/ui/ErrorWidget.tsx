import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/Button/Button";
import { Text } from "shared/Text";
import { VFlex } from "shared/Flex/VFlex";
import cls from "./ErrorWidget.module.scss";

interface ErrorWidgetProps {
  className?: string;
  text?: string;
}

export const ErrorWidget = ({ className, text = "" }: ErrorWidgetProps) => {
  const { t } = useTranslation();

  const reload = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <VFlex gap="16" align="center" className={classes(cls.ErrorWidget, {}, [className])}>
      <Text title={t("ошибка")} text={text} />
      <Button theme={ButtonTheme.GREEN} onClick={reload}>{t("перезагрузить")}</Button>
    </VFlex>
  );
};
