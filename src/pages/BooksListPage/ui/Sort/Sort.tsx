import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useMemo } from "react";
import { ISelectOptions, Select } from "shared/Select/Select";
import { EBookListSortField } from "entities/Book/model/types";
import { TypeSortOrder } from "resources/types";
import { HFlex } from "shared/Flex/HFlex";
import cls from "./Sort.module.scss";

interface ISortProps {
  className?: string;
  sort: EBookListSortField;
  order: TypeSortOrder;
  onOrderChange: (val: TypeSortOrder) => void;
  onSortChange: (val: EBookListSortField) => void;
}

export const Sort = memo(({ className, sort, order, onOrderChange, onSortChange }: ISortProps) => {
  const { t } = useTranslation();

  const orderArr = useMemo<ISelectOptions<TypeSortOrder>[]>(() => [
    { value: "asc",
      content: t("возрастанию")
    },
    { value: "desc",
      content: t("убыванию")
    }
  ], [t]);

  const sortArr = useMemo<ISelectOptions<EBookListSortField>[]>(() => [
    { value: EBookListSortField.CREATED_AT,
      content: t("публикация")
    },
    { value: EBookListSortField.RELEASE,
      content: t("выпуск")
    },
    { value: EBookListSortField.SUBTITLE,
      content: t("автору")
    },
    { value: EBookListSortField.TITLE,
      content: t("заголовку")
    },
    { value: EBookListSortField.VIEWS,
      content: t("просмотрам")
    },
  ], [t]);

  return (
    <HFlex className={classes(cls.Sort, {}, [className])}>
      <Select className={cls.sortFilter} defaultValue={order} onChange={onOrderChange} optionsList={orderArr} />
      <Select className={cls.sortFilter} defaultValue={sort} onChange={onSortChange} optionsList={sortArr} />
    </HFlex>
  );
});
