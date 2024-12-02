import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { getProfileIsReadOnly, profileActions, updateProfile } from "entities/Profile";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  const { t } = useTranslation("profile");

  const isReadOnly = useSelector(getProfileIsReadOnly);

  const dispatch = useAppDispatch();

  const onEditClickHandler = useCallback(() => {
    dispatch(profileActions.setIsReadOnly(false));
  }, [dispatch]);

  const onCancelClickHandler = useCallback(() => {
    dispatch(profileActions.cancelProfile()); // profileActions.setIsReadOnly(true)
  }, [dispatch]);

  const onSaveClickHandler = useCallback(() => {
    dispatch(updateProfile({ profileId: 1 }));// profileActions.setIsReadOnly(true)
  }, [dispatch]);

  if (isReadOnly) {
    return (
      <div style={{ display: "flex",
        width: 300,
        justifyContent: "right",
        marginBottom: 100,
        marginRight: "auto",
        marginLeft: "auto" }}
      >
        <Button onClick={onEditClickHandler} theme={ButtonTheme.GREEN}>{t("Редактировать")}</Button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex",
      width: 300,
      justifyContent: "right",
      marginBottom: 100,
      marginRight: "auto",
      marginLeft: "auto" }}
    >
      <Button onClick={onSaveClickHandler} theme={ButtonTheme.GREEN}>{t("Сохранить")}</Button>
      <Button onClick={onCancelClickHandler} theme={ButtonTheme.RED}>{t("Отмена")}</Button>
    </div>
  );
};
