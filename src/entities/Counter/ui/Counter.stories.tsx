import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "resources/config/storybook/StoreDecorator/StoreDecorator";
import { Counter } from "./Counter";

export default {
  title: "entities/Counter",
  component: Counter,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Counter>;

const Template: ComponentStory<typeof Counter> = () => <Counter />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
  StoreDecorator({
    counter: {
      value: 1
    }
  })
];

export const DARK = Template.bind({});
DARK.args = {};
DARK.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    counter: {
      value: 1
    }
  })
];
