import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { Select } from "shared/Select/Select";
import { memo, useCallback } from "react";
import cls from "./Country.module.scss";
import { ECountry } from "../../model/types/country";

interface ICountryProps {
  className?: string;
  defaultValue?: ECountry;
  isReadOnly?: boolean;
  onChange?: (value: ECountry) => void;
}

export const countryList = [
  { value: ECountry.Belarus, content: ECountry.Belarus },
  { value: ECountry.Russia, content: ECountry.Russia },
  { value: ECountry.Armenia, content: ECountry.Armenia },
  { value: ECountry.Ukraine, content: ECountry.Ukraine }
];

export const Country = memo(({ className, defaultValue, isReadOnly, onChange }: ICountryProps) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as ECountry);
  }, [onChange]);

  return (
    <Select
      className={classes(cls.Country, {}, [className])}
      defaultValue={defaultValue}
      title={t("Страна")}
      readonly={isReadOnly}
      onChange={onChangeHandler}
      optionsList={countryList}
    />
  );
});
