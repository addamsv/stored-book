import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { ModalWin } from "./ModalWin";

export default {
  title: "shared/ModalWin",
  component: ModalWin,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ModalWin>;

const Template: ComponentStory<typeof ModalWin> = (args) => <ModalWin {...args} />;

export const ModalDark = Template.bind({});
ModalDark.args = {
  isOpen: true,
  children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam reiciendis dolorum qui iste maiores, ullam quod enim nihil blanditiis voluptatibus ipsum incidunt architecto magni sunt dolores rem nostrum quas laudantium!",
};
ModalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ModalLight = Template.bind({});
ModalLight.args = {
  isOpen: true,
  children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam reiciendis dolorum qui iste maiores, ullam quod enim nihil blanditiis voluptatibus ipsum incidunt architecto magni sunt dolores rem nostrum quas laudantium!",
};
