import { Listbox as LBox } from "@headlessui/react";
// import { Listbox } from "@headlessui/react";
import { Fragment, ReactNode, useState } from "react";
import { classes } from "resources/lib/classNames/classes";
import cls from "./ListBox.module.scss";

export interface IListBoxItem {
  value: string;
  content: ReactNode;
  unavailable?: boolean;
}

export type TMenuDropdownDirection = "top" | "right" | "bottom" | "left" | "topRight"
| "topLeft" | "bottomLeft" | "bottomRight";

interface IListBoxProps {
  items?: IListBoxItem[]
  value?: string;
  defValue?: string;
  onChange: (val: string) => void;
  className?: string;
  readonly?: boolean;
  direction?: TMenuDropdownDirection;
}

// const people = [
//   { id: 1, name: "Durward Reynolds", unavailable: false },
//   { id: 2, name: "Kenton Towne", unavailable: false },
//   { id: 3, name: "Therese Wunsch", unavailable: false },
//   { id: 4, name: "Benedict Kessler", unavailable: true },
//   { id: 5, name: "Katelyn Rohan", unavailable: false },
// ];

export const ListBox = ({
  className, items, value, defValue, readonly, direction = "bottom", onChange
}: IListBoxProps) => {
  // const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <LBox
      className={classes(cls.listBox, {}, [className])}
      as="div"
      // value={selectedPerson}
      // onChange={setSelectedPerson}
      value={value}
      onChange={onChange}
      disabled={readonly}
    >

      <LBox.Button className={cls.listBoxBtn}>
        {/* {selectedPerson.name} */}
        {value ?? defValue}
      </LBox.Button>

      <LBox.Options className={classes(cls.listBoxOptions, {}, [cls[direction]])}>

        {/* {people.map((person) => ( */}
        {items?.map((item) => (

          <LBox.Option
            key={item.value}
            value={item.value}
            disabled={item.unavailable}
            // key={person.id}
            // value={person}
            // disabled={person.unavailable}
            as={Fragment}
          >
            {({ active, selected }: any) => (
              <li
                className={classes(cls.listBoxItem, {
                  [cls.active]: active,
                  [cls.unavailable]: item.unavailable,
                  [cls.selected]: selected
                }, [])}
              >
                {/* {selected && "> "} */}
                {/* {person.name} */}
                {item.content}
              </li>
            )}
          </LBox.Option>

        ))}

      </LBox.Options>

    </LBox>
  );
};
