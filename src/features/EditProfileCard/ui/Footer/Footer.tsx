import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/Button/Button";

import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { getUserAuthData } from "entities/User";
import { HFlex } from "shared/Flex/HFlex";

import { getProfileIsReadOnly } from "../../model/selector/getProfileIsReadOnly/getProfileIsReadOnly";
import { getProfile } from "../../model/selector/getProfile/getProfile";
import { profileActions } from "../../model/slice/profileSlice";
import { updateProfile } from "../../model/service/update/updateProfile";
import cls from "./Footer.module.scss";

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  const { t } = useTranslation("profile");

  const isReadOnly = useSelector(getProfileIsReadOnly);
  const credentials = useSelector(getUserAuthData);
  const profile = useSelector(getProfile);

  const isEditable = credentials?.user.id === profile?.owner;
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
      <HFlex max justify="center">
        <HFlex max justify="end" className={cls.FooterWrapper}>
          {isEditable && (
          <Button onClick={onEditClickHandler} theme={ButtonTheme.GREEN}>{t("Редактировать")}</Button>
          )}
        </HFlex>
      </HFlex>
    );
  }

  return (
    <HFlex max justify="center">
      <HFlex max justify="end" gap="8" className={cls.FooterWrapper}>
        {isEditable && (
        <>
          <Button onClick={onSaveClickHandler} theme={ButtonTheme.GREEN}>{t("Сохранить")}</Button>
          <Button onClick={onCancelClickHandler} theme={ButtonTheme.RED}>{t("Отмена")}</Button>
        </>
        )}
      </HFlex>
    </HFlex>
  );
};
