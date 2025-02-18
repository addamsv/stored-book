import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "resources/config/storybook/StoreDecorator/StoreDecorator";
import { BookBottomNavbar } from "./BookBottomNavbar";

export default {
  title: "widget/Navbar",
  component: BookBottomNavbar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof BookBottomNavbar>;

const Template: ComponentStory<typeof BookBottomNavbar> = (args) => <BookBottomNavbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  StoreDecorator({})
];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {};
SecondaryDark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({})
];

export const RegisteredUser = Template.bind({});
RegisteredUser.args = {};
RegisteredUser.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({ user: { authData: {} } })
];
