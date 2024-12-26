import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import ListStdSVG from "shared/assets/icons/listStandard.svg";
import ListComSVG from "shared/assets/icons/listCompact.svg";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { IconSVG } from "shared/ui/IconSVG/IconSVG";
import { EBookListView } from "../../model/types";
import cls from "./ListViewSwitcher.module.scss";

interface IListViewSwitcherProps {
  className?: string;
  listView: EBookListView;
  onViewIconClickHandler?: (view: EBookListView) => void;
}

const listViewSwitchTypesArr = [
  { listView: EBookListView.COMPACT, icon: ListComSVG },
  { listView: EBookListView.STANDARD, icon: ListStdSVG }
];

export const ListViewSwitcher = memo(({ className, listView, onViewIconClickHandler }: IListViewSwitcherProps) => {
  const { t } = useTranslation();

  const onClickHandler = (newView: EBookListView) => {
    return () => onViewIconClickHandler?.(newView);
  };

  return (
    <div className={classes(cls.Switcher, {}, [className])}>
      {listViewSwitchTypesArr.map((view) => (
        <Button theme={ButtonTheme.CLEAR} onClick={onClickHandler(view.listView)}>
          <IconSVG className={classes("", { [cls.selected]: view.listView === listView })} Svg={view.icon} />
        </Button>
      ))}
    </div>
  );
});
