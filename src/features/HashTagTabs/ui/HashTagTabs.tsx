import { useTranslation } from "react-i18next";
import { memo, useCallback, useMemo } from "react";
import { Card } from "shared/Card/Card";
import { ITabItem, Tabs } from "shared/Tabs/Tabs";
import { EBookOfHashTagType } from "entities/Book";
import cls from "./HashTagTabs.module.scss";

interface IHashTagTabsProps {
  className?: string;
  activeHashTag: string;
  onTagChange: (tag: EBookOfHashTagType) => void
}

export const HashTagTabs = memo(({ className, activeHashTag, onTagChange }: IHashTagTabsProps) => {
  const { t } = useTranslation();

  const tabs = useMemo<ITabItem[]>(() => [
    { value: EBookOfHashTagType.ALL, content: t("Все") },
    { value: EBookOfHashTagType.IT, content: t("Айти") },
    { value: EBookOfHashTagType.SCIFI, content: t("Сайфай") },
    { value: EBookOfHashTagType.POETRY, content: t("Поэзия") },
    { value: EBookOfHashTagType.POLITICS, content: t("Политика") },
    { value: EBookOfHashTagType.ECONOMICS, content: t("Экономика") },
    { value: EBookOfHashTagType.SCIENCE, content: t("Наука") },
    { value: EBookOfHashTagType.ADVENTURE, content: t("Приключения") }
  ], [t]);

  const onHashTagChange = useCallback((tab: ITabItem) => {
    onTagChange(tab.value as EBookOfHashTagType);
  }, [onTagChange]);

  return (
    <Card className={cls.cardStyle}>
      <Tabs tabs={tabs} activeValue={activeHashTag} onClickHandler={onHashTagChange} />
    </Card>
  );
});
