import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Button, ButtonTheme } from "./Button";

export default {
  title: "shared/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Text",
};

export const Clear = Template.bind({});
Clear.args = {
  children: "Text",
  theme: ButtonTheme.CLEAR,
};

export const GrayOutline = Template.bind({});
GrayOutline.args = {
  children: "Text",
  theme: ButtonTheme.GRAY_OUTLINE,
};

export const WhiteOutline = Template.bind({});
WhiteOutline.args = {
  children: "Text",
  theme: ButtonTheme.GRAY_OUTLINE,
};

export const Gray = Template.bind({});
Gray.args = {
  children: "Text",
  theme: ButtonTheme.GRAY,
};

export const GrayDark = Template.bind({});
GrayDark.args = {
  children: "Text",
  theme: ButtonTheme.GRAY,
};
GrayDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Green = Template.bind({});
Green.args = {
  children: "Text",
  theme: ButtonTheme.GREEN,
};

export const GreenDark = Template.bind({});
GreenDark.args = {
  children: "Text",
  theme: ButtonTheme.GREEN,
};
GreenDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Disabled",
  theme: ButtonTheme.GREEN,
  disabled: true
};
Disabled.decorators = [ThemeDecorator(Theme.DARK)];
