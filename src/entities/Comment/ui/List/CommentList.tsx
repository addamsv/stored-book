import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Text } from "shared/ui/Text/Text";
import { IComment } from "../../model/types";
import cls from "./CommentList.module.scss";
import { CommentItem } from "../Item/CommentItem";

interface ICommentListProps {
  className?: string;
  isLoading?: boolean
  comments?: IComment[];
}

export const CommentList = memo(({ className, comments, isLoading = false }: ICommentListProps) => {
  const { t } = useTranslation();

  return (
    <div className={classes(cls.CommentList, {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentItem key={comment.id} className={cls.commentItem} isLoading={isLoading} comment={comment} />
        ))
        : <Text title={t("нет комментариев")} /> }
    </div>
  );
});
