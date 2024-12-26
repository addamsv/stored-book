import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { EBookListView, IBook } from "../../model/types";
import cls from "./List.module.scss";
import { Item } from "../Item/Item";
import { ItemSkeleton } from "../Item/ItemSkeleton";

interface IListProps {
  className?: string;
  bookArr: IBook[];
  isLoading?: boolean;
  listView?: EBookListView;
}

export const List = memo(({
  className,
  bookArr,
  isLoading,
  listView = EBookListView.STANDARD
}: IListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classes(cls.List, {}, [className, cls[listView]])}>
        {new Array(listView === EBookListView.COMPACT ? 12 : 5)
          .fill(0)
          .map((ell, indx) => (
            // eslint-disable-next-line react/no-array-index-key
            <ItemSkeleton key={indx} listView={listView} />
          ))}
      </div>
    );
  }

  const render = (book: IBook) => (
    <Item key={book.id} book={book} listView={listView} />
  );

  return (
    <div className={classes(cls.List, {}, [className, cls[listView]])}>
      {bookArr.length ? bookArr.map(render) : null}
    </div>
  );
});
