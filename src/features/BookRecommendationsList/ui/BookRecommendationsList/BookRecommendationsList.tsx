import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Text, TextSize } from "shared/Text";
import { BookList, EBookListView } from "entities/Book";
import { VFlex } from "shared/Flex/VFlex";
import { Card } from "shared/Card/Card";
import { useBooksRecommendationsList } from "../../api/bookRecommendsAPI";

import cls from "./BookRecommendationsList.module.scss";

interface IProps {
  className?: string;
}

export const BookRecommendationsList = memo(({ className }: IProps) => {
  const { t } = useTranslation("book");

  const { data, isLoading, error } = useBooksRecommendationsList(4);

  if (isLoading || error) {
    return null;
  }

  return (
    <VFlex gap="8" align="center" className={classes("", {}, [className])}>

      <Card className={cls.contentWrapper}>
        <Text className={cls.mgnTop} textSize={TextSize.L} title={t("рекомендасьён")} />

        <BookList
          key="recommendations"
          target="_blank"
          className={cls.recommendations}
          bookArr={data.data}
          listView={EBookListView.COMPACT}
        />
      </Card>

    </VFlex>
  );
});
