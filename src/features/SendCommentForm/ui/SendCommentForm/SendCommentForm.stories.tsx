import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { action } from "@storybook/addon-actions";
import { StoreDecorator } from "resources/config/storybook/StoreDecorator/StoreDecorator";
import SendCommentForm from "./SendCommentForm";

export default {
  title: "feature/SendCommentForm",
  component: SendCommentForm,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SendCommentForm>;

const Template: ComponentStory<typeof SendCommentForm> = (args) => <SendCommentForm {...args} />;

export const Light = Template.bind({});
Light.args = {
  onSendCommentHandler: action("onSendComment")
};
Light.decorators = [StoreDecorator({}), ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {
  onSendCommentHandler: action("onSendComment")
};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
