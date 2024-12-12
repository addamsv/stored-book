import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Text, TextAlign } from "shared/ui/Text/Text";
import { IBlockOfArticleText } from "../../model/types";
import cls from "./BlockOfArticleText.module.scss";

interface IBlockOfArticleTextProps {
  className?: string;
  block: IBlockOfArticleText
}

const BlockOfArticleText = ({ className, block }: IBlockOfArticleTextProps) => {
  const { t } = useTranslation();

  return (
    <div className={classes(cls.BlockOfArticleText, {}, [className])}>
      {block.title && (
        <Text title={block.title} className={cls.title} />
      )}
      {block.paragraphs.map((paragraph) => (
        <Text
          key={paragraph}
          text={paragraph}
          textAlign={TextAlign.LEFT}
          className={cls.paragraph}
        />
      ))}
    </div>
  );
};

export default memo(BlockOfArticleText);
