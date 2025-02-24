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

interface IListBoxProps {
  items?: IListBoxItem[]
  value?: string;
  defValue?: string;
  onChange: (val: string) => void;
  className?: string;
}

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

export const ListBox = ({ className, items, value, defValue, onChange }: IListBoxProps) => {
  // const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <LBox
      className={classes(cls.listBox, {}, [className])}
      as="div"
      // value={selectedPerson}
      // onChange={setSelectedPerson}
      value={value}
      onChange={onChange}
    >

      <LBox.Button className={cls.listBoxBtn}>
        {/* {selectedPerson.name} */}
        {value ?? defValue}
      </LBox.Button>

      <LBox.Options className={cls.listBoxOptions}>

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
                className={classes(cls.listBoxItem, { [cls.active]: active, [cls.unavailable]: item.unavailable }, [])}
              >
                {selected && "> "}
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
