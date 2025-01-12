import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import { BookDetails } from "entities/Book";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "shared/ui/Text/Text";
import { TextSize } from "shared/ui/Text";
import { CommentList } from "entities/Comment";
import { AsyncModule, ReducerListT } from "shared/ui/AsyncModule/AsyncModule";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { SendCommentForm } from "widgets/SendCommentForm";
import { Button } from "shared/ui/Button/Button";
import { RoutePath } from "resources/config/routeConfig/routeConfig";
import { Page } from "widgets/Page/Page";
import { bookDetailsCommentsReducer, getBooksComments } from "../model/slices";
import cls from "./BookDetailsPage.module.scss";
import { getBooksCommentsError, getBooksCommentsIsLoading } from "../model/selectors";
import { fetchCommentsByBookId, sendBookComment } from "../model/services";

interface IBookDetailsPageProps {
  className?: string;
}

const reducerList: ReducerListT = {
  bookDetailsComments: bookDetailsCommentsReducer
};

const BookDetailsPage = ({ className }: IBookDetailsPageProps) => {
  const { t } = useTranslation("book");

  const { id } = useParams<{id: string}>();

  const dispatch = useAppDispatch();

  const comments = useSelector(getBooksComments.selectAll);
  const isLoading = useSelector(getBooksCommentsIsLoading);
  const error = useSelector(getBooksCommentsError);

  // const nav = useNavigate();

  // const onBackListHandler = useCallback(() => {
  //   nav(RoutePath.books);
  // }, [nav]);

  const onSendCommentHandler = useCallback((text: string) => {
    dispatch(sendBookComment(text));
  }, [dispatch]);

  useEffect(() => {
    if (__PROJECT_TYPE__ !== "storybook") {
      dispatch(fetchCommentsByBookId({ bookId: Number(id) }));
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
        {/* <Button onClick={onBackListHandler}>{t("назад к списку")}</Button> */}

        <BookDetails bookId={Number(id)} />

        <Text textSize={TextSize.L} title={t("комментарии")} />

        <SendCommentForm onSendCommentHandler={onSendCommentHandler} />

        <CommentList isLoading={isLoading} comments={comments} />
        <br />
        <br />
      </Page>
    </AsyncModule>
  );
};

export default memo(BookDetailsPage);
