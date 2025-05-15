import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { BookRecommendationsList } from "./BookRecommendationsList";

export default {
  title: "features/BookRecommendationsList",
  component: BookRecommendationsList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof BookRecommendationsList>;

const Template: ComponentStory<typeof BookRecommendationsList> = (args) => <BookRecommendationsList {...args} />;

export const Light = Template.bind({});
Light.args = {
  // children: "Text"
};

export const Dark = Template.bind({});
Dark.args = {
  // children: "Text"
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
