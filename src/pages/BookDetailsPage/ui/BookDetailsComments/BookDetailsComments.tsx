import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import { Text, TextSize } from "shared/Text";
import { CommentList } from "entities/Comment";
import { SendCommentForm } from "features/SendCommentForm";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import { useParams } from "react-router-dom";
import cls from "./BookDetailsComments.module.scss";
import { getBooksComments } from "../../model/slices/bookDetailsCommentsSlice";
import { getBooksCommentsError, getBooksCommentsIsLoading } from "../../model/selectors";
import { fetchCommentsByBookId, sendBookComment } from "../../model/services";

interface IBookDetailsCommentsProps {
  className?: string;
  bookId: number;
}

export const BookDetailsComments = memo(({ className, bookId }: IBookDetailsCommentsProps) => {
  const { t } = useTranslation("book");

  const dispatch = useAppDispatch();

  const user = useSelector(getUserAuthData);
  const comments = useSelector(getBooksComments.selectAll);
  const isLoading = useSelector(getBooksCommentsIsLoading);
  const error = useSelector(getBooksCommentsError);

  const onSendCommentHandler = useCallback((text: string) => {
    dispatch(sendBookComment(text));
  }, [dispatch]);

  useEffect(() => {
    if (__PROJECT_TYPE__ !== "storybook") {
      dispatch(fetchCommentsByBookId({ bookId }));
    }
  }, [dispatch, bookId]);

  if (error) {
    return (
      <div className={classes(cls.BookDetailsComments, {}, [className])}>
        <Text title={t("ошибка")} text={error} />
      </div>
    );
  }

  return (
    <div className={classes(cls.BookDetailsComments, {}, [className])}>
      <Text className={cls.mgnTop} textSize={TextSize.L} title={t("комментарии")} />

      {user && <SendCommentForm onSendCommentHandler={onSendCommentHandler} />}

      <CommentList isLoading={isLoading} comments={comments} />
    </div>
  );
});
