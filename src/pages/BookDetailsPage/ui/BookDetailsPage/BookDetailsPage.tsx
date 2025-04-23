import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import { BookDetails, BookList, EBookListView } from "entities/Book";
import { useParams } from "react-router-dom";
import { Text } from "shared/Text/Text";
import { TextSize } from "shared/Text";
import { CommentList } from "entities/Comment";
import { AsyncModule, ReducerListT } from "shared/AsyncModule/AsyncModule";
import { useSelector } from "react-redux";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { SendCommentForm } from "features/SendCommentForm";
import { Page } from "widgets/Page/Page";
import { getUserAuthData } from "entities/User";
import { BookBottomNavbar } from "widgets/BookBottomNavbar";
import { BookRecommendationsList } from "features/BookRecommendationsList";
import { bookDetailsCommentsReducer, getBooksComments } from "../../model/slices/bookDetailsCommentsSlice";
import cls from "./BookDetailsPage.module.scss";
import { getBooksCommentsError, getBooksCommentsIsLoading } from "../../model/selectors";
import { fetchCommentsByBookId, sendBookComment } from "../../model/services";
import { getRecommendations, recommendationsReducer } from "../../model/slices/recommendationSlice";
import { getBooksRecommendationsError, getBooksRecommendationsIsLoading } from "../../model/selectors/recommendations";
import { fetchRecommendations } from "../../model/services/fetchRecommendations";
import { bookDetailsPageReducer } from "../../model/slices";
import { BookDetailsHeader } from "../BookDetailsHeader/BookDetailsHeader";
import { BookDetailsComments } from "../BookDetailsComments/BookDetailsComments";

interface IBookDetailsPageProps {
  className?: string;
}

const reducerList: ReducerListT = {
  bookDetailsPage: bookDetailsPageReducer,
  // bookDetailsComments: bookDetailsCommentsReducer,
  // bookDetailsRecommendations: recommendationsReducer
};

const BookDetailsPage = ({ className }: IBookDetailsPageProps) => {
  const { t } = useTranslation("book");

  const { id } = useParams<{id: string}>();

  if (!id) {
    return (
      <Page className={classes(cls.BookDetailsPage, {}, [className])}>
        {t("ничего не найдено")}
      </Page>
    );
  }

  return (
    <AsyncModule reducers={reducerList} isRemoveAfterUnmount>
      <Page className={classes(cls.BookDetailsPage, {}, [className])}>
        <BookDetailsHeader />

        <BookDetails bookId={Number(id)} />

        <BookRecommendationsList />

        <BookDetailsComments bookId={Number(id)} />

        <BookBottomNavbar />
      </Page>
    </AsyncModule>
  );
};

export default memo(BookDetailsPage);
