import { classes } from "resources/lib/classNames/classes";
import { memo, ReactNode, useCallback } from "react";
import { Button } from "shared/Button/Button";
import { useTranslation } from "react-i18next";
import cls from "./Code.module.scss";

interface ICodeProps {
  className?: string;
  text?: string;
}

export const Code = memo(({ className, text }: ICodeProps) => {
  const { t } = useTranslation();

  const onCopyHandler = useCallback(() => {
    navigator.clipboard.writeText(text || "");
  }, [text]);

  return (
    <pre className={classes(cls.Code, {}, [className])}>
      <Button onClick={onCopyHandler} className={cls.copyButton}>{t("копировать")}</Button>
      <code>
        {text}
      </code>
    </pre>
  );
});
