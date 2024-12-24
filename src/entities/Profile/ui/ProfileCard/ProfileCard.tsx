import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";

import { Text } from "shared/ui/Text/Text";
import { TextAlign, TextTheme } from "shared/ui/Text";
import { Input } from "shared/ui/Input/Input";
import { IProfile } from "entities/Profile/model/type/IProfile";
import { Loader } from "shared/ui/Loader/Loader";

import { ImageJpg } from "shared/ui/ImageJpg/ImageJpg";
import { Currency, ECurrency } from "entities/Currency/";
import { Country, ECountry } from "entities/Country";
import cls from "./ProfileCard.module.scss";

interface ProfileCardProps {
  className?: string;
  profileCardData?: IProfile;
  error?: string;
  isLoading?: boolean;
  isReadOnly?: boolean;
  onChangeFirstname?: (value: string) => void;
  onChangeLastname?: (value: string) => void;
  onChangeAge?: (value: string) => void;
  onChangeCountry?: (value: ECountry) => void;
  onChangeCurrency?: (value: ECurrency) => void;
  onChangeCity?: (value: string) => void;
  onChangeImage?: (value: string) => void;
}

export const ProfileCard = ({
  className, profileCardData, isLoading, error, isReadOnly, onChangeLastname,
  onChangeFirstname, onChangeAge, onChangeCountry, onChangeCurrency, onChangeCity, onChangeImage
}: ProfileCardProps) => {
  const { t } = useTranslation("profile");

  if (isLoading) {
    return (
      <div className={classes(cls.ProfileCard, {}, [className])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes(cls.ProfileCard, {}, [className])}>
        <Text title={t("Ошибка")} text={error} theme={TextTheme.ERROR} textAlign={TextAlign.LEFT} />
      </div>
    );
  }

  return (
    <div className={classes(cls.ProfileCard, {}, [className])}>
      <div className={cls.data}>

        {profileCardData?.image && <ImageJpg src={profileCardData?.image} size={150} />}

        <Input
          value={profileCardData?.image}
          placeholder={t("Имага")}
          className={cls.input}
          readonly={isReadOnly}
          onChange={onChangeImage}
        />

        <Input
          value={profileCardData?.firstname}
          placeholder={t("Имя")}
          className={cls.input}
          readonly={isReadOnly}
          onChange={onChangeFirstname}
        />
        <Input
          value={profileCardData?.lastname}
          placeholder={t("Фамилия")}
          className={cls.input}
          readonly={isReadOnly}
          onChange={onChangeLastname}
        />
        <Input
          value={String(profileCardData?.age || "")}
          placeholder={t("Лет")}
          className={cls.input}
          readonly={isReadOnly}
          onChange={onChangeAge}
        />
        <Country
          defaultValue={profileCardData?.country}
          className={cls.input}
          isReadOnly={isReadOnly}
          onChange={onChangeCountry}
        />
        <Input
          value={profileCardData?.city}
          placeholder={t("Город")}
          className={cls.input}
          readonly={isReadOnly}
          onChange={onChangeCity}
        />
        <Input
          value={profileCardData?.address}
          placeholder={t("Адрес")}
          className={cls.input}
          readonly={isReadOnly}
          onChange={onChangeLastname}
        />
        <Currency
          defaultValue={profileCardData?.currency}
          className={cls.input}
          isReadOnly={isReadOnly}
          onChange={onChangeCurrency}
        />
      </div>
    </div>
  );
};
