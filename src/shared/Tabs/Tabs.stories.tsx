import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { action } from "@storybook/addon-actions";
import { Tabs } from "./Tabs";

export default {
  title: "shared/Tabs",
  component: Tabs,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Light = Template.bind({});
Light.args = {
  tabs: [
    {
      value: "tab 1",
      content: "tab 1"
    },
    {
      value: "tab 2",
      content: "tab 2"
    },
    {
      value: "tab 3",
      content: "tab 3"
    }
  ],
  activeValue: "tab 2",
  onClickHandler: action("onTabClick")
};

export const Dark = Template.bind({});
Dark.args = {
  tabs: [
    {
      value: "tab 1",
      content: "tab 1"
    },
    {
      value: "tab 2",
      content: "tab 2"
    },
    {
      value: "tab 3",
      content: "tab 3"
    }
  ],
  activeValue: "tab 2",
  onClickHandler: action("onTabClick")
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
