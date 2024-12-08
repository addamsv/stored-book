import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import ArticlesPage from "./ArticlesPage";

export default {
  title: "pages/ArticlesPage",
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />;

export const Light = Template.bind({});
Light.args = {
  // children: "Text",
};

export const Dark = Template.bind({});
Dark.args = {
  // children: "Text",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
