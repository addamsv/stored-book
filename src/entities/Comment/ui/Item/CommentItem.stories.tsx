import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { IComment } from "entities/Comment/model/types";
import { CommentItem } from "./CommentItem";

export default {
  title: "entities/Comment/Item",
  component: CommentItem,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CommentItem>;

const Template: ComponentStory<typeof CommentItem> = (args) => <CommentItem {...args} />;

const comment: IComment = {
  id: 1,
  bookId: 1,
  owner: {
    id: 1,
    name: "Vasya"
  },
  iat: "1.12.2025",
  text: "Awesome Comment"
};

export const Light = Template.bind({});
Light.args = {
  comment
};

export const Dark = Template.bind({});
Dark.args = {
  comment
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkLoading = Template.bind({});
DarkLoading.args = {
  isLoading: true
};
DarkLoading.decorators = [ThemeDecorator(Theme.DARK)];
