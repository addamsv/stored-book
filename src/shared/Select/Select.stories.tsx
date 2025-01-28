import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "resources/store/ThemeProvider";
import { ThemeDecorator } from "resources/config/storybook/ThemeDecorator/ThemeDecorator";
import { Select } from "./Select";

export default {
  title: "shared/Select",
  component: Select,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/"
  }
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Custom Select",
  defaultValue: "b",
  optionsList: [
    { value: "a", content: "a" },
    { value: "b", content: "b" },
    { value: "c", content: "c" }
  ]
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   children: "link",
//   theme: SelectTheme.SECONDARY,
// };
// Secondary.decorators = [ThemeDecorator(Theme.DARK)];
