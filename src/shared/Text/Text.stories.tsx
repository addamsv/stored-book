import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { Text } from "./Text";
import { TextAlign, TextSize, TextTheme } from ".";

export default {
  title: "shared/Text",
  component: Text,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Awesome Title",
  text: "Lorem ipsum"
};

export const Title = Template.bind({});
Title.args = {
  title: "Awesome Title"
};

export const TextOnly = Template.bind({});
TextOnly.args = {
  text: "Lorem ipsum"
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: "Awesome Title",
  text: "Lorem ipsum"
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const TitleDark = Template.bind({});
TitleDark.args = {
  title: "Awesome Title"
};
TitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const TextOnlyDark = Template.bind({});
TextOnlyDark.args = {
  text: "Lorem ipsum"
};
TextOnlyDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Error = Template.bind({});
Error.args = {
  title: "Awesome Title",
  text: "Lorem ipsum",
  theme: TextTheme.ERROR
};

export const TextLarge = Template.bind({});
TextLarge.args = {
  title: "Awesome Title",
  text: "Lorem ipsum super popular text",
  textAlign: TextAlign.LEFT,
  textSize: TextSize.L
};
TextLarge.decorators = [ThemeDecorator(Theme.DARK)];
