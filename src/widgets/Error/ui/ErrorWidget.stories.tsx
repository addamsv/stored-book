import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { ErrorWidget } from "./ErrorWidget";

export default {
  title: "widget/ErrorWidget",
  component: ErrorWidget,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ErrorWidget>;

const Template: ComponentStory<typeof ErrorWidget> = (args) => <ErrorWidget {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
