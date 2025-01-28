import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { IBlockOfBookCode } from "entities/Book/model/types";
import { Code } from "shared/Code/Code";
import cls from "./BlockOfBookCode.module.scss";

interface IBlockOfBookCodeProps {
  className?: string;
  block: IBlockOfBookCode;
}

const BlockOfBookCode = memo(({ className, block }: IBlockOfBookCodeProps) => {
  const { t } = useTranslation();

  return (
    <div className={classes(cls.BlockOfBookCode, {}, [className])}>
      <Code text={block.code} />
    </div>
  );
});

export default memo(BlockOfBookCode);
