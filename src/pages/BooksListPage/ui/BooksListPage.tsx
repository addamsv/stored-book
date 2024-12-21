import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "resources/config/routeConfig/routeConfig";
import { Text, TextAlign, TextSize } from "shared/ui/Text/Text";
import { ImageJpg } from "shared/ui/ImageJpg/ImageJpg";
import EyeIon from "shared/assets/icons/eye.svg";
import CalendarIon from "shared/assets/icons/calendar.svg";
import { IconSVG } from "shared/ui/IconSVG/IconSVG";
import cls from "./BooksListPage.module.scss";

interface IBooksListPageProps {
  className?: string;
}

const BooksListPage = ({ className }: IBooksListPageProps) => {
  const { t } = useTranslation("book");

  return (
    <div className={classes(cls.BooksListPage, {}, [className])}>

      <h1>{t("Книги")}</h1>

      <AppLink key="1" to={`${RoutePath.book_details}1`}>
        <div className={cls.topWrapper}>
          <ImageJpg className={cls.bookImage} size={200} alt="*" src="http://localhost:3000/images/img2.png" />
          <div style={{ display: "inline-block", marginLeft: 20 }}>
            <Text
              className={cls.imageDescriptionSkeleton}
              textAlign={TextAlign.LEFT}
              title={t("Fahrenheit 451")}
              text={t("Author Author")}
            />
            <div className={cls.info}>
              <span style={{ display: "flex", width: 40, justifyContent: "space-around" }}>
                <IconSVG Svg={EyeIon} />
                <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text="11" />
              </span>
              <span style={{ display: "flex", width: 80, justifyContent: "space-around", marginLeft: 11 }}>
                <IconSVG Svg={CalendarIon} />
                <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text="11-11-11" />
              </span>
            </div>
          </div>
        </div>
      </AppLink>

      <AppLink key="2" to={`${RoutePath.book_details}2`}>
        <div className={cls.topWrapper}>
          <ImageJpg className={cls.bookImage} size={200} alt="*" src="http://localhost:3000/images/img3.jpg" />
          <div style={{ display: "inline-block", marginLeft: 20 }}>
            <Text
              className={cls.imageDescriptionSkeleton}
              textAlign={TextAlign.LEFT}
              title={t("Book Title 2")}
              text={t("Author Author")}
            />
            <div className={cls.info}>
              <span style={{ display: "flex", width: 40, justifyContent: "space-around" }}>
                <IconSVG Svg={EyeIon} />
                <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text="11" />
              </span>
              <span style={{ display: "flex", width: 80, justifyContent: "space-around", marginLeft: 11 }}>
                <IconSVG Svg={CalendarIon} />
                <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text="11-11-11" />
              </span>
            </div>
          </div>
        </div>
      </AppLink>
      <br />
      <br />
    </div>
  );
};

export default memo(BooksListPage);
