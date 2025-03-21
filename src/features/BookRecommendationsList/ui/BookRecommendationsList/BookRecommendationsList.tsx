import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Text, TextSize } from "shared/Text";
import { BookList, EBookListView } from "entities/Book";
import { VFlex } from "shared/Flex/VFlex";
import { RTK } from "resources/lib/restApi/RTK";
// import cls from "./BookRecommendationsList.module.scss";

interface IProps {
  className?: string;
}

const api = RTK.injectEndpoints({
  endpoints: (build) => ({
    getBooksRecommendationsList: build.query({
      query: (limit) => ({
        url: "/books",
        params: {
          _limit: limit
        }
      })
    })

  })
});

const useBooksRecommendationsList = api.useGetBooksRecommendationsListQuery;

export const BookRecommendationsList = memo(({ className }: IProps) => {
  const { t } = useTranslation("book");

  const { data, isLoading, error } = useBooksRecommendationsList(4);

  if (isLoading || error) {
    return null;
  }
  console.log(data);

  return (
    <VFlex gap="8" className={classes("", {}, [className])}>
      <Text textSize={TextSize.L} title={t("рекомендасьён")} />

      <BookList
        key="recommendations"
        target="_blank"
        // bookArr={recommendations}
        bookArr={data.data}
        listView={EBookListView.COMPACT}
      />
    </VFlex>
  );
});
