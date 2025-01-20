import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Footer } from "./Footer";

export default {
  title: "widget/Footer",
  component: Footer,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
