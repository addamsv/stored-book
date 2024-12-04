import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { Select } from "shared/ui/Select/Select";
import { memo, useCallback } from "react";
import cls from "./Currency.module.scss";
import { ECurrency } from "../../model/types/currency";

interface ICurrencyProps {
  className?: string;
  defaultValue?: ECurrency;
  isReadOnly?: boolean;
  onChange?: (value: ECurrency) => void;
}

const optionsList = [
  { value: ECurrency.EUR, content: ECurrency.EUR },
  { value: ECurrency.BYN, content: ECurrency.BYN },
  { value: ECurrency.RUB, content: ECurrency.RUB },
  { value: ECurrency.USD, content: ECurrency.USD },
];

export const Currency = memo(({ className, defaultValue, isReadOnly, onChange }: ICurrencyProps) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as ECurrency);
  }, [onChange]);

  return (
    <Select
      className={classes(cls.Currency, {}, [className])}
      defaultValue={defaultValue}
      title={t("Валюта")}
      readonly={isReadOnly}
      onChange={onChangeHandler}
      optionsList={optionsList}
    />
  );
});
