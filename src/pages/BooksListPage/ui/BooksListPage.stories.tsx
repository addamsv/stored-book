import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import BooksListPage from "./BooksListPage";

export default {
  title: "pages/BooksListPage",
  component: BooksListPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof BooksListPage>;

const Template: ComponentStory<typeof BooksListPage> = (args) => <BooksListPage {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
