import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { IComment } from "entities/Comment/model/types";
import { CommentList } from "./CommentList";

export default {
  title: "entities/Comment/List",
  component: CommentList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;
const comments: IComment[] = [
  {
    id: 1,
    bookId: 1,
    owner: {
      id: 1,
      name: "Vasya"
    },
    iat: "1.12.2025",
    text: "Awesome Comment"
  },
  {
    id: 2,
    bookId: 1,
    owner: {
      id: 1,
      name: "Vasya"
    },
    iat: "1.12.2025",
    text: "The comment I've never heard  before"
  }
];

export const Light = Template.bind({});
Light.args = {
  comments
};

export const Dark = Template.bind({});
Dark.args = {
  comments
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkLoading = Template.bind({});
DarkLoading.args = {
  comments: [],
  isLoading: true
};
DarkLoading.decorators = [ThemeDecorator(Theme.DARK)];
