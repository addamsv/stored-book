import { Menu as M } from "@headlessui/react";
import { classes } from "resources/lib/classNames/classes";
import { Fragment } from "react/jsx-runtime";
import { ReactNode } from "react";
import { AppLink } from "shared/AppLink/AppLink";
import cls from "./Menu.module.scss";

type TMenuDropdownDirection = "top" | "right" | "bottom" | "left" | "topRight"
| "topLeft" | "bottomLeft" | "bottomRight";

export interface IMenuItem {
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  content?: ReactNode;
  id: number;
}

interface IMenuProps {className?: string;
  items: IMenuItem[];
  trigger: ReactNode;
  direction?: TMenuDropdownDirection
}

export function Menu({ className, items, trigger, direction = "bottom" }: IMenuProps) {
  return (
    <M as="div" className={classes(cls.Menu, {}, [className])}>
      <M.Button className={cls.menuButton}>{trigger}</M.Button>
      <M.Items className={classes(cls.menuItems, {}, [cls[direction]])}>
        {items.map((item) => {
          const itemFn = ({ active }: {active: boolean}) => (
            <button
              type="button"
              disabled={item.disabled}
              onClick={item.onClick}
              className={classes(cls.menuItem, { [cls.active]: active, [cls.unavailable]: item.disabled }, [])}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <M.Item key={item.id} as={AppLink} to={item.href} disabled={item.disabled}>
                {itemFn}
              </M.Item>
            );
          }

          return (
            <M.Item key={item.id} as={Fragment} disabled={item.disabled}>
              {itemFn}
            </M.Item>
          );
        })}
        {/* <M.Item disabled>
          <li className={classes(cls.menuItem, { [cls.unavailable]: true }, [])}>*</li>
        </M.Item> */}
      </M.Items>
    </M>
  );
}
