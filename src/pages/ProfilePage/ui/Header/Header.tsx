import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { TextAlign, TextTheme } from "shared/ui/Text";
import { ImageJpg } from "shared/ui/ImageJpg/ImageJpg";
// import src from "shared/assets/images/img2.png";
import cls from "./Header.module.scss";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const { t } = useTranslation("profile");
  // https://priroda.club/uploads/posts/2023-08/1691159252_priroda-club-p-lesnoi-veter-vkontakte-57.jpg
  return (
    <Text title={t("Карточка профиля")} />
  );
};
