import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Text } from "shared/ui/Text/Text";
import { TextAlign } from "shared/ui/Text";
import { IBlockOfBookText } from "../../model/types";
import cls from "./BlockOfBookText.module.scss";

interface IBlockOfBookTextProps {
  className?: string;
  block: IBlockOfBookText
}

const BlockOfBookText = ({ className, block }: IBlockOfBookTextProps) => {
  const { t } = useTranslation();

  return (
    <div className={classes(cls.BlockOfBookText, {}, [className])}>
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

export default memo(BlockOfBookText);
