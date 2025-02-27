import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { ImageJpg } from "shared/ImageJpg/ImageJpg";
import { Text } from "shared/Text/Text";
import { TextAlign, TextSize } from "shared/Text";
import { Skeleton } from "shared/Skeleton/Skeleton";
import { AppLink } from "shared/AppLink/AppLink";
import { RoutePath } from "resources/router/routeConfig/routeConfig";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import cls from "./CommentItem.module.scss";
import { IComment } from "../../model/types";

interface ICommentItemProps {
  className?: string;
  comment?: IComment;
  isLoading?: boolean;
}

export const CommentItem = memo(({ className, comment, isLoading = false }: ICommentItemProps) => {
  const { t } = useTranslation();

  const user = useSelector(getUserAuthData);

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

  if (!comment) {
    return null;
  }

  const path = user ? `${RoutePath.profile}${comment.owner.id}` : "";

  return (
    <div className={classes(cls.CommentItem, {}, [className])}>
      <AppLink to={path} className={cls.commentHeader}>
        {comment.owner.image ? <ImageJpg className={cls.image} w={20} alt="*" src={comment.owner.image} /> : null}
        <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text={comment.owner.name} />
      </AppLink>

      <Text className={cls.content} textAlign={TextAlign.LEFT} text={comment.text} />
    </div>
  );
});
