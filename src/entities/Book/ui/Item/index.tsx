import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { ImageJpg } from "shared/ui/ImageJpg/ImageJpg";
import { IconSVG } from "shared/ui/IconSVG/IconSVG";
import EyeIon from "shared/assets/icons/eye.svg";
import CalendarIon from "shared/assets/icons/calendar.svg";
import { Text } from "shared/ui/Text/Text";
import { TextAlign, TextSize } from "shared/ui/Text";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { RoutePath } from "resources/config/routeConfig/routeConfig";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Card } from "shared/ui/Card/Card";
import { useNavigate } from "react-router-dom";
import { EBlockOfBookType, EBookListView, IBlockOfBookText, IBook } from "../../model/types";
import cls from "./Item.module.scss";
import BlockOfBookText from "../BlockOfBookText/BlockOfBookText";

interface IItemProps {
  className?: string;
  book: IBook;
  listView: EBookListView;
}

export const Item = memo(({ className, book, listView }: IItemProps) => {
  const { t } = useTranslation();

  const nav = useNavigate();
  const onLinkClickHandler = useCallback(() => {
    nav(RoutePath.book_details + book.id);
  }, [book.id, nav]);

  // const [isHover, bindHover] = useHover();
  // console.log(isHover);
  // <div {...bindHover}>hover</div>

  // COMPACT
  if (listView === EBookListView.COMPACT) {
    return (
      <div className={classes(cls.Item, {}, [className, cls[listView]])}>
        {/* <AppLink to={`${RoutePath.book_details}${book.id}`}> */}
        <Card
          onClick={onLinkClickHandler}
          className={cls.card}
        >
          <div className={cls.imageWrapper}>
            <img src={book.img} alt="*" />
            <p className={cls.createdAt}>{book.createdAt}</p>
          </div>

          <div className={cls.info}>
            <Text
              className={cls.hashTagType}
              textAlign={TextAlign.LEFT}
              textSize={TextSize.XS}
              text={book.hashTagType.join(", ")}
            />

            <IconSVG className={cls.views} w={12} h={12} Svg={EyeIon} />
            <Text textSize={TextSize.XS} text={String(book.views)} />
          </div>

          <Text className={cls.title} textSize={TextSize.S} textAlign={TextAlign.LEFT} text={String(book.title)} />
        </Card>
        {/* </AppLink> */}
      </div>
    );
  }

  const paragraph = book.blocks.find((block) => block.type === EBlockOfBookType.TEXT) as IBlockOfBookText | undefined;
  paragraph!.title = "";
  // STANDARD
  return (
    <div className={cls.Item}>
      <Card className={classes(cls.card, {}, [className, cls[listView]])}>
        <ImageJpg className={cls.bookImage} alt="*" src={book.img} />

        <div style={{ display: "inline-block", marginLeft: 20 }}>
          <Text
            className={cls.imageDescription}
            textAlign={TextAlign.LEFT}
            title={book.title} // t("Fahrenheit 451")
            text={book.subTitle}
          />
          <div className={cls.info}>
            <span style={{ display: "flex", width: 40, justifyContent: "space-around" }}>
              <IconSVG Svg={EyeIon} />
              <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text={String(book.views)} />
            </span>
            <span style={{ display: "flex", width: 80, justifyContent: "space-around", marginLeft: 11 }}>
              <IconSVG Svg={CalendarIon} />
              <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text={book.createdAt} />
            </span>
          </div>

          <Text
            className={cls.hashTagType}
            textSize={TextSize.S}
            textAlign={TextAlign.LEFT}
            text={book.hashTagType.join(", ")}
          />

          {paragraph && (
            <BlockOfBookText className={cls.paragraph} block={paragraph} />
          )}

          <br />
          {/* <AppLink to={`${RoutePath.book_details}${book.id}`}> */}
          <Button
            onClick={onLinkClickHandler}
            className={cls.buttonSkeleton}
            theme={ButtonTheme.GREEN}
          >
            {t("подробнее")}
          </Button>
          {/* </AppLink> */}
        </div>
      </Card>
    </div>
  );
});
