import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { action } from "@storybook/addon-actions";
import { HashTagTabs } from "./HashTagTabs";

export default {
  title: "feature/HashTagTabs",
  component: HashTagTabs,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof HashTagTabs>;

const Template: ComponentStory<typeof HashTagTabs> = (args) => <HashTagTabs {...args} />;

export const Light = Template.bind({});
Light.args = {
  activeHashTag: "ALL",
  onTagChange: action("onTabClick")
};

export const Dark = Template.bind({});
Dark.args = {
  activeHashTag: "ALL",
  onTagChange: action("onTabClick")
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
