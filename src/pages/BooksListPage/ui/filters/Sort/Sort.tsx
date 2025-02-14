import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useMemo } from "react";
import { ISelectOptions, Select } from "shared/Select/Select";
import { EBookListSortField } from "entities/Book/model/types";
import { TypeSortOrder } from "resources/types";
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
      content: t("дате")
    },
    { value: EBookListSortField.SUBTITLE,
      content: t("автору")
    },
    { value: EBookListSortField.VIEWS,
      content: t("просмотрам")
    },
    { value: EBookListSortField.TITLE,
      content: t("заголовку")
    }
  ], [t]);

  return (
    <div className={classes(cls.Sort, {}, [className])}>
      {/* <div>{t("сортировать")}</div> */}
      <Select defaultValue={order} onChange={onOrderChange} optionsList={orderArr} />
      <Select defaultValue={sort} onChange={onSortChange} optionsList={sortArr} />
    </div>
  );
});
