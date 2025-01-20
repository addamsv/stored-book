import { classes } from "resources/lib/classNames/classes";

import { ChangeEvent, memo, useMemo } from "react";
import cls from "./Select.module.scss";

export interface ISelectOptions<T extends string> {
  value: T;
  content: string;
}

interface ISelectProps<T extends string> {
  className?: string;
  title?: string;
  defaultValue?: T;
  optionsList?: ISelectOptions<T>[];

  readonly?: boolean;
  onChange?: (val: T) => void;
}

// export const Select = memo(({ className, title, defaultValue, optionsList, readonly, onChange }: ISelectProps) => {
export const Select = <T extends string>({
  className, title, defaultValue, optionsList, readonly, onChange
}: ISelectProps<T>) => {
  const onOptionPick = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  const list = useMemo(() => {
    return optionsList?.map((optionItem) => (
      <option key={optionItem.value} value={optionItem.value}>
        {optionItem.content}
      </option>
    ));
  }, [optionsList]);

  return (
    <div className={classes(cls.Select, {}, [className])}>
      {title && <div className={cls.title}>{title}</div>}
      <select
        disabled={readonly}
        value={defaultValue}
        onChange={onOptionPick}
        className={classes(cls.selectEntity, { [cls.readOnly]: readonly }, [])}
      >
        {list}
      </select>
    </div>
  );
};
// });
