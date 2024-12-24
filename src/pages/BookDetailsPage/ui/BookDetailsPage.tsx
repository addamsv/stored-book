import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import { BookDetails } from "entities/Book";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "shared/ui/Text/Text";
import { TextSize } from "shared/ui/Text";
import { CommentList } from "entities/Comment";
import { AsyncModule, ReducerListT } from "shared/lib/AsyncModule/AsyncModule";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { SendCommentForm } from "features/SendCommentForm";
import { Button } from "shared/ui/Button/Button";
import { RoutePath } from "resources/config/routeConfig/routeConfig";
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
      <div className={classes(cls.BookDetailsPage, {}, [className])}>
        {t("ничего не найдено")}
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes(cls.BookDetailsPage, {}, [className])}>
        {t("ошибка")}
      </div>
    );
  }

  return (
    <AsyncModule reducers={reducerList} isRemoveAfterUnmount>
      <div className={classes(cls.BookDetailsPage, {}, [className])}>
        {/* <Button onClick={onBackListHandler}>{t("назад к списку")}</Button> */}

        <BookDetails bookId={Number(id)} />

        <Text textSize={TextSize.L} title={t("комментарии")} />

        <SendCommentForm onSendCommentHandler={onSendCommentHandler} />

        <CommentList isLoading={isLoading} comments={comments} />
        <br />
        <br />
      </div>
    </AsyncModule>
  );
};

export default memo(BookDetailsPage);
