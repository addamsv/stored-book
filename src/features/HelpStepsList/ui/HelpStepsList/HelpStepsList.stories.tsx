import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { HelpStepsList } from "./HelpStepsList";

export default {
  title: "features/HelpStepsList",
  component: HelpStepsList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof HelpStepsList>;

const Template: ComponentStory<typeof HelpStepsList> = (args) => <HelpStepsList {...args} />;

export const Light = Template.bind({});
Light.args = {
  // children: "Text"
};

export const Dark = Template.bind({});
Dark.args = {
  // children: "Text"
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
