import { classes } from "resources/lib/classNames/classes";
import { memo, ReactNode } from "react";
import cls from "./Tabs.module.scss";

export interface ITabItem {
  value: string;
  content: ReactNode;
}

interface ITabsProps {
  className?: string;
  tabs: ITabItem[];
  activeValue: string;
  onClickHandler: (tab: string) => void;
}

export const Tabs = memo(({
  className,
  tabs,
  activeValue,
  onClickHandler }: ITabsProps) => {
  const onTabClick = (tab: ITabItem) => {
    return () => {
      onClickHandler(tab.value);
    };
  };

  return (
    <div className={classes(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <div
          key={tab.value}
          onClick={onTabClick(tab)}
          className={classes(cls.tabItem, { [cls.active]: tab.value === activeValue }, [className])}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
});
