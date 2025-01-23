import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Text } from "shared/Text";
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

  const Skeletons = (listView: EBookListView) => new Array(listView === EBookListView.COMPACT ? 12 : 5)
    .fill(0)
    .map((_, ind) => (
      // eslint-disable-next-line react/no-array-index-key
      <ItemSkeleton key={ind} listView={listView} />
    ));

  const render = (book: IBook) => (
    <Item key={book.id} book={book} listView={listView} />
  );

  if (!isLoading && !bookArr.length) {
    return (
      <div className={classes(cls.List, {}, [className, cls[listView]])}>
        <Text title={t("ничего не найдено")} />
      </div>
    );
  }

  return (
    <div className={classes(cls.List, {}, [className, cls[listView]])}>
      {bookArr.length ? bookArr.map(render) : null}
      {isLoading && Skeletons(listView)}
    </div>
  );
});
