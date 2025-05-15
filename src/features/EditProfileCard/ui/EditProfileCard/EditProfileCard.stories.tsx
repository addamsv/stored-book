import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { EditProfileCard } from "./EditProfileCard";

export default {
  title: "features/EditProfileCard",
  component: EditProfileCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof EditProfileCard>;

const Template: ComponentStory<typeof EditProfileCard> = (args) => <EditProfileCard {...args} />;

export const Light = Template.bind({});
Light.args = {
  // children: "Text"
};

export const Dark = Template.bind({});
Dark.args = {
  // children: "Text"
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
