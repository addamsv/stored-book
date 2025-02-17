import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { HTMLAttributeAnchorTarget, memo } from "react";
import { ImageJpg } from "shared/ImageJpg/ImageJpg";
import { IconSVG } from "shared/IconSVG/IconSVG";
import EyeIon from "resources/assets/icons/eye.svg";
import DownloadIon from "resources/assets/icons/download.svg";
import CalendarIon from "resources/assets/icons/calendar.svg";
import { Text } from "shared/Text/Text";
import { TextAlign, TextSize } from "shared/Text";
import { Button, ButtonTheme } from "shared/Button/Button";
import { RoutePath } from "resources/router/routeConfig/routeConfig";
import { AppLink } from "shared/AppLink/AppLink";
import { Card } from "shared/Card/Card";
import { VFlex } from "shared/Flex/VFlex";
import { HFlex } from "shared/Flex/HFlex";
import { EBlockOfBookType, EBookListView, IBlockOfBookText, IBook } from "../../model/types";
import cls from "./Item.module.scss";

interface IItemProps {
  className?: string;
  book: IBook;
  listView: EBookListView;
  target?: HTMLAttributeAnchorTarget;
}

export const Item = memo(({ className, book, listView, target }: IItemProps) => {
  const { t } = useTranslation();

  // const nav = useNavigate();

  // const onLinkClickHandler = useCallback(() => {
  //   nav(RoutePath.book_details + book.id);
  // }, [book.id, nav]);

  // const [isHover, bindHover] = useHover();
  // console.log(isHover);
  // <div {...bindHover}>hover</div>

  // COMPACT
  if (listView === EBookListView.COMPACT) {
    return (
      <div className={classes(cls.Item, {}, [className, cls[listView]])}>
        <AppLink target={target} to={`${RoutePath.book_details}${book.id}`}>
          <Card
          // onClick={onLinkClickHandler}
            className={cls.card}
          >
            <div className={cls.imageWrapper}>
              <img className={cls.img} src={book.img} alt="*" />
              <p className={cls.createdAt}>{book.PublicationDate}</p>
            </div>

            <div className={cls.info}>
              <Text
                className={cls.hashTagType}
                textAlign={TextAlign.LEFT}
                textSize={TextSize.XS}
                // text={book.hashTagType.join(", ")}
                text={book?.Genres?.join(", ")}
              />

              <IconSVG className={cls.views} w={12} h={12} Svg={EyeIon} />
              <Text textSize={TextSize.XS} text={String(book.views)} />
            </div>

            <Text className={cls.title} textSize={TextSize.S} textAlign={TextAlign.LEFT} text={String(book.Title)} />
          </Card>
        </AppLink>
      </div>
    );
  }

  const paragraph = book.blocks.find((block) => block.type === EBlockOfBookType.TEXT) as IBlockOfBookText | undefined;

  // STANDARD
  return (
    <div className={cls.Item}>
      <Card className={classes(cls.card, {}, [className, cls[listView]])}>

        <AppLink target={target} to={`${RoutePath.book_details}${book.id}`}>
          <ImageJpg className={cls.bookImage} alt="*" src={book.img} />
        </AppLink>

        <VFlex gap="8" className={cls.contentWrapper}>
          <Text
            className={cls.imageDescription}
            textAlign={TextAlign.LEFT}
            title={book.Title}
            text={book?.Author?.join(", ")}
          />
          <HFlex gap="8" className={cls.info}>
            <HFlex gap="4">
              <IconSVG Svg={EyeIon} />
              <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text={String(book.views)} />
            </HFlex>
            <HFlex gap="4">
              <IconSVG Svg={CalendarIon} />
              <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text={book.PublicationDate} />
            </HFlex>
          </HFlex>

          <Text
            className={cls.hashTagType}
            textSize={TextSize.S}
            textAlign={TextAlign.LEFT}
            text={book.Genres?.join(", ")}
          />

          {paragraph && (
            <Text className={cls.paragraph} text={paragraph.paragraphs[0]} />
          )}

          <HFlex gap="8" className={cls.linkWrapper}>
            <AppLink target={target} to={`${RoutePath.book_details}${book.id}`}>
              <Button
            // onClick={onLinkClickHandler}
                className={cls.buttonSkeleton}
                theme={ButtonTheme.GREEN}
              >
                {t("подробнее")}
              </Button>
            </AppLink>

            <AppLink target="_blank" to={`${book?.link}`}>
              <Button
                className={cls.buttonSskeleton}
                theme={ButtonTheme.GREEN}
              >
                <IconSVG Svg={DownloadIon} />
              </Button>
            </AppLink>
          </HFlex>
        </VFlex>
      </Card>
    </div>
  );
});
