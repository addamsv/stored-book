import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { RoutePath } from "resources/router/routeConfig/routeConfig";
import { useNavigate } from "react-router-dom";
import { Button, ButtonTheme } from "shared/Button/Button";
import { useSelector } from "react-redux";
import { getBookDetailsData } from "entities/Book";
import { getBookDetailsEditAbility } from "pages/BookDetailsPage/model/selectors/bookDetailsEditAbility";
import { HFlex } from "shared/Flex/HFlex";
import { IconSVG } from "shared/IconSVG/IconSVG";
import BackSVG from "resources/assets/icons/back.svg";
import cls from "./BookDetailsHeader.module.scss";

interface IBookDetailsHeaderProps {
  className?: string;
}

export const BookDetailsHeader = memo(({ className }: IBookDetailsHeaderProps) => {
  const { t } = useTranslation();
  const nav = useNavigate();

  const isEditable = useSelector(getBookDetailsEditAbility);
  const book = useSelector(getBookDetailsData);

  const onBackListHandler = useCallback(() => {
    nav(RoutePath.books);
  }, [nav]);

  const onBookDellHandler = useCallback(() => {
    nav(`${RoutePath.book_details}${book?.id}/edit`);
  }, [book?.id, nav]);

  const onBookEditHandler = useCallback(() => {
    nav(`${RoutePath.book_details}${book?.id}/edit`);
  }, [book?.id, nav]);

  return (
    <HFlex className={classes(cls.BookDetailsHeader, {}, [className])}>

      {/* Holly War Component!!! Should I leave it here???
        <div className={cls.backToListWrap} onClick={onBackListHandler}>
          <IconSVG className={cls.backToList} Svg={BackSVG} />
        </div>
      */}

      {isEditable && (
        <HFlex gap="16" justify="end" className={cls.editBar}>
          <Button key="1" onClick={onBookEditHandler}>{`${t("редактировать")}`}</Button>
          <Button key="2" theme={ButtonTheme.RED} onClick={onBookDellHandler}>{`${t("удалить")}`}</Button>
        </HFlex>
      )}
    </HFlex>
  );
});
