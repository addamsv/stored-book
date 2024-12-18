import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { CommentItem } from "./CommentItem";

export default {
  title: "shared/CommentItem",
  component: CommentItem,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CommentItem>;

const Template: ComponentStory<typeof CommentItem> = (args) => <CommentItem {...args} />;

export const Light = Template.bind({});
Light.args = {
  // children: "Text",
};

export const Dark = Template.bind({});
Dark.args = {
  // children: "Text",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
