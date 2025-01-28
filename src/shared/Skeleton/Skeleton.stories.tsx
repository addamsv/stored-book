import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Skeleton } from "./Skeleton";

export default {
  title: "shared/Skeleton",
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Light = Template.bind({});
Light.args = {
  // children: "Text",
};

export const Dark = Template.bind({});
Dark.args = {
  // children: "Text",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const LightBlue = Template.bind({});
LightBlue.args = {
  // children: "Text",
};
LightBlue.decorators = [ThemeDecorator(Theme.LIGHT_BLUE)];

export const Blue = Template.bind({});
Blue.args = {
  // children: "Text",
};
Blue.decorators = [ThemeDecorator(Theme.DARK_BLUE)];

export const LightGreen = Template.bind({});
LightGreen.args = {
  // children: "Text",
};
LightGreen.decorators = [ThemeDecorator(Theme.LIGHT_GREEN)];
