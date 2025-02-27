import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";

import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { Button } from "shared/Button/Button";
import { Menu } from "./Menu";

export default {
  title: "shared/Menu",
  component: Menu,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // decorators: [(Story) => <div style={{ padding: 100 }}><Story /></div>]
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Light = Template.bind({});
Light.args = {
  trigger: <Button>menu</Button>,
  items: [
    { content: "item 1" },
    { content: "item 2" },
    { content: "item 3", disabled: true },
    { content: "item 4" },
  ]
};

export const Dark = Template.bind({});
Dark.args = {
  trigger: <Button>menu</Button>,
  items: [
    { content: "item 1" },
    { content: "item 2" },
    { content: "item 3", disabled: true },
    { content: "item 4" },
  ]
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
