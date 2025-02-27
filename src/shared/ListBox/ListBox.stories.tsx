import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ListBox } from "./ListBox";

export default {
  title: "shared/ListBox",
  component: ListBox,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (props) => <ListBox {...props} />;

export const Light = Template.bind({});
Light.args = {
  onChange: () => {},
  value: "list 1",
  items: [
    { content: "item 1", value: "list 1" },
    { content: "item 2", value: "list 2" },
    { content: "item 3", value: "list 3" },
    { content: "item 4", value: "list 4" },
  ]
};

export const LightBottomLeft = Template.bind({});
LightBottomLeft.args = {
  direction: "bottomLeft",
  onChange: () => {},
  value: "list 1",
  items: [
    { content: "item 1", value: "list 1" },
    { content: "item 2", value: "list 2" },
    { content: "item 3", value: "list 3" },
    { content: "item 4", value: "list 4" },
  ]
};

export const LightBottomRight = Template.bind({});
LightBottomRight.args = {
  direction: "bottomRight",
  onChange: () => {},
  value: "list 1",
  items: [
    { content: "item 1", value: "list 1" },
    { content: "item 2", value: "list 2" },
    { content: "item 3", value: "list 3" },
    { content: "item 4", value: "list 4" },
  ]
};

export const Dark = Template.bind({});
Dark.args = {
  onChange: () => {},
  value: "list 1",
  items: [
    { content: "item 1", value: "list 1" },
    { content: "item 2", value: "list 2" },
    { content: "item 3", value: "list 3" },
    { content: "item 4", value: "list 4" },
  ]
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
