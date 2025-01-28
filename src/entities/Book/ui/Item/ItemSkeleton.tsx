import { EBookListView } from "entities/Book/model/types";
import { classes } from "resources/lib/classNames/classes";
import { memo } from "react";
import { Card } from "shared/Card/Card";
import { Skeleton } from "shared/Skeleton/Skeleton";
import cls from "./Item.module.scss";

interface IItemProps {
  className?: string;
  listView: EBookListView;
}

export const ItemSkeleton = memo(({ className, listView }: IItemProps) => {
  // COMPACT
  if (listView === EBookListView.COMPACT) {
    return (
      <div className={classes(cls.Item, {}, [className, cls[listView]])}>
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <Skeleton height={190} width={130} />
          </div>

          <div className={cls.info}>
            <Skeleton height={10} width={100} />
          </div>

          <Skeleton className={cls.title} width={150} height={16} />
        </Card>
      </div>
    );
  }

  // STANDARD
  return (
    <div className={cls.Item}>
      <Card className={classes(cls.card, {}, [className, cls[listView]])}>
        <Skeleton
          height={260}
          width={200}
          className={cls.bookImage}
        />

        <div style={{ display: "inline-block", marginLeft: 20 }}>
          <Skeleton
            className={cls.imageDescription}
            height={22}
            width={200}
          />
          <br />
          <Skeleton
            className={cls.hashTagType}
            height={100}
            width={250}
          />

          <br />
          <Skeleton
            width={100}
            className={cls.buttonSkeleton}
          />
        </div>
      </Card>
    </div>
  );
});
