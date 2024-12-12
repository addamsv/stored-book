import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { IBlockOfArticleCode } from "entities/Article/model/types";
import { Code } from "shared/ui/Code/Code";
import cls from "./BlockOfArticleCode.module.scss";

interface IBlockOfArticleCodeProps {
  className?: string;
  block: IBlockOfArticleCode;
}

const BlockOfArticleCode = memo(({ className, block }: IBlockOfArticleCodeProps) => {
  const { t } = useTranslation();

  return (
    <div className={classes(cls.BlockOfArticleCode, {}, [className])}>
      <Code text={block.code} />
    </div>
  );
});

export default memo(BlockOfArticleCode);
