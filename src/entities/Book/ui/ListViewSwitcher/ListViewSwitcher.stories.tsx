import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { ListViewSwitcher } from "./ListViewSwitcher";

export default {
  title: "shared/ListViewSwitcher",
  component: ListViewSwitcher,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ListViewSwitcher>;

const Template: ComponentStory<typeof ListViewSwitcher> = (args) => <ListViewSwitcher {...args} />;

export const Light = Template.bind({});
Light.args = {
  // children: "Text",
};

export const Dark = Template.bind({});
Dark.args = {
  // children: "Text",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
