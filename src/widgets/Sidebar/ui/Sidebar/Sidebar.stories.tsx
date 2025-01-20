import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Sidebar } from "./Sidebar";

export default {
  title: "widget/Sidebar",
  component: Sidebar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
