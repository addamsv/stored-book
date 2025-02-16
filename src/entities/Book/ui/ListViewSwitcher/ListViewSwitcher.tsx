import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import ListStdSVG from "resources/assets/icons/listStandard.svg";
import ListComSVG from "resources/assets/icons/listCompact.svg";
import { Button, ButtonTheme } from "shared/Button/Button";
import { IconSVG } from "shared/IconSVG/IconSVG";
import { HFlex } from "shared/Flex/HFlex";
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
    <HFlex className={classes(cls.Switcher, {}, [className])}>
      {listViewSwitchTypesArr.map((view) => (
        <Button
          key={view.listView}
          className={cls.button}
          theme={ButtonTheme.CLEAR}
          onClick={onClickHandler(view.listView)}
        >
          <IconSVG className={classes("", { [cls.selected]: view.listView === listView })} Svg={view.icon} />
        </Button>
      ))}
    </HFlex>
  );
});
