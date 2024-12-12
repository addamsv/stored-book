import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { AsyncModule, ReducerListT } from "shared/lib/AsyncModule/AsyncModule";
import { memo, useCallback, useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { Text, TextAlign, TextSize } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { ImageJpg } from "shared/ui/ImageJpg/ImageJpg";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import EyeIon from "shared/assets/icons/eye.svg";
import CalendarIon from "shared/assets/icons/calendar.svg";
import { IconSVG } from "shared/ui/IconSVG/IconSVG";
import { EBlockOfArticleType, TArticleBlock } from "../../model/types";
import { getArticleDetailsData,
  getArticleDetailsError, getArticleDetailsIsLoading
} from "../../model/selectors";
import { fetchArticleById } from "../../model/services/fetchById/fetchArticleById";
import { articleDetailsReducer } from "../../model/slices/articleDetailsSlice";
import cls from "./ArticleDetails.module.scss";
import BlockOfArticleImage from "../BlockOfArticleImage/BlockOfArticleImage";
import BlockOfArticleCode from "../BlockOfArticleCode/BlockOfArticleCode";
import BlockOfArticleText from "../BlockOfArticleText/BlockOfArticleText";

interface IArticleDetailsProps {
  className?: string;
  articleId: number;
}

const reducers: ReducerListT = {
  articleDetails: articleDetailsReducer
};

export const ArticleDetails = memo(({ className, articleId }: IArticleDetailsProps) => {
  const { t } = useTranslation();

  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);
  const data = useSelector(getArticleDetailsData);

  const blocks = useCallback((block: TArticleBlock) => {
    switch (block.type) {
      case EBlockOfArticleType.IMAGE:
        return <BlockOfArticleImage key={block.id} className={cls.block} block={block} />;
      case EBlockOfArticleType.CODE:
        return <BlockOfArticleCode key={block.id} className={cls.block} block={block} />;
      case EBlockOfArticleType.TEXT:
        return <BlockOfArticleText key={block.id} className={cls.block} block={block} />;
      default:
        return null;
    }
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (__PROJECT_TYPE__ !== "storybook") {
      dispatch(fetchArticleById({ articleId }));
    }
  }, [articleId, dispatch]);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.bookImage} width={200} height={160} />
        <div style={{ display: "inline-block", marginLeft: 20 }}>
          <Skeleton className={cls.imageDescriptionSkeleton} width={200} height={60} />
          <Skeleton className={cls.buttonSkeleton} width={50} height={20} />
        </div>
        <div style={{ display: "inline-block", marginTop: 30 }}>
          <Skeleton width={300} height={170} />
        </div>
      </>
    );
  } else if (error) {
    content = <Text title={t("ошибка")} />;
  } else {
    content = (
      <>
        <div className={cls.topWrapper}>
          <ImageJpg className={cls.bookImage} size={200} alt={data?.title} src={data?.img} />
          <div style={{ display: "inline-block", marginLeft: 20 }}>
            <Text
              className={cls.imageDescriptionSkeleton}
              textAlign={TextAlign.LEFT}
              title={data?.title}
              text={data?.subTitle}
            />
            <div className={cls.info}>
              <span style={{ display: "flex", width: 40, justifyContent: "space-around" }}>
                <IconSVG Svg={EyeIon} />
                <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text={`${String(data?.views)}`} />
              </span>
              <span style={{ display: "flex", width: 80, justifyContent: "space-around", marginLeft: 11 }}>
                <IconSVG Svg={CalendarIon} />
                <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text={`${String(data?.createdAt)}`} />
              </span>
            </div>
            <Button className={cls.buttonSkeleton} theme={ButtonTheme.GREEN}>{t("скачать")}</Button>
          </div>
        </div>
        {data?.blocks.map(blocks)}
      </>
    );
  }

  return (
    <AsyncModule reducers={reducers} isRemoveAfterUnmount>
      <div className={classes(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </AsyncModule>
  );
});

// export default memo(ArticleDetails);
