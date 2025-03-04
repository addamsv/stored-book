import { capitalizeFirstLetter } from "../../capitalizeFirstLetter";

export const getUIComponent = (name: string) => {
  const capName = capitalizeFirstLetter(name);

  return `import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import cls from "./${name}.module.scss";

interface IProps {
  className?: string;
}

export const ${name} = memo(({ className }: IProps) => {
  const { t } = useTranslation();

  return (
    <div className={classes(cls.${name}, {}, [className])}>
      <h1>{t("${name}")}</h1>
    </div>
  );
});
`;
};
