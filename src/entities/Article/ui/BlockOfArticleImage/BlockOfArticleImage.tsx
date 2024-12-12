import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { IBlockOfArticleImage } from "entities/Article/model/types";
import { Text } from "shared/ui/Text/Text";
import cls from "./BlockOfArticleImage.module.scss";

interface IBlockOfArticleImageProps {
  className?: string;
  block: IBlockOfArticleImage;
}

const BlockOfArticleImage = ({ className, block }: IBlockOfArticleImageProps) => {
  const { t } = useTranslation();

  return (
    <div className={classes(cls.BlockOfArticleImage, {}, [className])}>
      <img src={block.src || "image"} alt={block.title} className={cls.image} />
      {block.title && <Text text={block.title} />}
    </div>
  );
};

export default memo(BlockOfArticleImage);
