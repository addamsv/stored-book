import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { Text, TextTheme } from "shared/Text";
import { ECountry } from "entities/Country";
import { ECurrency } from "entities/Currency";
import { AsyncModule, ReducerListT } from "shared/AsyncModule/AsyncModule";
import { ProfileCard } from "entities/Profile";
import { profileActions, profileReducer } from "../../model/slice/profileSlice";
import { getProfileIsLoading } from "../../model/selector/getProfileIsLoading/getProfileIsLoading";
import { getProfileIsReadOnly } from "../../model/selector/getProfileIsReadOnly/getProfileIsReadOnly";
import { getProfileErr } from "../../model/selector/getProfileErr/getProfileErr";
import { getProfileValidateErr } from "../../model/selector/getProfileValidateErr/getProfileValidateErr";
import { EnumValidateProfileErrs } from "../../model/types/IEditProfileCardStateSchema";
import { fetchProfile } from "../../model/service/fetch/fetchProfile";
import { getProfileEdited } from "../../model/selector/getProfileEdited/getProfileEdited";
import cls from "./EditProfileCard.module.scss";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

interface IProps {
  className?: string;
  id: string;
}

const reducers: ReducerListT = {
  profile: profileReducer
};

export const EditProfileCard = memo(({ className, id }: IProps) => {
  const { t } = useTranslation("profile");

  const profileCardData = useSelector(getProfileEdited);

  const isLoading = useSelector(getProfileIsLoading);

  const isReadOnly = useSelector(getProfileIsReadOnly);

  const error = useSelector(getProfileErr);

  const validateErr = useSelector(getProfileValidateErr);

  const dispatch = useAppDispatch();

  const errTranslateMapping = {
    [EnumValidateProfileErrs.CLIENT_ERROR]: t("Ошибка на стороне пользователя"),
    [EnumValidateProfileErrs.SERVER_ERROR]: t("Ошибка на стороне сервера"),
    [EnumValidateProfileErrs.NO_DATA]: t("Нет данных"),
    [EnumValidateProfileErrs.INCORRECT_USER_DATA]: t("Имя и фамилия"),
    [EnumValidateProfileErrs.INCORRECT_AGE]: t("Возраст"),
    [EnumValidateProfileErrs.INCORRECT_COUNTRY]: t("Название страны"),
    [EnumValidateProfileErrs.INCORRECT_CURRENCY]: t("Название валюты"),
  };

  const onChangeFirstname = useCallback((firstname?: string) => {
    dispatch(profileActions.updateProfile({ firstname }));
  }, [dispatch]);

  const onChangeLastname = useCallback((lastname?: string) => {
    dispatch(profileActions.updateProfile({ lastname }));
  }, [dispatch]);

  const onChangeAge = useCallback((age?: string) => {
    dispatch(profileActions.updateProfile({ age: Number(age || 0) }));
  }, [dispatch]);

  const onChangeCountry = useCallback((country?: ECountry) => {
    dispatch(profileActions.updateProfile({ country }));
  }, [dispatch]);

  const onChangeCurrency = useCallback((currency?: ECurrency) => {
    dispatch(profileActions.updateProfile({ currency }));
  }, [dispatch]);

  const onChangeCity = useCallback((city?: string) => {
    dispatch(profileActions.updateProfile({ city }));
  }, [dispatch]);

  const onChangeImage = useCallback((image?: string) => {
    dispatch(profileActions.updateProfile({ image }));
  }, [dispatch]);

  useEffect(() => {
    if (__PROJECT_TYPE__ !== "storybook") {
      dispatch(fetchProfile({ userId: Number(id) }));
    }
  }, [dispatch, id]);

  return (
    <AsyncModule reducers={reducers}>
      <div className={classes(cls.EditProfileCard, {}, [className])}>

        <Header />

        <Footer />

        {validateErr?.length && validateErr.map((err) => (
          <Text key={err} theme={TextTheme.ERROR} title={t("Ошибка")} text={errTranslateMapping[err]} />
        ))}

        <ProfileCard
          profileCardData={profileCardData}
          error={error}
          isLoading={isLoading}
          isReadOnly={isReadOnly}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeImage={onChangeImage}
          onChangeCountry={onChangeCountry}
          onChangeCurrency={onChangeCurrency}
          onChangeCity={onChangeCity}
        />
      </div>
    </AsyncModule>

  );
});
