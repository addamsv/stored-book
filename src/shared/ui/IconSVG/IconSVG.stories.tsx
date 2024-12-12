import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { IconSVG } from "./IconSVG";

export default {
  title: "shared/IconSVG",
  component: IconSVG,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof IconSVG>;

const Template: ComponentStory<typeof IconSVG> = (args) => <IconSVG {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
