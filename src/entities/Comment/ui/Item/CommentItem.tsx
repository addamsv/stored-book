import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { ImageJpg } from "shared/ui/ImageJpg/ImageJpg";
import { Text, TextAlign, TextSize } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import cls from "./CommentItem.module.scss";
import { IComment } from "../../model/types";

interface ICommentItemProps {
  className?: string;
  comment: IComment;
  isLoading?: boolean;
}

export const CommentItem = memo(({ className, comment, isLoading = false }: ICommentItemProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classes(cls.CommentItem, {}, [className])}>
        <div className={cls.commentHeader}>
          <Skeleton height={20} width={20} />
          <Skeleton height={20} width={200} />
        </div>

        <Skeleton className={cls.content} width="100%" />
      </div>
    );
  }

  return (
    <div className={classes(cls.CommentItem, {}, [className])}>
      <div className={cls.commentHeader}>
        {comment.owner.image ? <ImageJpg className={cls.image} size={20} alt="*" src={comment.owner.image} /> : null}
        <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text={comment.owner.name} />
      </div>

      <Text className={cls.content} textAlign={TextAlign.LEFT} text={comment.text} />
    </div>
  );
});
