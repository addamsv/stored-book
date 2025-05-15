import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { HTMLAttributeAnchorTarget, memo, useCallback, useMemo } from "react";
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
import { EBookListView, EBookOfHashTagType, IBook } from "../../model/types";
import cls from "./Item.module.scss";

interface IItemProps {
  className?: string;
  book: IBook;
  listView: EBookListView;
  target?: HTMLAttributeAnchorTarget;

  onGenreChange?: (genre: EBookOfHashTagType) => void;
  onSearchQueryChange?: (query: string) => void;
}

export const Item = memo(({ className, book, listView, target, onGenreChange, onSearchQueryChange }: IItemProps) => {
  const { t } = useTranslation();

  // const nav = useNavigate();

  // const onLinkClickHandler = useCallback(() => {
  //   nav(RoutePath.book_details + book.id);
  // }, [book.id, nav]);

  // const [isHover, bindHover] = useHover();
  // console.log(isHover);
  // <div {...bindHover}>hover</div>

  const onGenreClick = useCallback((genre: EBookOfHashTagType) => {
    return () => {
      onGenreChange?.(genre);
    };
  }, [onGenreChange]);

  const onAuthorClick = useCallback((query: string) => {
    return () => {
      onSearchQueryChange?.(query);
    };
  }, [onSearchQueryChange]);

  const Genres = useMemo(() => {
    return book.Genres?.map((genre) => (
      <div key={genre} onClick={onGenreClick(genre)} className={cls.hashTagType}>
        {genre}
      </div>
    ));
  }, [book.Genres, onGenreClick]);

  const Authors = useMemo(() => {
    return book.Author?.map((author) => (
      <div key={author} onClick={onAuthorClick(author)} className={cls.hashTagType}>
        {author}
      </div>
    ));
  }, [book.Author, onAuthorClick]);

  const baseURL = `${__REST_API__BASE_URL__}`;

  // COMPACT
  if (listView === EBookListView.COMPACT) {
    return (
      <VFlex className={classes("", {}, [className, cls[listView]])}>
        <AppLink
          title={book.Title}
          target={target}
          to={`${RoutePath.book_details}${book.id}`}
        >
          <div className={cls.imageWrapper}>
            <img className={cls.img} src={`${book.img}`} alt="*" />
            <p className={cls.createdAt}>{book.PublicationDate}</p>
          </div>
          {/* ${baseURL} */}
        </AppLink>

        <HFlex max className={cls.info}>

          {Genres}

          {/* <Text
                className={cls.hashTagType}
                textAlign={TextAlign.LEFT}
                textSize={TextSize.XS}
                // text={book.hashTagType.join(", ")}
                text={book?.Genres?.join(", ")}
              /> */}

          <IconSVG className={cls.views} w={12} h={12} Svg={EyeIon} />
          <Text textSize={TextSize.XS} text={String(book.views)} />
        </HFlex>

        <Text className={cls.title} textSize={TextSize.S} textAlign={TextAlign.LEFT} text={String(book.Title)} />
      </VFlex>
    );
  }

  // const paragraph = book.blocks.find((block) => block.type === EBlockOfBookType.TEXT) as IBlockOfBookText | undefined;

  // STANDARD
  return (
    <Card className={classes(cls.card, {}, [className, cls[listView]])}>

      <AppLink
        title={book.Title}
        className={cls.bookImage}
        target={target}
        to={`${RoutePath.book_details}${book.id}`}
      >
        <ImageJpg className={cls.bookImage} alt="*" src={`${book.img}`} />
        {/* ${baseURL} */}
      </AppLink>

      <VFlex justify="center" className={cls.contentWrapper}>
        <Text
          key="TitleSTD"
          textAlign={TextAlign.LEFT}
          title={book.Title}
        />

        {Authors}

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

        {Genres}
        {/* <Text
            className={cls.hashTagType}
            textSize={TextSize.S}
            textAlign={TextAlign.LEFT}
            text={book.Genres?.join(", ")}
          /> */}

        {/* {paragraph && (
        <Text textAlign={TextAlign.LEFT}  className={cls.paragraph} text={paragraph.paragraphs[0]} />
        )} */}
        <VFlex gap="4" className={cls.extraInfo}>
          <Text
            key="Format"
            textSize={TextSize.S}
            textAlign={TextAlign.LEFT}
            text={book.Format}
          />
          <Text
            key="Language"
            textSize={TextSize.S}
            textAlign={TextAlign.LEFT}
            text={book.Language}
          />
          <Text
            key="Length"
            textSize={TextSize.S}
            textAlign={TextAlign.LEFT}
            text={book.Length}
          />
          <Text
            key="Narrated"
            textSize={TextSize.S}
            textAlign={TextAlign.LEFT}
            text={book.Narrated?.join(", ")}
          />
          <Text
            key="Publisher"
            textSize={TextSize.S}
            textAlign={TextAlign.LEFT}
            text={book.Publisher}
          />
        </VFlex>

        <HFlex gap="8" className={cls.linkWrapper}>
          <AppLink
            title={`${t("подробнее")} ${book.Title}`}
            target={target}
            to={`${RoutePath.book_details}${book.id}`}
          >
            <Button
            // onClick={onLinkClickHandler}
              className={cls.buttonSkeleton}
              theme={ButtonTheme.GREEN}
            >
              {t("подробнее")}
            </Button>
          </AppLink>

          <AppLink
            title={`${t("скачать")} ${book.Title}`}
            target="_blank"
            to={`${book?.link}`}
          >
            <Button
              key="downloadBtn"
              className={cls.downloadBtnWrap}
              theme={ButtonTheme.GREEN}
            >
              <IconSVG className={cls.downloadBtn} Svg={DownloadIon} />
            </Button>
          </AppLink>
        </HFlex>
      </VFlex>
    </Card>
  );
});
