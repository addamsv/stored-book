import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { AsyncModule, ReducerListT } from "shared/lib/AsyncModule/AsyncModule";
import { memo, useCallback, useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { Text } from "shared/ui/Text/Text";
import { TextAlign, TextSize } from "shared/ui/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { ImageJpg } from "shared/ui/ImageJpg/ImageJpg";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import EyeIon from "shared/assets/icons/eye.svg";
import CalendarIon from "shared/assets/icons/calendar.svg";
import { IconSVG } from "shared/ui/IconSVG/IconSVG";
import { EBlockOfBookType, TBookBlock } from "../../model/types";
import { getBookDetailsData,
  getBookDetailsError, getBookDetailsIsLoading
} from "../../model/selectors";
import { fetchBookById } from "../../model/services/fetchById/fetchBookById";
import { bookDetailsReducer } from "../../model/slices/bookDetailsSlice";
import cls from "./BookDetails.module.scss";
import BlockOfBookImage from "../BlockOfBookImage/BlockOfBookImage";
import BlockOfBookCode from "../BlockOfBookCode/BlockOfBookCode";
import BlockOfBookText from "../BlockOfBookText/BlockOfBookText";

interface IBookDetailsProps {
  className?: string;
  bookId: number;
}

const reducers: ReducerListT = {
  bookDetails: bookDetailsReducer
};

export const BookDetails = memo(({ className, bookId }: IBookDetailsProps) => {
  const { t } = useTranslation();

  const isLoading = useSelector(getBookDetailsIsLoading);
  const error = useSelector(getBookDetailsError);
  const data = useSelector(getBookDetailsData);

  const blocks = useCallback((block: TBookBlock) => {
    switch (block.type) {
      case EBlockOfBookType.IMAGE:
        return <BlockOfBookImage key={block.id} className={cls.block} block={block} />;
      case EBlockOfBookType.CODE:
        return <BlockOfBookCode key={block.id} className={cls.block} block={block} />;
      case EBlockOfBookType.TEXT:
        return <BlockOfBookText key={block.id} className={cls.block} block={block} />;
      default:
        return null;
    }
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (__PROJECT_TYPE__ !== "storybook") {
      dispatch(fetchBookById({ bookId }));
    }
  }, [bookId, dispatch]);

  let content;

  if (isLoading) {
    content = (
      <div style={{ margin: "20px auto", maxWidth: 800, textAlign: "left" }}>
        <Skeleton className={cls.bookImage} width={200} height={300} />
        <div style={{ margin: "20px" }}>
          <Skeleton className={cls.imageDescription} width={200} height={15} />
          <Skeleton className={cls.buttonSkeleton} width={50} height={20} />
        </div>
        <Skeleton width={300} height={170} />
      </div>
    );
  } else if (error) {
    content = <Text title={t("ошибка")} />;
  } else {
    content = (
      <>
        <div className={cls.topWrapper}>
          <ImageJpg className={cls.bookImage} alt={data?.title} src={data?.img} />

          <div style={{ margin: "20px auto", maxWidth: 800, width: "90%" }}>
            <Text
              className={cls.imageDescription}
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
      <div className={classes(cls.BookDetails, {}, [className])}>
        {content}
      </div>
    </AsyncModule>
  );
});

// export default memo(BookDetails);
