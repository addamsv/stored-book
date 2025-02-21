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
import { bookDetailsCommentsReducer, getBooksComments } from "../model/slices/bookDetailsCommentsSlice";
import cls from "./BookDetailsPage.module.scss";
import { getBooksCommentsError, getBooksCommentsIsLoading } from "../model/selectors";
import { fetchCommentsByBookId, sendBookComment } from "../model/services";
import { getRecommendations, recommendationsReducer } from "../model/slices/recommendationSlice";
import { getBooksRecommendationsError, getBooksRecommendationsIsLoading } from "../model/selectors/recommendations";
import { fetchRecommendations } from "../model/services/fetchRecommendations";
import { bookDetailsPageReducer } from "../model/slices";
import { BookDetailsHeader } from "./BookDetailsHeader/BookDetailsHeader";

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

  const dispatch = useAppDispatch();

  const user = useSelector(getUserAuthData);
  const comments = useSelector(getBooksComments.selectAll);
  const isLoading = useSelector(getBooksCommentsIsLoading);
  const error = useSelector(getBooksCommentsError);
  const recommendations = useSelector(getRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(getBooksRecommendationsIsLoading);
  const recommendationsError = useSelector(getBooksRecommendationsError);

  const onSendCommentHandler = useCallback((text: string) => {
    dispatch(sendBookComment(text));
  }, [dispatch]);

  useEffect(() => {
    if (__PROJECT_TYPE__ !== "storybook") {
      dispatch(fetchCommentsByBookId({ bookId: Number(id) }));
      dispatch(fetchRecommendations());
    }
  }, [dispatch, id]);

  if (!id) {
    return (
      <Page className={classes(cls.BookDetailsPage, {}, [className])}>
        {t("ничего не найдено")}
      </Page>
    );
  }

  if (error) {
    return (
      <Page className={classes(cls.BookDetailsPage, {}, [className])}>
        <Text title={t("ошибка")} text={error} />
      </Page>
    );
  }

  return (
    <AsyncModule reducers={reducerList} isRemoveAfterUnmount>
      <Page className={classes(cls.BookDetailsPage, {}, [className])}>
        <BookDetailsHeader />

        <BookDetails bookId={Number(id)} />

        <Text className={cls.mgnTop} textSize={TextSize.L} title={t("рекомендасьён")} />

        <BookList
          key="recommendations"
          className={cls.recommendations}
          target="_blank"
          bookArr={recommendations}
          isLoading={recommendationsIsLoading}
          listView={EBookListView.COMPACT}
        />

        <Text className={cls.mgnTop} textSize={TextSize.L} title={t("комментарии")} />

        {user && <SendCommentForm onSendCommentHandler={onSendCommentHandler} />}

        <CommentList isLoading={isLoading} comments={comments} />

        <BookBottomNavbar />
      </Page>
    </AsyncModule>
  );
};

export default memo(BookDetailsPage);
