import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { RoutePath } from "resources/router/routeConfig/routeConfig";
import { useNavigate } from "react-router-dom";
import { Button } from "shared/Button/Button";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import { getBookDetailsData } from "entities/Book";
import { getBookDetailsEditAbility } from "pages/BookDetailsPage/model/selectors/bookDetailsEditAbility";
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

  const onBookEditHandler = useCallback(() => {
    nav(`${RoutePath.book_details}${book?.id}/edit`);
  }, [book?.id, nav]);

  return (
    <div className={classes(cls.BookDetailsHeader, {}, [className])}>
      <Button onClick={onBackListHandler}>{`${t("назад")}`}</Button>
      {isEditable && <Button onClick={onBookEditHandler}>{`${t("редактировать")}`}</Button>}
    </div>
  );
});
