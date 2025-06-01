import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import EditBookPage from "./EditBookPage";

export default {
  title: "pages/EditBookPage/EditBookPage",
  component: EditBookPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof EditBookPage>;

const Template: ComponentStory<typeof EditBookPage> = (args) => <EditBookPage {...args} />;

export const Light = Template.bind({});
Light.args = {
  // children: "Text",
};

export const Dark = Template.bind({});
Dark.args = {
  // children: "Text",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
