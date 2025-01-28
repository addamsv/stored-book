import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { IBlockOfBookImage } from "entities/Book/model/types";
import { Text } from "shared/Text/Text";
import cls from "./BlockOfBookImage.module.scss";

interface IBlockOfBookImageProps {
  className?: string;
  block: IBlockOfBookImage;
}

const BlockOfBookImage = ({ className, block }: IBlockOfBookImageProps) => {
  const { t } = useTranslation();

  return (
    <div className={classes(cls.BlockOfBookImage, {}, [className])}>
      <img src={block.src || "image"} alt={block.title} className={cls.image} />
      {block.title && <Text text={block.title} />}
    </div>
  );
};

export default memo(BlockOfBookImage);
